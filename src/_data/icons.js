// Original inline SVG icon set — 48px grid, 2px stroke
const base = (inner) =>
  `<svg width="30" height="30" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

module.exports = {
  panel: base(
    `<rect x="8" y="10" width="32" height="22" rx="2"/><path d="M8 21h32M18.5 10v22M29.5 10v22M24 32v8M16 40h16"/>`
  ),
  battery: base(
    `<rect x="12" y="10" width="24" height="32" rx="4"/><path d="M20 6h8"/><path d="M26 17l-6 9h8l-6 9"/>`
  ),
  retrofit: base(
    `<rect x="8" y="22" width="16" height="20" rx="3"/><path d="M12 29h8M12 35h8"/><path d="M30 8v10m0 0 5-5m-5 5-5-5"/><circle cx="36" cy="30" r="8"/><path d="M36 26v4l3 3"/>`
  ),
  ev: base(
    `<path d="M10 40V16a6 6 0 0 1 6-6h10a6 6 0 0 1 6 6v24"/><path d="M6 40h30"/><path d="M23 18l-5 8h7l-5 8"/><path d="M32 24h6a4 4 0 0 1 4 4v7a3 3 0 1 1-6 0v-3"/>`
  ),
  switchboard: base(
    `<rect x="10" y="6" width="28" height="36" rx="3"/><path d="M10 15h28M10 33h28"/><circle cx="18" cy="24" r="3"/><path d="M27 21v6M33 21v6"/>`
  ),
  chat: base(
    `<path d="M40 22c0 8-7.2 14-16 14-2 0-4-.3-5.8-.9L8 38l2.6-7.8C9 27.9 8 25 8 22 8 14 15.2 8 24 8s16 6 16 14z"/><path d="M17 22h.1m6.9 0h.1m6.9 0h.1"/>`
  ),
  star: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`,
};
