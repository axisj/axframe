import React from "react";

import {
  Cascader,
  CascaderProps,
  Drawer,
  DrawerProps,
  Input,
  InputNumber,
  InputNumberProps,
  Modal,
  ModalProps,
  Select,
  SelectProps,
  Tooltip,
  TooltipProps,
} from "antd";
import { PasswordProps } from "antd/lib/input";
import { BaseOptionType } from "rc-cascader";
import { AXFIArrowDown, AXFIArrowLeft, AXFIArrowUp, AXFIClose } from "@axframe/icon";
import { fnFilterLabel } from "@core/utils/antd";

/*
 * Modal
 */
const _Modal = Modal as React.FC<ModalProps>;
_Modal.defaultProps ??= {};
const modalDefaultProps = _Modal.defaultProps;
if (modalDefaultProps) {
  modalDefaultProps.transitionName = "";
  modalDefaultProps.maskClosable = false;
  modalDefaultProps.centered = true;
  modalDefaultProps.closeIcon = <AXFIClose fontSize={16} />;
  modalDefaultProps.styles = { body: { padding: 0 } };
  modalDefaultProps.className = "axframe-modal";
  modalDefaultProps.title = null;
  modalDefaultProps.footer = null;
  modalDefaultProps.closable = true;
  modalDefaultProps.destroyOnClose = true;
}

/*
 * Tooltip
 */
const _Tooltip = Tooltip as React.FC<TooltipProps>;
_Tooltip.defaultProps ??= {};
const tooltipDefaultProps = _Tooltip.defaultProps;
if (tooltipDefaultProps) {
  tooltipDefaultProps.mouseEnterDelay = 0;
  tooltipDefaultProps.mouseLeaveDelay = 0;
  tooltipDefaultProps.destroyTooltipOnHide = true;
}

/*
 * Cascader
 */
const _Cascader = Cascader as React.FC<CascaderProps<BaseOptionType>>;

_Cascader.defaultProps ??= {};
const cascaderDefaultProps = _Cascader.defaultProps;
if (cascaderDefaultProps) {
  cascaderDefaultProps.expandIcon = <AXFIArrowLeft />;
  cascaderDefaultProps.suffixIcon = <AXFIArrowDown />;
}

/*
 * Select
 */
const _Select = Select as React.FC<SelectProps>;

_Select.defaultProps ??= {};
const selectDefaultProps = _Select.defaultProps;
if (selectDefaultProps) {
  selectDefaultProps.suffixIcon = <AXFIArrowDown fontSize={14} />;
  // selectDefaultProps.menuItemSelectedIcon = <QICheck fontSize={16} />;
  selectDefaultProps.filterOption = fnFilterLabel;
}

/*
 * Drawer
 */

const _Drawer = Drawer as React.FC<DrawerProps>;

_Drawer.defaultProps ??= {};
const drawerDefaultProps = _Drawer.defaultProps;
if (drawerDefaultProps) {
  drawerDefaultProps.closeIcon = <AXFIClose fontSize={16} />;
}

/*
 * Input
 */
const _InputNumber = InputNumber as React.FC<InputNumberProps>;

_InputNumber.defaultProps ??= {};
const inputNumberDefaultProps = _InputNumber.defaultProps;

if (inputNumberDefaultProps) {
  inputNumberDefaultProps.upHandler = <AXFIArrowUp />;
  inputNumberDefaultProps.downHandler = <AXFIArrowDown />;
}

if (Input.defaultProps) {
  Input.defaultProps["onMouseUp"] = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
}

const _InputPassword = Input.Password as React.FC<PasswordProps>;

_InputPassword.defaultProps ??= {};
// const inputPasswordDefaultProps = _InputPassword.defaultProps;

// if (inputPasswordDefaultProps) {
//   inputPasswordDefaultProps.iconRender = (visible) =>
//     visible ? <QIEye fontSize={16} /> : <QIEyeClose fontSize={16} />;
// }
