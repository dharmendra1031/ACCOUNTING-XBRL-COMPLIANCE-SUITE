import { EmptyState, PageHeading, Surface } from "../../../components/ui/PreviewElements";
import type { Labels } from "../../../shared/i18n/translations";

export function AccountsPage({ t }: { t: Labels }) {
  return (
    <>
      <PageHeading title={t.accounts} subtitle={t.accountsDetail} preview={t.preview} />
      <div className="split-grid">
        <Surface title={t.accountList}>
          <EmptyState title={t.empty} description={t.accountEmpty} />
        </Surface>
        <Surface title={t.accountDetail}>
          <div className="readonly-field">
            <span className="field-label">{t.recordId}</span>
            <output>{t.recordIdHint}</output>
          </div>
          <EmptyState title={t.noSelection} description={t.accountEmpty} />
        </Surface>
      </div>
    </>
  );
}