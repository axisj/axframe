import React from "react";
import styled from "@emotion/styled";
import { AXFDGItemRenderProps } from "@axframe/datagrid";
import { Input } from "antd";

export function InputEditor<T = Record<string, any>>({
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
    (evt) => {
      switch (evt.key) {
        case "Down":
        case "ArrowDown":
          handleSaveEdit(evt.currentTarget.value, "current", "next");
          break;
        case "Up":
        case "ArrowUp":
          handleSaveEdit(evt.currentTarget.value, "current", "prev");
          break;
        case "Tab": {
          evt.preventDefault();
          const value = evt.currentTarget.value;
          setTimeout(() => {
            if (evt.shiftKey) {
              handleSaveEdit(value, "prev", "current");
            } else {
              handleSaveEdit(value, "next", "current");
            }
          });
          break;
        }
        case "Enter":
          handleSaveEdit(evt.currentTarget.value);
          break;
        case "Esc":
        case "Escape":
          handleCancel?.();
          break;
        default:
          return;
      }
    },
    [handleCancel, handleSaveEdit],
  );

  const onBlur = React.useCallback<React.FocusEventHandler<HTMLInputElement>>(
    (evt) => {
      handleSaveEdit(evt.target.value);
    },
    [handleSaveEdit],
  );

  if (editable) {
    return (
      <Container>
        <Input
          variant={"borderless"}
          autoFocus={true}
          onFocus={(evt) => evt.target.select()}
          size={"small"}
          defaultValue={value}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      </Container>
    );
  }
  return <>{value}</>;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  .ant-input {
    padding: 0;
    border-radius: 0;
    height: 100%;
    background: transparent;
    text-decoration: solid underline ${(p) => p.theme.primary_color} 2px;
    text-underline-position: under;
    color: ${(p) => p.theme.text_display_color};
  }
`;
