import { locale } from "@/base/vocabs/mn";
<<<<<<< refs/remotes/origin/dev
import { ItemPosition, ItemTypes, TransactionType } from "@/config/enum";
=======
import {
  ItemPosition,
  ItemTypes,
  PaymentUsage,
  TransactionType,
} from "@/config/enum";
>>>>>>> local
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
  | "motorType"
  | "engineType"
  | "steerType"
  | "wheelDrive"
  | "color"
  | "meter"
  | "manufactured"
  | "type"
  | "interior"
  | "conditions"
  | "imported";

type CarEvaluateValue = {
  label: string;
  pl: string;
};

<<<<<<< refs/remotes/origin/dev
=======
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
  if (name == `${PaymentUsage.VALUE}` || !name) return 2000;
  return 5000;
};

>>>>>>> local
export const CarEvaluateValues: Record<CarEvaluateKey, CarEvaluateValue> = {
  brand: { label: "Брэнд", pl: "Сонгоно уу" },
  mark: { label: "Марк", pl: "Сонгоно уу" },
  motor: { label: "Хөдөлгүүрийн багтаамж", pl: "Сонгоно уу" },
  motorType: { label: "Хөдөлгүүрийн төрөл", pl: "Сонгоно уу" },
  engineType: { label: "Хурдны хайрцаг", pl: "Сонгоно уу" },
  steerType: { label: "Хүрд", pl: "Сонгоно уу" },
  wheelDrive: { label: "Хөтлөгч", pl: "Сонгоно уу" },
  color: { label: "Өнгө", pl: "Сонгоно уу" },
  interior: { label: "Салоны өнгө", pl: "Сонгоно уу" },
  type: { label: "Төрөл", pl: "Сонгоно уу" },
  conditions: { label: "Нөхцөл", pl: "Сонгоно уу" },
  meter: { label: "Гүйлт", pl: "Оруулна уу" },
  manufactured: { label: "Үйлдвэрлэгдсэн он", pl: "Оруулна уу" },
  imported: { label: "Импортлогдсон он", pl: "Оруулна уу" },
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
  { name: locale.data.NAVBAR.ESTIMATE, href: "/report" },
  { name: locale.data.NAVBAR.DATA, href: "/data" },
  { name: locale.data.NAVBAR.WALLET, href: "/wallet" },
  { name: locale.data.NAVBAR.CAR, href: "/car" },
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
export enum DRIVE {
  урдаа = 10,
  бүх = 20,
  хойноо = 30,
}
export const drive = {
  [DRIVE.урдаа]: "Урдаа FWD",
  [DRIVE.бүх]: "Бүх дугуй 4WD",
  [DRIVE.хойноо]: "Хойноо RWD",
};

export enum GEARBOX {
  mechanic = 10,
  automanic = 20,
}
export const gearbox = {
  [GEARBOX.mechanic]: "Механик",
  [GEARBOX.automanic]: "Автомат",
};
export enum VEHICLECONDITION {
  SUPER = 10,
  GOOD = 20,
  MEDIUM = 30,
  BAD = 40,
}

export const VehicleCondition = {
  [VEHICLECONDITION.SUPER]: "Маш сайн",
  [VEHICLECONDITION.GOOD]: "Сайн",
  [VEHICLECONDITION.MEDIUM]: "Дунд зэрэг",
  [VEHICLECONDITION.BAD]: "Муу",
};
export enum BODY {
  ORIGINAL = 10,
  MODIFIED = 20,
  DAMAGED = 30,
}
export const body = {
  [BODY.ORIGINAL]: "Өөрчлөгдөөгүй",
  [BODY.MODIFIED]: "Зассан / өөрчилсөн / сольсон",
  [BODY.DAMAGED]: "Гэмтэлтэй",
};
export enum PAINTWORK {
  NONE = 10,
  MINOR = 20,
  MODERATE = 30,
  MAJOR = 40,
}

export const paintwork = {
  [PAINTWORK.NONE]: "Засвар ороогүй",
  [PAINTWORK.MINOR]: "Бага зэргийн косметик засвар орсон",
  [PAINTWORK.MODERATE]: "Дунд хэмжээний засвар, будаг орсон",
  [PAINTWORK.MAJOR]: "Их хэмжээний засвар, будаг орсон",
};

export enum RIM {
  GOOD = 10,
  MINOR_SCRATCHES = 20,
  MAJOR_SCRATCHES = 30,
  REPLACEMENT_NEEDED = 40,
}

export const rim = {
  [RIM.GOOD]: "Асуудалгүй",
  [RIM.MINOR_SCRATCHES]: "Бага зэргийн сэв зураастай. Засаж болно",
  [RIM.MAJOR_SCRATCHES]: "Их хэмжээний сэв зураастай. Солих шаардлагатай",
  [RIM.REPLACEMENT_NEEDED]: "Солих шаардлагатай",
};

export enum WINDSHIELD {
  NONE = 10,
  MINOR = 20,
  MAJOR = 30,
}

export const windshield = {
  [WINDSHIELD.NONE]: "Гэмтэлгүй",
  [WINDSHIELD.MINOR]: "Бага зэргийн сэв, гэмтэлтэй. Засаж болно",
  [WINDSHIELD.MAJOR]: "Их хэмжээний сэв, гэмтэлтэй. Засах боломжгүй",
};

export enum SALON {
  CLEAN = 10,
  MINOR_WEAR = 20,
  WORN = 30,
  DAMAGED = 40,
}
export const salon = {
  [SALON.CLEAN]: "Цэвэрхэн / шинэвтэр",
  [SALON.MINOR_WEAR]: "Бага зэргийн элэгдэлтэй",
  [SALON.WORN]: "Элэгдэлтэй, хуучирсан",
  [SALON.DAMAGED]: "Урагдсан, түлэгдсэн",
};
export enum ELECTRONICSYSTEM {
  NORMAL = 10,
  PARTIAL_ISSUES = 20,
  REPAIR_NEEDED = 30,
}
export const electronicSystem = {
  [ELECTRONICSYSTEM.NORMAL]: "Бүгд хэвийн ажиллагаатай",
  [ELECTRONICSYSTEM.PARTIAL_ISSUES]: "Зарим нэг зүйл доголдолтой",
  [ELECTRONICSYSTEM.REPAIR_NEEDED]: "Засах шаардлагатай",
};
export enum OVERALL {
  GOOD = 10,
  MINOR_DEFECTS = 20,
  MODERATE_DEFECTS = 30,
  MAJOR_DEFECTS = 40,
}

export const overall = {
  [OVERALL.GOOD]: "Асуудалгүй",
  [OVERALL.MINOR_DEFECTS]: "Бага зэргийн сэв зураастай",
  [OVERALL.MODERATE_DEFECTS]: "Дунд зэргийн сэв зураас / хонхор / халцархаатай",
  [OVERALL.MAJOR_DEFECTS]:
    "Гэмтэлтэй, том хэмжээний хонхор / халцархай / сэвтэй",
};
export enum EXTRAFEATURES {
  AUTO_GEARBOX = 10,
  SOFT_CLOSE_DOORS = 20,
  PARKING_SENSOR = 30,
  LEATHER_SEATS = 40,
  FRONT_OR_360_CAMERA = 50,
  REAR_CAMERA = 60,
  SEAT_MEMORY = 70,
  STEERING_HEATED_COOL = 80,
  SEAT_HEATED_COOL = 90,
  SUNROOF = 100,
}
export const extraFeatures = {
  [EXTRAFEATURES.AUTO_GEARBOX]: "Автомат багаж",
  [EXTRAFEATURES.SOFT_CLOSE_DOORS]: "Хаалга сордог",
  [EXTRAFEATURES.PARKING_SENSOR]: "Зай мэдрэгч",
  [EXTRAFEATURES.LEATHER_SEATS]: "Арьсан суудал",
  [EXTRAFEATURES.FRONT_OR_360_CAMERA]: "Урд талын/360 камер",
  [EXTRAFEATURES.REAR_CAMERA]: "Ухрахын камер",
  [EXTRAFEATURES.SEAT_MEMORY]: "Суудал сануулагч",
  [EXTRAFEATURES.STEERING_HEATED_COOL]: "Руль халдаг/хөрдөг",
  [EXTRAFEATURES.SEAT_HEATED_COOL]: "Суудал халдаг/хөрдөг",
  [EXTRAFEATURES.SUNROOF]: "Люк",
};
export enum ENGINEANDTRANSMISSION {
  NORMAL_FLUID_REQUIRED = 10,
  WORKING_NEEDS_DIAGNOSIS = 20,
  NEEDS_REPAIR = 30,
  NEEDS_REPLACEMENT = 40,
}
export const engineAndTransmission = {
  [ENGINEANDTRANSMISSION.NORMAL_FLUID_REQUIRED]:
    "Ямар ч асуудалгүй, шингэн дүүргэх хэрэгтэй",
  [ENGINEANDTRANSMISSION.WORKING_NEEDS_DIAGNOSIS]:
    "Бүрэн ажиллагаатай ч оношилгоо, үйлчилгээ шаардаж болзошгүй",
  [ENGINEANDTRANSMISSION.NEEDS_REPAIR]: "Засах шаардлагатай",
  [ENGINEANDTRANSMISSION.NEEDS_REPLACEMENT]:
    "Хөдөлгүүр / дамжуулагч солих шаардлагатай",
};
export enum SUSPENSIONANDSTEERING {
  ORIGINAL = 10,
  MINOR_WEAR = 20,
  MODIFIED_OR_REPAIR_NEEDED = 30,
}
export const suspensionAndSteering = {
  [SUSPENSIONANDSTEERING.ORIGINAL]: "Асуудалгүй / үйлдвэрийн хэвээрээ",
  [SUSPENSIONANDSTEERING.MINOR_WEAR]: "Хөнгөн элэгдэлтэй",
  [SUSPENSIONANDSTEERING.MODIFIED_OR_REPAIR_NEEDED]:
    "Өөрчлөгдсөн / Засвар шаардлагатай",
};
export enum BRAKESYSTEM {
  NEW = 10,
  MINOR_WEAR = 20,
  MODERATE_WEAR = 30,
  NEEDS_REPLACEMENT = 40,
}
export const brakeSystem = {
  [BRAKESYSTEM.NEW]: "Шинэ",
  [BRAKESYSTEM.MINOR_WEAR]: "Бага зэргийн элэгдэлтэй",
  [BRAKESYSTEM.MODERATE_WEAR]: "Дунд зэргийн элэгдэлтэй",
  [BRAKESYSTEM.NEEDS_REPLACEMENT]: "Солих шаардлагатай",
};
export enum TIRE {
  NEW = 10,
  MINOR_WEAR = 20,
  MODERATE_WEAR = 30,
  NEEDS_REPLACEMENT = 40,
}
export const tire = {
  [TIRE.NEW]: "Бүх дугуй шинэвтэр",
  [TIRE.MINOR_WEAR]: "Бүх дугуй бага зэргийн элэгдэлтэй",
  [TIRE.MODERATE_WEAR]: "Бүх дугуй дунд зэргийн элэгдэлтэй",
  [TIRE.NEEDS_REPLACEMENT]: "Солих шаардлагатай",
};
export enum CLIMATESYSTEM {
  WORKING = 10,
  NOT_INSTALLED = 20,
  NEEDS_REPAIR = 30,
}
export const climateSystem = {
  [CLIMATESYSTEM.WORKING]: "Бүрэн ажиллагаатай",
  [CLIMATESYSTEM.NOT_INSTALLED]: "Байхгүй",
  [CLIMATESYSTEM.NEEDS_REPAIR]: "Засвар шаардлагатай",
};
export const carTechnical = {
  milleage: {
    label: "Гүйлт (км)",
    values: undefined,
    key: undefined,
    value: undefined,
  },
  drive: {
    values: Object.entries(drive),
    label: "Хөтлөгч",
    key: DRIVE,
    value: drive,
  },
  gearbox: {
    values: Object.entries(gearbox),
    label: "Хурдны хайрцаг",
    key: GEARBOX,
    value: gearbox,
  },
  vehicleCondition: {
    values: Object.entries(VehicleCondition),
    label: "Ерөнхий нөхцөл",
    key: VEHICLECONDITION,
    value: VehicleCondition,
  },
  engineAndTransmission: {
    values: Object.entries(engineAndTransmission),
    label: "Хөдөлгүүр ба хурдны хайрцаг",
    key: ENGINEANDTRANSMISSION,
    value: engineAndTransmission,
  },
  suspensionAndSteering: {
    values: Object.entries(suspensionAndSteering),
    label: "Тэнхлэг ба жолоодлого",
    key: SUSPENSIONANDSTEERING,
    value: suspensionAndSteering,
  },
  brakeSystem: {
    values: Object.entries(brakeSystem),
    label: "Тоормос",
    key: BRAKESYSTEM,
    value: brakeSystem,
  },
  tire: {
    values: Object.entries(tire),
    label: "Дугуй",
    key: TIRE,
    value: tire,
  },
  climateSystem: {
    values: Object.entries(climateSystem),
    label: "Агааржуулалт/Халаалт",
    key: CLIMATESYSTEM,
    value: climateSystem,
  },
};

export const carView = {
  body: {
    label: "Биеийн байдал",
    values: Object.entries(body),
    key: BODY,
    value: body,
  },
  paintwork: {
    label: "Будаг",
    values: Object.entries(paintwork),
    key: PAINTWORK,
    value: paintwork,
  },
  rim: {
    label: "Обуд",
    values: Object.entries(rim),
    key: RIM,
    value: rim,
  },
  windshield: {
    label: "Салхины шил",
    values: Object.entries(windshield),
    key: WINDSHIELD,
    value: windshield,
  },
};

export const carAdditional = {
  salon: {
    label: "Салон",
    key: SALON,
    values: Object.entries(salon),
    value: salon,
  },
  electronicSystem: {
    label: "Электроник систем",
    values: Object.entries(electronicSystem),
    key: ELECTRONICSYSTEM,
    value: electronicSystem,
  },
  overall: {
    label: "Их бие",
    values: Object.entries(overall),
    key: OVERALL,
    value: overall,
  },
  extraFeatures: {
    label: "Нэмэлт тоноглол",
    values: Object.entries(extraFeatures),
    key: EXTRAFEATURES,
    value: extraFeatures,
  },
};

export const carAllFields = {
  ...carTechnical,
  ...carView,
  ...carAdditional,
};
