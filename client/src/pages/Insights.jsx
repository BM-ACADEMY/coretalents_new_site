import { Link, useParams } from 'react-router-dom';
import { ARTICLES } from '../data/content';
import Seo, { ORG_SCHEMA, articleSchema } from '../components/Seo';
import { CtaBand, PageHead, Prose } from '../components/Blocks';
import { ARTICLE_BODIES } from './articles';
import NotFound from './NotFound';

export function InsightsIndex() {
  return (
    <>
      <Seo title="Hiring Insights & Salary Benchmarks, India | CoreTalents"
        desc="Recruitment fees, salary benchmarks, walk-in drive costs and offer drop-off, written for employers hiring in Tamil Nadu. Read our latest hiring insights."
        path="insights" schema={[ORG_SCHEMA]} />
      <PageHead art="researching" crumb={[{ label: 'Insights' }]} title="Insights"
        lead="Hiring costs, salary benchmarks and what actually makes a mandate close. Written for the person doing the hiring." />
      <section>
        <div className="wrap narrow">
          {ARTICLES.map((a) => (
            <div className="post" key={a.slug}>
              <h3><Link to={`/insights/${a.slug}`}>{a.title}</Link></h3>
              <p>{a.desc}</p>
              <div className="meta">{a.published ? formatDate(a.published) : 'Coming soon'}</div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand heading="Have a hiring problem we should write about?" text="Tell us. The useful articles come from real mandates." />
    </>
  );
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function ArticlePage() {
  const { slug } = useParams();
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return <NotFound />;
  const Body = ARTICLE_BODIES[a.slug];

  if (Body) {
    return (
      <>
        <Seo title={a.seoTitle} desc={a.metaDesc} path={`insights/${a.slug}`} schema={[ORG_SCHEMA, articleSchema(a)]} />
        <PageHead crumb={[{ label: 'Insights', to: '/insights' }, { label: a.title }]} title={a.title} lead={a.desc} />
        <section>
          <Prose>
            <p className="article-meta">By the CoreTalents team &middot; <time dateTime={a.published}>{formatDate(a.published)}</time></p>
            <Body />
          </Prose>
        </section>
        <CtaBand heading="Planning your post-festival hiring?" text="Send us the requirement and get a written proposal within 24 hours." />
      </>
    );
  }

  return (
    <>
      <Seo title={a.seoTitle || `${a.title} | CoreTalents`} desc={a.metaDesc || a.desc} path={`insights/${a.slug}`} schema={[ORG_SCHEMA]} />
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
