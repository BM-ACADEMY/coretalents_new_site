import { Link, useParams } from 'react-router-dom';
import { ARTICLES } from '../data/content';
import Seo, { ORG_SCHEMA } from '../components/Seo';
import { CtaBand, PageHead } from '../components/Blocks';
import NotFound from './NotFound';

export function InsightsIndex() {
  return (
    <>
      <Seo title="Hiring Insights & Salary Benchmarks | CoreTalents"
        desc="Recruitment fees, salary benchmarks, drive costs and offer drop-off - written for employers hiring in Tamil Nadu."
        path="insights" schema={[ORG_SCHEMA]} />
      <PageHead art="researching" crumb={[{ label: 'Insights' }]} title="Insights"
        lead="Hiring costs, salary benchmarks and what actually makes a mandate close. Written for the person doing the hiring." />
      <section>
        <div className="wrap narrow">
          {ARTICLES.map((a) => (
            <div className="post" key={a.slug}>
              <h3><Link to={`/insights/${a.slug}`}>{a.title}</Link></h3>
              <p>{a.desc}</p>
              <div className="meta">Coming soon</div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand heading="Have a hiring problem we should write about?" text="Tell us. The useful articles come from real mandates." />
    </>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return <NotFound />;

  return (
    <>
      <Seo title={`${a.title} | CoreTalents`} desc={a.desc} path={`insights/${a.slug}`} schema={[ORG_SCHEMA]} />
      <PageHead crumb={[{ label: 'Insights', to: '/insights' }, { label: a.title }]} title={a.title} lead={a.desc} />
      <section>
        <div className="wrap narrow">
          <div className="callout callout-amber">
            <p><strong>Article to be written.</strong> The outline and angle are in the SEO playbook. Write it from your own closed mandates &mdash; the real numbers are what will make this rank and convert.</p>
          </div>
          <p>Meanwhile, see <Link to={a.link}>the related service page</Link>.</p>
        </div>
      </section>
      <CtaBand heading="Hiring right now?" text="Send us the requirement and skip the reading." />
    </>
  );
}
