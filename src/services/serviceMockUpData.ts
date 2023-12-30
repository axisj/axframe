import { AppMenuGroup, User } from "services";

export const getAppMenuMockData: AppMenuGroup[] = [
  {
    menuGrpCd: "_",
    multiLanguage: { ko: "", en: "" },
    children: [
      {
        multiLanguage: {
          en: "Print Designer",
          ko: "프린트 디자이너",
        },
        iconTy: "Default",
        progCd: "PRINT_DESIGNER",
        children: [],
      },

      /* ##INSERT_MENU_POSITION## */
    ],
    userGroup: ["ROLE_ADMIN", "ROLE_ASP", "ROLE_USER"],
  },
  {
    menuGrpCd: "EXAMPLE",
    multiLanguage: {
      ko: "예제",
      en: "Examples",
    },
    iconTy: "Example",
    children: [
      {
        multiLanguage: {
          en: "Forms",
          ko: "양식",
        },
        iconTy: "Default",
        progCd: "EXAMPLE_FORM",
        children: [],
      },
      {
        multiLanguage: {
          en: "List",
          ko: "목록",
        },
        iconTy: "Default",
        progCd: "EXAMPLE_LIST",
        children: [],
      },
      {
        multiLanguage: {
          en: "List & Drawer",
          ko: "목록과 서랍",
        },
        iconTy: "Default",
        progCd: "EXAMPLE_LIST_AND_DRAWER",
        children: [],
      },
      {
        multiLanguage: {
          en: "List & Modal",
          ko: "목록과 모달",
        },
        iconTy: "Default",
        progCd: "EXAMPLE_LIST_AND_MODAL",
        children: [],
      },
      {
        multiLanguage: {
          en: "List & Form",
          ko: "목록과 양식",
        },
        iconTy: "Default",
        progCd: "EXAMPLE_LIST_WITH_FORM",
        children: [],
      },
      {
        multiLanguage: {
          en: "List & Form & List",
          ko: "목록과 양식-목록",
        },
        iconTy: "Default",
        progCd: "EXAMPLE_LIST_WITH_FORM_LIST",
        children: [],
      },
      {
        multiLanguage: {
          en: "List & List",
          ko: "목록과 목록",
        },
        iconTy: "Default",
        progCd: "EXAMPLE_LIST_WITH_LIST",
        children: [],
      },
      {
        multiLanguage: {
          en: "Three List",
          ko: "3개 목록",
        },
        iconTy: "Default",
        progCd: "EXAMPLE_THREE_LIST",
        children: [],
      },
      {
        multiLanguage: {
          en: "Stats",
          ko: "통계",
        },
        iconTy: "Default",
        progCd: "EXAMPLE_STATS",
        children: [],
      },
    ],
    userGroup: ["ROLE_ADMIN", "ROLE_ASP", "ROLE_USER"],
  },
];

export const signInMockData: User = {
  userNm: "시스템사용자",
  userCd: "system",
  timeZone: 9,
  locale: "en",
  authorityList: ["ROLE_ADMIN", "ROLE_ASP", "ROLE_USER"],
  programList: [
    "EXAMPLE_DETAIL",
    "EXAMPLE_FORM",
    "EXAMPLE_LIST",
    "EXAMPLE_LIST_AND_DRAWER",
    "EXAMPLE_LIST_AND_MODAL",
    "EXAMPLE_LIST_WITH_FORM",
    "EXAMPLE_LIST_WITH_FORM_ROW",
    "EXAMPLE_LIST_WITH_FORM_LIST",
    "EXAMPLE_LIST_WITH_LIST",
    "EXAMPLE_THREE_LIST",
    "EXAMPLE_STATS",
    "PRINT_DESIGNER",

    /* ##INSERT_PROGRAM_TYPE_POSITION## */
  ],
  email: "tom@axisj.com",
  compCd: "V100",
};
