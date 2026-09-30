import { useParams } from 'react-router-dom';
import { SERVICES, ROLES } from '../data/content';
import Seo, { ORG_SCHEMA, serviceSchema } from '../components/Seo';
import { CtaBand, Table, PageHead, Card, Tags, Prose } from '../components/Blocks';
import NotFound from './NotFound';

export function ServicesIndex() {
  return (
    <>
      <Seo title="Recruitment & Staffing Services | CoreTalents"
        desc="Recruitment, bulk hiring, language-specific sourcing, campus drives and job promotion across Tamil Nadu and Puducherry."
        path="services" schema={[ORG_SCHEMA]} />
      <PageHead art="hire" crumb={[{ label: 'Services' }]} title="Our services"
        lead="Recruitment paid only on joining, plus a flat-rate option for promoting your opening." />
      <section>
        <div className="wrap">
          <div className="cards cards-2">
            {SERVICES.map((s, i) => <Card key={s.slug} index={i} accent title={s.nav} text={s.desc} to={`/services/${s.slug}`} />)}
          </div>
        </div>
      </section>
      <CtaBand heading="Not sure which fits?" text="Send us the requirement and we will tell you which route makes sense." />
    </>
  );
}

function ServiceBlock({ heading, kind, data }) {
  return (
    <>
      <h2>{heading}</h2>
      {kind === 'list' && <ul className="check-list">{data.map((i) => <li key={i}>{i}</li>)}</ul>}
      {kind === 'table' && <Table rows={data} />}
      {kind === 'para' && <p>{data}</p>}
    </>
  );
}

export function ServicePage() {
  const { slug } = useParams();
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return <NotFound />;

  return (
    <>
      <Seo title={s.title} desc={s.desc} path={`services/${s.slug}`} schema={[ORG_SCHEMA, serviceSchema(s)]} />
      <PageHead crumb={[{ label: 'Services', to: '/services' }, { label: s.nav }]} title={s.h1} lead={s.lead} />
      <section>
        <Prose>
          {s.blocks.map(([heading, kind, data]) => <ServiceBlock key={heading} heading={heading} kind={kind} data={data} />)}
          <h2>Related roles we fill</h2>
          <Tags base="roles" items={ROLES} />
        </Prose>
      </section>
      <CtaBand heading={s.cta} text="Send us the details and we come back with firm rates within 24 hours." />
    </>
  );
}
