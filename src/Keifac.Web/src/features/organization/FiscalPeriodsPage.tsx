import { EmptyState, PageHeading, Surface } from "../../components/ui/PreviewElements";
import { RecordIdField } from "../../components/ui/RecordIdField";
import type { Labels } from "../../shared/i18n/translations";

export function FiscalPeriodsPage({ t }: { t: Labels }) {
  return (
    <>
      <PageHeading title={t.periods} subtitle={t.fiscalPreviewDescription} preview={t.preview} />
      <div className="split-grid">
        <Surface title={t.fiscalPeriodList}>
          <EmptyState title={t.empty} description={t.noFiscalPeriods} />
        </Surface>
        <Surface title={t.fiscalPeriodDetails}>
          <form className="preview-form" onSubmit={(event) => event.preventDefault()}>
            <div className="form-grid">
              <RecordIdField t={t} />
              <div className="form-field">
                <label htmlFor="fiscal-year">{t.fiscalYear}</label>
                <input id="fiscal-year" name="fiscalYear" maxLength={40} />
              </div>
              <div className="form-field">
                <label htmlFor="period-start">{t.periodStart}</label>
                <input id="period-start" name="periodStart" type="date" />
              </div>
              <div className="form-field">
                <label htmlFor="period-end">{t.periodEnd}</label>
                <input id="period-end" name="periodEnd" type="date" />
              </div>
              <div className="form-field">
                <label htmlFor="fiscal-currency">{t.baseCurrency}</label>
                <input id="fiscal-currency" readOnly value={t.notConfigured} />
              </div>
              <div className="form-field">
                <label htmlFor="period-status">{t.periodStatus}</label>
                <input id="period-status" readOnly value={t.notConfigured} />
              </div>
            </div>
            <div className="form-footer">
              <p className="preview-note">{t.unsavedPreview}</p>
              <button className="reset-button" type="reset">{t.clearPreview}</button>
            </div>
          </form>
        </Surface>
      </div>
    </>
  );
}
