import { DateYearSelector } from "@/components/global/dateSelector";
import Input from "@/components/global/input";
import Select from "@/components/global/select";
import { ItemType } from "@/utils/type";
import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

export const FiltersContainer = ({
  other,
  value,
  name,
  defValue = "",
  types,
  ph,

  label,
  selectedOther = false,
  Item = () => <></>,
  onChange = () => {},
}: {
  other: boolean;
  value: any;
  name: string;
  defValue: string;
  types: any;
  ph: string;

  label: string;
  selectedOther: boolean;
  Item: ({ data, onClick, id, ...props }: ItemType) => JSX.Element;
  onChange: (value: string) => void;
}) => {
  if (other == true && value.find((v: any) => v.id == "other") == undefined)
    value.push({ id: "other", value: "Бусад" });
  if (types == "date")
    return (
      <DateYearSelector
        defValue={defValue}
        placeholder={name}
        onSelect={onChange}
      />
    );
  if (types == "year")
    return (
      <NumberInput
        size="md"
        allowMouseWheel
        min={0}
        className="flex flex-row justify-between mx-auto overflow-hidden border-2 border-blue-500 rounded-full md:w-2/3"
        onChange={onChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    );
  if (types == "text") return <Input ph={ph} onChange={onChange} />;
  if (types == "dropdown")
    return (
      <>
        <Select width="long" data={value} label={label} Item={Item} />
        {selectedOther && (
          <>
            <Box h={4} />
            <Input onChange={onChange} />
          </>
        )}
      </>
    );
};
