import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { IconText } from "@core/components/common";
import { SMixinFlexRow } from "@core/styles/emotion";
import styled from "@emotion/styled";
import { Button, Dropdown } from "antd";
import React from "react";
import { User } from "services";
import { useAppStore, useUserStore } from "stores";
import { errorHandling } from "utils";
import { dangerouslySetInnerHTML } from "@core/utils/string";
import { useBtnI18n, useI18n } from "hooks";
import { IconLogout, IconUser } from "../icons";
import UserInfoDropdown from "./UserInfoDropdown";

interface StyleProps {
  sideMenuOpened?: boolean;
}

interface Props extends StyleProps {
  me?: User;
  onSignOut?: () => Promise<void>;
}

function AppMenuBarTools({}: Props) {
  const { t } = useI18n();
  const btnT = useBtnI18n();
  const [signOutSpinning, setSignOutSpinning] = React.useState(false);
  const fullScreen = useAppStore((s) => s.fullScreen);
  const setFullScreen = useAppStore((s) => s.setFullScreen);
  const me = useUserStore((s) => s.me);
  const signOut = useUserStore((s) => s.signOut);
  const { userNm } = me ?? {};

  const handleClickSignOut = React.useCallback(async () => {
    setSignOutSpinning(true);
    try {
      await signOut();
    } catch (err) {
      await errorHandling(err);
    } finally {
      setSignOutSpinning(false);
    }
  }, [setSignOutSpinning, signOut]);

  return (
    <Container>
      <ToolBar>
        <Button
          size={"small"}
          type={fullScreen ? "primary" : "text"}
          icon={fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          onClick={() => {
            setFullScreen(!fullScreen);
          }}
        >
          {fullScreen ? "Exit FullScreen" : "FullScreen"}
        </Button>

        <Dropdown dropdownRender={() => <UserInfoDropdown onSignOut={handleClickSignOut} />}>
          <div role={"user-info"}>
            <IconText icon={<IconUser fontSize={18} />} block>
              <span {...dangerouslySetInnerHTML(t("loginUserNameLabel", { userNm }))} />
            </IconText>
          </div>
        </Dropdown>

        <div role={"logout"} onClick={handleClickSignOut}>
          <IconText icon={<IconLogout fontSize={20} />} loading={signOutSpinning}>
            {btnT("로그아웃")}
          </IconText>
        </div>
      </ToolBar>
    </Container>
  );
}

const Container = styled.div<StyleProps>`
  flex: none;
  overflow: hidden;
  position: relative;
`;
const ToolBar = styled.div`
  height: 100%;
  border-radius: 4px;
  padding-left: 5px;
  ${SMixinFlexRow("stretch", "center")};
  overflow: hidden;
  font-size: 12px;

  [role="user-info"] {
    flex: 1;
    ${SMixinFlexRow("stretch", "center")};
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 8px;
  }
  [role="logout"] {
    flex: none;
    ${SMixinFlexRow("center", "center")};
    color: #f01445;
    border-radius: 0 4px 4px 0;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0 8px;
    &:hover {
      background: #eee;
    }
  }
`;

export default AppMenuBarTools;
