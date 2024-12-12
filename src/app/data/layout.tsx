import { ReportWrapper } from "@/_context";
import { Colors } from "@/base/constants";
import { ReactNode, Suspense } from "react";
import { Loading } from "../loading";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div
        className={`bg-[${Colors.lightIvory}] relative  top-[60px] left-[60px]`}
        style={{
          width: "calc(100vw - 70px)",
        }}
      >
        <ReportWrapper>{children}</ReportWrapper>
      </div>
    </Suspense>
  );
};

export default RootLayout;
