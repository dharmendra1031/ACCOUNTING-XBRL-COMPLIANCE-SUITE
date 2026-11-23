// UX review only: these links are not grants and cannot authorize any request.
export const rolePreviewRoutes = {
  companyAdmin: ["/organization", "/onboarding", "/access", "/periods"],
  accountant: ["/accounts", "/journals"],
  financeManager: ["/journals", "/accounts", "/periods"],
  cfo: ["/journals", "/periods"],
  xbrlPreparer: [],
  auditor: [],
} as const;

export type PreviewRole = keyof typeof rolePreviewRoutes;
export type PreviewRoute = (typeof rolePreviewRoutes)[PreviewRole][number];

export function isPreviewRole(value: string): value is PreviewRole {
  return Object.prototype.hasOwnProperty.call(rolePreviewRoutes, value);
}
