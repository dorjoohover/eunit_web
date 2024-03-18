import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Админ",
};
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
