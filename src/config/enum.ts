// user
export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}
export enum UserType {
  default = 20,
  // agent = "agent",
  // organization = "organization",
  admin = 10,
}

export enum PaymentType {
  QPAY = 1,
  POINT = 2,
}

export enum TransactionType {
  income = 10,
  outcome = 20,
}

export enum Constant {
  DISTRICT = 10,
  TOWN = 20,
  NOTTOWN = 30,
}
export enum ServiceType {
  REVIEW = 20,
  REPORT = 10,
  DATA = 30,
}
export enum UserStatus {
  pending = "pending",
  active = "active",
  banned = "banned",
  returned = "returned",
}

export enum SocialsEnum {
  facebook = "facebook",
  instagram = "instagram",
  telegram = "telegram",
}
// ad
export enum AdTypes {
  special = "special",
  specialM = "specialM",
  sharing = "sharing",
  default = "default",
  poster = "poster",
  all = "all",
  any = "any",
}

export enum AdView {
  show = "show",
  hide = "hide",
  end = "end",
}

export enum AdStatus {
  sold = "sold",
  pending = "pending",
  checking = "checking",
  timed = "timed",
  created = "created",
  deleted = "deleted",
  returned = "returned",
  all = "all",
}
export enum EstimateStatus {
  pending = "pending",
  estimated = "estimated",
  deleted = "deleted",
  returned = "returned",
  finished = "finished",
}
export enum AdSellType {
  sell = "sell",
  sold = "sold",
  rent = "rent",
  rented = "rented",
  sellRent = "sellRent",
  nothing = "nothing",
}

export enum ProfileEnumType {
  username = "username",
  phone = "phone",
  agent = "agent",
  date = "date",
  email = "email",
  floor = "floor",
  square = "square",
}

export enum ItemPosition {
  default = "default",
  top = "top",
  side = "side",
  location = "location",
  any = "any",
}
// item
export enum ItemTypes {
  dropdown = "dropdown",
  text = "text",
  date = "date",
  year = "year",
  select = "select",
  number = "number",
  committee = "committee",
  radio = "radio",
}
// point
export enum PointSendType {
  sender = "sender",
  receiver = "receiver",
}

export enum PointTitle {
  bonus = "bonus",
  default = "default",
}

export enum CreateAdSteps {
  type = "type",
  adType = "adType",
  location = "location",
  general = "general",
  detail = "detail",
}

export enum Api {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PATCH = "PATCH",
  PUT = "PUT",
}

export const SharingView = {
  show: {
    id: "show",
    name: "Харуулах",
  },
  hide: {
    id: "hide",
    name: "Нуух",
  },
};
