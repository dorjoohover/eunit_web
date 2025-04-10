import { ReactNode, Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Хэтэвч - Eunit.mn",
  description:
    "Хөрөнгөө удирдах хялбар арга, өөрийн хөрөнгийн үнэлгээгээ хамгийн хялбараар шалгах боломжтой.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
