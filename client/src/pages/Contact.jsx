import { SITE } from '../data/content';
import Seo, { ORG_SCHEMA, LOCAL_SCHEMA } from '../components/Seo';
import { PageHead } from '../components/Blocks';
import { RequirementForm } from '../components/Forms';
import { Phone } from '@phosphor-icons/react';
import { WhatsAppIcon } from '../components/Art';
import { waLink, portalShort } from '../lib/links';

export default function Contact() {
  return (
    <>
      <Seo title="Contact CoreTalents | Share Your Hiring Requirement"
        desc="Send your hiring requirement and get a written proposal with firm rates within 24 hours. WhatsApp, phone and email."
        path="contact" schema={[ORG_SCHEMA, LOCAL_SCHEMA]} />
      <PageHead art="contact-us" crumb={[{ label: 'Contact' }]} title="Tell us what you need to hire"
        lead="Send the role, positions, salary band, location and timeline. We come back with a written proposal and firm rates within 24 hours." />
      <section>
        <div className="wrap">
          <div className="form-grid">
            <div><RequirementForm /></div>
            <div className="form-side">
              <h3>Rather talk?</h3>
              <p><a className="btn btn-wa btn-block" href={waLink('contact')} data-context="contact-page"><WhatsAppIcon size={19} />WhatsApp us now</a></p>
              <p><a className="btn btn-outline btn-block" href={`tel:+${SITE.phoneRaw}`}><Phone size={17} aria-hidden="true" />Call {SITE.phone}</a></p>
              <p style={{ fontSize: '.92rem', color: 'var(--muted)' }}>{SITE.hours}</p>

              <h3>Office</h3>
              <p>{SITE.address}</p>
              <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>

              <h3>What happens next</h3>
              <ol style={{ fontSize: '.94rem' }}>
                <li>We read the requirement and come back within 24 hours with firm rates in writing</li>
                <li>You confirm, and we record it in a one-page work order</li>
                <li>Kick-off within 2 working days, first screened profiles within 72 hours</li>
              </ol>

              <div className="callout" style={{ marginTop: 22 }}>
                <p style={{ fontSize: '.92rem', margin: 0 }}><strong>Looking for a job?</strong> This page is for employers. Job seekers should visit <a href={SITE.portal}>{portalShort}</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
