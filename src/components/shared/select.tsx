import { Button, Flex, NumberInput, Stack, Text, Title } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
export const RangeInput = ({
  name,
  minValue,
  maxValue,
  minChange,
  maxChange,
}: {
  name: string;
  minValue?: string | null;
  maxValue?: string | null;
  minChange: (value: number | null) => void;
  maxChange: (value: number | null) => void;
}) => {
  const { ref: minRef, focused: minFocused } = useFocusWithin();
  const { ref: maxRef, focused: maxFocused } = useFocusWithin();

  // const { ref as maxRef, focused as maxFocused }= useFocusWithin();
  return (
    <Stack flex={1}>
      <Title size={"xs"}>{name}</Title>
      <Flex align={"center"} gap={2}>
        <NumberInput
          placeholder="Доод"
          value={minValue == null ? "" : minValue}
          className={`rounded-[15px] ${minFocused ? "!bg-mixedBlue20" : ""}`}
          onChange={(e) => {
            e == minValue || e == null
              ? minChange(null)
              : minChange(parseFloat(`${e}`));
          }}
          miw={150}
          ref={minRef}
          rightSection={
            minFocused ? (
              <Button
                unstyled
                className="rounded-full z-40 w-[20px] flex items-center justify-center h-[20px] bg-mixedBlue50"
                onClick={() => {
                  console.log("asdf");
                  minChange(-1);
                }}
              >
                <IoMdClose />
              </Button>
            ) : (
              <></>
            )
          }
        />
        <Text>-</Text>
        <NumberInput
          value={maxValue == null ? "" : maxValue}
          ref={maxRef}
          miw={150}
          className={`rounded-[15px] ${maxFocused ? "!bg-mixedBlue20" : ""}`}
          rightSection={
            maxFocused ? (
              <Button
                unstyled
                className="rounded-full w-[20px] flex items-center justify-center h-[20px] bg-mixedBlue50"
                onClick={() => maxChange(-1)}
              >
                <IoMdClose />
              </Button>
            ) : (
              <></>
            )
          }
          placeholder="Дээд"
          onChange={(e) => {
            e == minValue || e == null
              ? maxChange(null)
              : maxChange(parseFloat(`${e}`));
          }}
        />
      </Flex>
    </Stack>
  );
};
