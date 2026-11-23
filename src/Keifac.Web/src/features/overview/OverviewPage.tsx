import { NavLink } from "react-router";
import { PageHeading, Surface } from "../../components/ui/PreviewElements";
import { screenCatalog } from "../catalog/screenCatalog";
import { screenGroups } from "../catalog/screenGroups";
import type { Labels, Language } from "../../shared/i18n/translations";

export function OverviewPage({ t, language }: { t: Labels; language: Language }) {
  const quick = [
    { path: "/accounts", name: t.accounts, detail: t.accountsDetail, number: "004" },
    { path: "/journals", name: t.journals, detail: t.journalsDetail, number: "005" },
    { path: "/onboarding", name: t.onboarding, detail: t.onboardingDetail, number: "021" },
    { path: "/reports", name: language === "en" ? "Report centre" : "مركز التقارير", detail: t.catalogNoProcessing, number: "020" },
  ];

  return (
    <>
      <PageHeading title={t.workspace} subtitle={t.catalogIndexHint} preview={t.preview} />
      <Surface title={t.quickAccess}>
        <div className="quick-grid">
          {quick.map((item) => (
            <NavLink className="quick-card" key={item.path} to={item.path}>
              <span className="quick-number">{item.number}</span>
              <strong>{item.name}</strong>
              <span className="muted">{item.detail}</span>
              <span className="link-label">{t.browse} →</span>
            </NavLink>
          ))}
        </div>
      </Surface>
      <Surface title={t.catalogIndex}>
        <p className="muted section-note">{t.catalogIndexHint}</p>
        <div className="catalog-directory">
          {screenGroups.map((group) => {
            const items = screenCatalog.filter((screen) => screen.group === group.key);
            return (
              <details key={group.key} className="directory-group">
                <summary>{group.title[language]} <span>{items.length}</span></summary>
                <div className="directory-links">
                  {items.map((screen) => (
                    <NavLink key={screen.id} to={screen.route} className="directory-link">
                      <span className="quick-number">{screen.id}</span>
                      {screen.title[language]}
                    </NavLink>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </Surface>
      <Surface title={t.gate}><p className="muted">{t.gateDetail}</p></Surface>
    </>
  );
}
