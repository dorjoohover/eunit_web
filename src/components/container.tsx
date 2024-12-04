import mergeNames from "@/utils/functions";
import { FC, ReactNode } from "react";

export type ContainerType = {
  children: ReactNode;
  className?: string;
};
export const Container: FC<ContainerType> = ({ children }) => {
  return <div className="xl:px-28 lg:px-20 md:px-20">{children}</div>;
};

export const ContainerX: FC<ContainerType> = ({ children, className }) => {
  return (
    <div
      className={mergeNames(
        "px-4 xl:px-28 lg:px-20 md:px-12 sm:px-14 xs:px-6",
        className ?? ""
      )}
    >
      {children}
    </div>
  );
};

export const ContainerXP: FC<ContainerType> = ({ children, className }) => (
  <div
    className={mergeNames(
      // 'xl:px-28 lg:px-20 md:px-12 sm:px-14 xs:px-6 px-4',
      className ?? ""
    )}
  >
    {children}
  </div>
);

export const NavContainer: FC<ContainerType> = ({ children }) => {
  return (
    // <div className="lg:w-[1150px] w-[1000px] mx-auto">
    <div className="mx-auto px-4 lg:px-12 md:px-2 sm:px-14 xs:px-6">
      {children}
    </div>
  );
};
