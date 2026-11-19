import { Navigate, Route, Routes } from "react-router";
import { AccountsPage } from "../features/accounting/accounts/AccountsPage";
import { JournalsPage } from "../features/accounting/journals/JournalsPage";
import { OverviewPage } from "../features/overview/OverviewPage";
import type { Labels } from "../shared/i18n/translations";

export function AppRoutes({ t }: { t: Labels }) {
  return (
    <Routes>
      <Route path="/" element={<OverviewPage t={t} />} />
      <Route path="/accounts" element={<AccountsPage t={t} />} />
      <Route path="/journals" element={<JournalsPage t={t} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
