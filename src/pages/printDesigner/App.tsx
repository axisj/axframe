import styled from "@emotion/styled";
import { Button } from "antd";
import { Loading, ProgramTitle } from "@core/components/common";
import { useCallback } from "react";
import { AXFIRevert } from "@axframe/icon";
import { PageLayout } from "styles/pageStyled";
import { useI18n, useUnmountEffect } from "@core/hooks";
import { useDidMountEffect } from "@core/hooks/useDidMountEffect";
import { usePrintDesignerStore } from "./usePrintDesignerStore.ts";
import { errorHandling } from "utils/errorHandling";
import { PrintDesigner } from "./PrintDesigner.tsx";
import queryString from "query-string";
import { useParams } from "react-router-dom";
import "./printDesigner.css";

interface Props {}

function App({}: Props) {
  const { t } = useI18n();
  const _t = t.pages.testimonial;
  const urlParams = useParams<{ id: string }>();

  const init = usePrintDesignerStore((s) => s.init);
  const reset = usePrintDesignerStore((s) => s.reset);
  const programFn = usePrintDesignerStore((s) => s.programFn);

  const handleSave = useCallback(async () => {}, []);

  useDidMountEffect(() => {
    (async () => {
      try {
        if (!urlParams.id) return;
        const qs = queryString.parse(location.search);
        await init(Number(urlParams.id), location.pathname, qs);
      } catch (e: any) {
        await errorHandling(e);
      }
    })();
  });

  useUnmountEffect(() => {});

  return (
    <Container stretch role={"page-container"}>
      <Header>
        <ProgramTitle title={_t.title.form}>
          <Button icon={<AXFIRevert />} size='small' type={"text"} onClick={reset}>
            {t.button.reset}
          </Button>
        </ProgramTitle>
        <ButtonGroup compact>
          {programFn?.fn02 && (
            <Button type={"primary"} onClick={handleSave}>
              {t.button.save}
            </Button>
          )}
        </ButtonGroup>
      </Header>

      <PrintDesigner />

      <Loading active={false} />
    </Container>
  );
}

const Container = styled(PageLayout)``;
const Header = styled(PageLayout.Header)``;
const ButtonGroup = styled(PageLayout.ButtonGroup)``;

export default App;
