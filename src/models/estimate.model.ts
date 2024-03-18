import { AdSellType, EstimateStatus, ItemTypes } from "@/config/enum";
import { CategoryModel } from "./category.model";


export interface EstimateItemsModel {

  id: string;

  name: string;

  value: string;


  type: ItemTypes;

  index: number;
}


export interface EstimateModel {
  _id?: string
  subCategory?: string;
 
  category: string | CategoryModel;

  sellType: AdSellType;


  items: EstimateItemsModel[];

 status: EstimateStatus;

  file?: string;

  user: string;

  price?: number
  returnMessage?: string;
}

