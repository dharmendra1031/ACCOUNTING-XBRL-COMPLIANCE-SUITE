import assert from "node:assert/strict";
import test from "node:test";
import { isPreviewRole, rolePreviewRoutes } from "../src/features/access/rolePreviewRoutes.ts";

const routedPreviews = new Set([
  "/organization", "/onboarding", "/access", "/periods", "/accounts", "/journals",
]);

test("role preview selection accepts only known role keys", () => {
  for (const key of Object.keys(rolePreviewRoutes)) assert.equal(isPreviewRole(key), true);
  for (const invalid of ["", "__proto__", "constructor", "root", "superAdmin"]) {
    assert.equal(isPreviewRole(invalid), false);
  }
});

test("workflow previews only link to real routed screen previews", () => {
  for (const routes of Object.values(rolePreviewRoutes)) {
    assert.equal(new Set(routes).size, routes.length);
    for (const route of routes) assert.equal(routedPreviews.has(route), true, route);
  }
});

test("roles without frontend screen previews never receive fabricated links", () => {
  assert.deepEqual(rolePreviewRoutes.xbrlPreparer, []);
  assert.deepEqual(rolePreviewRoutes.auditor, []);
});
