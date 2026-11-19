import { NavLink } from "react-router";
import { PageHeading, Surface } from "../../components/ui/PreviewElements";
import type { Labels } from "../../shared/i18n/translations";

export function OverviewPage({ t }: { t: Labels }) {
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">{t.preview}</span>
        <h1>{t.workspace}</h1>
        <p>{t.intro}</p>
      </div>
      <Surface title={t.quickAccess}>
        <div className="quick-grid">
          {[
            { path: "/accounts", name: t.accounts, detail: t.accountsDetail, number: "01" },
            { path: "/journals", name: t.journals, detail: t.journalsDetail, number: "02" },
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