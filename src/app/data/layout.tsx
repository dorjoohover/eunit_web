import { ReactNode, Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Дата мэдээлэл - Eunit.mn",
  description:
    "Та хөрөнгийн үнэлгээний лавлагаагаа хамгийн хялбараар буюу ердөө 1 минутанд авах боломжтой.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
