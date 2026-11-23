import { Navigate, Outlet, Route, Routes } from "react-router";
import { AppShell } from "./AppShell";
import { SignInPreviewPage } from "../features/auth/SignInPreviewPage";
import { AccountsPage } from "../features/accounting/accounts/AccountsPage";
import { JournalsPage } from "../features/accounting/journals/JournalsPage";
import { OverviewPage } from "../features/overview/OverviewPage";
import { CompanyAndBranchPage } from "../features/organization/CompanyAndBranchPage";
import { FiscalPeriodsPage } from "../features/organization/FiscalPeriodsPage";
import { CompanyOnboardingPage } from "../features/onboarding/CompanyOnboardingPage";
import { UsersRolesPage } from "../features/access/UsersRolesPage";
import { CatalogScreenPage } from "../features/catalog/CatalogScreenPage";
import { screenCatalog } from "../features/catalog/screenCatalog";
import type { Labels, Language } from "../shared/i18n/translations";

type Props = { t: Labels; language: Language; onLanguageChange: () => void };

export function AppRoutes({ t, language, onLanguageChange }: Props) {
  return (
    <Routes>
      <Route
        path="/sign-in"
        element={<SignInPreviewPage t={t} language={language} onLanguageChange={onLanguageChange} />}
      />
      <Route element={
        <AppShell t={t} language={language} onLanguageChange={onLanguageChange}>
          <Outlet />
        </AppShell>
      }>
        <Route path="/" element={<OverviewPage t={t} language={language} />} />
        <Route path="/accounts" element={<AccountsPage t={t} />} />
        <Route path="/journals" element={<JournalsPage t={t} />} />
        <Route path="/organization" element={<CompanyAndBranchPage t={t} />} />
        <Route path="/periods" element={<FiscalPeriodsPage t={t} />} />
        <Route path="/onboarding" element={<CompanyOnboardingPage t={t} />} />
        <Route path="/access" element={<UsersRolesPage t={t} />} />
        {screenCatalog.map((screen) => (
          <Route
            key={screen.id}
            path={screen.route}
            element={<CatalogScreenPage screen={screen} t={t} language={language} />}
          />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
