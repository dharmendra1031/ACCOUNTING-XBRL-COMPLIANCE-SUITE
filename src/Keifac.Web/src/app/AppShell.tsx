import type { ReactNode } from "react";
import { NavLink } from "react-router";
import type { Labels, Language } from "../shared/i18n/translations";

type Props = {
  t: Labels;
  language: Language;
  onLanguageChange: () => void;
  children: ReactNode;
};

export function AppShell({ t, language, onLanguageChange, children }: Props) {
  return (
    <div className="app-layout" dir={language === "ar" ? "rtl" : "ltr"}>
      <a className="skip-link" href="#main-content">{t.skipToContent}</a>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">K</span><strong>{t.brand}</strong></div>
        <div className="nav-group">{t.section}</div>
        <nav aria-label={t.section} className="navigation">
          {[
            { path: "/", label: t.overview, number: "01" },
            { path: "/accounts", label: t.accounts, number: "02" },
            { path: "/journals", label: t.journals, number: "03" },
            { path: "/organization", label: t.organization, number: "04" },
            { path: "/periods", label: t.periods, number: "05" },
            { path: "/onboarding", label: t.onboarding, number: "06" },
            { path: "/access", label: t.access, number: "07" },
          ].map((item) => (
            <NavLink end key={item.path} to={item.path} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="nav-number" aria-hidden="true">{item.number}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" />{t.progress}</div>
      </aside>

      <div className="workarea">
        <header className="topbar">
          <span className="topbar-title">{t.workspace}</span>
          <div className="topbar-actions">
            <span className="context-chip">{t.company}: {t.unavailable}</span>
            <button className="lang-button" type="button" onClick={onLanguageChange} aria-label={t.language}>
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>
        </header>
        <main id="main-content" className="main-content" tabIndex={-1}>
          <div className="preview-warning" role="status">{t.notice}</div>
          {children}
        </main>
      </div>
    </div>
  );
}
