import { Link } from 'react-router-dom';
import { SITE, SERVICES, ROLES, LOCATIONS } from '../data/content';
import { waLink, portalShort } from '../lib/links';

function LinkList({ base, items }) {
  return <ul>{items.map((i) => <li key={i.slug}><Link to={`/${base}/${i.slug}`}>{i.nav}</Link></li>)}</ul>;
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="logo" to="/" aria-label="CoreTalents home">
              <img src="/logo-light.png" width="875" height="136" alt="CoreTalents - Smart hiring that builds strong teams" loading="lazy" />
            </Link>
            <p>Recruitment and staffing across Tamil Nadu, Puducherry and South India. You pay only when a candidate joins.</p>
            <p className="legal-line">A division of {SITE.legal}<br />{SITE.address}<br />CIN: {SITE.cin} &nbsp;|&nbsp; GSTIN: {SITE.gstin}</p>
          </div>
          <div>
            <h4>Services</h4>
            <LinkList base="services" items={SERVICES} />
          </div>
          <div>
            <h4>Roles</h4>
            <LinkList base="roles" items={ROLES} />
            <h4 style={{ marginTop: '1.4em' }}>Locations</h4>
            <LinkList base="locations" items={LOCATIONS} />
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href={`tel:+${SITE.phoneRaw}`}>{SITE.phone}</a></li>
              <li><a href={waLink()}>WhatsApp us</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>{SITE.hours}</li>
            </ul>
            <h4 style={{ marginTop: '1.4em' }}>Company</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/how-we-work">How we work</Link></li>
              <li><Link to="/empanelment">Free empanelment</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="seeker-line">Looking for a job? Visit <a href={SITE.portal} className="seeker-line">{portalShort}</a></div>
          <div>&copy; 2026 {SITE.legal}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
