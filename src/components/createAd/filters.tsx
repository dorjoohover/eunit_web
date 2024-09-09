
import FormLabel from "./formLabel";
import { ItemContainer } from "./step4";
import { DateYearSelector } from "../global/dateSelector";
import { Component, ComponentClass, FC, ReactNode } from "react";
import { DateType, ItemType, TextType } from "@/utils/type";
import mergeNames from "@/utils/functions";
import Counter from "../global/counter";
import Input from "../global/input";
import Select from "../global/select";
import { ItemDetailModel } from "@/models/items.model";
import { NumberInput } from "@mantine/core";

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
        // allowMouseWheel
        // keepWithinRange={false}
        // clampValueOnBlur={false}
        defaultValue={0}
        value={value}
        className={mergeNames(
          onSelect != undefined ? "border-blue-400" : "",
          "flex flex-row justify-between mx-auto overflow-hidden border-2  rounded-full md:w-2/3"
        )}
        onChange={(e) => {
          if (e && onSelect) {
            onSelect(parseInt(`${e}`).toString());
          }
        }}
      >
        {/* <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper> */}
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
  Item,
  selected,
}: {
  title: string;
  Item: ({ data, id, isSelected, onClick, children }: ItemType) => JSX.Element;
  selected: string;
  data?: ItemDetailModel[];
}) => {
  return (
    <ItemContainer>
      <FormLabel req={selected ? false : true} title={title} />
      <div className="flex flex-row justify-center gap-4">
        {data?.map((d, id) => {
          return (
            <>
              {
                <Item
                  key={id}
                  data={d.value}
                  id={d.id}
                  isSelected={d.value == selected}
                  onClick={() => {}}
                />
              }
            </>
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
  Item: ({ data, onClick, id, ...props }: ItemType) => JSX.Element;
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
