import { AdSellType, ProfileEnumType, SocialsEnum } from "@/config/enum";
import { AdModel } from "@/models/ad.model";
import React, { ReactNode } from "react";

export type FetchAdUnitType = {
  ads: AdModel[];
  limit: number;
};

export type AdFilterType = {
  id: string;

  value?: string;

  min?: number;

  max?: number;
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
  cateId: number;
};
export type SocialType = { name: SocialsEnum; url: string };

// zasna
export type CreateAdType = {
  categoryId: number;
  categoryName: string;
  subCategoryId: string;
  category_ID?: string;
  sellType?: AdSellType;
  adType: string;
};
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
  latLng?: google.maps.LatLng | google.maps.LatLngLiteral;
};

export type CacheVarType = {
  parent: string;
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
};
export type ItemType = {
  text: string;
  onClick: () => void;
  id: string;
  isSelected: boolean;
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
