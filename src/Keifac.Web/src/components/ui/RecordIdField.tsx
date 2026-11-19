import type { Labels } from "../../shared/i18n/translations";

// Preview: a SQL-generated numeric ID is not reserved before a real save.
export function RecordIdField({ t }: { t: Labels }) {
  return (
    <div className="readonly-field">
      <span className="field-label">{t.recordId}</span>
      <span className="readonly-value">{t.recordIdHint}</span>
    </div>
  );
}
