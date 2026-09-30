import { Link } from 'react-router-dom';
import Seo, { ORG_SCHEMA } from '../components/Seo';
import { CtaBand, Table, PageHead, Prose } from '../components/Blocks';

export default function Pricing() {
  return (
    <>
      <Seo title="Recruitment Agency Fees & Engagement Models | CoreTalents"
        desc="You pay only when a candidate joins. How our fee is calculated, standard commercial terms, and published job promotion rates."
        path="pricing" schema={[ORG_SCHEMA]} />
      <PageHead crumb={[{ label: 'Pricing' }]} title="What it costs to hire through us"
        lead="You pay only when a candidate joins. No fee for profiles, no fee for interviews, no retainer unless you specifically want one." />
      <section>
        <Prose>
          <h2>How the recruitment fee is calculated</h2>
          <Table rows={[
            ['Level', 'Salary range', 'How the fee works'],
            ['Entry level and volume', 'Up to Rs. 20,000 / month', "A percentage of one month's gross salary per joined candidate. The percentage drops at higher volume."],
            ['Mid level', 'Rs. 20,000 - 35,000 / month', 'A percentage of annual CTC'],
            ['Lateral and specialist', 'Above Rs. 35,000 / month', 'A percentage of annual CTC, higher band'],
            ['Language-specific, night shift, remote locations', 'Any', 'Upper end of the applicable band'],
            ['Campus drives and walk-in drive days', '-', 'Fixed fee per campus or per drive day'],
          ]} />
          <div className="callout callout-amber">
            <p><strong>Because the fee moves with the salary, the same rate card works everywhere we hire.</strong> A lower-salary role in Puducherry automatically costs less than the same role in Chennai. There is no separate metro pricing and no minimum mandate size.</p>
          </div>
          <p>Firm rates are confirmed in writing within 24 hours of your requirement, and recorded in a work order before any sourcing begins. Nothing starts until you have agreed the number.</p>

          <h2>What every fee includes</h2>
          <ul className="check-list">
            <li>Sourcing against criteria agreed in writing</li>
            <li>Language and skill screening, including a live call in the target language</li>
            <li>A profile pack with screening notes on each candidate</li>
            <li>Interview coordination, reminders and attendance follow-up</li>
            <li>Follow-up until the date of joining</li>
            <li>Replacement guarantee and post-joining check-ins</li>
          </ul>

          <h2>Standard commercial terms</h2>
          <Table rows={[
            ['Term', 'Standard'],
            ['Invoice trigger', 'Date of joining'],
            ['Credit period', '15 days from invoice date'],
            ['Volume mandates', '50% on joining, 50% at completion of 30 days'],
            ['Replacement guarantee', '30 days entry, 60 days mid, 90 days lateral. One replacement per position.'],
            ['GST', '18% extra'],
          ]} />

          <h2>Job promotion - published rates</h2>
          <p>Flat charges, paid in advance, no contract. Full detail on the <Link to="/services/job-promotion">job promotion page</Link>.</p>
          <Table rows={[
            ['Package', 'Fee'],
            ['Single job reel', 'Rs. 750'],
            ['Three job bundle', 'Rs. 1,800'],
            ['Walk-in drive promotion', 'Rs. 1,500'],
            ['Monthly hiring partner', 'Rs. 4,000 / month'],
          ]} />

          <h2>Free options</h2>
          <p>Our job portal is free for employers &mdash; post openings, receive applications, search profiles and manage hiring yourself. Empanelment with CoreTalents is also free and carries no obligation. See <Link to="/empanelment">empanelment</Link>.</p>
        </Prose>
      </section>
      <CtaBand heading="Send your requirement for firm rates"
        text="We come back in writing within 24 hours with the exact fee for your role, volume and location." />
    </>
  );
}
