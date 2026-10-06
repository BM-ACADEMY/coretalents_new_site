// All configuration comes from server/.env - read and checked once, here.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
dotenv.config({ path: path.join(ROOT, '.env') });

function required(name, minLength = 1) {
  const v = (process.env[name] || '').trim();
  if (v.length < minLength) {
    console.error(`[env] ${name} is missing or too short (min ${minLength} characters). Check server/.env`);
    process.exit(1);
  }
  return v;
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: required('MONGO_URI'),
  clientOrigins: required('CLIENT_ORIGIN').split(',').map((s) => s.trim().replace(/\/$/, '')).filter(Boolean),
  adminEmail: required('ADMIN_EMAIL').toLowerCase(),
  adminPassword: required('ADMIN_PASSWORD', 8),
  jwtSecret: required('JWT_SECRET', 32),
  jwtExpires: process.env.JWT_EXPIRES || '7d',
  uploadDir: path.resolve(ROOT, process.env.UPLOAD_DIR || 'uploads'),
  maxUploadBytes: (Number(process.env.MAX_UPLOAD_MB) || 5) * 1024 * 1024,
};
