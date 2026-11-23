import assert from "node:assert/strict";
import test from "node:test";
import { firstMissingAccountField, requiredAccountFields } from "../src/features/accounting/accounts/accountPreviewValidation.ts";

function completeForm() {
  const form = new FormData();
  form.set("code", "1001");
  form.set("name", "Cash at bank");
  form.set("type", "Asset");
  form.set("normalBalance", "Debit");
  return form;
}

test("all required account fields are checked", () => {
  assert.deepEqual(requiredAccountFields, ["code", "name", "type", "normalBalance"]);
  for (const field of requiredAccountFields) {
    const form = completeForm();
    form.delete(field);
    assert.equal(firstMissingAccountField(form), field);
  }
});

test("blank or whitespace-only fields are rejected", () => {
  for (const field of requiredAccountFields) {
    const form = completeForm();
    form.set(field, "   \t  ");
    assert.equal(firstMissingAccountField(form), field);
  }
});

test("complete draft passes preview check without persisting", () => {
  assert.equal(firstMissingAccountField(completeForm()), null);
});

test("non-text entry cannot pass the required-field check", () => {
  const form = completeForm();
  form.set("code", new Blob(["x"]), "attachment.txt");
  assert.equal(firstMissingAccountField(form), "code");
});
