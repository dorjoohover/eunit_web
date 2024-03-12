import { ItemPosition, ItemTypes } from "@/config/enum";

export interface ItemDetailModel {
  id: string;

  value: string;

  parentId?: string;

  parent?: ItemTypes;
}

export interface ItemModel {
  _id?: string;
  name: string;

  index?: number;

  value?: ItemDetailModel[];

  type: string;

  types: ItemTypes;

  parentId?: string;

  position?: ItemPosition;

  other?: boolean;

  isSearch?: boolean;

  isUse?: boolean;
}
