import { ProfileEnumType } from "@/config/enum";
import React, { ReactNode } from "react";

export type AdCateIdType = {
  id: string;
  cateId: string;
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
  lat: number;
  lng: number;
};

export type VehicleInfo = {
  archiveDate: string | null;
  archiveFirstNumber: string | null;
  archiveNumber: string | null;
  axleCount: number;
  buildYear: number;
  cabinNumber: string | null;
  capacity: number;
  certificateNumber: string | null;
  className: string | null;
  colorName: string | null;
  countryName: string | null;
  fueltype: string | null;
  height: number;
  importDate: string | null;
  intent: string | null;
  length: number;
  manCount: number;
  markName: string | null;
  mass: number;
  modelName: string | null;
  motorNumber: string | null;
  ownerAddress: {
    apartment: string | null;
    door: string | null;
    soum: string | null;
    state: string | null;
    street: string | null;
    town: string | null;
  };
  ownerCountry: string | null;
  ownerFirstname: string | null;
  ownerHandphone: string | null;
  ownerHomephone: string | null;
  ownerLastname: string | null;
  ownerRegnum: string | null;
  ownerType: string | null;
  ownerWorkphone: string | null;
  plateNumber: string | null;
  transmission: string | null;
  type: string | null;
  typeId: number;
  weight: number;
  wheelPosition: string | null;
  width: number;
};

export type CacheVarType = {
  parent?: string;
  position?: string;
  value: string;
  id: string;
};

export type QpayType = {
  invoice_id: string;
  qPay_shortUrl: string;
  qr_image: string;
  qr_text: string;
  urls: { description: string; link: string; logo: string; name: string }[];
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
  files?: File[];
};
export type ItemType = {
  data?: string;
  className?: string;
  onClick?: () => void;
  id?: string;
  children?: ReactNode;
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
export type EstimateEnums = {
  ESTIMATED: number;
  FINISHED: number;
  PENDING: number;
  RETURNED: number;
};

export type SellTypes = {
  SELL: number;
  RENT: number;
  SELL_RENT: number;
  SOLD: number;
  RENTED: number;
};

export type SharingSellTypes = {
  SOLD: number;
  RENTED: number;
};

export type Dict = {
  [key: number]: string;
};
