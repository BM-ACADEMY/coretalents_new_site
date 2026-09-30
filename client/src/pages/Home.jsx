import { Link } from 'react-router-dom';
import { SERVICES, ROLES, LOCATIONS } from '../data/content';
import Seo, { ORG_SCHEMA, LOCAL_SCHEMA } from '../components/Seo';
import { ArrowRight } from '@phosphor-icons/react';
import { CtaBand, HeroProof, Table, ProcessGrid, ServiceStack, RowList, Tags } from '../components/Blocks';
import ScrollHero from '../components/ScrollHero';
import { Illustration } from '../components/Art';
import { Parallax, Marquee } from '../components/Motion';

export default function Home() {
  return (
    <>
      <Seo
        title="Recruitment & Staffing Agency in Puducherry & Chennai | CoreTalents"
        desc="Bulk hiring, language-specific recruitment and campus drives across Tamil Nadu. You pay only when a candidate joins. Free empanelment, no obligation."
        schema={[ORG_SCHEMA, LOCAL_SCHEMA]}
      />

      <ScrollHero />

      <section className="proof-strip">
        <div className="wrap"><HeroProof /></div>
      </section>

      <section className="ticker" aria-label="Roles and locations we hire for">
        <Marquee items={ROLES.map((r) => r.nav)} tone="yellow" tilt={-1.5} speed={3} />
        <Marquee items={LOCATIONS.map((l) => l.nav)} tone="navy" tilt={-1.5} speed={2.5} reverse />
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <h2>Why we are not another consultancy</h2>
            <p>Most consultancies do one thing: they forward resumes. We sit on three assets that most consultancies do not have.</p>
          </div>
          <Table rows={[
            ['What we have', 'What it gives you'],
            ['Our own job portal and a 12,700+ job seeker audience',
              'Candidate flow that does not depend on paid job boards, so volume mandates do not stall. Your opening is listed free on the portal and put in front of that audience directly.'],
            ['Our own academy - 1400+ trained, 150+ placed through BM Academy',
              'Job-ready candidates, and the option to have candidates trained on your specific stack or process before they join.'],
            ['Direct campus relationships across Tamil Nadu and Puducherry',
              'Final-year students before they reach the open market, and campus drives organised end to end.'],
          ]} />
          <p className="after-table">A skill gap becomes a training plan instead of a dead mandate.</p>
        </div>
      </section>

      <section className="soft">
        <div className="wrap">
          <div className="section-head">
            <h2>What we do</h2>
            <p>Five services. The first four are paid only on joining; the fifth is a flat-rate advertising option.</p>
          </div>
          <ServiceStack items={SERVICES} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <h2>What we hire for</h2>
            <p>Banking, BPO and engineering hiring, freshers and experienced, across South India.</p>
          </div>
          <RowList items={ROLES.map((r) => ({ title: r.nav, text: r.roles, to: `/roles/${r.slug}` }))} />
        </div>
      </section>

      <section className="soft">
        <div className="wrap">
          <div className="section-head"><h2>Which service fits you</h2></div>
          <Table rows={[
            ['If you are', 'Choose'],
            ['Filling 5 or more seats, or a role that must close on a deadline', 'Recruitment and staffing - you pay only on joining, so there is no cost if we do not deliver'],
            ['Struggling with a Telugu, Kannada, Malayalam or Hindi mandate', 'Language-specific hiring - sourced through community and border-district pools'],
            ['Hiring freshers in volume, or running a campus drive', 'Campus and fresher hiring'],
            ['Hiring one or two people and happy to screen them yourself', 'List free on our job portal, and add a job reel if you want it seen faster'],
            ['Hiring every month on a standing requirement', 'Talk to us about a monthly retainer'],
          ]} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <h2>How we work</h2>
            <p>Six stages from your requirement to the candidate's first day.</p>
          </div>
          <ProcessGrid />
          <p className="section-foot"><Link to="/how-we-work">See the full process, including what we need from you<ArrowRight size={16} weight="bold" aria-hidden="true" /></Link></p>
        </div>
      </section>

      <section className="soft">
        <div className="wrap">
          <div className="section-head"><h2>Why clients choose us</h2></div>
          <ul className="check-list check-grid">
            <li><strong>You pay on joining, not for profiles.</strong> No cost if we do not deliver. On volume mandates the fee splits across joining and day 30, so early attrition costs you less.</li>
            <li><strong>Language-specific sourcing.</strong> Telugu, Kannada, Malayalam and Hindi mandates in Tamil Nadu are the hardest to fill. We source through community and border-district pools rather than hoping a job board delivers.</li>
            <li><strong>Candidates are engaged, not just sent.</strong> Drop-off between offer and joining is the biggest hidden cost in bulk hiring. We stay in contact through the notice period and up to the joining date.</li>
            <li><strong>We can train what we cannot find.</strong> An academy behind the consultancy means a skill gap becomes a training plan.</li>
            <li><strong>Weekly reporting.</strong> Sourced, screened, shortlisted, interviewed, offered, joined. You always know where the mandate stands.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="coverage">
            <div>
              <h2>Where we hire</h2>
              <p><strong>Core coverage:</strong> Puducherry, Chennai, Cuddalore, Villupuram and across Tamil Nadu.</p>
              <p><strong>Extended:</strong> Bangalore and the Hosur-Krishnagiri-Dharmapuri belt for Kannada-speaking roles. Candidate sourcing reaches into the border districts of Andhra Pradesh and Karnataka for language-specific mandates.</p>
              <Tags base="locations" items={LOCATIONS} labelKey="city" />
            </div>
            <Parallax distance={40}><Illustration name="location-search" /></Parallax>
          </div>
        </div>
      </section>

      <CtaBand heading="Tell us what you need to hire"
        text="Send the role, number of positions, salary band, location, language and timeline. We come back with a written proposal and firm rates within 24 hours." />
    </>
  );
}
