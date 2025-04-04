import { AdSellType, TransactionType } from "@/config/enum";
import { gmailImageUrl, imageApi } from "./routes";
import { UserModel } from "@/models/user.model";

export function mergeNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export const stopPropagation = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};
export const profileImgUrl = (url?: string, assets?: string) => {
  return url != undefined && url != ""
    ? url.startsWith(gmailImageUrl)
      ? url
      : `${imageApi}${url}`
    : assets ??
        "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png";
};

export const parseDate = (date: Date, symbol = "/", time = false) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return time
    ? `${year}${symbol}${
        month + 1 < 10 ? `0${month + 1}` : month + 1
      }${symbol}${day < 10 ? `0${day}` : day} ${
        hour < 10 ? `0${hour}` : hour
      }:${minute < 10 ? `0${minute}` : minute}:${
        second < 10 ? `0${second}` : second
      }`
    : `${year}${symbol}${
        month + 1 < 10 ? `0${month + 1}` : month + 1
      }${symbol}${day < 10 ? `0${day}` : day}`;
};

export const money = (value: string, currency = "") => {
  return `${currency}${value
    .replaceAll(",", "")
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export function formatPhoneNumber(phone: string) {
  if (!phone) return "";
  if (!phone.startsWith("+976") || phone.length !== 12) {
    return "Invalid number";
  }

  let digits = phone.slice(4);
  return `+976 ${digits.slice(0, 4)}-${digits.slice(4)}`;
}

export function formatNumber(num: string, length = 4) {
  return num.toString().padStart(length, "0");
}

export const getSellType = (type: AdSellType | string) => {
  switch (type) {
    case "Зарах":
      return AdSellType.sell;
    case "Түрээслүүлэх":
      return AdSellType.rent;
    case "Зарах, түрээслүүлэх":
      return AdSellType.sellRent;
    case "Зарсан":
      return AdSellType.sold;
    case "Түрээслэсэн":
      return AdSellType.rented;
    case AdSellType.sell:
      return "Зарах";
    case AdSellType.rent:
      return "Түрээслүүлэх";
    case AdSellType.sellRent:
      return "Зарах, түрээслүүлэх";
    case AdSellType.sold:
      return "Зарсан";
    case AdSellType.rented:
      return "Түрээслүүлсэн";

    default:
      return;
  }
};

export const getEstimateEnums = (est: string) => {
  switch (est) {
    case "estimated":
      return "Үнэлсэн";
    case "finished":
      return "Дууссан";
    case "pending":
      return "Хүлээгдэж байгаа";
    case "returned":
      return "Буцаагдсан";
    default:
  }
};

const isImage = (url: string) =>
  new Promise((resolve, reject) => {
    // check that is a valid url
    // then if valid url
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
export const imageExists = async (url: string) => {
  let img = "";
  await isImage(url)
    .then(() => {
      img = url;
    })
    .catch(() => {
      img = imageApi + url;
    });

  if (img == "") return undefined;
  return img;
};

export const getSuggestionValue = (suggestion: string) => {
  switch (suggestion) {
    case "room":
      return {
        id: "room",
        value: "Өрөөгөөр",
      };
    case "location":
      return {
        id: "location",
        value: "Байршлаар",
      };
    case "landUsage":
      return {
        id: "landUsage",
        value: "Зориулалтаар",
      };

    default:
      return;
  }
};
