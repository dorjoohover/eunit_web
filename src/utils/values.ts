import { locale } from "@/base/vocabs/mn";
import { ItemPosition, ItemTypes, PaymentUsage, TransactionType } from "@/config/enum";
import { DistrictAssets } from "./assets";

export const categoryNames = [
  "Орон сууц",
  "Газар",
  "Худалдаа, үйлчилгээний талбай",
  "АОС, хаус, амралтын газар",
  "Хашаа байшин, гэр",
  "Үйлдвэр, агуулах, обьект",
  "Оффис",
  "Гараж, контейнер",
];
export const districts = [
  {
    name: "Хан уул дүүрэг",
    id: "Хан-Уул",
    img: DistrictAssets.khanuul,
    committee: 25,
  },
  {
    name: "Сүхбаатар дүүрэг",
    id: "Сүхбаатар",
    img: DistrictAssets.sukhbaatar,
    committee: 20,
  },
  {
    name: "Налайх дүүрэг",
    id: "Налайх",
    img: DistrictAssets.nalaikh,
    committee: 8,
  },
  {
    name: "Сонгинохайрхан дүүрэг",
    id: "Сонгинохайрхан",
    img: DistrictAssets.songinoKhairkhan,
    committee: 43,
  },
  {
    name: "Баянзүрх дүүрэг",
    id: "Баянзүрх",
    img: DistrictAssets.bayanzurkh,
    committee: 43,
  },
  {
    name: "Баянгол дүүрэг",
    id: "Баянгол",
    img: DistrictAssets.bayangol,
    committee: 34,
  },
  {
    name: "Чингэлтэй дүүрэг",
    id: "Чингэлтэй",
    img: DistrictAssets.chingeltei,
    committee: 24,
  },
];

export const defaultMapContainerStyle = {
  width: "100%",
  height: "50vh",
};
export const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,

  mapTypeId: "hybrid",
  disableDefaultUI: false,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  zoom: 16,
  gestureHandling: "greedy",
};
export const defaultMapZoom = 18;
export const defaultPhoneMapCenter = {
  lat: 47.8566464,
  lng: 106.9554304,
};
export const defaultMapCenter = {
  lat: 47.8566464,
  lng: 107.0554304,
};

export const TransactionValue = (type: TransactionType) => {
  if (type == TransactionType.outcome) {
    return {
      text: "Зарлага",
      color: "#EB973D",
    };
  }
  return {
    text: "Орлого",
    color: "main",
  };
};

export const TransactionValues = (name: string) => {
  return [
    {
      name: "Дансны дугаар",
      value: "5700 3860 71",
    },
    {
      name: "Дансны нэр",
      value: "Бом Менежмент",
    },
    {
      name: "Гүйлгээний утга",
      value: name,
    },
  ];
};

export const ProfileValues = {
  firstname: {
    text: "Овог",
    pl: "Нэр",
  },
  lastname: {
    text: "Нэр",
    pl: "Нэр",
  },
  email: {
    text: "Цахим хаяг",
    pl: "нэр",
  },
  phone: {
    text: "Утасны дугаар",
    pl: "Нэр",
  },
};

export const ServiceFormValues = {
  area: {
    label: "Орон сууцны м.кв",
    description: "Зөвхөн тоо оруулна уу.",
    example: "80.12",
    message: "Талбай оруулна уу",
  },
  no: {
    label: "Байрны дугаар",
    description: "Зөвхөн тоо үсэг оруулна уу. (Байр гэж бичих шаардлагагүй!)",
    example: "20 , 20а , 20/а , 20/1 гэх мэт бичнэ үү.",
    message: "",
  },
  floor: {
    label: "Өөрийн давхар",
    description: "Зөвхөн тоо оруулна уу.",
    message: "",
    example: "10",
  },
  room: {
    label: "Өрөөний тоо",
    description: "Зөвхөн тоо оруулна уу.",
    message: "",
    example: "2",
  },
};

export const ServiceValues = {
  10: "Лавлагаа",
  20: "Үнэлгээ",
  30: "Дата татах",
};

export const ContactFormValues = {
  name: {
    label: "Овог нэр",
    description: "Өөрийн овог нэрийг оруулна уу.",
  },
  position: {
    label: "Албан тушаал",
    description: "Албан тушаалийн мэдээллийг оруулах.",
  },
  phone: {
    label: "Холбогдох дугаар",
    description: "Хувийн утасны дугаарыг оруулна уу.",
  },
  organization: {
    label: "Ажилладаг байгууллагын нэр",
    description: "Байгууллагын нэр эсвэл хувиараа гэх мэт.",
  },
  purpose: {
    label: "Холбогдож буй зорилго",
    description:
      "Хөрөнгө оруулалт, мэдээлэл солилцох, мэдээлэл  худалдан авах гэх мэт тайлбарлан бичнэ үү.",
  },
};

export const reportRoutes = (slug: string) => {
  if (slug == "district") return "location";
  if (slug == "location") return "area";
  if (slug == "area") return "result";
};

export const itemNames = [
  {
    name: "Ашиглалтад орсон он",
    id: "operation",
    range: true,
    location: false,
  },
  {
    name: "Талбай",
    id: "area",
    range: true,
    location: false,
  },
  {
    name: "Үнэ",
    id: "price",
    range: true,
    location: false,
  },
  {
    name: "Хэдэн давхарт",
    id: "howFloor",
    range: true,
    location: false,
  },
  {
    name: "Дүүрэг",
    id: "district",
    range: false,
    location: true,
  },
  {
    name: "Байршил",
    id: "location",
    range: false,
    location: true,
  },
];

export const DataDownloadValue = {
  district: {
    label: "Дүүрэг",
    pl: "Сонгоно уу",
  },
  town: {
    label: "Хотхон",
    pl: "Сонгоно уу",
  },
  area: {
    label: "Талбай",
    pl: "Оруулна уу",
  },
  date: {
    label: "Огноо",
    pl: "",
  },
};

export type CarEvaluateKey =
  | "brand"
  | "mark"
  | "motor"
  | "engine"
  | "gearbox"
  | "steerType"
  | "drive"
  | "color"
  | "meter"
  | "manufactured"
  // | "type"
  | "interior"
  | "conditions"
  | "org"
  | "firstname"
  | "lastname"
  | "usage"
  | "imported";

type CarEvaluateValue = {
  label: string;
  pl: string;
};

export const ReportSubmitErrorMessages = {
  lastname: "Овог оруулна уу",
  firstname: "Нэр оруулна уу",
  usage: "Лавлагааны зориулалт сонгоно уу",
  org: "Байгууллага сонгоно уу",
  brand: "Брэнд сонгоно уу",
  mark: "Марк сонгоно уу",
  motor: "Хөдөлгүүрийн багтаамж сонгоно уу",
  engine: "Хөдөлгүүрийн төрөл сонгоно уу",
  gearbox: "Хурдны хайрцаг сонгоно уу",
  steerType: "Хүрд сонгоно уу",
  drive: "Хөтлөгч сонгоно уу",
  color: "Өнгө сонгоно уу",
  interior: "Салоны өнгө сонгоно уу",
  // type: "Төрөл сонгоно уу",
  conditions: "Нөхцөл сонгоно уу",
  meter: "Гүйлт сруулна уу",
  manufactured: "Үйлдвэрлэгдсэн он сруулна уу",
  imported: "Импортлогдсон он сруулна уу",
};

export type ReportSubmitErrorMessagesType =
  keyof typeof ReportSubmitErrorMessages;


export const reportPrice = (name?: string) => {
  if(name == `${PaymentUsage.VALUE}`  || !name) return 2000
  return 5000
}

export const CarEvaluateValues: Record<CarEvaluateKey, CarEvaluateValue> = {
  brand: { label: "Брэнд", pl: "Сонгоно уу" },
  mark: { label: "Марк", pl: "Сонгоно уу" },
  motor: { label: "Хөдөлгүүрийн багтаамж", pl: "Сонгоно уу" },
  engine: { label: "Хөдөлгүүрийн төрөл", pl: "Сонгоно уу" },
  gearbox: { label: "Хурдны хайрцаг", pl: "Сонгоно уу" },
  steerType: { label: "Хүрд", pl: "Сонгоно уу" },
  drive: { label: "Хөтлөгч", pl: "Сонгоно уу" },
  color: { label: "Өнгө", pl: "Сонгоно уу" },
  interior: { label: "Салоны өнгө", pl: "Сонгоно уу" },
  // type: { label: "Төрөл", pl: "Сонгоно уу" },
  conditions: { label: "Нөхцөл", pl: "Сонгоно уу" },
  meter: { label: "Гүйлт", pl: "Оруулна уу" },
  manufactured: { label: "Үйлдвэрлэгдсэн он", pl: "Оруулна уу" },
  imported: { label: "Импортлогдсон он", pl: "Оруулна уу" },
  lastname: { label: "Овог", pl: "Овог оруулна уу" },
  firstname: { label: "Нэр", pl: "Өөрийн нэр оруулна уу" },
  usage: { label: "Лавлагааны зориулалт", pl: "" },
  org: { label: "Байгууллага сонголт", pl: "" },
};

export const locationCenter = {
  lat: 47.91887307876936,
  lng: 106.91757202148438,
};

export const createAdNav = [
  {
    tabName: "Зар нэмэх",
    id: "ad/create",

    submenu: [
      {
        tab: "Зар нэмэх",
        href: "ad/create",
      },
      {
        tab: "Зар хуваалцах",
        href: "ad/sharing",
      },
    ],
  },
];

export const NavbarValue = [
  { name: locale.data.NAVBAR.HOME, href: "/" },
  { name: locale.data.NAVBAR.REALSTATE, href: "/report" },
  { name: locale.data.NAVBAR.CAR, href: "/car" },
  { name: locale.data.NAVBAR.WALLET, href: "/wallet" },
  // { name: locale.data.NAVBAR.CONTACT, href: "/contact" },
];

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
  name: "Ашиглалтад орсон он",
  other: false,
  position: ItemPosition.default,
};
export const howFloorName = {
  id: "howFloor",
  type: ItemTypes.dropdown,
  isSearch: true,
  index: 4,
  parent: "buildingFloor",
  name: "Хэдэн давхарт",
  isUse: true,
  position: ItemPosition.default,
};

export const SellTypesString = ["Зарах", "Түрээслүүлэх"];
