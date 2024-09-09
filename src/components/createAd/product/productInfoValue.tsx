import { ProductInfoValueType } from "@/utils/type";
import { Text } from "@mantine/core";
import currency from "currency.js";
import Link from "next/link";
import { FC } from "react";

const ProductInfoValue: FC<ProductInfoValueType> = ({
  href,
  value,
  id,
  cateId,
}) => {
  return href ? (
    <Link
      href={{
        pathname: `/category/filter/${id}`,
        query: { num: 0, value: value, cateId: cateId },
      }}
    >
   
      <Text
        fs={{ base: "13px", xl: "15px" }}
        fw={"bold"}
        className="duration-200 cursor-pointer ease-in-out hover:text-blue-600"
      >
        {id === "price" || id === "unitPrice"
          ? currency(value, { separator: ",", symbol: "₮ " })
              .format()
              .toString()
          : value}
      </Text>
    </Link>
  ) : (
    <Text fs={{ base: "13px", xl: "15px" }} fw={"bold"}>
      {id === "price" || id === "unitPrice"
        ? currency(value, { separator: ",", symbol: "₮ " }).format().toString()
        : value}
    </Text>
  );
};

export default ProductInfoValue;
