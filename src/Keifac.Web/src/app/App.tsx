import { useEffect, useState } from "react";
import { AppShell } from "./AppShell";
import { AppRoutes } from "./routes";
import { translations, type Language } from "../shared/i18n/translations";

export function App() {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <AppShell
      t={t}
      language={language}
      onLanguageChange={() => setLanguage((current) => (current === "en" ? "ar" : "en"))}
    >
      <AppRoutes t={t} />
    </AppShell>
  );
}
