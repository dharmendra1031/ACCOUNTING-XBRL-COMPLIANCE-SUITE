import { EmptyState, PageHeading, Surface } from "../../../components/ui/PreviewElements";
import type { Labels } from "../../../shared/i18n/translations";

export function JournalsPage({ t }: { t: Labels }) {
  return (
    <>
      <PageHeading title={t.journals} subtitle={t.journalsDetail} preview={t.preview} />
      <Surface title={t.journalHeader}>
        <div className="detail-grid">
          <div className="readonly-field"><span className="field-label">{t.recordId}</span><output>{t.recordIdHint}</output></div>
          <div className="readonly-field"><span className="field-label">{t.voucherNo}</span><output>{t.assignedOnIssue}</output></div>
        </div>
      </Surface>
      <Surface title={t.journalLines}>
        <div className="table-scroll">
          <table>
            <thead><tr><th>{t.account}</th><th className="amount">{t.debit}</th><th className="amount">{t.credit}</th></tr></thead>
            <tbody><tr><td colSpan={3}><EmptyState title={t.empty} description={t.journalEmpty} /></td></tr></tbody>
          </table>
        </div>
        <div className="ledger-footer"><span>{t.difference}</span><strong>{t.noAmount}</strong></div>
      </Surface>
    </>
  );
}