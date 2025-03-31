import { ItemPosition, ItemTypes } from "@/config/enum";

export const buildingFloorValues = [
  {
    label: "B2",
    value: "B2",
  },
  {
    label: "B1",
    value: "B1",
  },
  ...Array.from({ length: 30 }, (_, i) => {
    return {
      label: `${1 + i}`,
      value: `${1 + i}`,
    };
  }),
];

export const buildingFloorName = {
  id: "buildingFloor",
  types: ItemTypes.dropdown,
  isUse: true,
  index: 3,
  name: "Барилгын давхар",
  position: ItemPosition.default,
  value: buildingFloorValues,
};
export const areaName = {
  id: "area",
  types: ItemTypes.text,
  isUse: true,
  isSearch: true,
  index: -1,
  name: "Талбай",
  position: ItemPosition.any,
};
export const priceName = {
  id: "price",
  types: ItemTypes.text,
  index: 0,
  name: "Үнэ",
  position: ItemPosition.side,
};

export const operationName = {
  id: "operation",
  type: ItemTypes.date,
  isSearch: true,
  index: 2,
  isUse: true,
  name: 'Ашиглалтад орсон он',
  other: false,
  position: ItemPosition.default,
};
export const howFloorName = {
  id: "howFloor",
  type: ItemTypes.dropdown,
  isSearch: true,
  index: 4,
  parent: "buildingFloor",
  name: 'Хэдэн давхарт',
  isUse: true,
  position: ItemPosition.default,
};
