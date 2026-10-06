import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(admin) {
  return jwt.sign({ sub: String(admin._id), email: admin.email }, env.jwtSecret, { expiresIn: env.jwtExpires });
}

// Admin routes: "Authorization: Bearer <token>"
export function requireAdmin(req, res, next) {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ error: 'Not signed in' });
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.admin = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return res.status(401).json({ error: 'Session expired. Please sign in again.' });
  }
}
