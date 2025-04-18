import { ReactNode, Suspense } from "react";
import ErrorBoundary from "@/components/errorBoundary";
import Loading from "../loading";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Нэвтрэх - Eunit.mn",
  description:
    "Eunit.mn дээр нэвтэрч, хөрөнгийн үнэлгээ хийх, лавлагаагаа удирдах, боломжтой.",
};
const RootLayout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default RootLayout;
