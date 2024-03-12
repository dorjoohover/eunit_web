// user
export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}
export enum UserType {
  default = "default",
  agent = "agent",
  organization = "organization",
  admin = "admin",
  system = "system",
}
export enum UserStatus {
  pending = "pending",
  active = "active",
  banned = "banned",
  returned = "returned",
}

export enum Socials {
  facebook,
  instagram,
  telegram,
}
// ad
export enum AdTypes {
  special = "special",
  specialM = "specialM",
  sharing = "sharing",
  default = "default",
  poster = "poster",
  all = "all",
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
