import login from "./login";

export default {
  config: {
    validateMessages: {
      required: "'${name}'을(를) 입력해주세요.",
    },
  },
  login,
} as const;
