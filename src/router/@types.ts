import { MenuItemType } from "rc-menu/lib/interface";
import { LanguageType } from "i18n";
import { PROGRAM_TYPES } from "./@programTypes";

export interface MenuItem extends MenuItemType {
  children?: MenuItem[];
  program_type?: PROGRAM_TYPES;
  labels?: Record<LanguageType, string>;
  route?: Record<string, any>;
}
