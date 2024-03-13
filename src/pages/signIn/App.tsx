import { IdcardOutlined, LockOutlined } from "@ant-design/icons";

import { AXFIArrowLogIn, AXFIMoon, AXFISun } from "@axframe/icon";
import { IconText } from "@core/components/common";
import { SMixinFlexColumn, SMixinFlexRow } from "@core/styles/emotion";
import { getTrimNonEmptyRegExp } from "@core/utils/formPatterns/getTrimNonEmptyRegExp";
import styled from "@emotion/styled";
import type { TourProps } from "antd";
import { Button, Checkbox, Divider, Form, Input, Space, Switch, Tour } from "antd";
import { IconAXFrameOpened } from "components/icons";
import { LangSelector } from "components/LangSelector";
import { useBtnI18n, useDidMountEffect, useI18n, useSpinning } from "hooks";
import React from "react";
import { UserService } from "services";
import { useAppStore, useUserStore } from "stores";
import { mediaMin } from "../../styles/mediaQueries";
import { alpha } from "../../styles/palette/colorUtil";
import { errorHandling } from "../../utils";

interface Props {
  onSignIn?: (values: SignInFormItem) => Promise<void>;
}

export interface SignInFormItem {
  userId?: string;
  password?: string;
  remember?: boolean;
}

function App({}: Props) {
  const { t } = useI18n("login");
  const btnT = useBtnI18n();
  const setMe = useUserStore((s) => s.setMe);

  const { spinning, setSpinning } = useSpinning<{ signIn: boolean }>();
  const [open, setOpen] = React.useState(false);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const [isApiTest, setIsApiTest] = React.useState(false);

  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);

  const steps: TourProps["steps"] = React.useMemo(
    () => [
      {
        title: "Hello Stranger! This is a demo page.",
        description: "Please enter any value for your ID and password.",
        target: () => ref1.current,
      },
      {
        title: "Sign In",
        description: "Click Sign In Button",
        target: () => ref2.current,
        onFinish: () => {
          localStorage.setItem("isRegularUser", "true");
          setOpen(false);
        },
      },
    ],
    [],
  );

  const [form] = Form.useForm<SignInFormItem>();

  const handleChangeTheme = React.useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  const onSignIn = React.useCallback(
    async (values: SignInFormItem) => {
      setSpinning({ signIn: true });
      try {
        if (values.remember && values.userId) {
          localStorage.setItem("remember", values.userId);
        } else {
          localStorage.removeItem("remember");
        }

        const { rs } = await UserService.signIn({
          userCd: values.userId,
          userPs: values.password,
        });
        await setMe(rs);
      } catch (err) {
        await errorHandling(err);
      } finally {
        setSpinning({ signIn: false });
      }
    },
    [setMe, setSpinning],
  );

  React.useEffect(() => {
    const remember = localStorage.getItem("remember");

    if (remember) {
      form.setFieldsValue({
        userId: remember,
        remember: true,
      });
      form.getFieldInstance("password").focus();
    } else {
      form.getFieldInstance("userId").focus();
    }

    const isTest = localStorage.getItem("isApiTest");
    setIsApiTest(isTest === "T");
  }, [form]);

  useDidMountEffect(() => {
    form.setFieldsValue({ userId: "AXFrame", password: "1" });
    if (!localStorage.getItem("isRegularUser")) {
      setOpen(true);
    }
  });

  return (
    <>
      <SignInContainer>
        <SignInBox ref={ref1}>
          <SignInVisual />
          <SignInFormBox>
            <SignInLogo>
              <IconAXFrameOpened />
            </SignInLogo>
            <SignInBoxBody>
              <Form<SignInFormItem> form={form} onFinish={onSignIn} layout={"vertical"}>
                <Form.Item
                  label={t("로그인아이디")}
                  name='userId'
                  rules={[
                    {
                      required: true,
                      pattern: getTrimNonEmptyRegExp(),
                    },
                  ]}
                >
                  <Input prefix={<IdcardOutlined />} allowClear />
                </Form.Item>

                <Form.Item
                  label={t("비밀번호")}
                  name='password'
                  rules={[
                    {
                      required: true,
                      pattern: getTrimNonEmptyRegExp(),
                    },
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} allowClear />
                </Form.Item>

                <Form.Item>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>{t("아이디 저장")}</Checkbox>
                  </Form.Item>

                  <a className='reset-password' href=''>
                    {t("비밀번호 초기화")}
                  </a>
                </Form.Item>
                <Divider />

                <Form.Item>
                  <Button
                    ref={ref2}
                    type='primary'
                    htmlType='submit'
                    role={"sign-in-btn"}
                    block
                    loading={spinning?.signIn}
                  >
                    <AXFIArrowLogIn fontSize={20} />
                    {btnT("로그인")}
                  </Button>
                </Form.Item>
              </Form>
            </SignInBoxBody>
            <SignInBoxFooter>
              <Space size={10}>
                <LangSelector />
                <IconText
                  icon={theme === "light" ? <AXFIMoon /> : <AXFISun />}
                  iconSize={20}
                  onClick={handleChangeTheme}
                  role={"theme-selector"}
                />
              </Space>
              {import.meta.env.MODE !== "production" && (
                <div>
                  {t("API TEST")} &nbsp;
                  <Switch
                    checked={isApiTest}
                    onChange={(checked) => {
                      localStorage.setItem("isApiTest", checked ? "T" : "F");
                      window.location.reload();
                    }}
                  />
                </div>
              )}
            </SignInBoxFooter>
          </SignInFormBox>
        </SignInBox>
      </SignInContainer>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
}

const SignInContainer = styled.div`
  ${SMixinFlexColumn("center", "center")};
  flex: 1;
  overflow: auto;
  background: url("/signin-background.jpg") no-repeat center center;
  background-size: cover;
  padding: 16px;

  .reset-password {
    float: right;
  }
  .ant-input-affix-wrapper {
    box-sizing: border-box;
    border-radius: 5px;
    padding: 4px 10px;

    .ant-input-prefix {
      margin-right: 6px;
    }

    .ant-input {
      font-weight: 400;
      line-height: 30px;
      padding-left: 8px;
    }

    .ant-input-suffix {
      .ant-input-password-icon {
        margin-left: 4px;
      }
    }
  }

  [role="sign-in-btn"] {
    height: 40px;
    ${SMixinFlexRow("center", "center")};
    column-gap: 5px;
  }
`;

const SignInBox = styled.div`
  background: ${(p) => p.theme.body_background};
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  ${SMixinFlexRow("stretch", "stretch")};
  overflow: hidden;

  width: 100%;

  ${mediaMin.sm} {
    width: 800px;
    height: 500px;
  }
`;

const SignInVisual = styled.div`
  display: none;

  ${mediaMin.sm} {
    width: 400px;
    height: 500px;
    background: url("/signin-visual.jpg") no-repeat center center;
    background-size: cover;

    padding: 10px;
    ${SMixinFlexRow("flex-end", "flex-end")};
    gap: 10px;
    a {
      color: ${(p) => alpha(p.theme.white_color, 0.8)};
      white-space: nowrap;
    }
  }
`;

const SignInFormBox = styled.div`
  flex: 1;
  ${SMixinFlexColumn("stretch", "stretch")};
`;

const SignInLogo = styled.div`
  width: 100%;
  margin-top: 20px;
  ${SMixinFlexColumn("center", "center")};
  color: ${(p) => p.theme.text_display_color};

  ${mediaMin.sm} {
    width: 400px;
    height: 96px;
    margin-top: 16px;
  }
`;

const SignInBoxBody = styled.div`
  padding: 16px 24px;
  flex: 1;

  .ant-form-vertical {
    .ant-form-item-label {
      padding-bottom: 5px;
      > label {
        font-weight: 700;
      }
    }
  }
  .ant-form-item {
    margin-bottom: 18px;
  }

  ${mediaMin.sm} {
    padding: 20px 32px;
  }
`;
const SignInBoxFooter = styled.div`
  ${SMixinFlexRow("space-between", "center")};
  padding: 20px 32px;
  color: ${(p) => p.theme.text_color};
`;

export default App;
