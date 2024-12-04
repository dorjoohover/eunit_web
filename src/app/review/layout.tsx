import { Colors } from "@/base/constants";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`bg-[${Colors.lightIvory}] w-full h-full px-14`}>{children}</div>
  );
};

export default RootLayout;
