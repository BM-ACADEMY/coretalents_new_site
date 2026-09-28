import { SITE } from '../data/content';
import Seo from '../components/Seo';
import { PageHead } from '../components/Blocks';

export function Privacy() {
  const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;
  return (
    <>
      <Seo title="Privacy Policy | CoreTalents"
        desc="How CoreTalents collects, uses and protects personal data under the Digital Personal Data Protection Act, 2023."
        path="privacy" />
      <PageHead crumb={[{ label: 'Privacy policy' }]} title="Privacy policy"
        lead="How we collect, use and protect personal data, in line with the Digital Personal Data Protection Act, 2023." />
      <section>
        <div className="wrap narrow">
          <div className="callout"><p><strong>Review before launch.</strong> This is a working draft covering the standard position. Have it checked against your actual data handling before the site goes live.</p></div>

          <h2>Who we are</h2>
          <p>CoreTalents is the recruitment division of {SITE.legal}, {SITE.address}. For any privacy question, contact {mail}.</p>

          <h2>What we collect</h2>
          <p><strong>From employers:</strong> company name, contact name and designation, phone, email, city, industry and the details of the roles you are hiring for.</p>
          <p><strong>From candidates:</strong> name, contact details, qualification, work history, salary expectation, location and language ability, supplied by the candidate or from a CV they have shared with us.</p>
          <p><strong>Automatically:</strong> standard web analytics &mdash; pages visited, approximate location, device and referring source.</p>

          <h2>Why we use it</h2>
          <ul>
            <li>To respond to your hiring enquiry and deliver recruitment services</li>
            <li>To assess candidates against a client requirement and share relevant profiles with that client</li>
            <li>To contact you about a requirement you have raised with us</li>
            <li>To meet our legal, tax and contractual obligations</li>
          </ul>

          <h2>Who we share it with</h2>
          <p>Candidate data is shared only with the client company for whose requirement the candidate is being assessed, and only for assessment and employment. We do not sell personal data to anyone, and we do not share your enquiry with other companies.</p>

          <h2>How long we keep it</h2>
          <p>Enquiry and client records are kept for the duration of the engagement and for as long as required for tax and legal purposes. Candidate data from closed mandates is reviewed and deleted after 12 months unless there is a live reason to retain it.</p>

          <h2>Your rights</h2>
          <p>You may ask us what personal data we hold about you, ask for it to be corrected, or ask for it to be deleted. Email {mail} and we will respond within a reasonable period.</p>

          <h2>Cookies</h2>
          <p>We use analytics cookies to understand which pages are useful. You can block these in your browser without affecting your ability to use the site.</p>

          <h2>Changes</h2>
          <p>We may update this policy. The current version is always the one on this page.</p>
        </div>
      </section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <Seo title="Terms of Use | CoreTalents"
        desc="Terms governing use of the CoreTalents website. Recruitment services are governed by our MoU and work orders."
        path="terms" />
      <PageHead crumb={[{ label: 'Terms' }]} title="Terms of use"
        lead="Terms governing use of this website. Recruitment services are governed separately by our MoU and work orders." />
      <section>
        <div className="wrap narrow">
          <div className="callout"><p><strong>Review before launch.</strong> This is a working draft. Have it checked alongside your MoU so the two do not contradict each other.</p></div>

          <h2>About this site</h2>
          <p>This website is operated by {SITE.legal} ({SITE.address}) under the brand CoreTalents.</p>

          <h2>Information on this site</h2>
          <p>Content here is for general information. Salary ranges, timelines and indicative figures describe what we typically see and are not a guarantee of any particular outcome. Nothing on this site is an offer capable of acceptance.</p>

          <h2>Fees and services</h2>
          <p>Recruitment fees, delivery timelines and replacement guarantees are governed by the signed Memorandum of Understanding and the work order for each requirement, not by this website. Where this site and a signed document differ, the signed document applies.</p>

          <h2>Submitting a requirement</h2>
          <p>Submitting a form does not create a contract. We will respond with a written proposal, and work begins only once a work order is agreed.</p>

          <h2>Job promotion services</h2>
          <p>Promotion packages cover visibility and direct applications to you. Reach and number of applications vary and are not guaranteed. Candidates under these packages are not screened and no replacement applies.</p>

          <h2>Intellectual property</h2>
          <p>The content, layout and branding of this site belong to {SITE.legal}. Do not reproduce it without permission.</p>

          <h2>Liability</h2>
          <p>We take care to keep this site accurate but do not accept liability for loss arising from reliance on general information published here. Our liability in connection with recruitment services is as set out in the MoU.</p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India. Disputes are subject to the jurisdiction of courts at Puducherry.</p>
        </div>
      </section>
    </>
  );
}
