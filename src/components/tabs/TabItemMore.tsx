import { AXFIArrowDown } from "@axframe/icon";
import { usePageTabStore } from "@core/stores/usePageTabStore";
import { SMixinFlexRow } from "@core/styles/emotion";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Dropdown } from "antd";
import { useLink } from "hooks";
import React from "react";
import { useAppStore } from "../../stores";
import { darken } from "../../styles/palette/colorUtil";

interface StyleProps {
  visible?: boolean;
}

interface Props extends StyleProps {}

function TabItemMore({}: Props) {
  const currentLanguage = useAppStore((s) => s.currentLanguage);
  const { linkByTo } = useLink();
  const pages = usePageTabStore((s) => s.pages);
  const [visible, setVisible] = React.useState(false);

  const tabItemList = React.useMemo(() => {
    return [...pages].map(([k, v]) => ({ id: k, page: v }));
  }, [pages]);

  const handleClickTab = React.useCallback(
    (tabUuid: string, path?: string) => {
      if (!path) return;
      linkByTo(path);
    },
    [linkByTo],
  );

  return (
    <Dropdown
      menu={{
        items: tabItemList.map((tabItem) => ({
          key: tabItem.id,
          label: (
            <div
              onClick={() => {
                handleClickTab(tabItem.id, tabItem.page.path);
              }}
            >
              {tabItem.page.labels?.[currentLanguage]}
            </div>
          ),
        })),
      }}
      trigger={["click"]}
      align={{ targetOffset: [16, 8] }}
      open={visible}
      onOpenChange={(visible) => setVisible(visible)}
      overlayClassName={"tab-item-more-dropdown"}
    >
      <TabItemMoreContainer visible={visible}>
        <div>
          <AXFIArrowDown fontSize={18} />
        </div>
      </TabItemMoreContainer>
    </Dropdown>
  );
}

const TabItemMoreContainer = styled.div<StyleProps>`
  ${SMixinFlexRow("flex-start", "center")};
  flex: none;
  width: 56px;
  height: 64px;
  cursor: pointer;
  position: relative;
  color: ${(p) => p.theme.text_display_color};

  > div {
    width: 40px;
    height: 36px;
    background: ${(p) => darken(p.theme.axf_tabs_background, 0.1)};
    border-radius: 0 4px 4px 0;
    ${SMixinFlexRow("center", "center")};
  }

  [role="rfi-icon"] {
    transition: all 0.3s;
    ${({ visible }) => {
      if (visible) {
        return css`
          transform: rotateX(180deg);
        `;
      }
      return css``;
    }};
  }
`;

export default TabItemMore;
