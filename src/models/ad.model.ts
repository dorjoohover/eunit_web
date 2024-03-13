import {
  AdSellType,
  AdStatus,
  AdTypes,
  AdView,
  ItemPosition,
  ItemTypes,
} from "@/config/enum";
import { CategoryModel } from "./category.model";
import { UserModel } from "./user.model";

export interface AdItemsModel {
  id: string;

  name: string;

  value: string;

  position: ItemPosition;

  type: ItemTypes;

  index: number;

  isSearch: boolean;

  isUse: boolean;
}
export interface AdLocationModel {
  lat: string;

  lng: string;
}
export interface AdModel {
  _id: string;
  num: number;

  title: string;

  images?: string[];
  unitPrice: number;
  area: number;

  description: string;

  location: AdLocationModel;

  subCategory: string | CategoryModel;

  category: string | CategoryModel;

  sellType: AdSellType;

  items: AdItemsModel[];

  adType: AdTypes;

  adStatus: AdStatus;

  image: string;

  file?: string;

  view: AdView;

  user: string | UserModel;

  views?: string[];

  returnMessage?: string;

  updatedAt?: string;
  createdAt?: string;
}
