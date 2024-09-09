import { STYLES } from "@/styles/index";
import mergeNames from "@/utils/functions";
import { Select } from "@mantine/core";

import { ReactNode } from "react";

const FilterAd = ({
  onChange,
  children,
  plc,
}: {
  onChange: (e: string) => void;
  children: ReactNode;
  plc: string;
}) => {
  return (
    <Select
      className={mergeNames(STYLES.select)}
      placeholder={plc}
      onChange={(e) => {
        if (e != null) onChange(e);
      }}
    >
      {children}
    </Select>
  );
};

export default FilterAd;
