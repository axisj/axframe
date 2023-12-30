import styled from "@emotion/styled";
import { usePrintDesignerStore } from "../usePrintDesignerStore.ts";
import { ConfigProvider, Form, Input } from "antd";
import { useEffect, useMemo } from "react";

interface Props {}

const FormItem = Form.Item<DivLayer>;

export function PropertyForm({}: Props) {
  const [selectedLayerIndexes] = usePrintDesignerStore((s) => [s.selectedLayerIndexes]);
  const divLayers = usePrintDesignerStore((s) => s.divLayers);
  const [form] = Form.useForm();

  const selectedDivLayer = useMemo(() => {
    if (selectedLayerIndexes.length > 0) {
      return divLayers[selectedLayerIndexes[0]];
    }
  }, [divLayers, selectedLayerIndexes]);

  useEffect(() => {
    if (selectedDivLayer) {
      form.setFieldsValue(selectedDivLayer);
    }
  }, [form, selectedDivLayer]);

  if (!selectedDivLayer) {
    return null;
  }

  return (
    <Container>
      <ConfigProvider
        theme={{
          token: {
            controlHeight: 28,
            paddingSM: 8,
          },
        }}
      >
        <Form layout={"vertical"} form={form}>
          <FormItem label={"Name"} name={"name"}>
            <Input />
          </FormItem>
          <FormItem label={"Left"} name={"left"}>
            <Input />
          </FormItem>
          <FormItem label={"Top"} name={"top"}>
            <Input />
          </FormItem>
          <FormItem label={"Width"} name={"width"}>
            <Input />
          </FormItem>
          <FormItem label={"Height"} name={"height"}>
            <Input />
          </FormItem>
        </Form>
      </ConfigProvider>
    </Container>
  );
}

const Container = styled.div``;
