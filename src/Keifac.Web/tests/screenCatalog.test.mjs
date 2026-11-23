import assert from "node:assert/strict";
import test from "node:test";
import { screenCatalog } from "../src/features/catalog/screenCatalog.ts";
import { screenGroups } from "../src/features/catalog/screenGroups.ts";

const existingScreenIds = new Set([1, 2, 3, 4, 5, 21, 22, 23]);
const expectedIds = Array.from({ length: 38 }, (_, i) => i + 1)
  .filter((id) => !existingScreenIds.has(id))
  .map((id) => `SCR-${String(id).padStart(3, "0")}`);

test("all missing SRS screen IDs have exact one purpose-specific route", () => {
  assert.equal(screenCatalog.length, 30);
  assert.deepEqual(screenCatalog.map((screen) => screen.id).sort(), expectedIds.sort());
  assert.equal(new Set(screenCatalog.map((screen) => screen.route)).size, 30);
  assert.ok(screenCatalog.every((screen) => screen.route.startsWith("/")));
});

test("every screen has bilingual purpose, role, field, table and action contracts", () => {
  const groups = new Set(screenGroups.map((group) => group.key));
  const kinds = new Set(["text", "date", "decimal", "reference", "readonly", "textarea"]);
  for (const screen of screenCatalog) {
    assert.ok(groups.has(screen.group), screen.id);
    assert.ok(["workbench", "register", "builder", "master", "review", "approval", "wizard"].includes(screen.layout));
    for (const title of [screen.title, screen.summary, screen.audience, screen.gate]) {
      assert.ok(title.en.trim().length >= 5, screen.id);
      assert.ok(title.ar.trim().length >= 3, screen.id);
    }
    assert.ok(screen.fields.length >= 4, screen.id);
    assert.ok(screen.columns.length >= 4, screen.id);
    assert.ok(screen.actions.length >= 2, screen.id);
    for (const field of screen.fields) assert.ok(kinds.has(field.kind), `${screen.id} kind`);
    for (const column of screen.columns) assert.ok(column.en && column.ar, `${screen.id} columns`);
    for (const action of screen.actions) assert.ok(action.en && action.ar, `${screen.id} actions`);
  }
});

test("financial precision and regulatory workflow contracts are not replaced by fake operations", () => {
  const receipts = screenCatalog.find((x) => x.id === "SCR-025");
  const filing = screenCatalog.find((x) => x.id === "SCR-016");
  assert.ok(receipts.fields.some((field) => field.kind === "decimal"));
  assert.ok(filing.fields.some((field) => /hash/i.test(field.en)));
  assert.ok(!screenCatalog.some((screen) => screen.actions.some((action) => !action.en || !action.ar)));
});
