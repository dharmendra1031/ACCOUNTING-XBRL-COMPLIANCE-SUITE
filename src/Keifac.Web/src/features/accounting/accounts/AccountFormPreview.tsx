import { useState, type FormEvent } from "react";
import type { Labels } from "../../../shared/i18n/translations";
import { RecordIdField } from "../../../components/ui/RecordIdField";
import { firstMissingAccountField } from "./accountPreviewValidation";

export function AccountFormPreview({ t }: { t: Labels }) {
  const [checked, setChecked] = useState<"idle" | "passed" | "missing">("idle");

  function checkFields(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = firstMissingAccountField(new FormData(event.currentTarget));
    setChecked(missing ? "missing" : "passed");

    if (missing) {
      const field = event.currentTarget.elements.namedItem(missing);
      if (field instanceof HTMLElement) field.focus();
    }
  }

  return (
    <form
      className="preview-form"
      noValidate
      onSubmit={checkFields}
      onChange={() => setChecked("idle")}
      onReset={() => setChecked("idle")}
    >
      <div className="form-grid">
        <RecordIdField t={t} />
        <div className="form-field">
          <label htmlFor="account-code">{t.accountCode} *</label>
          <input id="account-code" name="code" dir="ltr" maxLength={40} required autoComplete="off" />
        </div>
        <div className="form-field">
          <label htmlFor="account-name">{t.accountName} *</label>
          <input id="account-name" name="name" maxLength={160} required autoComplete="off" />
        </div>
        <div className="form-field">
          <label htmlFor="account-name-ar">{t.accountArabic}</label>
          <input id="account-name-ar" name="arabicName" lang="ar" dir="rtl" maxLength={160} autoComplete="off" />
        </div>
        <div className="form-field">
          <label htmlFor="account-type">{t.accountType} *</label>
          <select id="account-type" name="type" defaultValue="" required>
            <option value="" disabled>{t.chooseType}</option>
            <option value="Asset">{t.asset}</option>
            <option value="Liability">{t.liability}</option>
            <option value="Equity">{t.equity}</option>
            <option value="Revenue">{t.revenue}</option>
            <option value="Expense">{t.expense}</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="normal-balance">{t.normalBalance} *</label>
          <select id="normal-balance" name="normalBalance" defaultValue="" required>
            <option value="" disabled>{t.chooseBalance}</option>
            <option value="Debit">{t.debitSide}</option>
            <option value="Credit">{t.creditSide}</option>
          </select>
        </div>
      </div>
      <div className="form-footer">
        <p className="preview-note" role="status" aria-live="polite">
          {checked === "passed" ? t.previewChecked : checked === "missing" ? t.previewRequired : t.unsavedPreview}
        </p>
        <div className="form-actions">
          <button className="check-button" type="submit">{t.checkFields}</button>
          <button className="reset-button" type="reset">{t.clearPreview}</button>
        </div>
      </div>
    </form>
  );
}
