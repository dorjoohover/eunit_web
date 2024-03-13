import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import React from "react";

const CustomPagination = ({
  prev,
  num,
  next,
}: {
  prev: () => void;
  next: () => void;
  num: number;
}) => {
  return (
    <ul className="flex float-right mt-3 list-style-none">
      <li className="mx-2">
        <button
          className={mergeNames(num > 0 ? STYLES.active : STYLES.notActive)}
          onClick={prev}
        >
          Өмнөх
        </button>
      </li>

      <li className="mx-2">
        <button className={mergeNames(STYLES.notActive)} onClick={next}>
          Дараах
        </button>
      </li>
    </ul>
  );
};

export default CustomPagination;
