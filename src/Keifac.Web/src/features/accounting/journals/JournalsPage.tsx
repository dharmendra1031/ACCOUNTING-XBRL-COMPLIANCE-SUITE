import { EmptyState, PageHeading, Surface } from "../../../components/ui/PreviewElements";
import { RecordIdField } from "../../../components/ui/RecordIdField";
import type { Labels } from "../../../shared/i18n/translations";

export function JournalsPage({ t }: { t: Labels }) {
  return (
    <>
      <PageHeading title={t.journals} subtitle={t.journalsDetail} preview={t.preview} />
      <Surface title={t.journalHeader}>
        <div className="detail-grid">
          <RecordIdField t={t} />
          <div className="readonly-field">
            <span className="field-label">{t.voucherNo}</span>
            <span className="readonly-value">{t.assignedOnIssue}</span>
          </div>
        </div>
      </Surface>
      <Surface title={t.journalLines}>
        <div className="table-scroll" role="region" aria-label={t.journalLines} tabIndex={0}>
          <table>
            <thead><tr><th>{t.account}</th><th className="amount">{t.debit}</th><th className="amount">{t.credit}</th></tr></thead>
            <tbody />
          </table>
        </div>
        <EmptyState title={t.empty} description={t.journalEmpty} />
        <div className="ledger-footer"><span>{t.difference}</span><strong>{t.noAmount}</strong></div>
      </Surface>
    </>
  );
}