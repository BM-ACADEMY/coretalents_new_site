import Seo, { ORG_SCHEMA } from '../components/Seo';
import { Table, PageHead } from '../components/Blocks';
import { EmpanelmentForm } from '../components/Forms';
import StepFlow from '../components/StepFlow';

export default function Empanelment() {
  return (
    <>
      <Seo title="Empanel CoreTalents as Your Recruitment Partner - Free, No Obligation"
        desc="Sign a free MoU with no cost and no obligation. Terms fixed in advance so a live requirement needs only a one-page work order."
        path="empanelment" schema={[ORG_SCHEMA]} />
      <PageHead art="agreement" crumb={[{ label: 'Empanelment' }]} title="Empanel us as a hiring partner — free, no obligation"
        lead="Most companies do not have a requirement the day they find a consultancy. Empanelment solves that. You sign a simple MoU at no cost, it commits you to nothing, and when a role does open you have a partner already set up rather than starting from scratch under time pressure." />
      <section>
        <div className="wrap">
          <div className="form-grid">
            <div>
              <h2 style={{ marginTop: 0 }}>What empanelment means</h2>
              <Table rows={[
                ['It does', 'It does not'],
                ['Record how we will work together if and when you place a requirement', 'Cost anything to sign'],
                ['Fix commercial and legal terms in advance, so a live requirement needs only a one-page work order', 'Oblige you to give us any requirement'],
                ['Give you a partner who already knows your salary bands and hiring pattern', 'Prevent you working with other consultancies'],
                ['Stay in force 12 months, renewing automatically', "Lock you in - either side can exit on 30 days' notice"],
              ]} />
              <h2>What is in the MoU</h2>
              <ul className="check-list">
                <li><strong>No fee to sign.</strong> Fees apply only when a candidate we introduce actually joins you.</li>
                <li><strong>Each requirement gets its own work order</strong> recording the role, positions, salary band, location, language, agreed fee and replacement period. That one-page work order is the only document that changes when a requirement changes.</li>
                <li><strong>Replacement guarantee</strong> of 30 to 90 days depending on role level, one replacement per position.</li>
                <li><strong>Profile ownership</strong> for 6 months from submission, so a candidate we introduce and you hire later is still a placement.</li>
                <li><strong>Confidentiality and data protection</strong> under the Digital Personal Data Protection Act, 2023. Candidate data is shared only for assessment and employment.</li>
                <li><strong>Non-exclusive</strong> &mdash; you are free to work with anyone else.</li>
                <li><strong>Governed by Indian law</strong>, disputes resolved first by discussion, then arbitration at Puducherry.</li>
              </ul>
            </div>
            <div className="form-side">
              <h3>Request the MoU</h3>
              <EmpanelmentForm />
            </div>
          </div>
        </div>
      </section>
      <section className="soft">
        <div className="wrap">
          <div className="section-head"><h2>How it works</h2></div>
          <StepFlow steps={[
            { art: 'fill-forms', text: 'Fill in the form with your company details' },
            { art: 'mail-sent', text: 'We send the MoU for review, along with our current rate card' },
            { art: 'contract-signed', text: 'You sign — digitally or in person, whichever you prefer' },
            { art: 'starting-work', text: 'When you have a requirement, one work order and we start within 2 working days' },
          ]} />
        </div>
      </section>
    </>
  );
}
