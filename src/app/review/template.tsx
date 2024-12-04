'use client'
import { Container } from "@mantine/core";
import { ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  return (
    <Container variant="container">
      {children}
    </Container>
  );
};
export default Template;
