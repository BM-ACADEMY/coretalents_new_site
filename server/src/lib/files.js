import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from '../config/env.js';

// Delete an uploaded image from disk. A file that is already gone is not an error.
export async function removeUpload(name) {
  if (!name) return;
  try {
    await fs.unlink(path.join(env.uploadDir, path.basename(name)));
  } catch (err) {
    if (err.code !== 'ENOENT') console.error('[uploads] could not delete', name, err.message);
  }
}
