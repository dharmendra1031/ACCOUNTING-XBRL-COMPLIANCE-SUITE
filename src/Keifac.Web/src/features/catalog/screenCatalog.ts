export type Localized = { en: string; ar: string };
export type FieldKind = "text" | "date" | "decimal" | "reference" | "readonly" | "textarea";
export type ScreenGroup = "sales" | "purchasing" | "banking" | "finance" | "compliance" | "xbrl" | "audit" | "reports" | "inventory";
export type ScreenLayout = "workbench" | "register" | "builder" | "master" | "review" | "approval" | "wizard";
export type CatalogScreen = {
  id: string; route: string; group: ScreenGroup; layout: ScreenLayout;
  entity: boolean; title: Localized; audience: Localized; summary: Localized;
  fields: readonly (Localized & { kind: FieldKind })[];
  columns: readonly Localized[]; actions: readonly Localized[]; gate: Localized;
};

// Screen-specific draft layout contracts drawn from the 38-screen SRS register.
// These records contain NO customer fixtures, fake balances, permissions or APIs.
export const screenCatalog: readonly CatalogScreen[] = [
  {
    "id": "SCR-006",
    "route": "/sales-invoices",
    "group": "sales",
    "layout": "workbench",
    "entity": true,
    "title": {
      "en": "Sales invoices",
      "ar": "فواتير المبيعات"
    },
    "audience": {
      "en": "Sales / Accountant",
      "ar": "المبيعات / المحاسب"
    },
    "summary": {
      "en": "Customer invoice header and line-item design",
      "ar": "تصميم رأس الفاتورة وبنود المبيعات"
    },
    "fields": [
      {
        "en": "Customer",
        "ar": "العميل",
        "kind": "reference"
      },
      {
        "en": "Invoice date",
        "ar": "تاريخ الفاتورة",
        "kind": "date"
      },
      {
        "en": "Due date",
        "ar": "تاريخ الاستحقاق",
        "kind": "date"
      },
      {
        "en": "Payment terms",
        "ar": "شروط الدفع",
        "kind": "text"
      },
      {
        "en": "Document currency",
        "ar": "عملة المستند",
        "kind": "reference"
      },
      {
        "en": "Customer reference",
        "ar": "مرجع العميل",
        "kind": "text"
      }
    ],
    "columns": [
      {
        "en": "Item / description",
        "ar": "الصنف / الوصف"
      },
      {
        "en": "Quantity",
        "ar": "الكمية"
      },
      {
        "en": "Unit price",
        "ar": "سعر الوحدة"
      },
      {
        "en": "Discount",
        "ar": "الخصم"
      },
      {
        "en": "Applicable tax",
        "ar": "الضريبة المنطبقة"
      },
      {
        "en": "Line total",
        "ar": "إجمالي البند"
      }
    ],
    "actions": [
      {
        "en": "Save draft",
        "ar": "حفظ المسودة"
      },
      {
        "en": "Issue invoice",
        "ar": "إصدار الفاتورة"
      },
      {
        "en": "Post",
        "ar": "ترحيل"
      },
      {
        "en": "Credit note",
        "ar": "إشعار دائن"
      },
      {
        "en": "Print",
        "ar": "طباعة"
      }
    ],
    "gate": {
      "en": "Customer status, pricing precision, tax applicability and posting controls await approval.",
      "ar": "حالة العميل ودقة الأسعار وتطبيق الضريبة وضوابط الترحيل بانتظار الاعتماد."
    }
  },
  {
    "id": "SCR-007",
    "route": "/purchase-invoices",
    "group": "purchasing",
    "layout": "workbench",
    "entity": true,
    "title": {
      "en": "Purchase invoices",
      "ar": "فواتير المشتريات"
    },
    "audience": {
      "en": "Purchase / Accountant",
      "ar": "المشتريات / المحاسب"
    },
    "summary": {
      "en": "Supplier bill matching and cost allocation design",
      "ar": "تصميم مطابقة فاتورة المورد وتوزيع التكلفة"
    },
    "fields": [
      {
        "en": "Supplier",
        "ar": "المورد",
        "kind": "reference"
      },
      {
        "en": "Supplier invoice no.",
        "ar": "رقم فاتورة المورد",
        "kind": "text"
      },
      {
        "en": "Invoice date",
        "ar": "تاريخ الفاتورة",
        "kind": "date"
      },
      {
        "en": "Due date",
        "ar": "تاريخ الاستحقاق",
        "kind": "date"
      },
      {
        "en": "Purchase order",
        "ar": "أمر الشراء",
        "kind": "reference"
      },
      {
        "en": "Goods receipt",
        "ar": "إشعار استلام البضاعة",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Item / charge",
        "ar": "الصنف / المصروف"
      },
      {
        "en": "PO quantity",
        "ar": "كمية أمر الشراء"
      },
      {
        "en": "Received quantity",
        "ar": "الكمية المستلمة"
      },
      {
        "en": "Billed quantity",
        "ar": "الكمية المفوترة"
      },
      {
        "en": "Unit cost",
        "ar": "تكلفة الوحدة"
      },
      {
        "en": "Variance",
        "ar": "الفارق"
      }
    ],
    "actions": [
      {
        "en": "Save draft",
        "ar": "حفظ المسودة"
      },
      {
        "en": "Match",
        "ar": "مطابقة"
      },
      {
        "en": "Approve",
        "ar": "اعتماد"
      },
      {
        "en": "Post",
        "ar": "ترحيل"
      },
      {
        "en": "Supplier credit",
        "ar": "إشعار دائن للمورد"
      }
    ],
    "gate": {
      "en": "Duplicate supplier bills, GRNI and PO/GRN match tolerances are not configured.",
      "ar": "لم تُهيأ ضوابط الفواتير المكررة وحسابات الاستلام وسماحية المطابقة."
    }
  },
  {
    "id": "SCR-008",
    "route": "/bank-reconciliation",
    "group": "banking",
    "layout": "workbench",
    "entity": false,
    "title": {
      "en": "Bank reconciliation",
      "ar": "تسوية البنك"
    },
    "audience": {
      "en": "Accountant / Finance",
      "ar": "المحاسب / المالية"
    },
    "summary": {
      "en": "Statement matching, exceptions and reconciliation difference",
      "ar": "مطابقة كشف الحساب والاستثناءات وفارق التسوية"
    },
    "fields": [
      {
        "en": "Bank account",
        "ar": "الحساب البنكي",
        "kind": "reference"
      },
      {
        "en": "Statement cutoff",
        "ar": "تاريخ كشف الحساب",
        "kind": "date"
      },
      {
        "en": "Statement file",
        "ar": "ملف كشف الحساب",
        "kind": "reference"
      },
      {
        "en": "Matching policy",
        "ar": "سياسة المطابقة",
        "kind": "reference"
      },
      {
        "en": "Currency",
        "ar": "العملة",
        "kind": "readonly"
      }
    ],
    "columns": [
      {
        "en": "Statement date",
        "ar": "تاريخ الكشف"
      },
      {
        "en": "Bank reference",
        "ar": "مرجع البنك"
      },
      {
        "en": "Debit",
        "ar": "مدين"
      },
      {
        "en": "Credit",
        "ar": "دائن"
      },
      {
        "en": "Matched ledger entry",
        "ar": "قيد الدفتر المطابق"
      },
      {
        "en": "Difference",
        "ar": "الفرق"
      }
    ],
    "actions": [
      {
        "en": "Import statement",
        "ar": "استيراد الكشف"
      },
      {
        "en": "Match",
        "ar": "مطابقة"
      },
      {
        "en": "Unmatch",
        "ar": "إلغاء المطابقة"
      },
      {
        "en": "Finalize reconciliation",
        "ar": "اعتماد التسوية"
      }
    ],
    "gate": {
      "en": "Finalize requires verified matching and zero unexplained variance. No statement files are accepted in preview.",
      "ar": "تتطلب التسوية مطابقة مؤكدة وصفر فروق غير مفسرة. لا تُقبل ملفات في المعاينة."
    }
  },
  {
    "id": "SCR-009",
    "route": "/statements",
    "group": "finance",
    "layout": "builder",
    "entity": false,
    "title": {
      "en": "Financial statement builder",
      "ar": "منشئ القوائم المالية"
    },
    "audience": {
      "en": "Finance / CFO",
      "ar": "المالية / المدير المالي"
    },
    "summary": {
      "en": "Statement template, account mappings, comparative columns and notes",
      "ar": "قالب القوائم وربط الحسابات وأعمدة المقارنة والإيضاحات"
    },
    "fields": [
      {
        "en": "Statement type",
        "ar": "نوع القائمة",
        "kind": "reference"
      },
      {
        "en": "Reporting period",
        "ar": "الفترة المالية",
        "kind": "reference"
      },
      {
        "en": "Accounting basis",
        "ar": "الأساس المحاسبي",
        "kind": "reference"
      },
      {
        "en": "Comparison period",
        "ar": "فترة المقارنة",
        "kind": "reference"
      },
      {
        "en": "Mapping version",
        "ar": "إصدار الربط",
        "kind": "readonly"
      },
      {
        "en": "Notes / disclosures",
        "ar": "الإيضاحات",
        "kind": "textarea"
      }
    ],
    "columns": [
      {
        "en": "Statement line",
        "ar": "بند القائمة"
      },
      {
        "en": "Source accounts",
        "ar": "الحسابات المصدر"
      },
      {
        "en": "Current period",
        "ar": "الفترة الحالية"
      },
      {
        "en": "Comparative",
        "ar": "المقارنة"
      },
      {
        "en": "Mapping status",
        "ar": "حالة الربط"
      }
    ],
    "actions": [
      {
        "en": "Generate draft",
        "ar": "إنشاء مسودة"
      },
      {
        "en": "Drill down",
        "ar": "عرض التفاصيل"
      },
      {
        "en": "Review",
        "ar": "مراجعة"
      },
      {
        "en": "Approve",
        "ar": "اعتماد"
      },
      {
        "en": "Freeze snapshot",
        "ar": "تجميد النسخة"
      }
    ],
    "gate": {
      "en": "Mapping completeness and trial-balance reconciliation must precede any approved snapshot.",
      "ar": "يجب إكمال ربط الحسابات ومطابقة ميزان المراجعة قبل اعتماد أي نسخة."
    }
  },
  {
    "id": "SCR-010",
    "route": "/regulatory-profile",
    "group": "compliance",
    "layout": "master",
    "entity": true,
    "title": {
      "en": "Regulatory profile",
      "ar": "الملف التنظيمي"
    },
    "audience": {
      "en": "Admin / Compliance",
      "ar": "المسؤول / الامتثال"
    },
    "summary": {
      "en": "Jurisdiction-specific legal entity and obligation assessment",
      "ar": "تقييم الالتزامات والكيان القانوني حسب الولاية"
    },
    "fields": [
      {
        "en": "Legal entity",
        "ar": "الكيان القانوني",
        "kind": "reference"
      },
      {
        "en": "Regulator",
        "ar": "الجهة المنظمة",
        "kind": "reference"
      },
      {
        "en": "Entity category",
        "ar": "فئة الكيان",
        "kind": "reference"
      },
      {
        "en": "Legal source",
        "ar": "المصدر القانوني",
        "kind": "text"
      },
      {
        "en": "Effective date",
        "ar": "تاريخ السريان",
        "kind": "date"
      },
      {
        "en": "Evidence reference",
        "ar": "مرجع الأدلة",
        "kind": "text"
      }
    ],
    "columns": [
      {
        "en": "Obligation",
        "ar": "الالتزام"
      },
      {
        "en": "Authority",
        "ar": "الجهة المختصة"
      },
      {
        "en": "Effective from",
        "ar": "السريان من"
      },
      {
        "en": "Applicability",
        "ar": "انطباق الالتزام"
      },
      {
        "en": "Evidence",
        "ar": "الدليل"
      }
    ],
    "actions": [
      {
        "en": "Save draft",
        "ar": "حفظ المسودة"
      },
      {
        "en": "Assess applicability",
        "ar": "تقييم الانطباق"
      },
      {
        "en": "Approve profile",
        "ar": "اعتماد الملف"
      }
    ],
    "gate": {
      "en": "No regulator status or CMA scope may be inferred without official signed evidence.",
      "ar": "لا يجوز افتراض الحالة التنظيمية أو نطاق هيئة الأسواق دون أدلة رسمية معتمدة."
    }
  },
  {
    "id": "SCR-011",
    "route": "/taxonomy",
    "group": "xbrl",
    "layout": "register",
    "entity": true,
    "title": {
      "en": "Taxonomy manager",
      "ar": "إدارة التصنيفات XBRL"
    },
    "audience": {
      "en": "XBRL / Compliance",
      "ar": "XBRL / الامتثال"
    },
    "summary": {
      "en": "Approved taxonomy packages, versions and dependency review",
      "ar": "مراجعة حزم التصنيف المعتمدة وإصداراتها واعتمادياتها"
    },
    "fields": [
      {
        "en": "Jurisdiction",
        "ar": "الولاية التنظيمية",
        "kind": "reference"
      },
      {
        "en": "Taxonomy package",
        "ar": "حزمة التصنيف",
        "kind": "reference"
      },
      {
        "en": "Namespace",
        "ar": "حيز الأسماء",
        "kind": "text"
      },
      {
        "en": "Version",
        "ar": "الإصدار",
        "kind": "text"
      },
      {
        "en": "Effective date",
        "ar": "تاريخ السريان",
        "kind": "date"
      },
      {
        "en": "Dependency",
        "ar": "الاعتماد",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Package",
        "ar": "الحزمة"
      },
      {
        "en": "Version",
        "ar": "الإصدار"
      },
      {
        "en": "Authority",
        "ar": "الجهة"
      },
      {
        "en": "Effective from",
        "ar": "السريان من"
      },
      {
        "en": "Validation status",
        "ar": "حالة التحقق"
      }
    ],
    "actions": [
      {
        "en": "Import taxonomy",
        "ar": "استيراد التصنيف"
      },
      {
        "en": "Validate",
        "ar": "التحقق"
      },
      {
        "en": "Approve",
        "ar": "اعتماد"
      },
      {
        "en": "Retire",
        "ar": "إيقاف"
      }
    ],
    "gate": {
      "en": "Official taxonomy source, dependency integrity and version approval are unresolved.",
      "ar": "لم تُعتمد مصادر التصنيف الرسمية أو سلامة الاعتماديات وسياسة الإصدارات."
    }
  },
  {
    "id": "SCR-012",
    "route": "/xbrl-mapping",
    "group": "xbrl",
    "layout": "workbench",
    "entity": true,
    "title": {
      "en": "XBRL mapping workbench",
      "ar": "مساحة ربط XBRL"
    },
    "audience": {
      "en": "XBRL Preparer",
      "ar": "مُعد XBRL"
    },
    "summary": {
      "en": "Map account and report lines to taxonomy concepts",
      "ar": "ربط الحسابات وبنود التقارير بمفاهيم التصنيف"
    },
    "fields": [
      {
        "en": "Source account / line",
        "ar": "الحساب / البند المصدر",
        "kind": "reference"
      },
      {
        "en": "Taxonomy concept",
        "ar": "مفهوم التصنيف",
        "kind": "reference"
      },
      {
        "en": "Dimensions",
        "ar": "الأبعاد",
        "kind": "reference"
      },
      {
        "en": "Unit",
        "ar": "الوحدة",
        "kind": "reference"
      },
      {
        "en": "Sign convention",
        "ar": "اتفاقية الإشارة",
        "kind": "reference"
      },
      {
        "en": "Effective from",
        "ar": "السريان من",
        "kind": "date"
      }
    ],
    "columns": [
      {
        "en": "Source line",
        "ar": "البند المصدر"
      },
      {
        "en": "Concept",
        "ar": "المفهوم"
      },
      {
        "en": "Context",
        "ar": "السياق"
      },
      {
        "en": "Unit",
        "ar": "الوحدة"
      },
      {
        "en": "Sign",
        "ar": "الإشارة"
      },
      {
        "en": "Status",
        "ar": "الحالة"
      }
    ],
    "actions": [
      {
        "en": "Map concept",
        "ar": "ربط المفهوم"
      },
      {
        "en": "Preview facts",
        "ar": "معاينة الوقائع"
      },
      {
        "en": "Resolve conflict",
        "ar": "حل التعارض"
      },
      {
        "en": "Submit for approval",
        "ar": "إرسال للاعتماد"
      }
    ],
    "gate": {
      "en": "Only validated concepts, scope and approved effective-date rules may be mapped.",
      "ar": "لا يُسمح بالربط إلا بمفاهيم صالحة ضمن النطاق وقواعد سريان معتمدة."
    }
  },
  {
    "id": "SCR-013",
    "route": "/disclosures",
    "group": "xbrl",
    "layout": "master",
    "entity": true,
    "title": {
      "en": "Disclosure data entry",
      "ar": "إدخال الإفصاحات"
    },
    "audience": {
      "en": "XBRL Preparer",
      "ar": "مُعد XBRL"
    },
    "summary": {
      "en": "Conditional financial disclosures and bilingual narrative",
      "ar": "إفصاحات مالية مشروطة ونصوص ثنائية اللغة"
    },
    "fields": [
      {
        "en": "Disclosure form",
        "ar": "نموذج الإفصاح",
        "kind": "reference"
      },
      {
        "en": "Reporting period",
        "ar": "الفترة المالية",
        "kind": "reference"
      },
      {
        "en": "English narrative",
        "ar": "النص الإنجليزي",
        "kind": "textarea"
      },
      {
        "en": "Arabic narrative",
        "ar": "النص العربي",
        "kind": "textarea"
      },
      {
        "en": "Supporting document",
        "ar": "المستند المؤيد",
        "kind": "reference"
      },
      {
        "en": "Completeness status",
        "ar": "حالة الاكتمال",
        "kind": "readonly"
      }
    ],
    "columns": [
      {
        "en": "Disclosure section",
        "ar": "قسم الإفصاح"
      },
      {
        "en": "Required status",
        "ar": "حالة الإلزام"
      },
      {
        "en": "Narrative",
        "ar": "النص"
      },
      {
        "en": "Evidence",
        "ar": "الدليل"
      },
      {
        "en": "Validation",
        "ar": "التحقق"
      }
    ],
    "actions": [
      {
        "en": "Save draft",
        "ar": "حفظ المسودة"
      },
      {
        "en": "Check completeness",
        "ar": "فحص الاكتمال"
      },
      {
        "en": "Submit",
        "ar": "إرسال"
      }
    ],
    "gate": {
      "en": "Mandatory fields and template rules depend on an approved filing obligation.",
      "ar": "تتحدد الحقول الإلزامية وقواعد النموذج حسب التزام تقديم معتمد."
    }
  },
  {
    "id": "SCR-014",
    "route": "/xbrl-validation",
    "group": "xbrl",
    "layout": "register",
    "entity": false,
    "title": {
      "en": "XBRL validation centre",
      "ar": "مركز التحقق من XBRL"
    },
    "audience": {
      "en": "XBRL Preparer",
      "ar": "مُعد XBRL"
    },
    "summary": {
      "en": "Diagnostic errors, facts, rules and correction links",
      "ar": "أخطاء التشخيص والوقائع والقواعد وروابط التصحيح"
    },
    "fields": [
      {
        "en": "Validation run ID",
        "ar": "معرف تشغيل التحقق",
        "kind": "text"
      },
      {
        "en": "Rule severity",
        "ar": "شدة القاعدة",
        "kind": "reference"
      },
      {
        "en": "Rule ID",
        "ar": "معرف القاعدة",
        "kind": "text"
      },
      {
        "en": "Source fact",
        "ar": "الواقعة المصدر",
        "kind": "reference"
      },
      {
        "en": "Package hash",
        "ar": "بصمة الحزمة",
        "kind": "text"
      },
      {
        "en": "Responsible owner",
        "ar": "المسؤول",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Severity",
        "ar": "الدرجة"
      },
      {
        "en": "Rule",
        "ar": "القاعدة"
      },
      {
        "en": "Fact",
        "ar": "الواقعة"
      },
      {
        "en": "Source",
        "ar": "المصدر"
      },
      {
        "en": "Owner",
        "ar": "المسؤول"
      },
      {
        "en": "Status",
        "ar": "الحالة"
      }
    ],
    "actions": [
      {
        "en": "Run validation",
        "ar": "تشغيل التحقق"
      },
      {
        "en": "Open correction",
        "ar": "فتح التصحيح"
      },
      {
        "en": "Acknowledge warning",
        "ar": "الإقرار بالتحذير"
      }
    ],
    "gate": {
      "en": "Blocking errors and stale validation hashes cannot be bypassed.",
      "ar": "لا يجوز تجاوز أخطاء التحقق الحاجزة أو بصمات التحقق القديمة."
    }
  },
  {
    "id": "SCR-015",
    "route": "/xbrl-preview",
    "group": "xbrl",
    "layout": "review",
    "entity": false,
    "title": {
      "en": "XBRL filing preview",
      "ar": "معاينة ملف XBRL"
    },
    "audience": {
      "en": "Preparer / Auditor / CFO",
      "ar": "المُعد / المدقق / المدير المالي"
    },
    "summary": {
      "en": "Inspect versioned facts, rendered statements and reviewer notes",
      "ar": "فحص الوقائع ذات الإصدارات والقوائم المعروضة وملاحظات المراجع"
    },
    "fields": [
      {
        "en": "Candidate filing version",
        "ar": "إصدار الملف المرشح",
        "kind": "readonly"
      },
      {
        "en": "Filing hash",
        "ar": "بصمة الملف",
        "kind": "readonly"
      },
      {
        "en": "Reporting context",
        "ar": "سياق التقرير",
        "kind": "readonly"
      },
      {
        "en": "Comparison version",
        "ar": "الإصدار المقارن",
        "kind": "reference"
      },
      {
        "en": "Reviewer note",
        "ar": "ملاحظة المراجع",
        "kind": "textarea"
      }
    ],
    "columns": [
      {
        "en": "Rendered section",
        "ar": "القسم المعروض"
      },
      {
        "en": "Fact count",
        "ar": "عدد الوقائع"
      },
      {
        "en": "Context",
        "ar": "السياق"
      },
      {
        "en": "Validation",
        "ar": "التحقق"
      },
      {
        "en": "Review note",
        "ar": "ملاحظة المراجعة"
      }
    ],
    "actions": [
      {
        "en": "Inspect fact",
        "ar": "فحص الواقعة"
      },
      {
        "en": "Comment",
        "ar": "تعليق"
      },
      {
        "en": "Request correction",
        "ar": "طلب تصحيح"
      }
    ],
    "gate": {
      "en": "Actual filing and hash are absent; no fabricated regulator rendering is shown.",
      "ar": "لا يوجد ملف فعلي أو بصمة؛ لا تُعرض معاينة تنظيمية مفترضة."
    }
  },
  {
    "id": "SCR-016",
    "route": "/xbrl-package",
    "group": "xbrl",
    "layout": "review",
    "entity": true,
    "title": {
      "en": "Generate XBRL package",
      "ar": "إنشاء حزمة XBRL"
    },
    "audience": {
      "en": "Preparer / Filing Officer",
      "ar": "المُعد / مسؤول التقديم"
    },
    "summary": {
      "en": "Candidate package evidence, validation and final hash lock",
      "ar": "أدلة الحزمة المرشحة والتحقق وقفل البصمة النهائية"
    },
    "fields": [
      {
        "en": "Filing obligation",
        "ar": "التزام التقديم",
        "kind": "reference"
      },
      {
        "en": "Approved financial statement",
        "ar": "القوائم المالية المعتمدة",
        "kind": "reference"
      },
      {
        "en": "Taxonomy version",
        "ar": "إصدار التصنيف",
        "kind": "reference"
      },
      {
        "en": "Mapping version",
        "ar": "إصدار الربط",
        "kind": "readonly"
      },
      {
        "en": "Candidate file hash",
        "ar": "بصمة الملف المرشح",
        "kind": "readonly"
      },
      {
        "en": "Validation input hash",
        "ar": "بصمة مدخلات التحقق",
        "kind": "readonly"
      }
    ],
    "columns": [
      {
        "en": "Candidate version",
        "ar": "إصدار المرشح"
      },
      {
        "en": "File hash",
        "ar": "بصمة الملف"
      },
      {
        "en": "Validation hash",
        "ar": "بصمة التحقق"
      },
      {
        "en": "Approval state",
        "ar": "حالة الاعتماد"
      }
    ],
    "actions": [
      {
        "en": "Diagnostic draft",
        "ar": "مسودة تشخيصية"
      },
      {
        "en": "Prepare candidate",
        "ar": "إعداد المرشح"
      },
      {
        "en": "Finalize approved bytes",
        "ar": "اعتماد البايتات المعتمدة"
      },
      {
        "en": "Download package",
        "ar": "تنزيل الحزمة"
      }
    ],
    "gate": {
      "en": "Finalization may not modify the exact candidate bytes previously approved by the signatory.",
      "ar": "لا يجوز للتثبيت تغيير بايتات المرشح التي اعتمدها المفوض بالتوقيع."
    }
  },
  {
    "id": "SCR-017",
    "route": "/filing-approvals",
    "group": "xbrl",
    "layout": "approval",
    "entity": false,
    "title": {
      "en": "Regulatory filing approval",
      "ar": "اعتماد الملف التنظيمي"
    },
    "audience": {
      "en": "CFO / Signatory",
      "ar": "المدير المالي / المفوض"
    },
    "summary": {
      "en": "Review immutable package hash, validation and signatory evidence",
      "ar": "مراجعة بصمة الحزمة الثابتة والتحقق وأدلة المفوض"
    },
    "fields": [
      {
        "en": "Filing obligation",
        "ar": "التزام التقديم",
        "kind": "readonly"
      },
      {
        "en": "Candidate version",
        "ar": "إصدار المرشح",
        "kind": "readonly"
      },
      {
        "en": "Exact package hash",
        "ar": "بصمة الحزمة الدقيقة",
        "kind": "readonly"
      },
      {
        "en": "Validation result",
        "ar": "نتيجة التحقق",
        "kind": "readonly"
      },
      {
        "en": "Review comment",
        "ar": "تعليق المراجعة",
        "kind": "textarea"
      }
    ],
    "columns": [
      {
        "en": "Filing",
        "ar": "الملف"
      },
      {
        "en": "Prepared by",
        "ar": "أعده"
      },
      {
        "en": "Candidate hash",
        "ar": "بصمة المرشح"
      },
      {
        "en": "Validation",
        "ar": "التحقق"
      },
      {
        "en": "Approval status",
        "ar": "حالة الاعتماد"
      }
    ],
    "actions": [
      {
        "en": "Approve candidate",
        "ar": "اعتماد المرشح"
      },
      {
        "en": "Reject",
        "ar": "رفض"
      },
      {
        "en": "Request changes",
        "ar": "طلب تعديلات"
      }
    ],
    "gate": {
      "en": "Approver cannot approve their own package or stale hash; exact version is mandatory.",
      "ar": "لا يجوز اعتماد الحزمة ذاتياً أو اعتماد بصمة قديمة؛ يجب تطابق الإصدار."
    }
  },
  {
    "id": "SCR-018",
    "route": "/submissions",
    "group": "xbrl",
    "layout": "register",
    "entity": false,
    "title": {
      "en": "Submission register",
      "ar": "سجل التقديمات"
    },
    "audience": {
      "en": "Filing Officer",
      "ar": "مسؤول التقديم"
    },
    "summary": {
      "en": "Portal submissions, receipts and final decision separation",
      "ar": "تقديمات البوابة والإيصالات والفصل بين الاستلام والقرار"
    },
    "fields": [
      {
        "en": "Filing package",
        "ar": "حزمة التقديم",
        "kind": "reference"
      },
      {
        "en": "Portal channel",
        "ar": "قناة البوابة",
        "kind": "reference"
      },
      {
        "en": "Operator",
        "ar": "المشغل",
        "kind": "reference"
      },
      {
        "en": "Portal reference",
        "ar": "مرجع البوابة",
        "kind": "text"
      },
      {
        "en": "Receipt / acknowledgement",
        "ar": "الإيصال / الإقرار",
        "kind": "reference"
      },
      {
        "en": "Outcome",
        "ar": "النتيجة",
        "kind": "readonly"
      }
    ],
    "columns": [
      {
        "en": "Package",
        "ar": "الحزمة"
      },
      {
        "en": "Portal reference",
        "ar": "مرجع البوابة"
      },
      {
        "en": "Submitted at",
        "ar": "تاريخ التقديم"
      },
      {
        "en": "Acknowledgement",
        "ar": "الإقرار"
      },
      {
        "en": "Authority decision",
        "ar": "قرار الجهة"
      }
    ],
    "actions": [
      {
        "en": "Export approved package",
        "ar": "تصدير الحزمة المعتمدة"
      },
      {
        "en": "Record upload",
        "ar": "تسجيل الرفع"
      },
      {
        "en": "Reconcile",
        "ar": "مطابقة"
      },
      {
        "en": "Resubmit",
        "ar": "إعادة التقديم"
      }
    ],
    "gate": {
      "en": "Portal acknowledgement is not regulatory acceptance; unknown outcome blocks blind retry.",
      "ar": "الإقرار بالاستلام ليس قبولاً تنظيمياً؛ النتيجة المجهولة تمنع إعادة المحاولة العمياء."
    }
  },
  {
    "id": "SCR-019",
    "route": "/audit-trail",
    "group": "audit",
    "layout": "register",
    "entity": false,
    "title": {
      "en": "Audit trail viewer",
      "ar": "عارض سجل التدقيق"
    },
    "audience": {
      "en": "Auditor / Admin",
      "ar": "المدقق / المسؤول"
    },
    "summary": {
      "en": "Append-only event history with actor, time and evidence",
      "ar": "سجل أحداث لا يقبل الإلحاق العكسي مع الممثل والوقت والأدلة"
    },
    "fields": [
      {
        "en": "Entity / record ID",
        "ar": "الكيان / معرف السجل",
        "kind": "text"
      },
      {
        "en": "Actor",
        "ar": "الفاعل",
        "kind": "reference"
      },
      {
        "en": "Event type",
        "ar": "نوع الحدث",
        "kind": "reference"
      },
      {
        "en": "From date",
        "ar": "من تاريخ",
        "kind": "date"
      },
      {
        "en": "To date",
        "ar": "إلى تاريخ",
        "kind": "date"
      },
      {
        "en": "Evidence reference",
        "ar": "مرجع الدليل",
        "kind": "text"
      }
    ],
    "columns": [
      {
        "en": "Timestamp",
        "ar": "الطابع الزمني"
      },
      {
        "en": "Actor",
        "ar": "الفاعل"
      },
      {
        "en": "Entity",
        "ar": "الكيان"
      },
      {
        "en": "Action",
        "ar": "الإجراء"
      },
      {
        "en": "Before / after",
        "ar": "قبل / بعد"
      },
      {
        "en": "Evidence",
        "ar": "الدليل"
      }
    ],
    "actions": [
      {
        "en": "Apply filters",
        "ar": "تطبيق المرشحات"
      },
      {
        "en": "Inspect event",
        "ar": "فحص الحدث"
      },
      {
        "en": "Export authorized",
        "ar": "تصدير المسموح"
      }
    ],
    "gate": {
      "en": "Only authorized, redacted append-only events may be exposed.",
      "ar": "لا تُعرض إلا أحداث التدقيق المسموح بها بعد إخفاء البيانات الحساسة."
    }
  },
  {
    "id": "SCR-020",
    "route": "/reports",
    "group": "reports",
    "layout": "register",
    "entity": false,
    "title": {
      "en": "Report centre",
      "ar": "مركز التقارير"
    },
    "audience": {
      "en": "Accountant / Management",
      "ar": "المحاسب / الإدارة"
    },
    "summary": {
      "en": "Company-scoped reports and parameter selection",
      "ar": "تقارير ضمن نطاق الشركة واختيار المعلمات"
    },
    "fields": [
      {
        "en": "Report definition",
        "ar": "تعريف التقرير",
        "kind": "reference"
      },
      {
        "en": "Fiscal period",
        "ar": "الفترة المالية",
        "kind": "reference"
      },
      {
        "en": "Branch",
        "ar": "الفرع",
        "kind": "reference"
      },
      {
        "en": "Report currency",
        "ar": "عملة التقرير",
        "kind": "reference"
      },
      {
        "en": "As-of date",
        "ar": "حتى تاريخ",
        "kind": "date"
      }
    ],
    "columns": [
      {
        "en": "Report ID",
        "ar": "معرف التقرير"
      },
      {
        "en": "Report title",
        "ar": "اسم التقرير"
      },
      {
        "en": "Scope",
        "ar": "النطاق"
      },
      {
        "en": "Last generated",
        "ar": "آخر إنشاء"
      },
      {
        "en": "Authorization",
        "ar": "الصلاحية"
      }
    ],
    "actions": [
      {
        "en": "Run report",
        "ar": "تشغيل التقرير"
      },
      {
        "en": "Drill into source",
        "ar": "عرض المصدر"
      },
      {
        "en": "Export",
        "ar": "تصدير"
      },
      {
        "en": "Schedule",
        "ar": "جدولة"
      }
    ],
    "gate": {
      "en": "Report formulas, cutoff, company grants and export permissions must be signed.",
      "ar": "يجب اعتماد صيغ التقارير وتواريخ القطع وصلاحيات الشركة والتصدير."
    }
  },
  {
    "id": "SCR-024",
    "route": "/journal-history",
    "group": "finance",
    "layout": "register",
    "entity": false,
    "title": {
      "en": "Journal list & posting history",
      "ar": "قائمة القيود وسجل الترحيل"
    },
    "audience": {
      "en": "Accountant / Finance",
      "ar": "المحاسب / المالية"
    },
    "summary": {
      "en": "Search posted vouchers, drafts, reversals and audit links",
      "ar": "بحث القيود المرحلة والمسودات والعكوس وروابط التدقيق"
    },
    "fields": [
      {
        "en": "Voucher number",
        "ar": "رقم القيد",
        "kind": "text"
      },
      {
        "en": "Posting status",
        "ar": "حالة الترحيل",
        "kind": "reference"
      },
      {
        "en": "From date",
        "ar": "من تاريخ",
        "kind": "date"
      },
      {
        "en": "To date",
        "ar": "إلى تاريخ",
        "kind": "date"
      },
      {
        "en": "Source type",
        "ar": "نوع المصدر",
        "kind": "reference"
      },
      {
        "en": "Created by",
        "ar": "أنشأه",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Voucher no.",
        "ar": "رقم القيد"
      },
      {
        "en": "Date",
        "ar": "التاريخ"
      },
      {
        "en": "Source",
        "ar": "المصدر"
      },
      {
        "en": "Status",
        "ar": "الحالة"
      },
      {
        "en": "Amount",
        "ar": "المبلغ"
      },
      {
        "en": "Created by",
        "ar": "أنشأه"
      }
    ],
    "actions": [
      {
        "en": "Search",
        "ar": "بحث"
      },
      {
        "en": "Open voucher",
        "ar": "فتح القيد"
      },
      {
        "en": "Authorized reversal",
        "ar": "عكس معتمد"
      }
    ],
    "gate": {
      "en": "Posted journal entries cannot be edited; reversals need a controlled link.",
      "ar": "لا يجوز تعديل القيود المرحلة؛ يلزم ربط موثق لقيود العكس."
    }
  },
  {
    "id": "SCR-025",
    "route": "/customer-receipts",
    "group": "sales",
    "layout": "workbench",
    "entity": true,
    "title": {
      "en": "Customer receipts & allocation",
      "ar": "إيصالات العملاء والتخصيص"
    },
    "audience": {
      "en": "Accountant",
      "ar": "المحاسب"
    },
    "summary": {
      "en": "Record receipt source and allocate against open invoices",
      "ar": "تسجيل مصدر الإيصال وتخصيصه للفواتير المفتوحة"
    },
    "fields": [
      {
        "en": "Customer",
        "ar": "العميل",
        "kind": "reference"
      },
      {
        "en": "Receipt date",
        "ar": "تاريخ الإيصال",
        "kind": "date"
      },
      {
        "en": "Cash / bank account",
        "ar": "الحساب النقدي / البنكي",
        "kind": "reference"
      },
      {
        "en": "Currency",
        "ar": "العملة",
        "kind": "reference"
      },
      {
        "en": "Receipt amount",
        "ar": "مبلغ الإيصال",
        "kind": "decimal"
      },
      {
        "en": "Receipt reference",
        "ar": "مرجع الإيصال",
        "kind": "text"
      }
    ],
    "columns": [
      {
        "en": "Invoice",
        "ar": "الفاتورة"
      },
      {
        "en": "Due date",
        "ar": "الاستحقاق"
      },
      {
        "en": "Open balance",
        "ar": "الرصيد المستحق"
      },
      {
        "en": "Applied amount",
        "ar": "المبلغ المخصص"
      },
      {
        "en": "Unapplied",
        "ar": "غير المخصص"
      }
    ],
    "actions": [
      {
        "en": "Record receipt",
        "ar": "تسجيل الإيصال"
      },
      {
        "en": "Allocate",
        "ar": "تخصيص"
      },
      {
        "en": "Refund",
        "ar": "استرداد"
      },
      {
        "en": "Reverse",
        "ar": "عكس"
      }
    ],
    "gate": {
      "en": "Amounts must use exact decimals, prevent over-allocation and reconcile AR.",
      "ar": "يجب استخدام أرقام عشرية دقيقة ومنع التخصيص الزائد ومطابقة الذمم المدينة."
    }
  },
  {
    "id": "SCR-026",
    "route": "/customer-ledger",
    "group": "sales",
    "layout": "register",
    "entity": false,
    "title": {
      "en": "Customer ledger & credit notes",
      "ar": "دفتر العملاء والإشعارات الدائنة"
    },
    "audience": {
      "en": "Accountant / Sales",
      "ar": "المحاسب / المبيعات"
    },
    "summary": {
      "en": "Receivables ageing, invoices, receipts and linked credit notes",
      "ar": "أعمار الذمم المدينة والفواتير والإيصالات والإشعارات المرتبطة"
    },
    "fields": [
      {
        "en": "Customer",
        "ar": "العميل",
        "kind": "reference"
      },
      {
        "en": "From date",
        "ar": "من تاريخ",
        "kind": "date"
      },
      {
        "en": "To date",
        "ar": "إلى تاريخ",
        "kind": "date"
      },
      {
        "en": "Document type",
        "ar": "نوع المستند",
        "kind": "reference"
      },
      {
        "en": "Ageing basis",
        "ar": "أساس الأعمار",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Date",
        "ar": "التاريخ"
      },
      {
        "en": "Document",
        "ar": "المستند"
      },
      {
        "en": "Invoice",
        "ar": "الفاتورة"
      },
      {
        "en": "Debit",
        "ar": "مدين"
      },
      {
        "en": "Credit",
        "ar": "دائن"
      },
      {
        "en": "Balance",
        "ar": "الرصيد"
      }
    ],
    "actions": [
      {
        "en": "View ledger",
        "ar": "عرض الدفتر"
      },
      {
        "en": "Issue credit note",
        "ar": "إصدار إشعار دائن"
      },
      {
        "en": "Allocate",
        "ar": "تخصيص"
      },
      {
        "en": "Export",
        "ar": "تصدير"
      }
    ],
    "gate": {
      "en": "Credit notes require original invoice linkage and cutoff reconciliation.",
      "ar": "تتطلب الإشعارات الدائنة الربط بالفاتورة الأصلية ومطابقة تاريخ القطع."
    }
  },
  {
    "id": "SCR-027",
    "route": "/supplier-payments",
    "group": "purchasing",
    "layout": "workbench",
    "entity": true,
    "title": {
      "en": "Supplier payments & allocation",
      "ar": "مدفوعات الموردين والتخصيص"
    },
    "audience": {
      "en": "Accountant",
      "ar": "المحاسب"
    },
    "summary": {
      "en": "Payables settlement and allocation against supplier bills",
      "ar": "تسوية الذمم الدائنة وتخصيص المدفوعات لفواتير الموردين"
    },
    "fields": [
      {
        "en": "Supplier",
        "ar": "المورد",
        "kind": "reference"
      },
      {
        "en": "Bank account",
        "ar": "الحساب البنكي",
        "kind": "reference"
      },
      {
        "en": "Payment date",
        "ar": "تاريخ الدفع",
        "kind": "date"
      },
      {
        "en": "Payment amount",
        "ar": "مبلغ الدفع",
        "kind": "decimal"
      },
      {
        "en": "Advance amount",
        "ar": "المبلغ المقدم",
        "kind": "decimal"
      },
      {
        "en": "Payment reference",
        "ar": "مرجع الدفع",
        "kind": "text"
      }
    ],
    "columns": [
      {
        "en": "Bill number",
        "ar": "رقم الفاتورة"
      },
      {
        "en": "Due date",
        "ar": "الاستحقاق"
      },
      {
        "en": "Unpaid balance",
        "ar": "الرصيد غير المدفوع"
      },
      {
        "en": "Applied",
        "ar": "المخصص"
      },
      {
        "en": "Remaining",
        "ar": "المتبقي"
      }
    ],
    "actions": [
      {
        "en": "Record payment",
        "ar": "تسجيل الدفع"
      },
      {
        "en": "Allocate",
        "ar": "تخصيص"
      },
      {
        "en": "Reverse payment",
        "ar": "عكس الدفع"
      }
    ],
    "gate": {
      "en": "AP reconciliation, duplicate prevention and bank permissions must be enforced.",
      "ar": "يجب تنفيذ مطابقة الذمم الدائنة ومنع التكرار وصلاحيات البنك."
    }
  },
  {
    "id": "SCR-028",
    "route": "/supplier-ledger",
    "group": "purchasing",
    "layout": "register",
    "entity": false,
    "title": {
      "en": "Supplier ledger & credits",
      "ar": "دفتر الموردين والإشعارات الدائنة"
    },
    "audience": {
      "en": "Accountant / Purchase",
      "ar": "المحاسب / المشتريات"
    },
    "summary": {
      "en": "Supplier invoices, payments, credit notes and ageing",
      "ar": "فواتير الموردين والمدفوعات والإشعارات الدائنة والأعمار"
    },
    "fields": [
      {
        "en": "Supplier",
        "ar": "المورد",
        "kind": "reference"
      },
      {
        "en": "From date",
        "ar": "من تاريخ",
        "kind": "date"
      },
      {
        "en": "To date",
        "ar": "إلى تاريخ",
        "kind": "date"
      },
      {
        "en": "Document type",
        "ar": "نوع المستند",
        "kind": "reference"
      },
      {
        "en": "Ageing basis",
        "ar": "أساس الأعمار",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Date",
        "ar": "التاريخ"
      },
      {
        "en": "Document",
        "ar": "المستند"
      },
      {
        "en": "Bill",
        "ar": "فاتورة المورد"
      },
      {
        "en": "Debit",
        "ar": "مدين"
      },
      {
        "en": "Credit",
        "ar": "دائن"
      },
      {
        "en": "Balance",
        "ar": "الرصيد"
      }
    ],
    "actions": [
      {
        "en": "View ledger",
        "ar": "عرض الدفتر"
      },
      {
        "en": "Supplier credit",
        "ar": "إشعار دائن للمورد"
      },
      {
        "en": "Reconcile",
        "ar": "مطابقة"
      }
    ],
    "gate": {
      "en": "Credit notes require original bill linkage and closed-period controls.",
      "ar": "تتطلب الإشعارات ربطاً بالفاتورة الأصلية وضوابط الفترة المقفلة."
    }
  },
  {
    "id": "SCR-029",
    "route": "/inventory",
    "group": "inventory",
    "layout": "master",
    "entity": true,
    "title": {
      "en": "Items, warehouses & stock ledger",
      "ar": "الأصناف والمستودعات ودفتر المخزون"
    },
    "audience": {
      "en": "Inventory",
      "ar": "المخزون"
    },
    "summary": {
      "en": "Item master, valuation settings and stock traceability",
      "ar": "بطاقات الأصناف وإعدادات التقييم وتتبع المخزون"
    },
    "fields": [
      {
        "en": "SKU",
        "ar": "رمز الصنف",
        "kind": "text"
      },
      {
        "en": "Item name",
        "ar": "اسم الصنف",
        "kind": "text"
      },
      {
        "en": "Unit of measure",
        "ar": "وحدة القياس",
        "kind": "reference"
      },
      {
        "en": "Barcode",
        "ar": "الباركود",
        "kind": "text"
      },
      {
        "en": "Warehouse",
        "ar": "المستودع",
        "kind": "reference"
      },
      {
        "en": "Cost method",
        "ar": "طريقة التكلفة",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Item / SKU",
        "ar": "الصنف / الرمز"
      },
      {
        "en": "Warehouse",
        "ar": "المستودع"
      },
      {
        "en": "Batch",
        "ar": "الدفعة"
      },
      {
        "en": "On hand",
        "ar": "المتوفر"
      },
      {
        "en": "Reserved",
        "ar": "المحجوز"
      },
      {
        "en": "Value",
        "ar": "القيمة"
      }
    ],
    "actions": [
      {
        "en": "Create item",
        "ar": "إنشاء صنف"
      },
      {
        "en": "Deactivate",
        "ar": "تعطيل"
      },
      {
        "en": "View movements",
        "ar": "عرض الحركات"
      }
    ],
    "gate": {
      "en": "SKU uniqueness, immutable posted movements and approved valuation method required.",
      "ar": "يلزم تفرد رمز الصنف وثبات الحركات المرحلة واعتماد طريقة التقييم."
    }
  },
  {
    "id": "SCR-030",
    "route": "/stock-movements",
    "group": "inventory",
    "layout": "workbench",
    "entity": true,
    "title": {
      "en": "Goods receipt, transfer & stock count",
      "ar": "الاستلام والنقل والجرد"
    },
    "audience": {
      "en": "Inventory",
      "ar": "المخزون"
    },
    "summary": {
      "en": "Movement lines for receipt, transfer and physical count",
      "ar": "سطور حركات الاستلام والنقل والجرد الفعلي"
    },
    "fields": [
      {
        "en": "Movement type",
        "ar": "نوع الحركة",
        "kind": "reference"
      },
      {
        "en": "From warehouse",
        "ar": "من مستودع",
        "kind": "reference"
      },
      {
        "en": "To warehouse",
        "ar": "إلى مستودع",
        "kind": "reference"
      },
      {
        "en": "Movement date",
        "ar": "تاريخ الحركة",
        "kind": "date"
      },
      {
        "en": "Reason",
        "ar": "السبب",
        "kind": "textarea"
      }
    ],
    "columns": [
      {
        "en": "Item",
        "ar": "الصنف"
      },
      {
        "en": "UOM",
        "ar": "الوحدة"
      },
      {
        "en": "Expected qty",
        "ar": "الكمية المتوقعة"
      },
      {
        "en": "Actual qty",
        "ar": "الكمية الفعلية"
      },
      {
        "en": "Variance",
        "ar": "الانحراف"
      },
      {
        "en": "Unit cost",
        "ar": "تكلفة الوحدة"
      }
    ],
    "actions": [
      {
        "en": "Receive",
        "ar": "استلام"
      },
      {
        "en": "Transfer",
        "ar": "نقل"
      },
      {
        "en": "Count",
        "ar": "جرد"
      },
      {
        "en": "Submit",
        "ar": "إرسال"
      },
      {
        "en": "Post stock",
        "ar": "ترحيل المخزون"
      }
    ],
    "gate": {
      "en": "No cross-company transfer shortcut, negative-stock bypass or duplicate posting.",
      "ar": "لا يُسمح بنقل يتجاوز الشركة أو بمخزون سالب غير مصرح أو ترحيل مكرر."
    }
  },
  {
    "id": "SCR-031",
    "route": "/cash-bank",
    "group": "banking",
    "layout": "register",
    "entity": true,
    "title": {
      "en": "Cash & bank registers",
      "ar": "سجلات النقد والبنوك"
    },
    "audience": {
      "en": "Accountant",
      "ar": "المحاسب"
    },
    "summary": {
      "en": "Cash receipts, bank payments, transfers and statement links",
      "ar": "الإيصالات النقدية والمدفوعات البنكية والتحويلات والكشوف"
    },
    "fields": [
      {
        "en": "Cash / bank account",
        "ar": "الحساب النقدي / البنكي",
        "kind": "reference"
      },
      {
        "en": "Transaction type",
        "ar": "نوع المعاملة",
        "kind": "reference"
      },
      {
        "en": "Transaction date",
        "ar": "تاريخ المعاملة",
        "kind": "date"
      },
      {
        "en": "Amount",
        "ar": "المبلغ",
        "kind": "decimal"
      },
      {
        "en": "External reference",
        "ar": "المرجع الخارجي",
        "kind": "text"
      }
    ],
    "columns": [
      {
        "en": "Date",
        "ar": "التاريخ"
      },
      {
        "en": "Type",
        "ar": "النوع"
      },
      {
        "en": "Account",
        "ar": "الحساب"
      },
      {
        "en": "Reference",
        "ar": "المرجع"
      },
      {
        "en": "Debit",
        "ar": "مدين"
      },
      {
        "en": "Credit",
        "ar": "دائن"
      }
    ],
    "actions": [
      {
        "en": "Record receipt",
        "ar": "تسجيل إيصال"
      },
      {
        "en": "Record payment",
        "ar": "تسجيل دفع"
      },
      {
        "en": "Transfer",
        "ar": "تحويل"
      },
      {
        "en": "Import statement",
        "ar": "استيراد الكشف"
      }
    ],
    "gate": {
      "en": "Journal balance, period locks and idempotent references await backend approval.",
      "ar": "توازن القيود وإقفال الفترات ومراجع منع التكرار بانتظار اعتماد الخادم."
    }
  },
  {
    "id": "SCR-032",
    "route": "/closing",
    "group": "finance",
    "layout": "review",
    "entity": false,
    "title": {
      "en": "Period closing checklist",
      "ar": "قائمة إقفال الفترة"
    },
    "audience": {
      "en": "Finance Manager",
      "ar": "مدير المالية"
    },
    "summary": {
      "en": "Reconciliation completion, blockers and close authorization",
      "ar": "اكتمال المطابقات والمعوقات وتفويض الإقفال"
    },
    "fields": [
      {
        "en": "Fiscal period",
        "ar": "الفترة المالية",
        "kind": "reference"
      },
      {
        "en": "Close owner",
        "ar": "مسؤول الإقفال",
        "kind": "reference"
      },
      {
        "en": "Reconciliation status",
        "ar": "حالة المطابقة",
        "kind": "readonly"
      },
      {
        "en": "Blocking exceptions",
        "ar": "الاستثناءات الحاجزة",
        "kind": "readonly"
      },
      {
        "en": "Close evidence",
        "ar": "دليل الإقفال",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Check item",
        "ar": "بند الفحص"
      },
      {
        "en": "Owner",
        "ar": "المسؤول"
      },
      {
        "en": "Status",
        "ar": "الحالة"
      },
      {
        "en": "Exceptions",
        "ar": "الاستثناءات"
      },
      {
        "en": "Evidence",
        "ar": "الدليل"
      }
    ],
    "actions": [
      {
        "en": "Run checks",
        "ar": "تشغيل الفحوصات"
      },
      {
        "en": "Assign owner",
        "ar": "تعيين مسؤول"
      },
      {
        "en": "Close period",
        "ar": "إقفال الفترة"
      },
      {
        "en": "Request reopen",
        "ar": "طلب إعادة فتح"
      }
    ],
    "gate": {
      "en": "Closing requires every blocking control and independent approval to pass.",
      "ar": "يتطلب الإقفال اجتياز كل فحص حاجز وموافقة مستقلة."
    }
  },
  {
    "id": "SCR-033",
    "route": "/approvals",
    "group": "finance",
    "layout": "approval",
    "entity": false,
    "title": {
      "en": "Unified approval inbox",
      "ar": "صندوق الموافقات الموحد"
    },
    "audience": {
      "en": "Approvers",
      "ar": "المعتمدون"
    },
    "summary": {
      "en": "Scoped approval requests with maker, version and evidence",
      "ar": "طلبات موافقة ضمن النطاق مع المُنشئ والإصدار والدليل"
    },
    "fields": [
      {
        "en": "Document type",
        "ar": "نوع المستند",
        "kind": "reference"
      },
      {
        "en": "Maker",
        "ar": "المُنشئ",
        "kind": "reference"
      },
      {
        "en": "Company scope",
        "ar": "نطاق الشركة",
        "kind": "readonly"
      },
      {
        "en": "From date",
        "ar": "من تاريخ",
        "kind": "date"
      },
      {
        "en": "Approval state",
        "ar": "حالة الموافقة",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Document",
        "ar": "المستند"
      },
      {
        "en": "Maker",
        "ar": "المُنشئ"
      },
      {
        "en": "Version",
        "ar": "الإصدار"
      },
      {
        "en": "Amount",
        "ar": "المبلغ"
      },
      {
        "en": "Threshold",
        "ar": "الحد"
      },
      {
        "en": "Evidence",
        "ar": "الدليل"
      }
    ],
    "actions": [
      {
        "en": "Approve",
        "ar": "اعتماد"
      },
      {
        "en": "Reject",
        "ar": "رفض"
      },
      {
        "en": "Request changes",
        "ar": "طلب تعديل"
      },
      {
        "en": "Delegate if allowed",
        "ar": "تفويض إن سُمح"
      }
    ],
    "gate": {
      "en": "Self-approval, stale versions and approvals beyond authority are forbidden.",
      "ar": "يُمنع اعتماد الذات والإصدارات القديمة والموافقات خارج حدود التفويض."
    }
  },
  {
    "id": "SCR-034",
    "route": "/auditor-workspace",
    "group": "audit",
    "layout": "review",
    "entity": false,
    "title": {
      "en": "Auditor workspace & evidence",
      "ar": "مساحة المدقق والأدلة"
    },
    "audience": {
      "en": "Auditor",
      "ar": "المدقق"
    },
    "summary": {
      "en": "Engagement-scoped evidence, comments and review requests",
      "ar": "أدلة وملاحظات وطلبات مراجعة ضمن نطاق مهمة التدقيق"
    },
    "fields": [
      {
        "en": "Audit engagement",
        "ar": "مهمة التدقيق",
        "kind": "reference"
      },
      {
        "en": "Legal entity",
        "ar": "الكيان القانوني",
        "kind": "reference"
      },
      {
        "en": "Evidence category",
        "ar": "فئة الأدلة",
        "kind": "reference"
      },
      {
        "en": "Source reference",
        "ar": "مرجع المصدر",
        "kind": "text"
      },
      {
        "en": "Reviewer comment",
        "ar": "تعليق المراجع",
        "kind": "textarea"
      }
    ],
    "columns": [
      {
        "en": "Evidence",
        "ar": "الدليل"
      },
      {
        "en": "Source",
        "ar": "المصدر"
      },
      {
        "en": "Date",
        "ar": "التاريخ"
      },
      {
        "en": "Review status",
        "ar": "حالة المراجعة"
      },
      {
        "en": "Owner",
        "ar": "المسؤول"
      }
    ],
    "actions": [
      {
        "en": "Review evidence",
        "ar": "مراجعة الدليل"
      },
      {
        "en": "Comment",
        "ar": "تعليق"
      },
      {
        "en": "Request evidence",
        "ar": "طلب دليل"
      },
      {
        "en": "Export",
        "ar": "تصدير"
      }
    ],
    "gate": {
      "en": "Engagement expiry and source permissions must gate every evidence item.",
      "ar": "يجب تطبيق انتهاء مهمة التدقيق وصلاحيات المصدر على كل دليل."
    }
  },
  {
    "id": "SCR-035",
    "route": "/integration-jobs",
    "group": "audit",
    "layout": "register",
    "entity": false,
    "title": {
      "en": "Integration jobs & failures",
      "ar": "مهام التكامل والأخطاء"
    },
    "audience": {
      "en": "Admin / Operations",
      "ar": "المسؤول / العمليات"
    },
    "summary": {
      "en": "Inbound events, safe retries, errors and reconciliation history",
      "ar": "الأحداث الواردة والمحاولات الآمنة والأخطاء وسجل المطابقة"
    },
    "fields": [
      {
        "en": "Integration source",
        "ar": "مصدر التكامل",
        "kind": "reference"
      },
      {
        "en": "Event ID",
        "ar": "معرف الحدث",
        "kind": "text"
      },
      {
        "en": "Batch ID",
        "ar": "معرف الدفعة",
        "kind": "text"
      },
      {
        "en": "Job status",
        "ar": "حالة المهمة",
        "kind": "reference"
      },
      {
        "en": "From date",
        "ar": "من تاريخ",
        "kind": "date"
      },
      {
        "en": "To date",
        "ar": "إلى تاريخ",
        "kind": "date"
      }
    ],
    "columns": [
      {
        "en": "Source",
        "ar": "المصدر"
      },
      {
        "en": "Event",
        "ar": "الحدث"
      },
      {
        "en": "Batch",
        "ar": "الدفعة"
      },
      {
        "en": "Status",
        "ar": "الحالة"
      },
      {
        "en": "Error summary",
        "ar": "ملخص الخطأ"
      },
      {
        "en": "Reconciled",
        "ar": "تمت المطابقة"
      }
    ],
    "actions": [
      {
        "en": "Inspect job",
        "ar": "فحص المهمة"
      },
      {
        "en": "Safe retry",
        "ar": "إعادة محاولة آمنة"
      },
      {
        "en": "Resolve",
        "ar": "معالجة"
      },
      {
        "en": "Download log",
        "ar": "تنزيل السجل"
      }
    ],
    "gate": {
      "en": "Never retry an unknown posting result blindly; no credentials in logs.",
      "ar": "لا تُكرر نتيجة ترحيل مجهولة عشوائياً؛ ولا تُعرض أسرار في السجلات."
    }
  },
  {
    "id": "SCR-036",
    "route": "/filing-workspace",
    "group": "xbrl",
    "layout": "wizard",
    "entity": false,
    "title": {
      "en": "Filing workspace wizard",
      "ar": "معالج إعداد الملف التنظيمي"
    },
    "audience": {
      "en": "XBRL / Filing Officer",
      "ar": "XBRL / مسؤول التقديم"
    },
    "summary": {
      "en": "Obligation → source snapshot → taxonomy → mapping → validation → package",
      "ar": "الالتزام ثم نسخة المصدر والتصنيف والربط والتحقق والحزمة"
    },
    "fields": [
      {
        "en": "Filing obligation",
        "ar": "التزام التقديم",
        "kind": "reference"
      },
      {
        "en": "Source snapshot",
        "ar": "النسخة المصدر",
        "kind": "readonly"
      },
      {
        "en": "Taxonomy",
        "ar": "التصنيف",
        "kind": "reference"
      },
      {
        "en": "Mapping status",
        "ar": "حالة الربط",
        "kind": "readonly"
      },
      {
        "en": "Validation status",
        "ar": "حالة التحقق",
        "kind": "readonly"
      },
      {
        "en": "Package candidate",
        "ar": "الحزمة المرشحة",
        "kind": "readonly"
      }
    ],
    "columns": [
      {
        "en": "Step",
        "ar": "الخطوة"
      },
      {
        "en": "Dependency",
        "ar": "الاعتماد"
      },
      {
        "en": "Status",
        "ar": "الحالة"
      },
      {
        "en": "Evidence",
        "ar": "الدليل"
      }
    ],
    "actions": [
      {
        "en": "Save checkpoint",
        "ar": "حفظ نقطة تقدم"
      },
      {
        "en": "Resume",
        "ar": "استئناف"
      },
      {
        "en": "Hand off",
        "ar": "تسليم"
      }
    ],
    "gate": {
      "en": "Every filing stage requires current approved inputs; stale changes invalidate downstream results.",
      "ar": "كل مرحلة تتطلب مدخلات معتمدة حالية؛ التعديلات القديمة تلغي النتائج التابعة."
    }
  },
  {
    "id": "SCR-037",
    "route": "/filing-receipts",
    "group": "xbrl",
    "layout": "review",
    "entity": false,
    "title": {
      "en": "Filing receipt & status reconciliation",
      "ar": "مطابقة إيصال التقديم وحالته"
    },
    "audience": {
      "en": "Filing Officer",
      "ar": "مسؤول التقديم"
    },
    "summary": {
      "en": "Portal acknowledgement and final decision history",
      "ar": "سجل إقرار البوابة وقرار الجهة النهائي"
    },
    "fields": [
      {
        "en": "Portal reference",
        "ar": "مرجع البوابة",
        "kind": "text"
      },
      {
        "en": "Filing package version",
        "ar": "إصدار حزمة التقديم",
        "kind": "readonly"
      },
      {
        "en": "Submission operator",
        "ar": "مشغل التقديم",
        "kind": "reference"
      },
      {
        "en": "Receipt evidence",
        "ar": "دليل الإيصال",
        "kind": "reference"
      },
      {
        "en": "Authority status",
        "ar": "حالة الجهة",
        "kind": "readonly"
      },
      {
        "en": "Decision date",
        "ar": "تاريخ القرار",
        "kind": "date"
      }
    ],
    "columns": [
      {
        "en": "Event time",
        "ar": "وقت الحدث"
      },
      {
        "en": "Status event",
        "ar": "حدث الحالة"
      },
      {
        "en": "Operator",
        "ar": "المشغل"
      },
      {
        "en": "Receipt",
        "ar": "الإيصال"
      },
      {
        "en": "Evidence",
        "ar": "الدليل"
      }
    ],
    "actions": [
      {
        "en": "Record receipt",
        "ar": "تسجيل الإيصال"
      },
      {
        "en": "Verify status",
        "ar": "التحقق من الحالة"
      },
      {
        "en": "Reject status",
        "ar": "رفض الحالة"
      },
      {
        "en": "Resubmit",
        "ar": "إعادة التقديم"
      }
    ],
    "gate": {
      "en": "Receipt is not legal acceptance; unknown outcomes preserve immutable history.",
      "ar": "الإيصال ليس قبولاً قانونياً؛ النتائج غير المعروفة تحفظ السجل الثابت."
    }
  },
  {
    "id": "SCR-038",
    "route": "/report-filters",
    "group": "reports",
    "layout": "builder",
    "entity": false,
    "title": {
      "en": "Report definitions & filters",
      "ar": "تعريفات التقارير والمرشحات"
    },
    "audience": {
      "en": "Report Users / Admin",
      "ar": "مستخدمو التقارير / المسؤول"
    },
    "summary": {
      "en": "Versioned report definition, scope, cutoffs and export options",
      "ar": "تعريف التقرير بالإصدارات والنطاق وفترات القطع وخيارات التصدير"
    },
    "fields": [
      {
        "en": "Report ID",
        "ar": "معرف التقرير",
        "kind": "reference"
      },
      {
        "en": "Company scope",
        "ar": "نطاق الشركة",
        "kind": "readonly"
      },
      {
        "en": "Period cutoff",
        "ar": "تاريخ القطع",
        "kind": "date"
      },
      {
        "en": "Comparison",
        "ar": "المقارنة",
        "kind": "reference"
      },
      {
        "en": "Column preset",
        "ar": "إعداد الأعمدة",
        "kind": "reference"
      },
      {
        "en": "Export format",
        "ar": "صيغة التصدير",
        "kind": "reference"
      }
    ],
    "columns": [
      {
        "en": "Parameter",
        "ar": "المعلمة"
      },
      {
        "en": "Selected value",
        "ar": "القيمة المحددة"
      },
      {
        "en": "Source version",
        "ar": "إصدار المصدر"
      },
      {
        "en": "Authorization",
        "ar": "الصلاحية"
      }
    ],
    "actions": [
      {
        "en": "Apply filters",
        "ar": "تطبيق المرشحات"
      },
      {
        "en": "Save preset",
        "ar": "حفظ الإعداد"
      },
      {
        "en": "Run report",
        "ar": "تشغيل التقرير"
      }
    ],
    "gate": {
      "en": "Report-level formula, scope and preset permissions must be approved first.",
      "ar": "يجب اعتماد معادلات التقرير ونطاقه وصلاحيات إعداد المرشحات أولاً."
    }
  }
];
