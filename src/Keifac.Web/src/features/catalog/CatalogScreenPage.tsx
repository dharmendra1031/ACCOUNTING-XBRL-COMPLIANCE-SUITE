import { useState } from "react";
import { NavLink } from "react-router";
import { EmptyState, PageHeading, Surface } from "../../components/ui/PreviewElements";
import { RecordIdField } from "../../components/ui/RecordIdField";
import type { Labels, Language } from "../../shared/i18n/translations";
import type { CatalogScreen, Localized } from "./screenCatalog";

type Props = { screen: CatalogScreen; t: Labels; language: Language };

function localized(value: Localized, language: Language): string {
  return value[language];
}

function ScreenFields({ screen, t, language, selectedStep }: Props & { selectedStep: number }) {
  const isWizard = screen.layout === "wizard";
  const displayed = isWizard ? [screen.fields[selectedStep]] : screen.fields;
  return (
    <form
      className="catalog-form"
      onSubmit={(event) => event.preventDefault()}
      autoComplete="off"
    >
      <div className="form-grid">
        {screen.entity && <RecordIdField t={t} />}
        {displayed.map((field, fieldIndex) => {
          const index = isWizard ? selectedStep : fieldIndex;
          const id = `${screen.id.toLowerCase()}-field-${index}`;
          const label = localized(field, language);
          return (
            <div className="form-field" key={id}>
              <label htmlFor={id}>{label}</label>
              {field.kind === "readonly" || field.kind === "reference" ? (
                <input id={id} readOnly value={t.unavailable} aria-label={label} />
              ) : field.kind === "textarea" ? (
                <textarea id={id} rows={2} maxLength={1000} />
              ) : field.kind === "date" ? (
                <input id={id} type="date" />
              ) : field.kind === "decimal" ? (
                <input id={id} type="text" inputMode="decimal" dir="ltr" maxLength={32} />
              ) : (
                <input id={id} type="text" maxLength={160} />
              )}
            </div>
          );
        })}
      </div>
      <div className="form-footer">
        <p className="preview-note">{t.unsavedPreview}</p>
        <button type="reset" className="reset-button">{t.clearPreview}</button>
      </div>
    </form>
  );
}

function DataGrid({ screen, t, language }: Props) {
  return (
    <Surface title={t.catalogResults}>
      <div className="table-scroll" role="region" aria-label={t.catalogResults} tabIndex={0}>
        <table className="catalog-table">
          <thead>
            <tr>{screen.columns.map((column, i) => (
              <th key={i} scope="col">{localized(column, language)}</th>
            ))}</tr>
          </thead>
          <tbody />
        </table>
      </div>
      <EmptyState title={t.empty} description={t.catalogNoData} />
    </Surface>
  );
}

export function CatalogScreenPage({ screen, t, language }: Props) {
  const [selectedStep, setSelectedStep] = useState(0);
  const type = screen.layout;
  const showGridFirst = type === "register" || type === "approval" || type === "review";
  const formTitle = type === "register" ? t.catalogFilters
    : type === "approval" || type === "review" ? t.catalogInspection
    : type === "wizard" ? t.catalogSteps : t.catalogDetails;

  const form = (
    <Surface title={formTitle}>
      {type === "wizard" && (
        <nav className="catalog-wizard-nav" aria-label={t.catalogSteps}>
          {screen.fields.map((field, i) => (
            <button key={i} type="button" className={selectedStep === i ? "catalog-step active" : "catalog-step"}
              aria-current={selectedStep === i ? "step" : undefined}
              onClick={() => setSelectedStep(i)}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {localized(field, language)}
            </button>
          ))}
        </nav>
      )}
      <ScreenFields screen={screen} t={t} language={language} selectedStep={selectedStep} />
    </Surface>
  );
  const results = <DataGrid screen={screen} t={t} language={language} />;

  return (
    <div data-screen-id={screen.id} data-screen-layout={screen.layout} className="catalog-page">
      <PageHeading
        title={localized(screen.title, language)}
        subtitle={localized(screen.summary, language)}
        preview={t.preview}
      />
      <div className="catalog-meta">
        <span className="catalog-screen-number">{screen.id}</span>
        <span>{t.catalogAudience}: {localized(screen.audience, language)}</span>
        <span>{t.catalogNotConnected}</span>
      </div>
      <div className={type === "master" || type === "review" || type === "approval"
        ? "catalog-content catalog-two-panels" : "catalog-content"}>
        {showGridFirst ? results : form}
        {showGridFirst ? form : results}
      </div>
      <section className="catalog-decision-gate" aria-label={t.catalogApprovalGate}>
        <strong>{t.catalogApprovalGate}</strong>
        <p>{localized(screen.gate, language)}</p>
      </section>
      <div className="catalog-actionbar" aria-label={t.catalogDisabledActions}>
        <span>{t.catalogDisabledActions}</span>
        <div className="catalog-actions">
          {screen.actions.map((action, i) => (
            <button type="button" key={i} disabled
              title={t.catalogNotConnected} className={i === 0 ? "check-button" : "reset-button"}>
              {localized(action, language)}
            </button>
          ))}
        </div>
      </div>
      <p className="catalog-preview-footer">
        {t.catalogNoProcessing}
        {" · "}
        <NavLink to="/" className="auth-demo-link">{t.overview}</NavLink>
      </p>
    </div>
  );
}
