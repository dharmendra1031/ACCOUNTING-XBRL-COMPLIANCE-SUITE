import assert from "node:assert/strict";
import test from "node:test";
import { isPreviewRole, rolePreviewRoutes } from "../src/features/access/rolePreviewRoutes.ts";
import { screenCatalog } from "../src/features/catalog/screenCatalog.ts";

const routedPreviews = new Set([
  "/organization", "/onboarding", "/access", "/periods", "/accounts", "/journals",
  ...screenCatalog.map((screen) => screen.route),
]);

test("role preview selection accepts only known role keys", () => {
  for (const key of Object.keys(rolePreviewRoutes)) assert.equal(isPreviewRole(key), true);
  for (const invalid of ["", "__proto__", "constructor", "root", "superAdmin"]) {
    assert.equal(isPreviewRole(invalid), false);
  }
});

test("role workflow previews only link to real routed screens", () => {
  for (const routes of Object.values(rolePreviewRoutes)) {
    assert.equal(new Set(routes).size, routes.length);
    for (const route of routes) assert.equal(routedPreviews.has(route), true, route);
  }
});

test("auditor and XBRL preparer have actual review routes, not invented grants", () => {
  assert.ok(rolePreviewRoutes.xbrlPreparer.includes("/xbrl-mapping"));
  assert.ok(rolePreviewRoutes.auditor.includes("/audit-trail"));
  assert.ok(!rolePreviewRoutes.auditor.includes("/access"));
});
