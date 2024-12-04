import { ReactNode } from "react";
import ErrorBoundary from "@/components/errorBoundary";
import Error from "../error";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>;
};

export default RootLayout;
