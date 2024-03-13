import mergeNames from "@/utils/functions";
import { ReactNode } from "react";

const Title = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <p
      className={mergeNames(
        "font-semibold pb-2 text-gray-900",
        className ?? ""
      )}
    >
      {children}
    </p>
  );
};

export default Title;

export const SectionTitle = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <p
      className={mergeNames(
        "lg:text-4xl md:text-3xl text-2xl text-gray-700 font-bold first-letter:capitalize lowercase",
        className ?? ""
      )}
    >
      {children}
    </p>
  );
};
