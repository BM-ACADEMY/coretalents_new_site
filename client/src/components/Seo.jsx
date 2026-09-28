import { SITE } from '../data/content';

// React 19 hoists <title>, <meta> and <link> into <head> automatically.
// path: '' for home, 'services/bulk-hiring' etc. for the rest.
export default function Seo({ title, desc, path = '', schema = [], noindex = false }) {
  const url = `${SITE.domain}/${path}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}

export const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CoreTalents',
  legalName: SITE.legal,
  url: SITE.domain,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lenin Street, Kuyavarpalayam',
    addressLocality: 'Puducherry',
    postalCode: '605008',
    addressCountry: 'IN',
  },
  sameAs: [SITE.instagram, SITE.linkedin],
};

export const LOCAL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  name: 'CoreTalents',
  image: `${SITE.domain}/og-default.png`,
  url: SITE.domain,
  telephone: SITE.phone,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lenin Street, Kuyavarpalayam',
    addressLocality: 'Puducherry',
    addressRegion: 'Puducherry',
    postalCode: '605008',
    addressCountry: 'IN',
  },
  areaServed: ['Puducherry', 'Chennai', 'Cuddalore', 'Villupuram', 'Tamil Nadu'],
  openingHours: 'Mo-Sa 09:30-18:30',
};

export function serviceSchema(s) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: s.nav,
    provider: { '@type': 'Organization', name: 'CoreTalents' },
    areaServed: ['Puducherry', 'Chennai', 'Tamil Nadu'],
    description: s.desc,
  };
}
