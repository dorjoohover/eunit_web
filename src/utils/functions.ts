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
      return "sell";
    case "Түрээслүүлэх":
      return "rent";
    case "Зарах, түрээслүүлэх":
      return "sellRent";
    case "Зарсан":
      return "sold";
    case "Түрээслэсэн":
      return "rented";
    case "sell":
      return "Зарах";
    case "rent":
      return "Түрээслүүлэх";
    case "sellRent":
      return "Зарах, түрээслүүлэх";
    case "sold":
      return "Зарсан";
    case "rented":
      return "Түрээслүүлсэн";

    default:
      return;
  }
};
