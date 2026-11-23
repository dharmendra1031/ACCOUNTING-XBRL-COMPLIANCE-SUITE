import type { Localized, ScreenGroup } from "./screenCatalog";

export const screenGroups: readonly { key: ScreenGroup; title: Localized }[] = [
  { key: "finance", title: { en: "Accounting & Finance", ar: "المحاسبة والمالية" } },
  { key: "sales", title: { en: "Sales & Receivables", ar: "المبيعات والذمم المدينة" } },
  { key: "purchasing", title: { en: "Purchases & Payables", ar: "المشتريات والذمم الدائنة" } },
  { key: "banking", title: { en: "Banking & Cash", ar: "البنوك والنقدية" } },
  { key: "inventory", title: { en: "Inventory", ar: "المخزون" } },
  { key: "reports", title: { en: "Reports", ar: "التقارير" } },
  { key: "compliance", title: { en: "Regulatory Compliance", ar: "الامتثال التنظيمي" } },
  { key: "xbrl", title: { en: "XBRL & Filing", ar: "XBRL والتقديمات" } },
  { key: "audit", title: { en: "Audit & Operations", ar: "التدقيق والعمليات" } },
];
