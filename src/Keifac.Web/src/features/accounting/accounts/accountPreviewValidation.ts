export const requiredAccountFields = ["code", "name", "type", "normalBalance"] as const;

export function firstMissingAccountField(form: FormData): string | null {
  return requiredAccountFields.find((field) => {
    const value = form.get(field);
    return typeof value !== "string" || value.trim().length === 0;
  }) ?? null;
}
