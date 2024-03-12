import {
  AdSellType,
  AdStatus,
  AdTypes,
  AdView,
  ItemPosition,
  ItemTypes,
} from "@/config/enum";

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

  images: [];
  unitPrice: number;
  area: number;

  description: string;

  location: AdLocationModel;

  subCategory: string;

  category: string;

  sellType: AdSellType;

  items: AdItemsModel[];

  adType: AdTypes;

  adStatus: AdStatus;

  image: string;

  file?: string;

  view: AdView;

  user: string;

  views?: string[];

  returnMessage?: string;
}
