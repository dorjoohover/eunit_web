import { STYLES } from "@/styles/index";
import mergeNames from "@/utils/functions";

import { Select } from "@chakra-ui/react";
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
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </Select>
  );
};

export default FilterAd;
