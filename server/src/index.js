import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import multer from 'multer';
import { env } from './config/env.js';
import authRoutes from './routes/auth.js';
import { adminPopups, publicPopups } from './routes/popups.js';
import { syncAdmin, seedPopups } from './seed.js';

const app = express();
app.set('trust proxy', 1); // behind a host's proxy in production - needed for the login rate limit

// images are loaded by the site from another origin
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: env.clientOrigins }));
app.use(express.json({ limit: '100kb' }));

app.use('/uploads', express.static(env.uploadDir, { maxAge: '30d', immutable: true, index: false }));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/admin', authRoutes);
app.use('/api/admin/popups', adminPopups);
app.use('/api/popups', publicPopups);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const text = err.code === 'LIMIT_FILE_SIZE'
      ? `Image is too large (max ${Math.round(env.maxUploadBytes / 1024 / 1024)} MB)`
      : 'Upload failed';
    return res.status(400).json({ error: text });
  }
  if (err.status && err.status < 500) return res.status(err.status).json({ error: err.message });
  console.error(err);
  return res.status(500).json({ error: 'Something went wrong' });
});

await mongoose.connect(env.mongoUri);
await syncAdmin();
await seedPopups();
app.listen(env.port, () => console.log(`CoreTalents API on http://localhost:${env.port}`));
