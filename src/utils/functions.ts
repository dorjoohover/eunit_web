import { AdSellType } from "@/config/enum";
import { gmailImageUrl, imageApi } from "./values";

export default function mergeNames(...classes: string[]) {
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

export const formatText = (value: string) => {
  return value
    .replaceAll(",", "")
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
    .then((d) => {
      img = url;
    })
    .catch((d) => {
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
