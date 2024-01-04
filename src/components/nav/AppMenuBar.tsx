import styled from "@emotion/styled";
import React from "react";
import { AppMenu, AppMenuGroup, User } from "services";
import { useI18n, useLink } from "hooks";
import { MenuItem, useAppMenu } from "router";
import { SMixinFlexRow } from "@core/styles/emotion";
import { AXFIconBrandAxisj } from "../AXFIcons";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";
import { useUserStore } from "stores";

interface StyleProps {
  sideMenuOpened?: boolean;
}

interface Props extends StyleProps {
  me?: User;
  onSignOut?: () => Promise<void>;
}

function AppMenuBar({}: Props) {
  const { currentLanguage } = useI18n();
  const { linkByMenu } = useLink();
  const { APP_MENUS } = useAppMenu();
  const selectedMenuUuid = useUserStore((s) => s.selectedMenuUuid);

  const menus = React.useMemo(() => {
    const getAppMenus = (menus: AppMenu[], pid: string): MenuItem[] => {
      return menus
        .map((m, idx) => {
          const children = getAppMenus(m.children, pid + "_" + idx);
          if (m.children.length > 0 && children.length === 0) {
            return;
          }
          return {
            key: pid + "_" + idx,
            program_type: m.progCd,
            labels: m.multiLanguage,
            label: m.multiLanguage[currentLanguage],
            title: m.multiLanguage[currentLanguage],
            children: children.length === 0 ? undefined : children,
          } as MenuItem;
        })
        .filter(Boolean) as MenuItem[];
    };

    const getAppMenuGroups = (menuGroups: AppMenuGroup[]) => {
      return menuGroups.map((mg, idx) => {
        const children = getAppMenus(mg.children ?? [], `${idx}`);
        return {
          key: idx,
          program_type: mg.progCd,
          labels: mg.multiLanguage,
          label: mg.multiLanguage[currentLanguage],
          children: children.length === 0 ? undefined : children,
        } as MenuItem;
      });
    };
    return getAppMenuGroups(APP_MENUS);
  }, [APP_MENUS, currentLanguage]);

  const onClick: MenuProps["onClick"] = React.useCallback(
    ({ key }) => {
      const keyPath = key.split(/_/g);
      const menu = keyPath.reduce((acc, cur) => {
        return acc[cur].children ? acc[cur].children : acc[cur];
      }, menus);

      linkByMenu(menu);
    },
    [linkByMenu, menus],
  );

  return (
    <Container>
      <AXFIconBrandAxisj fontSize={16} />
      <MenuContainer>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                horizontalLineHeight: "33px",
                itemHeight: 30,
                itemPaddingInline: 10,
              },
            },
          }}
        >
          <Menu mode='horizontal' items={menus} selectedKeys={[selectedMenuUuid]} onClick={onClick} />
        </ConfigProvider>
      </MenuContainer>
    </Container>
  );
}

const Container = styled.div<StyleProps>`
  ${SMixinFlexRow("stretch", "center", "wrap")};
  gap: 10px;

  flex: 1;
  overflow: hidden;
  position: relative;
  line-height: 33px;
  font-size: 13px;
  color: ${(p) => p.theme.text_color};

  .ant-menu-horizontal {
    border-bottom: 1px solid transparent;
    background-color: transparent;
    font-size: 13px;
  }
`;

const MenuContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export default AppMenuBar;
