import { Link } from 'react-router-dom';
import { SITE } from '../data/content';
import Seo from '../components/Seo';
import { PageHead } from '../components/Blocks';
import { portalShort } from '../lib/links';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | CoreTalents" desc="That page does not exist, or it has moved." noindex />
      <PageHead art="searching" title="Page not found" lead="That page does not exist, or it has moved." />
      <section>
        <div className="wrap narrow">
          <h2>Try one of these</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Our services</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/contact">Share a hiring requirement</Link></li>
            <li><Link to="/empanelment">Empanel free</Link></li>
          </ul>
          <p>Looking for a job? Visit <a href={SITE.portal}>{portalShort}</a>.</p>
        </div>
      </section>
    </>
  );
}
