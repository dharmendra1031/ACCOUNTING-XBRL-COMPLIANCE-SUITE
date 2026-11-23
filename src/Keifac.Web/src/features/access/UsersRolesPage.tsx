import { useState } from "react";
import { NavLink } from "react-router";
import { EmptyState, PageHeading, Surface } from "../../components/ui/PreviewElements";
import { RecordIdField } from "../../components/ui/RecordIdField";
import type { Labels } from "../../shared/i18n/translations";
import { isPreviewRole, rolePreviewRoutes, type PreviewRole } from "./rolePreviewRoutes";
import { screenCatalog } from "../catalog/screenCatalog";
import type { Language } from "../../shared/i18n/translations";

export function UsersRolesPage({ t, language }: { t: Labels; language: Language }) {
  const [selectedRole, setSelectedRole] = useState<PreviewRole | "">("");
  const workspaceLabels: Record<string, string> = {
    "/organization": t.organization,
    "/onboarding": t.onboarding,
    "/access": t.access,
    "/periods": t.periods,
    "/accounts": t.accounts,
    "/journals": t.journals,
  };

  return (
    <>
      <PageHeading title={t.access} subtitle={t.accessDetail} preview={t.preview} />
      <div className="security-note" role="note">{t.securityNotice}</div>
      <div className="split-grid">
        <Surface title={t.roleDirectory}>
          <EmptyState title={t.empty} description={t.userDirectoryEmpty} />
        </Surface>
        <Surface title={t.invitePreview}>
          <form className="preview-form" onSubmit={(event) => event.preventDefault()}
            onReset={() => setSelectedRole("")}>
            <div className="form-grid">
              <RecordIdField t={t} />
              <div className="form-field">
                <label htmlFor="access-email">{t.invitationEmail}</label>
                <input type="email" id="access-email" name="email" autoComplete="off" maxLength={254} />
              </div>
              <div className="form-field">
                <label htmlFor="access-role">{t.roleName}</label>
                <select id="access-role" name="role" value={selectedRole}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    setSelectedRole(isPreviewRole(value) ? value : "");
                  }}>
                  <option value="">{t.roleUnassigned}</option>
                  <option value="companyAdmin">{t.roleAdmin}</option>
                  <option value="accountant">{t.roleAccountant}</option>
                  <option value="financeManager">{t.roleFinance}</option>
                  <option value="cfo">{t.roleCfo}</option>
                  <option value="xbrlPreparer">{t.roleXbrl}</option>
                  <option value="auditor">{t.roleAuditor}</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="access-company">{t.roleCompanyScope}</label>
                <input id="access-company" readOnly value={t.unavailable} />
              </div>
              <div className="form-field">
                <label htmlFor="access-branch">{t.roleBranchScope}</label>
                <input id="access-branch" readOnly value={t.unavailable} />
              </div>
              <div className="form-field">
                <label htmlFor="access-mfa">{t.mfaRequirement}</label>
                <input id="access-mfa" readOnly value={t.unavailable} />
              </div>
              <div className="form-field">
                <label htmlFor="access-limit">{t.approvalLimit}</label>
                <input id="access-limit" readOnly value={t.notConfigured} />
              </div>
            </div>
            <div className="form-footer">
              <p className="preview-note">{t.invitationBlocked}</p>
              <button type="reset" className="reset-button">{t.clearPreview}</button>
            </div>
          </form>
        </Surface>
      </div>
      <Surface title={t.permissionMatrix}>
        <p className="muted section-note">{t.roleSelectionNote}</p>
        <div className="table-scroll" role="region" aria-label={t.permissionMatrix} tabIndex={0}>
          <table className="preview-data-table">
            <thead><tr><th>{t.permissionAction}</th><th>{t.permissionRole}</th><th>{t.approvalLimit}</th><th>{t.mfaRequirement}</th><th>{t.permissionStatus}</th></tr></thead>
            <tbody />
          </table>
        </div>
        <EmptyState title={t.empty} description={t.matrixEmpty} />
      </Surface>
      <Surface title={t.roleNavigationPreview}>
        <p className="muted section-note">{t.roleNavigationDisclaimer}</p>
        {!selectedRole ? (
          <p className="muted">{t.roleNavigationSelect}</p>
        ) : (
          <nav className="role-preview-links" aria-label={t.roleNavigationPreview}>
            {rolePreviewRoutes[selectedRole].map((path) => (
              <NavLink className="role-preview-link" to={path} key={path}>
                {workspaceLabels[path] ?? screenCatalog.find((screen) => screen.route === path)?.title[language]}
              </NavLink>
            ))}
          </nav>
        )}
      </Surface>
    </>
  );
}
