import { EN_core, EN_example, KO_core, KO_example } from "../@core/dept-i18n";
import { EN_pages, KO_pages } from "./pages";
import { EN_button, KO_button } from "./button";
import { EN_msg, KO_msg } from "./msg";
import { EN_pageTab, KO_pageTab } from "./pageTab";
import { EN_apiErrMsg } from "./error";
import { EN_common, KO_common } from "./common";

const EN = {
  appName: "AXFrame",
  core: EN_core,
  example: EN_example,
  button: EN_button,
  pageTab: EN_pageTab,
  pages: EN_pages,
  msg: EN_msg,
  apiErrMsg: EN_apiErrMsg,
  common: EN_common,
};

const KO: typeof EN = {
  appName: "AXFrame",
  core: KO_core,
  example: KO_example,
  button: KO_button,
  pageTab: KO_pageTab,
  pages: KO_pages,
  msg: KO_msg,
  apiErrMsg: EN_apiErrMsg,
  common: KO_common,
};

const i18n = {
  en: EN,
  ko: KO,
};

export type LanguageType = keyof typeof i18n;
export type Language = typeof EN;
export default i18n;
