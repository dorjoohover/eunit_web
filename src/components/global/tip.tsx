import { Tooltip } from "@chakra-ui/react";
import { ReactNode } from "react";

const Tip = ({
  lbl,
  children,
  className = "",
}: {
  lbl: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Tooltip label={lbl} aria-label="A tooltip" className={className}>
      {children}
    </Tooltip>
  );
};

export default Tip;
