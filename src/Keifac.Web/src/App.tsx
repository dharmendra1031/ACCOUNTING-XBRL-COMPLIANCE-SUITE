import { useEffect, useState, type ReactNode } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router";

const translations = {
  en: {
    brand: "KEIFAC",
    section: "ACCOUNTING",
    preview: "Development preview",
    overview: "Overview",
    accounts: "Chart of Accounts",
    journals: "Journal vouchers",
    workspace: "Accounting workspace",
    company: "Company context",
    unavailable: "Not connected",
    intro: "A clean foundation for the accounting application.",
    notice: "This is a UI preview. Authentication, company data and financial transactions are not connected.",
    quickAccess: "Workspaces",
    accountsDetail: "Account management workspace",
    journalsDetail: "Journal entry and posting workspace",
    browse: "Open preview",
    accountList: "Accounts",
    accountDetail: "Account details",
    journalHeader: "Voucher details",
    journalLines: "Debit and credit lines",
    empty: "No live records",
    accountEmpty: "Accounts will appear after the approved company and chart-of-accounts APIs are connected.",
    journalEmpty: "Journal entries will appear after identity, authorization and finance posting policy are approved.",
    noSelection: "No record selected",
    recordId: "ID",
    recordIdHint: "Auto-generated on save",
    voucherNo: "Voucher number",
    assignedOnIssue: "Assigned on issue",
    account: "Account",
    debit: "Debit",
    credit: "Credit",
    difference: "Difference",
    noAmount: "Not calculated",
    gate: "Next development gate",
    gateDetail: "Finalize tenant isolation, identity provider, numeric IDs and approved accounting rules before enabling financial actions.",
    language: "Switch to Arabic",
    progress: "Foundation only",
  },
  ar: {
    brand: "كيفاك",
    section: "المحاسبة",
    preview: "معاينة التطوير",
    overview: "نظرة عامة",
    accounts: "دليل الحسابات",
    journals: "قيود اليومية",
    workspace: "مساحة عمل المحاسبة",
    company: "سياق الشركة",
    unavailable: "غير متصل",
    intro: "أساس منظم لتطبيق المحاسبة.",
    notice: "هذه معاينة للواجهة فقط. لم يتم ربط تسجيل الدخول أو بيانات الشركة أو المعاملات المالية.",
    quickAccess: "مساحات العمل",
    accountsDetail: "مساحة إدارة الحسابات",
    journalsDetail: "مساحة قيود اليومية والترحيل",
    browse: "فتح المعاينة",
    accountList: "الحسابات",
    accountDetail: "تفاصيل الحساب",
    journalHeader: "تفاصيل القيد",
    journalLines: "سطور المدين والدائن",
    empty: "لا توجد سجلات فعلية",
    accountEmpty: "تظهر الحسابات بعد ربط واجهات الشركة ودليل الحسابات المعتمدة.",
    journalEmpty: "تظهر القيود بعد اعتماد الهوية والصلاحيات وسياسة الترحيل المالي.",
    noSelection: "لم يتم تحديد سجل",
    recordId: "المعرّف",
    recordIdHint: "يُنشأ تلقائياً عند الحفظ",
    voucherNo: "رقم القيد",
    assignedOnIssue: "يُخصص عند الإصدار",
    account: "الحساب",
    debit: "مدين",
    credit: "دائن",
    difference: "الفرق",
    noAmount: "غير محسوب",
    gate: "المرحلة الهندسية التالية",
    gateDetail: "اعتماد عزل الشركات والهوية والمعرفات الرقمية والسياسات المحاسبية قبل تفعيل الإجراءات المالية.",
    language: "Switch to English",
    progress: "الأساس فقط",
  },
};

type Language = keyof typeof translations;
type Labels = { [K in keyof (typeof translations)["en"]]: string };

function Surface({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="surface">
      <h2 className="surface-title">{title}</h2>
      {children}
    </section>
  );
}

function Empty({ title, description }: { title: string; description: string }) {
  return (
    <div className="empty-state">
      <span className="empty-symbol" aria-hidden="true">—</span>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}

function Overview({ t }: { t: Labels }) {
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">{t.preview}</span>
        <h1>{t.workspace}</h1>
        <p>{t.intro}</p>
      </div>
      <Surface title={t.quickAccess}>
        <div className="quick-grid">
          {[
            { path: "/accounts", name: t.accounts, detail: t.accountsDetail, number: "01" },
            { path: "/journals", name: t.journals, detail: t.journalsDetail, number: "02" },
          ].map((item) => (
            <NavLink className="quick-card" key={item.path} to={item.path}>
              <span className="quick-number">{item.number}</span>
              <strong>{item.name}</strong>
              <span className="muted">{item.detail}</span>
              <span className="link-label">{t.browse} →</span>
            </NavLink>
          ))}
        </div>
      </Surface>
      <Surface title={t.gate}><p className="muted">{t.gateDetail}</p></Surface>
    </>
  );
}

function Accounts({ t }: { t: Labels }) {
  return (
    <>
      <PageHeading title={t.accounts} subtitle={t.accountsDetail} preview={t.preview} />
      <div className="split-grid">
        <Surface title={t.accountList}>
          <Empty title={t.empty} description={t.accountEmpty} />
        </Surface>
        <Surface title={t.accountDetail}>
          <div className="readonly-field">
            <label>{t.recordId}</label>
            <output>{t.recordIdHint}</output>
          </div>
          <Empty title={t.noSelection} description={t.accountEmpty} />
        </Surface>
      </div>
    </>
  );
}

function Journals({ t }: { t: Labels }) {
  return (
    <>
      <PageHeading title={t.journals} subtitle={t.journalsDetail} preview={t.preview} />
      <Surface title={t.journalHeader}>
        <div className="detail-grid">
          <div className="readonly-field"><label>{t.recordId}</label><output>{t.recordIdHint}</output></div>
          <div className="readonly-field"><label>{t.voucherNo}</label><output>{t.assignedOnIssue}</output></div>
        </div>
      </Surface>
      <Surface title={t.journalLines}>
        <div className="table-scroll">
          <table>
            <thead><tr><th>{t.account}</th><th className="amount">{t.debit}</th><th className="amount">{t.credit}</th></tr></thead>
            <tbody><tr><td colSpan={3}><Empty title={t.empty} description={t.journalEmpty} /></td></tr></tbody>
          </table>
        </div>
        <div className="ledger-footer"><span>{t.difference}</span><strong>{t.noAmount}</strong></div>
      </Surface>
    </>
  );
}

function PageHeading({ title, subtitle, preview }: { title: string; subtitle: string; preview: string }) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{preview}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

export function App() {
  const [language, setLanguage] = useState<Language>("en");
  const t: Labels = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <div className="app-layout" dir={language === "ar" ? "rtl" : "ltr"}>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">K</span><strong>{t.brand}</strong></div>
        <div className="nav-group">{t.section}</div>
        <nav aria-label={t.section} className="navigation">
          {[
            { path: "/", label: t.overview, number: "01" },
            { path: "/accounts", label: t.accounts, number: "02" },
            { path: "/journals", label: t.journals, number: "03" },
          ].map((item) => (
            <NavLink end key={item.path} to={item.path} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="nav-number" aria-hidden="true">{item.number}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" />{t.progress}</div>
      </aside>

      <div className="workarea">
        <header className="topbar">
          <span className="topbar-title">{t.workspace}</span>
          <div className="topbar-actions">
            <span className="context-chip">{t.company}: {t.unavailable}</span>
            <button className="lang-button" type="button" onClick={() => setLanguage(language === "en" ? "ar" : "en")} aria-label={t.language}>
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>
        </header>
        <main className="main-content">
          <div className="preview-warning" role="status">{t.notice}</div>
          <Routes>
            <Route path="/" element={<Overview t={t} />} />
            <Route path="/accounts" element={<Accounts t={t} />} />
            <Route path="/journals" element={<Journals t={t} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
