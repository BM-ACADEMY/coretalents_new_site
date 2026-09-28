import Seo, { ORG_SCHEMA } from '../components/Seo';
import { CtaBand, Table, PageHead, ProcessGrid } from '../components/Blocks';

export default function HowWeWork() {
  return (
    <>
      <Seo title="How Our Recruitment Process Works | CoreTalents"
        desc="Six stages from requirement to joining, weekly funnel reporting, and what we need from you for the timeline to hold."
        path="how-we-work" schema={[ORG_SCHEMA]} />
      <PageHead art="screening-resumes" crumb={[{ label: 'How we work' }]} title="How we work"
        lead="Most consultancies go quiet after they send resumes. This page sets out exactly what happens at each stage, what we commit to, and what we need from you for it to hold." />
      <section>
        <div className="wrap narrow">
          <h2>The six stages</h2>
          <ProcessGrid />
          <h2>What you see every week</h2>
          <p>A funnel report per requirement: sourced, screened, shortlisted, interviewed, offered, joined. Numbers, not adjectives. If a mandate is not moving, the report shows where it is stuck before you have to ask.</p>
          <Table rows={[
            ['Funnel stage', 'What it means'],
            ['Sourced', 'Candidates identified against the brief'],
            ['Screened', 'Spoken to and assessed on role fit, language, location, salary and notice'],
            ['Shortlisted', 'Profile pack sent to you with screening notes'],
            ['Interviewed', 'Attended your interview'],
            ['Offered', 'Offer released by you'],
            ['Joined', 'Reported to work - the only stage that triggers an invoice'],
          ]} />
          <h2>What we need from you</h2>
          <p>Three things decide whether a mandate closes in two weeks or two months.</p>
          <ol>
            <li><strong>Accurate salary information.</strong> The fixed component, any incentive, shift and statutory benefits. We tell candidates only what you have stated, which is why what you state has to be right.</li>
            <li><strong>Interview feedback within 48 hours</strong>, and interview slots confirmed within 5 working days of a shortlist.</li>
            <li><strong>A single point of contact</strong> for each requirement.</li>
          </ol>
          <div className="callout">
            <p>Where feedback or slots are delayed, delivery timelines extend by the same period. This is in our MoU and we say it here too, because it is the single most common reason a mandate drifts.</p>
          </div>
          <h2>Why the first batch is small</h2>
          <p>We deliberately send a small first batch within 72 hours rather than a large one in week two. The point is to confirm we have read the requirement the way you meant it. Correcting the brief on three profiles costs a day. Correcting it on thirty costs two weeks.</p>
          <h2>Replacement guarantee</h2>
          <Table rows={[
            ['Role level', 'Guarantee period'],
            ['Entry level', '30 days from joining'],
            ['Mid level', '60 days from joining'],
            ['Lateral and specialist', '90 days from joining'],
          ]} />
          <p>One replacement per position. The guarantee applies where the candidate resigns or is found unsuitable within the period, and we ask to be notified within 7 days of the exit so we can start sourcing the replacement immediately.</p>
        </div>
      </section>
      <CtaBand heading="Ready to start?" text="Kick-off within 2 working days of a signed work order, first screened profiles within 72 hours." />
    </>
  );
}
