"use client";
import { ReportWrapper } from "@/_context";
import { Colors } from "@/base/constants";
import { ReactNode, Suspense } from "react";
import Loading from "../loading";
import { useMediaQuery } from "@mantine/hooks";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const matches = useMediaQuery("(min-width: 50em)");

  return (
    <Suspense fallback={<Loading />}>
      <div
        className={`bg-[${Colors.lightIvory}] relative  top-[60px] ${
          matches && "left-[60px]"
        }`}
        style={{
          width: matches ? "calc(100vw - 70px)" : "100vw",
        }}
      >
        <ReportWrapper>{children}</ReportWrapper>
      </div>
    </Suspense>
  );
};

export default RootLayout;
