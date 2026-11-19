import { EmptyState, PageHeading, Surface } from "../../../components/ui/PreviewElements";
import { AccountFormPreview } from "./AccountFormPreview";
import type { Labels } from "../../../shared/i18n/translations";

export function AccountsPage({ t }: { t: Labels }) {
  return (
    <>
      <PageHeading title={t.accounts} subtitle={t.accountsDetail} preview={t.preview} />
      <div className="split-grid">
        <Surface title={t.accountList}>
          <EmptyState title={t.empty} description={t.accountEmpty} />
        </Surface>
        <Surface title={t.formPreview}>
          <AccountFormPreview t={t} />
        </Surface>
      </div>
    </>
  );
}
