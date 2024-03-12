import React, { ReactNode } from "react";

const FormTitle = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <p className="text-4xl text-center font-semibold mb-6">{children}</p>
    </div>
  );
};

export default FormTitle;
