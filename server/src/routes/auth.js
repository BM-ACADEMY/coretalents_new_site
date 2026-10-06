import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import Admin from '../models/Admin.js';
import { requireAdmin, signToken } from '../middleware/auth.js';

const router = Router();

// slow down password guessing
const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Try again in 15 minutes.' },
});

router.post('/login', loginLimit, async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const admin = await Admin.findOne({ email });
  const ok = admin && await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Wrong email or password' });

  return res.json({ token: signToken(admin), admin: { email: admin.email } });
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: { email: req.admin.email } });
});

export default router;
