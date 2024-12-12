import { Exo_2, Montserrat_Alternates } from "next/font/google";
export const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["500", "100", "200", "300", "400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-exo2",
});
export const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  weight: ["500"],
});
