// How a popup's trigger reads in lists.
export function triggerText(p) {
  return p.trigger === 'timer'
    ? `After ${p.delay} second${p.delay === 1 ? '' : 's'} · all devices`
    : 'When the visitor is about to leave · desktop';
}
