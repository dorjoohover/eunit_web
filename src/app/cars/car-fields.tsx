// Next.js App Router-ийн "page.tsx" файлууд зөвхөн тодорхой (default,
// generateMetadata, generateStaticParams гэх мэт) export-уудыг зөвшөөрдөг тул
// carFields/FormType-г тусдаа файлд гаргаж, page.tsx-үүд эндээс import хийнэ.
import { IoCarSportOutline, IoColorFillOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import { PiEngine } from "react-icons/pi";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  GiBrassKnuckles,
  GiCarKey,
  GiCarWheel,
  GiGearStickPattern,
  GiMachineGunMagazine,
  GiSuspensionBridge,
  GiTireIron,
  GiWindow,
} from "react-icons/gi";
import { LuPaintRoller, LuPalette } from "react-icons/lu";
import { FaCarSide, FaGasPump, FaSnowflake } from "react-icons/fa";
import {
  MdOutlineAssessment,
  MdOutlineChecklist,
  MdOutlineDirectionsCar,
  MdOutlineMemory,
  MdOutlineSystemSecurityUpdateWarning,
} from "react-icons/md";

export interface FormType {
  plateNumber?: string;
  milleage?: number | string;
  drive?: number | string;
  gearbox?: number | string;
  vehicleCondition?: number | string;
  engineAndTransmission?: number | string;
  suspensionAndSteering?: number | string;
  brakeSystem?: number | string;
  tire?: number | string;
  climateSystem?: number | string;
  body?: number | string;
  paintwork?: number | string;
  rim?: number | string;
  windshield?: number | string;
  salon?: number | string;
  electronicSystem?: number | string;
  overall?: number | string;
  extraFeatures?: number | string;
}

export type CarField = {
  name: string;
  key: string;
  icon: JSX.Element;
  step?: number;
};

export const carFields: CarField[] = [
  {
    name: "Марк",
    key: "markName",
    icon: <IoCarSportOutline size={24} />,
    step: undefined,
  },
  {
    name: "Модел",
    key: "modelName",
    icon: <BsBookmark size={24} />,
    step: undefined,
  },
  {
    name: "Хөдөлгүүрийн багтаамж",
    key: "capacity",
    icon: <PiEngine size={24} />,
    step: undefined,
  },
  {
    name: "Өнгө",
    key: "colorName",
    icon: <IoColorFillOutline size={24} />,
    step: undefined,
  },
  {
    name: "Үйлдвэрлэсэн он",
    key: "buildYear",
    icon: <CiCalendarDate size={24} />,
    step: undefined,
  },
  {
    name: "Импортын огноо",
    key: "importDate",
    icon: <CiCalendar size={24} />,
    step: undefined,
  },
  {
    name: "Гүйлт",
    key: "milleage",
    icon: <AiOutlineDashboard size={24} />,
    step: 1,
  },
  {
    name: "Хөдөлгүүрийн төрөл",
    key: "fueltype",
    icon: <FaGasPump size={24} />,
    step: undefined,
  },
  {
    name: "Хүрд",
    key: "wheelPosition",
    icon: <MdOutlineSystemSecurityUpdateWarning size={24} />,
    step: undefined,
  },
  {
    name: "Хурдны хайрцаг",
    key: "gearbox",
    icon: <GiGearStickPattern size={24} />,
    step: 2,
  },
  { name: "Хөтлөгч", key: "drive", icon: <FaCarSide size={24} />, step: 2 },
  {
    name: "Ерөнхий нөхцөл",
    key: "vehicleCondition",
    icon: <MdOutlineChecklist size={24} />,
    step: 2,
  },
  {
    name: "Хөдөлгүүр ба хурдны хайрцаг",
    key: "engineAndTransmission",
    icon: <GiMachineGunMagazine size={24} />,
    step: 2,
  },
  {
    name: "Тэнхлэг ба жолоодлого",
    key: "suspensionAndSteering",
    icon: <GiSuspensionBridge size={24} />,
    step: 2,
  },
  {
    name: "Тоормос",
    key: "brakeSystem",
    icon: <GiBrassKnuckles size={24} />,
    step: 2,
  },
  { name: "Дугуй", key: "tire", icon: <GiTireIron size={24} />, step: 2 },
  {
    name: "Агааржуулалт/Халаалт",
    key: "climateSystem",
    icon: <FaSnowflake size={24} />,
    step: 2,
  },
  {
    name: "Биеийн байдал",
    key: "body",
    icon: <MdOutlineDirectionsCar size={24} />,
    step: 3,
  },
  {
    name: "Будаг",
    key: "paintwork",
    icon: <LuPaintRoller size={24} />,
    step: 3,
  },
  { name: "Обуд", key: "rim", icon: <GiCarWheel size={24} />, step: 3 },
  {
    name: "Салхины шил",
    key: "windshield",
    icon: <GiWindow size={24} />,
    step: 3,
  },
  { name: "Салоны өнгө", key: "salon", icon: <LuPalette size={24} />, step: 4 },
  {
    name: "Электроник систем",
    key: "electronicSystem",
    icon: <MdOutlineMemory size={24} />,
    step: 4,
  },
  {
    name: "Их бие",
    key: "overall",
    icon: <MdOutlineAssessment size={24} />,
    step: 4,
  },
  {
    name: "Нэмэлт тоноглол",
    key: "extraFeatures",
    icon: <GiCarKey size={24} />,
    step: 4,
  },
];
