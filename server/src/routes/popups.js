import { Router } from 'express';
import mongoose from 'mongoose';
import Popup, { TYPES, TRIGGERS, EFFECTS } from '../models/Popup.js';
import { requireAdmin } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';
import { removeUpload } from '../lib/files.js';

// ---------- public: what the site shows ----------
export const publicPopups = Router();

publicPopups.get('/active', async (req, res) => {
  const popups = await Popup.find({ active: true }).sort({ createdAt: 1 });
  res.set('Cache-Control', 'no-store');
  res.json({ popups: popups.map((p) => p.toPublic()) });
});

// ---------- admin: manage popups ----------
export const adminPopups = Router();
adminPopups.use(requireAdmin);

const SIZE = { min: 200, max: 1200 };

// A site path ("/empanelment") or a full http(s) URL. Nothing else - no javascript: links.
function isLink(v) {
  if (/^\/(?!\/)/.test(v)) return true;
  try { return ['http:', 'https:'].includes(new URL(v).protocol); } catch { return false; }
}

// Read and check the form fields. Returns { data } or { error }.
function readBody(body, hasImage) {
  const s = (k) => String(body[k] ?? '').trim();
  const n = (k) => Math.round(Number(body[k]));
  const data = { name: s('name'), type: s('type'), trigger: s('trigger') || 'exit', effect: s('effect') || 'none', active: s('active') === 'true' };

  if (!data.name) return { error: 'Give the popup a name' };
  if (!TYPES.includes(data.type)) return { error: 'Choose a popup type' };
  if (!TRIGGERS.includes(data.trigger)) return { error: 'Choose when the popup shows' };
  if (!EFFECTS.includes(data.effect)) return { error: 'Choose an effect from the list' };
  data.delay = data.trigger === 'timer' ? n('delay') : 5;
  if (!(data.delay >= 1 && data.delay <= 120)) return { error: 'Delay must be between 1 and 120 seconds' };

  if (data.type === 'image') {
    if (!hasImage) return { error: 'Upload an image' };
    data.imageAlt = s('imageAlt');
    data.width = n('width');
    data.height = n('height');
    data.linkUrl = s('linkUrl');
    for (const k of ['width', 'height']) {
      if (!(data[k] >= SIZE.min && data[k] <= SIZE.max)) return { error: `Image ${k} must be between ${SIZE.min} and ${SIZE.max}px` };
    }
    if (data.linkUrl && !isLink(data.linkUrl)) return { error: 'Link must be a site path like /contact or a full https:// URL' };
  } else {
    data.heading = s('heading');
    data.body = s('body');
    data.buttonLabel = s('buttonLabel');
    data.buttonUrl = s('buttonUrl');
    if (!data.heading) return { error: 'Add a heading' };
    if (!!data.buttonLabel !== !!data.buttonUrl) return { error: 'A button needs both a label and a link' };
    if (data.buttonUrl && !isLink(data.buttonUrl)) return { error: 'Button link must be a site path like /contact or a full https:// URL' };
  }
  return { data };
}

adminPopups.param('id', async (req, res, next, id) => {
  const popup = mongoose.isValidObjectId(id) ? await Popup.findById(id) : null;
  if (!popup) {
    await removeUpload(req.file?.filename);
    return res.status(404).json({ error: 'Popup not found' });
  }
  req.popup = popup;
  return next();
});

adminPopups.get('/', async (req, res) => {
  const popups = await Popup.find().sort({ createdAt: -1 });
  res.json({ popups: popups.map((p) => p.toAdmin()) });
});

adminPopups.get('/:id', (req, res) => {
  res.json({ popup: req.popup.toAdmin() });
});

adminPopups.post('/', uploadImage, async (req, res) => {
  const { data, error } = readBody(req.body, !!req.file);
  if (error || data.type !== 'image') await removeUpload(req.file?.filename);
  if (error) return res.status(400).json({ error });
  if (data.type === 'image') data.image = req.file.filename;

  const popup = await Popup.create(data);
  return res.status(201).json({ popup: popup.toAdmin() });
});

// A new image replaces the old file on disk; switching to a content popup removes it.
adminPopups.put('/:id', uploadImage, async (req, res) => {
  const popup = req.popup;
  const { data, error } = readBody(req.body, !!req.file || !!popup.image);
  if (error || data.type !== 'image') await removeUpload(req.file?.filename);
  if (error) return res.status(400).json({ error });

  const oldImage = popup.image;
  if (data.type === 'image' && req.file) data.image = req.file.filename;
  if (data.type !== 'image') data.image = '';
  popup.set(data);
  await popup.save();
  if (oldImage && oldImage !== popup.image) await removeUpload(oldImage);

  return res.json({ popup: popup.toAdmin() });
});

adminPopups.patch('/:id/active', async (req, res) => {
  req.popup.active = req.body?.active === true;
  await req.popup.save();
  res.json({ popup: req.popup.toAdmin() });
});

adminPopups.delete('/:id', async (req, res) => {
  await req.popup.deleteOne();
  await removeUpload(req.popup.image);
  res.json({ ok: true });
});
