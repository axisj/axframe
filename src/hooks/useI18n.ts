import koKR from "antd/es/locale/ko_KR";
import { useTranslation, getI18n, UseTranslationOptions } from "react-i18next";
import { useAppStore } from "../stores";

if (koKR.Calendar && koKR.DatePicker) {
  koKR.DatePicker.lang.shortMonths = koKR.Calendar.lang.shortMonths = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  koKR.DatePicker.lang.shortWeekDays = koKR.Calendar.lang.shortWeekDays = ["일", "월", "화", "수", "목", "금", "토"];
}

export function useI18n(ns?: string | string[], options?: UseTranslationOptions<any>) {
  const { t, i18n } = useTranslation(ns, options);
  const currentLanguage = useAppStore((s) => s.currentLanguage);
  return { t, i18n, currentLanguage };
}

export function useBtnI18n() {
  const { t } = useTranslation("_btn");
  return t;
}

export { getI18n };
