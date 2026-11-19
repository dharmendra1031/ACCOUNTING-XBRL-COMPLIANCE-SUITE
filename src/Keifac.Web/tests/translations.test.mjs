import assert from "node:assert/strict";
import test from "node:test";
import { translations } from "../src/shared/i18n/translations.ts";

test("English and Arabic have the same translation keys", () => {
  const englishKeys = Object.keys(translations.en).sort();
  const arabicKeys = Object.keys(translations.ar).sort();
  assert.deepEqual(arabicKeys, englishKeys);
});

test("Every translation has nonempty text", () => {
  for (const [language, messages] of Object.entries(translations)) {
    for (const [key, value] of Object.entries(messages)) {
      assert.equal(typeof value, "string", `${language}.${key} is not a string`);
      assert.ok(value.trim().length > 0, `${language}.${key} is empty`);
    }
  }
});

test("Preview clearly discloses that records are not saved", () => {
  for (const messages of Object.values(translations)) {
    assert.ok(messages.notice.length > 20);
    assert.ok(messages.unsavedPreview.length > 20);
  }
});
