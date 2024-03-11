import { nav1, nav2, nav3 } from "./string";
import {
  MdOutlineArrowDropDownCircle,
  MdOutlineShortText,
  MdOutlineTextFields,
} from "react-icons/md";
import { BsTextParagraph } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosCheckboxOutline, IoMdRadioButtonOn } from "react-icons/io";
// export const api = "http://localhost:5050/api/";
export const api = "http://localhost:5050/api/";
// export const url = "http://localhost:3000/";
export const url = "http://localhost:3000";
// export const url = "https://chat-app-web-xi.vercel.app";
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

const ad = 'ad/'
const category = 'category/'
const user = 'user/'
const auth = 'auth/'



export class ConstantApi {
  static category = `${category}all`;
}

export class AuthApi {
  static register = `${auth}register`
  static login = `${auth}login`
}

export class UserApi {
  
  static me = `${user}me`
  static sendFeedback = `${user}feedback`
}
export class AdApi {
  
  static view = `${ad}`
  static search = `${ad}search/{value}?value=`
}





export const createAdNav = [
  {
    tabName: "Зар нэмэх",
    id: "create",

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