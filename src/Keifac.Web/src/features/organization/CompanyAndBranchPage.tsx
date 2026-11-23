import { PageHeading, Surface } from "../../components/ui/PreviewElements";
import { RecordIdField } from "../../components/ui/RecordIdField";
import type { Labels } from "../../shared/i18n/translations";

export function CompanyAndBranchPage({ t }: { t: Labels }) {
  return (
    <>
      <PageHeading title={t.organization} subtitle={t.companyAdminPreview} preview={t.preview} />
      <div className="split-grid">
        <Surface title={t.companyDetails}>
          <form className="preview-form" onSubmit={(event) => event.preventDefault()}>
            <div className="form-grid">
              <RecordIdField t={t} />
              <div className="form-field">
                <label htmlFor="company-name-en">{t.legalNameEn}</label>
                <input id="company-name-en" name="legalName" maxLength={200} autoComplete="organization" />
              </div>
              <div className="form-field">
                <label htmlFor="company-name-ar">{t.legalNameAr}</label>
                <input id="company-name-ar" name="legalNameAr" lang="ar" dir="rtl" maxLength={200} />
              </div>
              <div className="form-field">
                <label htmlFor="registration-number">{t.registrationNo}</label>
                <input id="registration-number" name="registrationNo" dir="ltr" maxLength={60} />
              </div>
              <div className="form-field">
                <label htmlFor="jurisdiction">{t.jurisdiction}</label>
                <select id="jurisdiction" name="jurisdiction" defaultValue="">
                  <option value="">{t.notConfigured}</option>
                  <option value="KW">{t.kuwait}</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="company-currency">{t.baseCurrency}</label>
                <input id="company-currency" readOnly value={t.configuredAtActivation} />
              </div>
              <div className="form-field full-span">
                <label htmlFor="company-address">{t.legalAddress}</label>
                <textarea id="company-address" name="address" rows={2} maxLength={500} />
              </div>
            </div>
            <div className="form-footer">
              <p className="preview-note">{t.unsavedPreview}</p>
              <button className="reset-button" type="reset">{t.clearPreview}</button>
            </div>
          </form>
        </Surface>

        <Surface title={t.branchDetails}>
          <p className="preview-note section-note">{t.branchContextUnavailable}</p>
          <form className="preview-form" onSubmit={(event) => event.preventDefault()}>
            <div className="form-grid">
              <RecordIdField t={t} />
              <div className="form-field">
                <label htmlFor="branch-code">{t.branchCode}</label>
                <input id="branch-code" name="branchCode" dir="ltr" maxLength={40} />
              </div>
              <div className="form-field">
                <label htmlFor="branch-name-en">{t.branchNameEn}</label>
                <input id="branch-name-en" name="branchNameEn" maxLength={160} />
              </div>
              <div className="form-field">
                <label htmlFor="branch-name-ar">{t.branchNameAr}</label>
                <input id="branch-name-ar" name="branchNameAr" lang="ar" dir="rtl" maxLength={160} />
              </div>
              <div className="form-field full-span">
                <label htmlFor="branch-address">{t.branchAddress}</label>
                <textarea id="branch-address" name="branchAddress" rows={2} maxLength={500} />
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
