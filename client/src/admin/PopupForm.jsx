import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CursorClick, Image as ImageIcon, Play, TextAa, Timer, UploadSimple } from '@phosphor-icons/react';
import PopupView from '../components/PopupView';
import PopupEffect, { EFFECTS } from '../components/PopupEffect';
import { assetUrl } from '../lib/api';
import { createPopup, getPopup, updatePopup } from './api';
import { Alert, Field, PageHead, Switch } from './ui';

const EMPTY = {
  name: '', type: 'image', trigger: 'exit', delay: 5, effect: 'none', active: false,
  imageAlt: '', width: 480, height: 600, linkUrl: '',
  heading: '', body: '', buttonLabel: '', buttonUrl: '',
};

const SIZE = { min: 200, max: 1200 };
const RATIOS = [['1:1', 1, 1], ['4:5', 4, 5], ['3:4', 3, 4], ['3:2', 3, 2], ['16:9', 16, 9]];
const SITE_PAGES = ['/', '/services', '/roles', '/locations', '/insights', '/how-we-work', '/pricing', '/empanelment', '/about', '/contact'];
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const clamp = (n) => Math.min(SIZE.max, Math.max(SIZE.min, Math.round(n)));

// Width x height for a ratio, keeping the width where the limits allow it.
function sizeFor(width, rw, rh) {
  const height = clamp((width * rh) / rw);
  return { width: clamp((height * rw) / rh), height };
}
const sameRatio = (w, h, rw, rh) => Math.abs(w / h - rw / rh) < 0.01;

// Create or edit one popup, with a live preview of what visitors will see.
export default function PopupForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [savedImage, setSavedImage] = useState('');   // image already on the server
  const [file, setFile] = useState(null);             // newly chosen image, not uploaded yet
  const [fileUrl, setFileUrl] = useState('');
  const [natural, setNatural] = useState(null);       // the image's own size
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [replay, setReplay] = useState(0);            // bump to play the effect again in the preview

  const imageSrc = fileUrl || assetUrl(savedImage);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  useEffect(() => {
    if (!id) return;
    getPopup(id).then((p) => {
      setForm({ ...EMPTY, ...p });
      setSavedImage(p.imageUrl);
      setLoading(false);
    }).catch((err) => { setError(err.message); setLoading(false); });
  }, [id]);

  useEffect(() => () => { if (fileUrl) URL.revokeObjectURL(fileUrl); }, [fileUrl]);

  // measure the image so "Original" can match its shape
  useEffect(() => {
    if (!imageSrc) { setNatural(null); return undefined; }
    let alive = true;
    const img = new window.Image();
    img.onload = () => { if (alive) setNatural({ w: img.naturalWidth, h: img.naturalHeight }); };
    img.src = imageSrc;
    return () => { alive = false; };
  }, [imageSrc]);

  function chooseFile(e) {
    const picked = e.target.files?.[0];
    e.target.value = '';
    if (!picked) return;
    if (!IMAGE_TYPES.includes(picked.type)) { setError('Image must be a JPG, PNG, WebP or GIF file'); return; }
    setError('');
    const first = !imageSrc;
    const url = URL.createObjectURL(picked);
    setFile(picked);
    setFileUrl(url);
    // the first image sets the box to its own shape; later replacements keep the size you chose
    if (first) {
      const img = new window.Image();
      img.onload = () => setForm((f) => ({ ...f, ...sizeFor(clamp(Math.min(img.naturalWidth, 480)), img.naturalWidth, img.naturalHeight) }));
      img.src = url;
    }
  }

  function applyRatio(rw, rh) {
    setForm((f) => ({ ...f, ...sizeFor(clamp(Number(f.width) || 480), rw, rh) }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (saving) return;
    if (form.type === 'image' && !imageSrc) { setError('Upload an image'); return; }
    setError('');
    setSaving(true);
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (k in EMPTY) data.append(k, v); });
    if (form.type === 'image' && file) data.append('image', file);
    try {
      if (id) await updatePopup(id, data); else await createPopup(data);
      navigate('/admin/popups');
    } catch (err) {
      setError(err.message);
      setSaving(false);
      window.scrollTo({ top: 0 });
    }
  }

  if (loading) return <p className="a-empty-line">Loading…</p>;

  const w = Number(form.width) || 0;
  const h = Number(form.height) || 0;
  const isOriginal = natural && sameRatio(w, h, natural.w, natural.h);
  const preset = RATIOS.find(([, rw, rh]) => sameRatio(w, h, rw, rh));
  const preview = { ...form, heading: form.heading || 'Your heading', width: clamp(w || 480), height: clamp(h || 600) };

  return (
    <form onSubmit={onSubmit} noValidate>
      <PageHead title={id ? 'Edit popup' : 'New popup'}
        text={id ? 'Changes go live as soon as you save.' : 'Choose a type, fill it in, and switch it on when it is ready.'}>
        <Link className="a-btn a-btn-outline" to="/admin/popups">Cancel</Link>
        <button type="submit" className="a-btn a-btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save popup'}</button>
      </PageHead>
      <Alert>{error}</Alert>

      <div className="a-form-grid">
        <div className="a-form-col">
          <section className="a-card a-card-pad">
            <h2 className="a-h2">Basics</h2>
            <Field label="Name" htmlFor="pName" hint="Only you see this. It labels the popup in this panel and in analytics.">
              <input id="pName" className="a-input" value={form.name} onChange={set('name')} placeholder="Diwali offer" required />
            </Field>
            <div className="a-field">
              <span className="a-label" id="pTypeLabel">Type</span>
              <div className="a-choice" role="radiogroup" aria-labelledby="pTypeLabel">
                {[['image', 'Image', 'One image. Clicking it opens a link.', ImageIcon], ['content', 'Content', 'Heading, text and a button.', TextAa]].map(([value, label, text, Icon]) => (
                  <button type="button" key={value} role="radio" aria-checked={form.type === value} className="a-choice-item"
                    onClick={() => setForm((f) => ({ ...f, type: value }))}>
                    <Icon size={18} /><span><strong>{label}</strong><small>{text}</small></span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {form.type === 'image' ? (
            <section className="a-card a-card-pad">
              <h2 className="a-h2">Image</h2>
              <div className="a-field">
                <span className="a-label">Image file</span>
                <div className="a-upload">
                  <span className="a-upload-thumb">{imageSrc ? <img src={imageSrc} alt="" /> : <ImageIcon size={22} />}</span>
                  <div className="a-upload-text">
                    <strong>{file ? file.name : imageSrc ? 'Current image' : 'No image yet'}</strong>
                    <small>
                      {natural ? `${natural.w} × ${natural.h} px. ` : ''}
                      {file && savedImage ? 'Saving replaces the old file on the server.' : 'JPG, PNG, WebP or GIF.'}
                    </small>
                  </div>
                  <button type="button" className="a-btn a-btn-outline" onClick={() => fileInput.current.click()}>
                    <UploadSimple size={16} />{imageSrc ? 'Replace image' : 'Upload image'}
                  </button>
                  <input ref={fileInput} type="file" accept={IMAGE_TYPES.join(',')} hidden onChange={chooseFile} />
                </div>
              </div>

              <div className="a-field">
                <span className="a-label" id="pSizeLabel">Size on screen</span>
                <div className="a-chips" role="group" aria-labelledby="pSizeLabel">
                  <button type="button" className="a-chip" aria-pressed={!!isOriginal} disabled={!natural}
                    onClick={() => applyRatio(natural.w, natural.h)}>Original</button>
                  {RATIOS.map(([label, rw, rh]) => (
                    <button type="button" key={label} className="a-chip" aria-pressed={!isOriginal && preset?.[0] === label}
                      onClick={() => applyRatio(rw, rh)}>{label}</button>
                  ))}
                  <span className="a-chip a-chip-static" data-on={(!isOriginal && !preset) || undefined}>Custom</span>
                </div>
                <div className="a-size">
                  <label className="a-size-box">
                    <span>Width</span>
                    <input className="a-input" type="number" min={SIZE.min} max={SIZE.max} value={form.width} onChange={set('width')} />
                    <span>px</span>
                  </label>
                  <span aria-hidden="true">×</span>
                  <label className="a-size-box">
                    <span>Height</span>
                    <input className="a-input" type="number" min={SIZE.min} max={SIZE.max} value={form.height} onChange={set('height')} />
                    <span>px</span>
                  </label>
                </div>
                <p className="a-hint">
                  Pick a ratio or type any size from {SIZE.min} to {SIZE.max} px. The image fills this box and is cropped at the
                  edges if its shape differs. On small screens the box shrinks but keeps its shape.
                </p>
              </div>

              <Field label="Opens when clicked" htmlFor="pLink" hint="A page on this site, like /pricing, or a full https:// address. Leave empty for an image that does not link anywhere.">
                <input id="pLink" className="a-input" list="sitePages" value={form.linkUrl} onChange={set('linkUrl')} placeholder="/empanelment" />
              </Field>
              <Field label="Image description" htmlFor="pAlt" hint="Read aloud to visitors who cannot see the image.">
                <input id="pAlt" className="a-input" value={form.imageAlt} onChange={set('imageAlt')} placeholder="Free empanelment this month" />
              </Field>
            </section>
          ) : (
            <section className="a-card a-card-pad">
              <h2 className="a-h2">Content</h2>
              <Field label="Heading" htmlFor="pHeading">
                <input id="pHeading" className="a-input" value={form.heading} onChange={set('heading')} placeholder="Not hiring right now?" required />
              </Field>
              <Field label="Text" htmlFor="pBody">
                <textarea id="pBody" className="a-input a-textarea" rows={5} value={form.body} onChange={set('body')} />
              </Field>
              <div className="a-two">
                <Field label="Button label" htmlFor="pBtnLabel">
                  <input id="pBtnLabel" className="a-input" value={form.buttonLabel} onChange={set('buttonLabel')} placeholder="Send me the MoU" />
                </Field>
                <Field label="Button opens" htmlFor="pBtnUrl">
                  <input id="pBtnUrl" className="a-input" list="sitePages" value={form.buttonUrl} onChange={set('buttonUrl')} placeholder="/empanelment" />
                </Field>
              </div>
              <p className="a-hint">The button opens a page on this site, like /pricing, or a full https:// address. Leave both empty for no button.</p>
            </section>
          )}
          <datalist id="sitePages">{SITE_PAGES.map((p) => <option key={p} value={p} />)}</datalist>

          <section className="a-card a-card-pad">
            <h2 className="a-h2">When it shows</h2>
            <div className="a-field">
              <div className="a-choice" role="radiogroup" aria-label="When it shows">
                {[['exit', 'On exit', 'When the mouse leaves the page. Desktop only.', CursorClick], ['timer', 'After a delay', 'A few seconds after the page opens. All devices.', Timer]].map(([value, label, text, Icon]) => (
                  <button type="button" key={value} role="radio" aria-checked={form.trigger === value} className="a-choice-item"
                    onClick={() => setForm((f) => ({ ...f, trigger: value }))}>
                    <Icon size={18} /><span><strong>{label}</strong><small>{text}</small></span>
                  </button>
                ))}
              </div>
            </div>
            {form.trigger === 'timer' && (
              <Field label="Delay in seconds" htmlFor="pDelay">
                <input id="pDelay" className="a-input a-input-sm" type="number" min={1} max={120} value={form.delay} onChange={set('delay')} />
              </Field>
            )}
            <div className="a-field">
              <span className="a-label" id="pEffectLabel">Effect when it opens</span>
              <div className="a-chips" role="group" aria-labelledby="pEffectLabel">
                {EFFECTS.map(([value, label]) => (
                  <button type="button" key={value} className="a-chip" aria-pressed={form.effect === value}
                    onClick={() => { setForm((f) => ({ ...f, effect: value })); setReplay((n) => n + 1); }}>{label}</button>
                ))}
              </div>
              <p className="a-hint">Plays once as the popup appears. Pick one to see it in the preview. Visitors who turn off animations on their device do not get it.</p>
            </div>
            <div className="a-switch-row">
              <div>
                <strong>Show on the site</strong>
                <small>Each visitor sees a popup once, never on the contact or empanelment pages, and not after sending a form.</small>
              </div>
              <Switch checked={form.active} onChange={(v) => setForm((f) => ({ ...f, active: v }))} label="Show on the site" />
            </div>
          </section>
        </div>

        <aside className="a-preview">
          <div className="a-card a-card-pad">
            <div className="a-card-head a-card-head-flush">
              <h2 className="a-h2">Preview</h2>
              {form.effect !== 'none' && (
                <button type="button" className="a-btn a-btn-outline a-btn-sm" onClick={() => setReplay((n) => n + 1)}>
                  <Play size={14} weight="fill" />Play effect
                </button>
              )}
            </div>
            {form.type === 'image' && <p className="a-hint">{preview.width} × {preview.height} px, scaled to fit this panel</p>}
            <div className="a-preview-stage">
              <div className="a-site">
                <PopupView popup={preview} imageSrc={imageSrc} preview />
              </div>
              <PopupEffect key={replay} effect={form.effect} />
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
