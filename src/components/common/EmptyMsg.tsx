import styled from "@emotion/styled";
import React from "react";
import { useI18n } from "hooks";
import { SMixinFlexColumn } from "../../@core/styles/emotion";
import { PeatIconEmojiSurpriseDuo } from "../AXFIcons";

interface Props {
  disableImg?: boolean;
  title?: string;
  msg?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

function EmptyMsg({ disableImg, title, msg, children, style }: Props) {
  const { t } = useI18n();

  return (
    <Container style={style}>
      <div>
        {disableImg ? null : (
          <Img>
            <PeatIconEmojiSurpriseDuo />
          </Img>
        )}
        <Title>{title ?? t("선택된 아이템이 없습니다.")}</Title>
        {msg && <Msg>{msg}</Msg>}
      </div>
      {children && <div>{children}</div>}
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  ${SMixinFlexColumn("center", "center")};

  gap: 20px;

  > div {
    ${SMixinFlexColumn("center", "center")};
    gap: 3px;
  }
`;
const Img = styled.div`
  font-size: 64px;
  line-height: 1;
  color: ${(p) => p.theme.text_sub_body_color};
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${(p) => p.theme.text_sub_body_color};
`;
const Msg = styled.div`
  color: ${(p) => p.theme.text_sub_body_color};
`;

export { EmptyMsg };
