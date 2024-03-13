import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import FormLabel from "./formLabel";
import { ItemContainer } from "./step4";
import { DateYearSelector } from "../global/dateSelector";
import { FC } from "react";
import { DateType, TextType } from "@/utils/type";
import mergeNames from "@/utils/functions";
import Counter from "../global/counter";
import Input from "../global/input";
import Select from "../global/select";
import { ItemDetailModel } from "@/models/items.model";

const FilterDate: FC<DateType> = ({
  defValue,
  title,
  requirement,
  name,
  onSelect = () => {},
}) => {
  return (
    <ItemContainer>
      <FormLabel title={title} />
      <DateYearSelector
        defValue={defValue}
        placeholder={name}
        requirement={requirement}
        onSelect={onSelect}
      />
    </ItemContainer>
  );
};
export default FilterDate;

export const FilterYear: FC<DateType> = ({ title, onSelect, value }) => {
  return (
    <ItemContainer>
      <FormLabel title={title + " / жил"} />
      <NumberInput
        size="md"
        allowMouseWheel
        keepWithinRange={false}
        clampValueOnBlur={false}
        defaultValue={0}
        value={value}
        className={mergeNames(
          onSelect != undefined ? "border-blue-400" : "",
          "flex flex-row justify-between mx-auto overflow-hidden border-2  rounded-full md:w-2/3"
        )}
        onChange={(e) => {
          if (e && onSelect) {
            onSelect(parseInt(e).toString());
          }
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </ItemContainer>
  );
};

export const FilterCounter: FC<DateType> = ({
  limit,
  maxValue,
  setValue,
  title,
  requirement = true,
}) => {
  return (
    <ItemContainer className={"flex flex-col items-center justify-center"}>
      <FormLabel title={title} />
      <Counter
        requirement={requirement}
        limit={limit}
        maxValue={maxValue}
        setValue={setValue}
      />
    </ItemContainer>
  );
};

export const FilterText: FC<TextType> = ({
  title,
  ph,
  onChange,
  value = "",
}) => {
  return (
    <ItemContainer className={"flex flex-col items-center justify-center"}>
      <FormLabel title={title} />
      <Input
        ph={ph}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
        value={value}
      />
    </ItemContainer>
  );
};

export const FilterButtonSelector = ({
  title,
  data,
  Item = () => <></>,
  selected,
}: {
  title: string;
  Item: any;
  selected: string;
  data?: ItemDetailModel[];
}) => {
  return (
    <ItemContainer>
      <FormLabel req={selected ? false : true} title={title} />
      <div className="flex flex-row justify-center gap-4">
        {data?.map((text, id) => {
          return (
            <Item
              key={id}
              text={text.value}
              isSelected={text.value == selected}
              onClick={() => {}}
            />
          );
        })}
      </div>
    </ItemContainer>
  );
};

export const FilterSelect = ({
  title,
  data,
  label,
  width = "long",
  Item = () => <></>,
  requirement = true,
}: {
  data?: ItemDetailModel[];
  width?: string;
  requirement: boolean;
  label: string;
  title: string;
  Item: any;
}) => {
  return (
    <ItemContainer>
      <FormLabel title={title} />

      <Select
        width={width}
        data={data}
        requirement={requirement}
        label={label}
        Item={Item}
      />
    </ItemContainer>
  );
};
