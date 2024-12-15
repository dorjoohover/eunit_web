"use client";
import { Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  const matches = useMediaQuery("(min-width: 50em)");

  return (
    <Box pl={matches ? 60 : 0} pt={60}>
      {children}
    </Box>
  );
};

export default Template;
