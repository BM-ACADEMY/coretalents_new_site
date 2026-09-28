import { useParams } from 'react-router-dom';
import { ROLES, LOCATIONS } from '../data/content';
import Seo, { ORG_SCHEMA, LOCAL_SCHEMA } from '../components/Seo';
import { CtaBand, PageHead, Card, Tags } from '../components/Blocks';
import NotFound from './NotFound';

// Each location page must carry genuinely local content (see DEV-GUIDE section 7).
// Never duplicate an entry in LOCATIONS and just swap the city name.

export function LocationsIndex() {
  return (
    <>
      <Seo title="Where We Hire | Recruitment Across Tamil Nadu | CoreTalents"
        desc="Recruitment and staffing across Puducherry, Chennai, Villupuram, Cuddalore and the Hosur belt."
        path="locations" schema={[ORG_SCHEMA]} />
      <PageHead art="location-search" crumb={[{ label: 'Locations' }]} title="Where we hire"
        lead="Core coverage across Tamil Nadu and Puducherry, with a Kannada sourcing corridor into the Hosur belt." />
      <section>
        <div className="wrap">
          <div className="cards cards-2">
            {LOCATIONS.map((l) => <Card key={l.slug} title={l.city} text={l.desc} to={`/locations/${l.slug}`} />)}
          </div>
        </div>
      </section>
      <CtaBand heading="Hiring somewhere else?" text="Ask us. If we cannot cover it properly we will say so." />
    </>
  );
}

export function LocationPage() {
  const { slug } = useParams();
  const l = LOCATIONS.find((x) => x.slug === slug);
  if (!l) return <NotFound />;

  const schema = l.slug === 'puducherry' ? [ORG_SCHEMA, LOCAL_SCHEMA] : [ORG_SCHEMA];
  return (
    <>
      <Seo title={l.title} desc={l.desc} path={`locations/${l.slug}`} schema={schema} />
      <PageHead crumb={[{ label: 'Locations', to: '/locations' }, { label: l.nav }]} title={l.h1} lead={l.lead} />
      <section>
        <div className="wrap narrow">
          <h2>Who hires in {l.city}</h2>
          <p>{l.industry}</p>
          <h2>Salary reality in this market</h2>
          <p>{l.salary}</p>
          <h2>Where we source for {l.city}</h2>
          <p>{l.sourcing}</p>
          <h2>Working with us here</h2>
          <p>{l.proof}</p>
          <h2>Roles we fill most often here</h2>
          <Tags base="roles" items={ROLES} />
        </div>
      </section>
      <CtaBand heading={`Hiring in ${l.city}?`}
        text="Send us the requirement. Firm rates within 24 hours and kick-off within 2 working days." />
    </>
  );
}
