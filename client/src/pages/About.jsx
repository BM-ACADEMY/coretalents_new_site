import { SITE } from '../data/content';
import Seo, { ORG_SCHEMA, LOCAL_SCHEMA } from '../components/Seo';
import { CtaBand, Table, PageHead } from '../components/Blocks';

export default function About() {
  return (
    <>
      <Seo title={`About CoreTalents | Recruitment Division of ${SITE.legal}`}
        desc={`CoreTalents is the recruitment and staffing division of ${SITE.legal}, based in Puducherry, with a training academy and job portal behind it.`}
        path="about" schema={[ORG_SCHEMA, LOCAL_SCHEMA]} />
      <PageHead art="meet-the-team" crumb={[{ label: 'About' }]} title="About CoreTalents"
        lead={`The recruitment and staffing division of ${SITE.legal}, based in Puducherry.`} />
      <section>
        <div className="wrap narrow">
          <h2>Why we exist</h2>
          <div className="callout callout-amber">
            <p><strong>To be written in the founder's own words.</strong> This is the paragraph people remember, and it should not be written by anyone else. Cover: why an academy, a job portal and a consultancy under one roof solves something a standalone consultancy cannot; what you saw in the market that made you start; who you built it for.</p>
          </div>

          <h2>The founder</h2>
          <p><strong>Kamarudeen B</strong>, Founder. [Short bio to be added &mdash; background, why recruitment, what you handle personally.] Corporate buyers want a named person accountable for their mandate, so this section matters more than it looks.</p>

          <h2>The wider group</h2>
          <Table rows={[
            ['Arm', 'What it does'],
            ['CoreTalents', 'Recruitment, staffing and company tie-ups'],
            ['BM Academy', 'Training - 1400+ trained, 150+ placed'],
            ['Our job portal', 'Free job listings and applications for seekers and employers'],
          ]} />
          <p>Candidates move between these. Someone who trains at the academy can be placed through CoreTalents; an opening we take on gets listed on the portal the same day. That is the loop most consultancies do not have.</p>

          <h2>Where we are</h2>
          <p>{SITE.address}<br />{SITE.hours}</p>
          <p>Being in Puducherry rather than Chennai means a local employer can sit across a table with the person handling their mandate. It also keeps our cost structure lower than a metro consultancy, which shows up in what we charge.</p>

          <h2>Registered entity</h2>
          <Table rows={[
            ['Legal name', SITE.legal],
            ['CIN', SITE.cin],
            ['GSTIN', SITE.gstin],
            ['Registered office', SITE.address],
          ]} />
        </div>
      </section>
      <CtaBand heading="Work with us" text="Send a requirement, or empanel free and we will be ready when you have one." />
    </>
  );
}
