import React, { ReactNode } from "react";

export const AtomLabel = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-row">
    <p className="pb-2 text-base font-medium text-gray-800 md:text-xl indent-2">
      {children}
    </p>
    {/* <p className="pl-1 text-pink-600">*</p> */}
  </div>
);
export const AtomPriceText = ({ children }: { children: ReactNode }) => (
  <p className="text-2xl font-semibold">{children}</p>
);
