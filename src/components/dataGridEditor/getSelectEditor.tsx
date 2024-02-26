import React from "react";
import styled from "@emotion/styled";
import { AXFDGItemRenderProps } from "@axframe/datagrid";
import { Select } from "antd";

export function getSelectEditor(options: { label: string; value: any }[]) {
  return function GetSelectEditor<T = Record<string, any>>({
    editable,
    value,
    handleSave,
    handleCancel,
    handleMove,
  }: AXFDGItemRenderProps<T>) {
    const handleSaveEdit = React.useCallback(
      (newValue: any, ...rest: any) => {
        if (value === newValue) {
          handleCancel?.();
          const [a, b] = rest;
          handleMove?.(a, b);
          return;
        }
        handleSave?.(newValue, ...rest);
      },
      [value, handleCancel, handleSave, handleMove],
    );

    const onKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
      async (evt) => {
        switch (evt.key) {
          case "Down":
          case "ArrowDown":
            handleSaveEdit(evt.currentTarget.value, "current", "next");
            break;
          case "Up":
          case "ArrowUp":
            handleSaveEdit(evt.currentTarget.value, "current", "prev");
            break;
          case "Tab":
            evt.preventDefault();
            if (evt.shiftKey) {
              handleSaveEdit(evt.currentTarget.value, "prev", "current");
            } else {
              handleSaveEdit(evt.currentTarget.value, "next", "current");
            }
            break;
          case "Enter":
            break;
          case "Esc":
          case "Escape":
            await handleCancel?.();
            break;
          default:
            return; // 키 이벤트를 처리하지 않는다면 종료합니다.
        }
      },
      [handleCancel, handleSaveEdit],
    );

    const onBlur = React.useCallback<React.FocusEventHandler<HTMLInputElement>>(
      async (evt) => {
        await handleCancel?.();
      },
      [handleCancel],
    );

    const onSelect = React.useCallback(
      async (value: any, option: any) => {
        await handleSaveEdit(value);
        await handleCancel?.();
      },
      [handleSaveEdit, handleCancel],
    );

    return (
      <Container>
        <Select
          variant={"borderless"}
          size={"small"}
          // autoFocus
          // open
          options={options}
          value={value}
          onSelect={onSelect}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </Container>
    );

    // return <>{options.find((o) => o.value === value)?.label ?? value}</>;
  };
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  .ant-select {
    width: 100%;
    .ant-select-selector {
      padding: 0 !important;
    }

    .ant-select-arrow {
      inset-inline-end: -3px;
    }
  }
`;
