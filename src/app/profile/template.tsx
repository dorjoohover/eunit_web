"use client";
import { Box } from "@mantine/core";
import { ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  return (
    <Box pl={60} pt={60}>
      {children}
    </Box>
  );
};

export default Template;
