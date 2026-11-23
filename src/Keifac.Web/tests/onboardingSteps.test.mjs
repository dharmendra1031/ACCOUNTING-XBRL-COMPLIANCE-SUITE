import assert from "node:assert/strict";
import test from "node:test";
import { moveOnboardingStep, onboardingSteps } from "../src/features/onboarding/onboardingSteps.ts";

test("company onboarding has five unique ordered preview stages", () => {
  assert.deepEqual(onboardingSteps, ["legal", "fiscal", "coa", "opening", "review"]);
  assert.equal(new Set(onboardingSteps).size, 5);
});

test("next and previous preview navigation are bounded", () => {
  assert.equal(moveOnboardingStep(0, -1), 0);
  assert.equal(moveOnboardingStep(0, 1), 1);
  assert.equal(moveOnboardingStep(2, 1), 3);
  assert.equal(moveOnboardingStep(4, 1), 4);
  assert.equal(moveOnboardingStep(4, -1), 3);
});
