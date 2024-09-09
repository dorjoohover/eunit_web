import { Stack } from "@mantine/core";
import React from "react";

const FilterStack = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack className="border-2 border-[#eef0f2]" py={5}>
      {children}
    </Stack>
  );
};
export default FilterStack;
