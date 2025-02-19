import { Container } from "@mantine/core";
import { ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  return <div className="overflow-x-hidden">{children}</div>;
};

export default Template;
