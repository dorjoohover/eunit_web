import { ReactNode, Suspense } from "react";
import ErrorBoundary from "@/components/errorBoundary";
import Loading from "../loading";
const RootLayout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default RootLayout;
