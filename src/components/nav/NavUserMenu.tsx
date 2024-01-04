import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import { useLink } from "@core/hooks";
import React from "react";
import { SMixinScrollerStyle } from "@core/styles/emotion";
import { MenuItem, useAppMenu } from "router";
import { useAppStore, useUserStore } from "stores";
import { AppMenu, AppMenuGroup } from "services";
import { MenuIcon } from "components/MenuIcon";
import { useI18n } from "hooks";

interface StyleProps {
  sideMenuOpened?: boolean;
}

interface Props extends StyleProps {
  menus?: MenuItem[];
  openedMenuUuids?: string[];
  selectedMenuUuid?: string;
}

function NavUserMenu({}: Props) {
  const { currentLanguage } = useI18n();
  const { linkByMenu } = useLink();
  const { APP_MENUS } = useAppMenu();

  const sideMenuOpened = useAppStore((s) => s.sideMenuOpened);
  const openedMenuUuids = useUserStore((s) => s.openedMenuUuids);
  const setOpenedMenuUuids = useUserStore((s) => s.setOpenedMenuUuids);
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
            icon: m.iconTy ? <MenuIcon typeName={m.iconTy} /> : null,
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
          icon: <MenuIcon typeName={mg.iconTy ?? "Default"} />,
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

  const onSideMenuOpenChange = React.useCallback(
    (openKeys: string[]) => {
      // console.log("onSideMenuOpenChange", openKeys);
      setOpenedMenuUuids(openKeys);
    },
    [setOpenedMenuUuids],
  );

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
    <NavUserMenuContainer sideMenuOpened={sideMenuOpened}>
      <Menu
        mode={"inline"}
        items={menus}
        defaultOpenKeys={sideMenuOpened ? openedMenuUuids : []}
        onOpenChange={onSideMenuOpenChange}
        selectedKeys={[selectedMenuUuid]}
        inlineIndent={14}
        inlineCollapsed={!sideMenuOpened}
        onClick={onClick}
      />
    </NavUserMenuContainer>
  );
}

const NavUserMenuContainer = styled.div<StyleProps>`
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  user-select: none;

  ${({ sideMenuOpened, theme }) => {
    if (sideMenuOpened) {
      return css`
        padding: 2px 0;
        ${SMixinScrollerStyle({
          track_color: theme.body_background,
          thumb_color: theme.scroll_thumb_color,
        })};
      `;
    }
    return css`
      padding: 0;
      ${SMixinScrollerStyle({
        track_color: theme.component_background,
        thumb_color: theme.scroll_thumb_color,
      })};
    `;
  }}

  .ant-menu {
    background: inherit;
    color: ${(p) => p.theme.text_heading_color};
    font-weight: 500;
  }

  // 우측에 보더값 제거
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0 none;
    border-inline-end: 0 none !important;
  }

  .ant-menu-root.ant-menu-inline {
    // 0depth - item
    > .ant-menu-item,
    > .ant-menu-submenu {
      min-height: 36px;
      line-height: 36px;
      font-size: 14px;
      font-weight: 600;

      .ant-menu-submenu-title {
      }

      .ant-menu-item-icon {
        font-size: 20px;
      }
    }
  }

  // !opened menu
  .ant-menu.ant-menu-inline-collapsed {
    width: 100%;

    [role="menuitem"] {
      padding: 0;
      padding-inline: 0;
      height: 36px;
      .ant-menu-item-icon {
        font-size: 20px;
        margin: 0 auto;
        display: block;
        margin-top: 8px;
      }
    }
  }
`;

export default NavUserMenu;
