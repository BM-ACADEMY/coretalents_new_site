import { siWhatsapp } from 'simple-icons';

// Official WhatsApp mark from Simple Icons (CC0).
export function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={siWhatsapp.path} fill="currentColor" />
    </svg>
  );
}

// unDraw illustrations (MIT), recoloured to the logo yellow. Files live in public/illustrations.
const SIZES = {
  agreement: [704, 800],
  'contact-us': [960, 462],
  hire: [898, 399],
  hiring: [698, 631],
  'location-search': [960, 746],
  'meet-the-team': [960, 811],
  'people-search': [591, 659],
  researching: [800, 521],
  'screening-resumes': [799, 552],
  searching: [619, 800],
  'fill-forms': [856, 560],
  'mail-sent': [570, 512],
  'contract-signed': [525, 728],
  'starting-work': [760, 800],
};

export function Illustration({ name, eager = false, className = 'art' }) {
  const [w, h] = SIZES[name];
  return (
    <img className={className} src={`/illustrations/${name}.svg`} width={w} height={h} alt=""
      loading={eager ? 'eager' : 'lazy'} decoding="async" />
  );
}
