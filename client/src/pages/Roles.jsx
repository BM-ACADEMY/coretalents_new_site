import { useParams } from 'react-router-dom';
import { ROLES, LOCATIONS } from '../data/content';
import Seo, { ORG_SCHEMA } from '../components/Seo';
import { CtaBand, PageHead, Card, Tags } from '../components/Blocks';
import NotFound from './NotFound';

export function RolesIndex() {
  return (
    <>
      <Seo title="Roles We Recruit For | CoreTalents"
        desc="Voice and back office, IT, sales, digital and support roles recruited across Tamil Nadu and Puducherry."
        path="roles" schema={[ORG_SCHEMA]} />
      <PageHead art="people-search" crumb={[{ label: 'Roles' }]} title="Roles we hire for"
        lead="Freshers and experienced, across South India." />
      <section>
        <div className="wrap">
          <div className="cards cards-2">
            {ROLES.map((r) => <Card key={r.slug} title={r.nav} text={r.roles} to={`/roles/${r.slug}`} />)}
          </div>
        </div>
      </section>
      <CtaBand heading="Role not listed?" text="Tell us what you need. We fill more categories than we list here." />
    </>
  );
}

export function RolePage() {
  const { slug } = useParams();
  const r = ROLES.find((x) => x.slug === slug);
  if (!r) return <NotFound />;

  return (
    <>
      <Seo title={r.title} desc={r.desc} path={`roles/${r.slug}`} schema={[ORG_SCHEMA]} />
      <PageHead crumb={[{ label: 'Roles', to: '/roles' }, { label: r.nav }]} title={r.h1} lead={r.lead} />
      <section>
        <div className="wrap narrow">
          <h2>Roles we fill</h2>
          <p>{r.roles}</p>
          <h2>What we screen for</h2>
          <p>{r.screen}</p>
          <h2>Typical closure timeline</h2>
          <p>{r.closure}</p>
          <h2>Salary bands</h2>
          <div className="callout callout-amber">
            <p><strong>To be published.</strong> We are compiling salary ranges for this category from our own closed mandates in Chennai and Puducherry, and will publish them here with the quarter they apply to. Ask us for current bands in the meantime &mdash; we will send what we are actually seeing.</p>
          </div>
          <h2>Where we hire for this</h2>
          <Tags base="locations" items={LOCATIONS} labelKey="city" />
        </div>
      </section>
      <CtaBand heading="Hiring for this category?"
        text="Send the role and salary band. Firm rates within 24 hours, first profiles within 72 hours." />
    </>
  );
}
