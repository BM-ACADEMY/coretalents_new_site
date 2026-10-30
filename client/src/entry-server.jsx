// Build-time renderer used by scripts/prerender.mjs. Not loaded in the browser.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { SERVICES, ROLES, LOCATIONS, ARTICLES } from './data/content';

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

const STATIC = ['/', '/services', '/roles', '/locations', '/insights', '/how-we-work', '/pricing',
  '/empanelment', '/about', '/contact', '/privacy', '/terms'];

export const routes = [
  ...STATIC,
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...ROLES.map((r) => `/roles/${r.slug}`),
  ...LOCATIONS.map((l) => `/locations/${l.slug}`),
  ...ARTICLES.map((a) => `/insights/${a.slug}`),
];
