
import { Text } from "@mantine/core";
import currency from "currency.js";

const ProductHeader = ({
  price,
  unitPrice,
}: {
  price: string;
  unitPrice: string;
}) => {
  return (
    <>
      <div className="text-right">
        <Text className="text-3xl font-semibold text-mainBlue">
          {currency(`${price}`, {
            separator: ",",
            symbol: "₮ ",
            pattern: `# !`,
          })
            .format()
            .toString() ?? 0}
        </Text>

        {/* Hervee turees baival ene heregguin bn */}
        <Text className="text-2xl font-semibold ">
          {currency(`${unitPrice}`, {
            separator: ",",
            symbol: "₮/м.кв",
            pattern: `# !`,
          })
            .format()
            .toString() ?? 0}
        </Text>
      </div>
    </>
  );
};

export default ProductHeader;
