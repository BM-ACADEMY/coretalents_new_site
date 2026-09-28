import { SITE } from '../data/content';

export function waLink(context = 'general', text) {
  const msg = `Hi CoreTalents, I'm enquiring about ${text || context}`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export const portalShort = SITE.portal.replace('https://', '');
