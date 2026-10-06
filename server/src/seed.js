import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';
import Popup from './models/Popup.js';
import { env } from './config/env.js';

// The admin login lives in .env. Create it on first start, and pick up a
// changed password on later starts.
export async function syncAdmin() {
  const admin = await Admin.findOne({ email: env.adminEmail });
  if (!admin) {
    await Admin.create({ email: env.adminEmail, passwordHash: await bcrypt.hash(env.adminPassword, 12) });
    console.log(`[admin] created ${env.adminEmail}`);
  } else if (!await bcrypt.compare(env.adminPassword, admin.passwordHash)) {
    admin.passwordHash = await bcrypt.hash(env.adminPassword, 12);
    await admin.save();
    console.log(`[admin] password updated for ${env.adminEmail}`);
  }
  // .env is the only source of admin accounts
  await Admin.deleteMany({ email: { $ne: env.adminEmail } });
}

// First start only: the empanelment exit popup the site launched with.
export async function seedPopups() {
  if (await Popup.estimatedDocumentCount()) return;
  await Popup.create({
    name: 'Empanelment - exit intent',
    type: 'content',
    active: true,
    trigger: 'exit',
    heading: 'Not hiring right now?',
    body: "Empanel with us free. No fee, no obligation, and we won't add you to a mailing list — it just means when a role does open, we're already set up and you're not starting from scratch under time pressure.",
    buttonLabel: 'Send me the MoU',
    buttonUrl: '/empanelment',
  });
  console.log('[popups] added the default empanelment popup');
}
