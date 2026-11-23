import { NavLink } from "react-router";
import { PageHeading, Surface } from "../../components/ui/PreviewElements";
import type { Labels } from "../../shared/i18n/translations";

export function OverviewPage({ t }: { t: Labels }) {
  return (
    <>
      <PageHeading title={t.workspace} subtitle={t.intro} preview={t.preview} />
      <Surface title={t.quickAccess}>
        <div className="quick-grid">
          {[
            { path: "/accounts", name: t.accounts, detail: t.accountsDetail, number: "01" },
            { path: "/journals", name: t.journals, detail: t.journalsDetail, number: "02" },
            { path: "/organization", name: t.organization, detail: t.companyAdminPreview, number: "03" },
            { path: "/periods", name: t.periods, detail: t.fiscalPreviewDescription, number: "04" },
          ].map((item) => (
            <NavLink className="quick-card" key={item.path} to={item.path}>
              <span className="quick-number">{item.number}</span>
              <strong>{item.name}</strong>
              <span className="muted">{item.detail}</span>
              <span className="link-label">{t.browse} →</span>
            </NavLink>
          ))}
        </div>
      </Surface>
      <Surface title={t.gate}><p className="muted">{t.gateDetail}</p></Surface>
    </>
  );
}