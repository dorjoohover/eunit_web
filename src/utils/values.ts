import { nav1, nav2, nav3 } from "./string";
import {
  MdOutlineArrowDropDownCircle,
  MdOutlineShortText,
  MdOutlineTextFields,
} from "react-icons/md";
import { BsTextParagraph } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosCheckboxOutline, IoMdRadioButtonOn } from "react-icons/io";
import { Libraries } from "@react-google-maps/api";
import { AdSellType } from "@/config/enum";
import { GridOptions, SwiperOptions } from "swiper/types";
// export const api = "http://localhost:5050/api/";

// export const url = "http://localhost:3000";
// export const url = "http://103.50.206.58";
// export const api = "http://172.24.48.1:5050/api/";

export const api = "https://srv549330.hstgr.cloud/api/";
// export const api = "http://93.127.186.77:5050/api/";
export const imageApi = `${api}file/`;
// export const url = "http://localhost:3000/";
// export const url = "https://chat-app-web-xi.vercel.app";
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
  "Баянзүрх",
  "Сүхбаатар",
  "Багануур",
  "Чингэлтэй",
  "Сонгинохайрхан",
  "Багахангай",
  "Баянгол",
  "Налайх",
  "Хан-Уул",
];

export const gmailImageUrl = "https://lh3.googleusercontent.com";
export const locationCenter = {
  lat: 47.91887307876936,
  lng: 106.91757202148438,
};

export const navbar = [
  {
    text: nav1,
    value: "/#about",
  },
  {
    text: nav2,

    value: "/#pricing",
  },
  {
    text: nav3.toUpperCase(),
    value: "/#faq",
  },
];

const ad = "ad/";
const category = "category/";
const user = "user/";
const auth = "auth/";
const estimate = "estimate/";
const feedback = "feedback/";

export class ConstantApi {
  static category = `${category}all/`;
  static upload = ``;
}
export class EstimateApi {
  static create = `${estimate}`;
  static update = `${estimate}update/`;
  static price = `${estimate}price/`;
  // static upload = ``;
}

export class AuthApi {
  static register = `${auth}register`;
  static login = `${auth}login`;
}

export class UserApi {
  static user = `${user}`;
  static get = `${user}get/`;
  static me = `${user}me`;
  static sendFeedback = `${user}feedback`;
  static bookmark = `${user}bookmark/`;
  static point = `${user}point/`;
  static update = `${user}update/`;
  static feedback = `${this.user}feedback/`;
  static feedbackGet = `${this.feedback}get/`;
}

export class AdApi {
  static view = `${ad}get/`;
  static search = `${ad}search/{value}?value=`;
  static create = `${ad}`;
  static many = `${ad}many/`;
  static filter = `${ad}filter/`;
  static category = `${ad}category/`;
  static id = `${ad}id/`;
  static admin = `${ad}admin/`;
  static suggestion = `${ad}suggestion/`;
  static update = `${ad}update/`;
  static my = `${ad}my/`;
}
export class CategoryApi {
  static filter = `${category}filters/`;
}

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

export const adminNav = [
  {
    tabName: "Хүсэлт өгсөн зарууд",
    id: "request",

    submenu: [
      {
        tab: "Үл хөдлөх",
        href: "request/realState",
      },

      {
        tab: "Тээврийн хэрэгсэл",
        href: "request/vehicle",
      },
      {
        tab: "Компьютер",
        href: "request/computer",
      },
      {
        tab: "Цахилгаан бараа",
        href: "request/electronic",
      },
      {
        tab: "Гэр ахуйн бараа",
        href: "request/household-items",
      },
    ],
  },
  {
    tabName: "Агент байгууллагын хүсэлт",
    id: "users",

    submenu: [
      {
        tab: "Агент",
        href: "users/agent",
      },
      {
        tab: "Байгууллага",
        href: "users/organization",
      },
      {
        tab: "Энгийн",
        href: "users/default",
      },
    ],
  },
  {
    tabName: "EUnit хэтэвч",
    id: "wallet",
  },

  {
    tabName: "Хуваалцсан зар",
    id: "shared",
  },
  {
    tabName: "Санал хүсэлт",
    id: "feedback",
  },
  {
    tabName: "Үнэлгээ",
    id: "estimating",
  },
  {
    tabName: "Гарах",
    id: "logout",
  },
];

export const SharingSellTypes = [
  {
    id: AdSellType.sold,
    name: "Зарсан",
  },
  {
    id: AdSellType.rented,
    name: "Түрээслүүлсэн",
  },
];
export const SellTypes = [
  {
    id: AdSellType.sell,
    name: "Зарах",
  },
  {
    id: AdSellType.rent,
    name: "Түрээслүүлэх",
  },
  // {
  //   id: AdSellType.sellRent,
  //   name: "Зарах, түрээслүүлэх",
  // },
];

export const SellTypesString = ["Зарах", "Түрээслүүлэх"];

export const CommitteeData = [
  {
    id: "1khoroo",
    value: "1-р хороо",
  },
  {
    id: "2khoroo",
    value: "2-р хороо",
  },
  {
    id: "3khoroo",
    value: "3-р хороо",
  },
  {
    id: "4khoroo",
    value: "4-р хороо",
  },
  {
    id: "5khoroo",
    value: "5-р хороо",
  },
  {
    id: "6khoroo",
    value: "6-р хороо",
  },
  {
    id: "7khoroo",
    value: "7-р хороо",
  },
  {
    id: "8khoroo",
    value: "8-р хороо",
  },
  {
    id: "9khoroo",
    value: "9-р хороо",
  },
  {
    id: "10khoroo",
    value: "10-р хороо",
  },
  {
    id: "11khoroo",
    value: "11-р хороо",
  },
  {
    id: "12khoroo",
    value: "12-р хороо",
  },
  {
    id: "13khoroo",
    value: "13-р хороо",
  },
  {
    id: "14khoroo",
    value: "14-р хороо",
  },
  {
    id: "15khoroo",
    value: "15-р хороо",
  },
  {
    id: "16khoroo",
    value: "16-р хороо",
  },
  {
    id: "17khoroo",
    value: "17-р хороо",
  },
  {
    id: "18khoroo",
    value: "18-р хороо",
  },
  {
    id: "19khoroo",
    value: "19-р хороо",
  },
  {
    id: "20khoroo",
    value: "20-р хороо",
  },
  {
    id: "21khoroo",
    value: "21-р хороо",
  },
  {
    id: "22khoroo",
    value: "22-р хороо",
  },
  {
    id: "23khoroo",
    value: "23-р хороо",
  },
  {
    id: "24khoroo",
    value: "24-р хороо",
  },
  {
    id: "25khoroo",
    value: "25-р хороо",
  },
  {
    id: "26khoroo",
    value: "26-р хороо",
  },
  {
    id: "27khoroo",
    value: "27-р хороо",
  },
  {
    id: "28khoroo",
    value: "28-р хороо",
  },
  {
    id: "29khoroo",
    value: "29-р хороо",
  },
  {
    id: "30khoroo",
    value: "30-р хороо",
  },
];

export class GoogleMapsOptions {
  static libraries = ["places"] as Libraries;
}

export const proSwiperBreakpoints: {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
} = {
  // sm
  1: {
    slidesPerView: 1,
    grid: {
      rows: 2,
      fill: "row",
    },
  },

  1280: {
    slidesPerView: 2,
    grid: {
      rows: 2,
      fill: "row",
    },
  },
};

export const swiperBreakpoints: {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
} = {
  // sm
  1: {
    slidesPerView: 1,
    grid: {
      rows: 2,
      fill: "row",
    },
  },
  640: {
    slidesPerView: 2,
    grid: {
      rows: 2,
      fill: "row",
    },
  },
  // md
  768: {
    slidesPerView: 2,
    grid: {
      rows: 2,
      fill: "row",
    },
  },
  870: {
    slidesPerView: 3,
    grid: {
      rows: 2,
      fill: "row",
    },
  },
  // lg
  1024: {
    slidesPerView: 3,
    grid: {
      rows: 2,
      fill: "row",
    },
  },
  // xl
  1280: {
    slidesPerView: 4,
    grid: {
      rows: 2,
      fill: "row",
    },
  },
  1600: {
    slidesPerView: 5,
    grid: {
      rows: 2,
      fill: "row",
    },
  },
};
