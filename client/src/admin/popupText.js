const OFTEN = { always: 'every page load', session: 'once per visit' };

// How a popup's trigger and frequency read in lists.
export function triggerText(p) {
  const when = p.trigger === 'timer'
    ? `After ${p.delay} second${p.delay === 1 ? '' : 's'} · all devices`
    : 'When the visitor is about to leave · desktop';
  return `${when} · ${OFTEN[p.frequency] || OFTEN.session}`;
}
