import { SITE } from '../data/content';
import Seo, { ORG_SCHEMA, LOCAL_SCHEMA } from '../components/Seo';
import { CtaBand, Table, PageHead, Prose } from '../components/Blocks';

export default function About() {
  return (
    <>
      <Seo title="About Us: Recruitment Agency in Puducherry | CoreTalents"
        desc="CoreTalents is a recruitment and staffing agency based in Puducherry, serving employers across Tamil Nadu. Learn how we work and talk to our team today."
        path="about" schema={[ORG_SCHEMA, LOCAL_SCHEMA]} />
      <PageHead art="meet-the-team" crumb={[{ label: 'About' }]} title="About CoreTalents"
        lead={`The recruitment and staffing division of ${SITE.legal}, based in Puducherry.`} />
      <section>
        <Prose>
          {/* TODO (founder, in their own words):
              1. "Why we exist": why an academy, a job portal and a consultancy under one roof, what
                 they saw in the market that made them start, who they built it for.
              2. A short bio under "The founder": background, why recruitment, what they handle personally. */}
          <h2>The founder</h2>
          <p><strong>Kamarudeen B</strong>, Founder.</p>

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
            ['Detail', 'Registered as'],
            ['Legal name', SITE.legal],
            ['CIN', SITE.cin],
            ['GSTIN', SITE.gstin],
            ['Registered office', SITE.address],
          ]} />
        </Prose>
      </section>
      <CtaBand heading="Work with us" text="Send a requirement, or empanel free and we will be ready when you have one." />
    </>
  );
}
