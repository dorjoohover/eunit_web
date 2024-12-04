import { ReportWrapper } from "@/_context";
import { Colors } from "@/base/constants";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`bg-[${Colors.lightIvory}] relative  top-[60px] left-[60px]`}
      style={{
        width: "calc(100vw - 70px)",
      }}
    >
      <ReportWrapper>{children}</ReportWrapper>
    </div>
  );
};

export default RootLayout;
