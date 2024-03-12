import { CurrencyInput, FormattedNumberInput } from "@/components/global/input";
import { AtomLabel, AtomPriceText } from "./atom";
import { Dispatch, SetStateAction } from "react";
import { StepTypes } from "@/utils/type";
import { formatNumber } from "@/components/global/numberEdit";
const FieldPriceArea = ({
  setGeneralData,
  generalData,
}: {
  setGeneralData: Dispatch<SetStateAction<StepTypes>>;
  generalData: StepTypes;
}) => {
  return (
    <>
      <div>
        <AtomLabel>Үнэ:</AtomLabel>
        <CurrencyInput
          placeholder="Үнэ"
          value={generalData?.price || 0}
          onChange={(val) =>
            setGeneralData((prev) => ({ ...prev, price: parseFloat(val) ?? 0 }))
          }
        />
      </div>
      {/* <p className="text-sm indent-2">Тоон утга оруулна уу.</p> */}

      <div>
        <AtomLabel>Талбай:</AtomLabel>
        <FormattedNumberInput
          placeholder="Талбай"
          value={generalData?.area || 0}
          suffix="м.кв"
          onChange={(val) => {
            const area = parseFloat(val);
            const unitPrice = generalData?.price ?? 0 / area;
            setGeneralData((prev) => ({
              ...prev,
              area: area,
              unitPrice: unitPrice,
            }));
          }}
        />
      </div>

      <div>
        <AtomLabel>Нэгж талбайн үнэ:</AtomLabel>
        <div className="flex items-center gap-1 indent-2">
          {generalData?.price && generalData?.area ? (
            <AtomPriceText>
              {formatNumber(generalData?.price / generalData?.area) || "-"}
            </AtomPriceText>
          ) : (
            <AtomPriceText>0</AtomPriceText>
          )}
          <p className="font-semibold">₮ (м.кв)</p>
        </div>
      </div>
    </>
  );
};

export default FieldPriceArea;
