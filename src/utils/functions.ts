import { AdSellType } from "@/config/enum";

export default function mergeNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export const stopPropagation = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
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
