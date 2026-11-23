import { useState, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router";
import { screenCatalog } from "../features/catalog/screenCatalog";
import { screenGroups } from "../features/catalog/screenGroups";
import type { Labels, Language } from "../shared/i18n/translations";

type Props = {
  t: Labels;
  language: Language;
  onLanguageChange: () => void;
  children: ReactNode;
};

export function AppShell({ t, language, onLanguageChange, children }: Props) {
  const [modulesOpen, setModulesOpen] = useState(false);
  const location = useLocation();
  const setupLinks = [
    { path: "/organization", label: t.organization, id: "003" },
    { path: "/onboarding", label: t.onboarding, id: "021" },
    { path: "/access", label: t.access, id: "022" },
    { path: "/periods", label: t.periods, id: "023" },
  ];
  const accountingLinks = [
    { path: "/accounts", label: t.accounts, id: "004" },
    { path: "/journals", label: t.journals, id: "005" },
  ];
  const groups = [
    { id: "setup", label: t.navSetup, items: setupLinks },
    ...screenGroups.map((group) => ({
      id: group.key,
      label: group.title[language],
      items: [
        ...(group.key === "finance" ? accountingLinks : []),
        ...screenCatalog.filter((screen) => screen.group === group.key)
          .map((screen) => ({
            path: screen.route,
            label: screen.title[language],
            id: screen.id.slice(-3),
          })),
      ],
    })),
  ];
  return (
    <div className="app-layout" dir={language === "ar" ? "rtl" : "ltr"}>
      <a className="skip-link" href="#main-content">{t.skipToContent}</a>
      <aside className="sidebar">
        <div className="sidebar-head">
          <div className="brand"><span className="brand-mark" aria-hidden="true">K</span><strong>{t.brand}</strong></div>
          <button type="button" className="mobile-nav-toggle"
            aria-controls="keifac-modules-nav" aria-expanded={modulesOpen}
            onClick={() => setModulesOpen((current) => !current)}>
            {modulesOpen ? t.navHideModules : t.navModules}
          </button>
        </div>
        <nav id="keifac-modules-nav" aria-label={t.section}
          className={modulesOpen ? "navigation modules-open" : "navigation"}>
          <NavLink end to="/" onClick={() => setModulesOpen(false)}
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-number" aria-hidden="true">002</span>{t.overview}
          </NavLink>
          {groups.map((group) => (
            <details className="nav-section" key={group.id}
              open={group.items.some((item) => item.path === location.pathname) || undefined}>
              <summary>{group.label}<span className="nav-section-count">{group.items.length}</span></summary>
              <div className="nav-section-links">
                {group.items.map((item) => (
                  <NavLink end key={item.path} to={item.path} onClick={() => setModulesOpen(false)}
                    className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <span className="nav-number" aria-hidden="true">{item.id}</span>
                    <span className="nav-label">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </details>
          ))}
          <NavLink to="/sign-in" className="nav-item" onClick={() => setModulesOpen(false)}>
            <span className="nav-number" aria-hidden="true">001</span>{t.signIn}
          </NavLink>
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
