import { LanguageType } from "../depk-i18n";
import { MenuItemType } from "rc-menu/lib/interface";
import { PROGRAM_TYPES } from "./@programTypes";

export interface MenuItem extends MenuItemType {
  children?: MenuItem[];
  program_type?: PROGRAM_TYPES;
  labels?: Record<LanguageType, string>;
  route?: Record<string, any>;
}
