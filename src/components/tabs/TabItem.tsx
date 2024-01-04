import React from "react";
import styled from "@emotion/styled";
import { AXFIClose } from "@axframe/icon";
import { useTranslation } from "react-i18next";
import { Page, useAppStore, usePageTabStore } from "stores";
import { SMixinFlexRow } from "@core/styles/emotion";
import { css } from "@emotion/react";
import { IconHomeFlat } from "components/icons";

interface StyleProps {
  isHome?: boolean;
  active?: boolean;
}

interface Props extends StyleProps {
  tabUuid: string;
  tabInfo: Page;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>, tabUuid: string) => void;
  onRemoveTab: (uuid: string) => void;
  onClickTab: (tabUuid: string, path?: string) => void;
}

function TabItem({ tabUuid, tabInfo, onContextMenu, onRemoveTab, onClickTab }: Props) {
  const activeTabUuid = usePageTabStore((s) => s.activeTabUuid);
  const currentLanguage = useAppStore((s) => s.currentLanguage);

  return (
    <TabItemContainer
      isHome={tabInfo.isHome}
      active={activeTabUuid === tabUuid}
      onClick={() => onClickTab(tabUuid, tabInfo.path)}
      role={activeTabUuid === tabUuid ? "active-tab-item" : "tab-item"}
      onContextMenu={(evt) => onContextMenu(evt, tabUuid)}
    >
      <Box isHome={tabInfo.isHome} active={activeTabUuid === tabUuid}>
        {tabInfo.isHome ? (
          <IconHomeFlat fontSize={24} />
        ) : (
          <>
            {tabInfo.labels?.[currentLanguage] ?? ""}
            <a
              role='tab-close'
              onClick={(evt) => {
                onRemoveTab(tabUuid);
                evt.stopPropagation();
              }}
            >
              <AXFIClose />
            </a>
          </>
        )}
      </Box>
    </TabItemContainer>
  );
}

const Box = styled.div<StyleProps>`
  ${SMixinFlexRow("flex-start", "center")};
  flex: none;
  height: 36px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
  position: relative;
  white-space: nowrap;
  transition: all 0.3s;

  [role="tab-close"] {
    position: absolute;
    display: block;
    right: 5px;
    top: 10px;
    padding: 2px;
    border-radius: 50%;

    svg {
      display: block;
    }
  }

  &:hover {
    border-radius: 5px;

    [role="tab-close"] {
      //display: block;
    }
  }

  ${({ isHome }) => {
    if (isHome) {
      return css`
        border-radius: 5px;
        padding: 0 10px;
      `;
    }
    return css`
      min-width: 100px;
      padding: 0 24px 0 10px;
    `;
  }}

  ${({ active, theme }) => {
    if (active) {
      return css`
        z-index: 2;
        border-radius: 5px;
        color: ${theme.white_color};
        background: ${theme.axf_tabs_active_background};

        [role="tab-close"] {
          transition: all 0.3s;
          color: ${theme.white_color};

          &:hover {
            background: ${theme.white_color};
            color: ${theme.axf_tabs_active_background};
          }
        }
      `;
    }
    return css`
      transition: all 0.3s;
      color: ${theme.text_display_color};

      &:hover {
        background: ${theme.axf_tabs_hover_background};
      }

      [role="tab-close"] {
        transition: all 0.3s;

        &:hover {
          background: ${theme.white_color};
          color: ${theme.axf_tabs_active_background};
        }
      }
    `;
  }}
`;
const TabItemContainer = styled.div<StyleProps>`
  background: ${(p) => p.theme.axf_tabs_background};
  padding: 0 1px;

  &.sortable-ghost {
    color: ${(p) => p.theme.white_color};
    background: #d5d5d5;
  }

  ${({ isHome }) => {
    if (isHome) {
      return css`
        border-radius: 5px;
        padding: 0;
      `;
    }
  }}
`;

export default TabItem;
