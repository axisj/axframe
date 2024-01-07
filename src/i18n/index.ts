import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export type LanguageType = "ko" | "en";

const missingLocales: Record<string, any> = {};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "ko",
    lng: "ko",
    saveMissing: true,
    missingKeyHandler: (lngs, ns, key, fallbackValue, updateMissing, options) => {
      const locale = (() => {
        if (!missingLocales[i18n.language]) {
          missingLocales[i18n.language] = {};
        }
        return missingLocales[i18n.language];
      })();
      const space = (() => {
        if (!locale[ns]) {
          locale[ns] = {};
        }
        return locale[ns];
      })();
      if (!space[key]) {
        space[key] = key;
      }
    },
    // debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

window["saveMissingKeys"] = () => {
  const locale = missingLocales[i18n.language];
  Object.keys(locale).forEach((ns) => {
    console.group(`${i18n.language}/${ns}.json`);
    console.log(
      Object.keys(locale[ns])
        .map((k) => `"${k}": "${k}"`)
        .join(", \n"),
    );
    console.groupEnd();
  });
};

export default i18n;
