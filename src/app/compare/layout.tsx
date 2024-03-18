import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Харьцуулах",
};
export default function CompareLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
