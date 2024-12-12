import { Colors } from "@/base/constants";
import { ReactNode, Suspense } from "react";
import Loading from "../loading";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className={`bg-[${Colors.lightIvory}] w-full h-full px-14`}>
        {children}
      </div>
    </Suspense>
  );
};

export default RootLayout;
