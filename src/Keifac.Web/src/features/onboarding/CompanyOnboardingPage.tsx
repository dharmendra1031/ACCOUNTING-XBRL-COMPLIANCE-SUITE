import { useState } from "react";
import { EmptyState, PageHeading, Surface } from "../../components/ui/PreviewElements";
import { RecordIdField } from "../../components/ui/RecordIdField";
import { moveOnboardingStep, onboardingSteps } from "./onboardingSteps";
import type { Labels } from "../../shared/i18n/translations";

export function CompanyOnboardingPage({ t }: { t: Labels }) {
  const [step, setStep] = useState(0);
  const titles = [t.stepLegal, t.stepFiscal, t.stepCoa, t.stepOpening, t.stepReview];

  return (
    <>
      <PageHeading title={t.onboarding} subtitle={t.onboardingDetail} preview={t.preview} />
      <Surface title={t.stepLabel}>
        <p className="muted section-note">{t.onboardingInstructions}</p>
        <nav className="wizard-steps" aria-label={t.stepLabel}>
          {onboardingSteps.map((name, index) => (
            <button
              key={name}
              type="button"
              className={step === index ? "wizard-step current" : "wizard-step"}
              onClick={() => setStep(index)}
              aria-current={step === index ? "step" : undefined}
              aria-controls={`onboarding-${name}`}
            >
              <span className="wizard-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {titles[index]}
            </button>
          ))}
        </nav>
      </Surface>

      <Surface title={titles[step]}>
        <div id="onboarding-legal" hidden={step !== 0}>
          <div className="form-grid">
            <RecordIdField t={t} />
            <div className="form-field">
              <label htmlFor="onboarding-name-en">{t.legalNameEn}</label>
              <input id="onboarding-name-en" maxLength={200} />
            </div>
            <div className="form-field">
              <label htmlFor="onboarding-name-ar">{t.legalNameAr}</label>
              <input id="onboarding-name-ar" lang="ar" dir="rtl" maxLength={200} />
            </div>
            <div className="form-field">
              <label htmlFor="onboarding-cr">{t.registrationNo}</label>
              <input id="onboarding-cr" dir="ltr" maxLength={60} />
            </div>
            <div className="form-field">
              <label htmlFor="onboarding-company-type">{t.companyType}</label>
              <select id="onboarding-company-type" disabled>
                <option>{t.companyTypeUnavailable}</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="onboarding-currency">{t.baseCurrency}</label>
              <input id="onboarding-currency" readOnly value={t.currencyUnavailable} />
            </div>
          </div>
        </div>
        <div id="onboarding-fiscal" hidden={step !== 1}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="onboarding-fiscal-year">{t.fiscalYear}</label>
              <input id="onboarding-fiscal-year" maxLength={40} />
            </div>
            <div className="form-field">
              <label htmlFor="onboarding-start">{t.periodStart}</label>
              <input id="onboarding-start" type="date" />
            </div>
            <div className="form-field">
              <label htmlFor="onboarding-end">{t.periodEnd}</label>
              <input id="onboarding-end" type="date" />
            </div>
          </div>
          <p className="muted wizard-hint">{t.fiscalSetupHint}</p>
        </div>
        <div id="onboarding-coa" hidden={step !== 2}>
          <div className="form-field">
            <label htmlFor="onboarding-chart">{t.chartSource}</label>
            <select id="onboarding-chart" disabled>
              <option>{t.coaSourceUnavailable}</option>
            </select>
          </div>
          <p className="muted wizard-hint">{t.coaHint}</p>
        </div>
        <div id="onboarding-opening" hidden={step !== 3}>
          <div className="table-scroll">
            <table className="preview-data-table">
              <thead>
                <tr><th>{t.account}</th><th className="amount">{t.debit}</th><th className="amount">{t.credit}</th><th>{t.openingEvidence}</th></tr>
              </thead>
              <tbody><tr><td colSpan={4}><EmptyState title={t.empty} description={t.openingBalanceHint} /></td></tr></tbody>
            </table>
          </div>
        </div>
        <div id="onboarding-review" hidden={step !== 4}>
          <p className="muted section-note">{t.activationBlocked}</p>
          <div className="review-list">
            {titles.slice(0, 4).map((title) => (
              <div key={title} className="review-row">
                <span>{title}</span><span className="status-neutral">{t.notAssessed}</span>
              </div>
            ))}
          </div>
          <button type="button" disabled className="check-button wizard-activation">{t.activationAction}</button>
        </div>
        <div className="wizard-footer">
          <p className="preview-note">{t.unsavedPreview}</p>
          <div className="form-actions">
            <button type="button" className="reset-button" disabled={step === 0}
              onClick={() => setStep((index) => moveOnboardingStep(index, -1))}>{t.onboardingPrevious}</button>
            <button type="button" className="check-button" disabled={step === onboardingSteps.length - 1}
              onClick={() => setStep((index) => moveOnboardingStep(index, 1))}>
              {step === onboardingSteps.length - 1 ? t.onboardingFinal : t.onboardingNext}
            </button>
          </div>
        </div>
      </Surface>
    </>
  );
}
