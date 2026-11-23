// The wizard navigates visual steps only. It never creates or persists a company.
export const onboardingSteps = ["legal", "fiscal", "coa", "opening", "review"] as const;
export type OnboardingStep = (typeof onboardingSteps)[number];

export function moveOnboardingStep(index: number, direction: -1 | 1): number {
  return Math.max(0, Math.min(onboardingSteps.length - 1, index + direction));
}
