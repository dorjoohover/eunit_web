import { ReactNode } from "react";
import ErrorBoundary from "@/components/errorBoundary";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
