import { AdSellType } from "@/config/enum";

export default function mergeNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
