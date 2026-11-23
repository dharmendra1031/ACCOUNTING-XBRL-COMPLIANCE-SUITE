import { Navigate, Route, Routes } from "react-router";
import { AccountsPage } from "../features/accounting/accounts/AccountsPage";
import { JournalsPage } from "../features/accounting/journals/JournalsPage";
import { OverviewPage } from "../features/overview/OverviewPage";
import { CompanyAndBranchPage } from "../features/organization/CompanyAndBranchPage";
import { FiscalPeriodsPage } from "../features/organization/FiscalPeriodsPage";
import { CompanyOnboardingPage } from "../features/onboarding/CompanyOnboardingPage";
import { UsersRolesPage } from "../features/access/UsersRolesPage";
import type { Labels } from "../shared/i18n/translations";

export function AppRoutes({ t }: { t: Labels }) {
  return (
    <Routes>
      <Route path="/" element={<OverviewPage t={t} />} />
      <Route path="/accounts" element={<AccountsPage t={t} />} />
      <Route path="/journals" element={<JournalsPage t={t} />} />
      <Route path="/organization" element={<CompanyAndBranchPage t={t} />} />
      <Route path="/periods" element={<FiscalPeriodsPage t={t} />} />
      <Route path="/onboarding" element={<CompanyOnboardingPage t={t} />} />
      <Route path="/access" element={<UsersRolesPage t={t} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
