import { AdSellType, AdStatus, ItemTypes, ProfileEnumType, SocialsEnum } from "@/config/enum";
import { AdModel } from "@/models/ad.model";
import React, { ReactNode } from "react";

export type FetchAdUnitType = {
  ads: AdModel[];
  limit: number;
};

export type AdCateIdType = {
  id: string, 
  cateId: string
}

export type AdFilterType = {
  id: string;

  value?: string;

  min?: number;

  max?: number;
  parent?: string
};

export type FetchAdType = {
  defaultAds: FetchAdUnitType;
  specialAds: FetchAdUnitType;
};
export type FeedbackType = {
  title: string;
  message: string;
};

export type LoadingButtonType = {
  text: string;
  onClick?: () => {};
  blue?: boolean;
  isLoading: boolean;
};
export type ProductInfoValueType = {
  href: boolean;
  value: string;
  id: string;
  cateId: number | string;
};
export type SocialType = { name: SocialsEnum; url: string };

// zasna
export type CreateAdType = {
  categoryId?: number;
  categoryName?: string;
  subCategoryId: string;
  category_ID?: string;
  sellType?: AdSellType;
  adType?: string;
  file?: File
  fileUrl?: string
};

export type EstimateItemType = {
  name: string;
  id: string;
  value: string;
  type?: ItemTypes;
}
export type EstimateType = 
  {
    fileUrl?: string
    file?: File;
    items: EstimateItemType[];
    subCategory: string;
    category: string;
    sellType: AdSellType;
    status: AdStatus;
  }

export type GeneralDataType = {
  price: number;
  area: number;
  unitPrice: number;
  title: string;
  desc: string;
  imgSelected: boolean;
  images: string[];
  phone: number;
};
export type GoogleMapsType = {
  lat: number, 
  lng: number
};

export type CacheVarType = {
  parent?: string;
  position?: string;
  value: string;
  id: string;
};

export type StepTypes = {
  map?: GoogleMapsType;
  district?: string;
  location?: string;
  committee?: string;
  town?: string;
  landLicense?: string;
  landUsage?: string;
  licenseOperation?: string;
  operation?: string;
  buildingFloor?: string;
  howFloor?: string;
  validDate?: number;
  paymentMethod?: string;
  barter?: string;
  price?: number;
  area?: number;
  unitPrice?: number;
  title?: string;
  desc?: string;
  imgSelected?: boolean;
  images?: string[];
  phone?: number;
  files?: File[]
};
export type ItemType = {
  data?: string;
  className?: string
  onClick?: () => void;
  id?: string;
  children?: ReactNode
  isSelected?: boolean;
};

export type ProfileType = {
  item: ProfileEnumType;
  edit?: boolean;
  value?: string;
  onChange: (e: string) => void;
  className?: string;
  ph?: string;
  type?: string;
};
export type DateType = {
  defValue?: string;
  title?: string;
  requirement?: boolean;
  value?: string;
  name?: string;
  onSelect?: (value: string) => void;
  limit?: number;
  maxValue?: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
};
export type TextType = {
  title?: string;
  ph?: string;
  onChange?: (value: string) => void;
  value?: string;
};
// export type SelectType = {

//   data,
//   Item = () => <></>,
//   selected,
//   title?: string;
//   ph?: string;
//   onChange?: (value: string) => {};
//   value?: string;
// };
