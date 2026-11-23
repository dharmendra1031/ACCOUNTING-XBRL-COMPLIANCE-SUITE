import { useState } from "react";
import { NavLink } from "react-router";
import type { Labels, Language } from "../../shared/i18n/translations";

type Mode = "signIn" | "mfa" | "recovery";
type Props = { t: Labels; language: Language; onLanguageChange: () => void };

export function SignInPreviewPage({ t, language, onLanguageChange }: Props) {
  const [mode, setMode] = useState<Mode>("signIn");
  const modes: { key: Mode; label: string }[] = [
    { key: "signIn", label: t.authStateSignIn },
    { key: "mfa", label: t.authStateMfa },
    { key: "recovery", label: t.authStateRecovery },
  ];

  return (
    <div className="auth-page" dir={language === "ar" ? "rtl" : "ltr"}>
      <a className="skip-link" href="#auth-main">{t.skipToContent}</a>
      <header className="auth-header">
        <div className="brand auth-brand">
          <span className="brand-mark" aria-hidden="true">K</span><strong>{t.brand}</strong>
        </div>
        <button type="button" className="lang-button" onClick={onLanguageChange} aria-label={t.language}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>
      <main id="auth-main" className="auth-layout" tabIndex={-1}>
        <section className="auth-intro" aria-label={t.authTitle}>
          <span className="eyebrow">{t.preview}</span>
          <h1>{t.authTitle}</h1>
          <p>{t.authIntro}</p>
          <div className="auth-security-note" role="note">{t.authProviderGate}</div>
        </section>
        <section className="auth-panel" aria-label={t.authScreenMode}>
          <h2>{t.signIn}</h2>
          <p className="muted">{t.authSubtitle}</p>
          <div className="auth-modes" role="group" aria-label={t.authScreenMode}>
            {modes.map((item) => (
              <button key={item.key} className={mode === item.key ? "auth-mode selected" : "auth-mode"}
                aria-pressed={mode === item.key} type="button" onClick={() => setMode(item.key)}>
                {item.label}
              </button>
            ))}
          </div>
          {mode === "signIn" && (
            <div className="auth-mode-panel">
              <div className="form-field">
                <label htmlFor="auth-identity">{t.authEmail}</label>
                <input id="auth-identity" type="text" disabled autoComplete="off" placeholder={t.authEmailHint} />
              </div>
              <button className="check-button auth-main-action" type="button" disabled>{t.authContinue}</button>
            </div>
          )}
          {mode === "mfa" && (
            <div className="auth-mode-panel">
              <div className="form-field">
                <label htmlFor="auth-code">{t.authMfaCode}</label>
                <input id="auth-code" type="text" disabled inputMode="numeric" autoComplete="off" />
              </div>
              <p className="muted">{t.authMfaHint}</p>
              <button className="check-button auth-main-action" type="button" disabled>{t.authVerify}</button>
            </div>
          )}
          {mode === "recovery" && (
            <div className="auth-mode-panel">
              <div className="form-field">
                <label htmlFor="auth-recovery-email">{t.authRecoveryEmail}</label>
                <input id="auth-recovery-email" type="email" disabled autoComplete="off" />
              </div>
              <p className="muted">{t.authRecoveryHint}</p>
              <button className="check-button auth-main-action" type="button" disabled>{t.authRecovery}</button>
            </div>
          )}
          <div className="auth-preview-footer">
            <p className="muted">{t.authNoAuthentication}</p>
            <NavLink className="auth-demo-link" to="/">{t.authPreviewWorkspace}</NavLink>
          </div>
        </section>
      </main>
    </div>
  );
}
