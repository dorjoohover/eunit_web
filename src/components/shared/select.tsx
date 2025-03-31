import { compareArrowIcon } from "@/utils/assets";
import {
  Box,
  Button,
  Flex,
  NumberInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import Image from "next/image";
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
    <Stack flex={1} gap={1}>
      <Title
        size={"xl"}
        mx={"auto"}
        c={"slateGrey"}
        fw={700}
        className="uppercase"
      >
        {name}
      </Title>
      <Flex
        align={"center"}
        pos={"relative"}
        columnGap={12}
        justify={"center"}
        w={"full"}
        gap={2}
      >
        <NumberInput
          placeholder="Доод"
          value={minValue == null ? "" : minValue}
          className={`rounded-[8px] ${minFocused ? "!bg-mixedBlue20" : ""}`}
          onChange={(e) => {
            e == minValue || e == null
              ? minChange(null)
              : minChange(parseFloat(`${e}`));
          }}
          radius="md"
          miw={150}
          w={"100%"}
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
        <Flex
          className="absolute left-[50%] rounded-full z-10 w-[25px] h-[25px] "
          style={{ transform: "translateX(-50%)" }}
          bg={"main"}
          align={"center"}
          justify={"center"}
        >
          <Image
            src={compareArrowIcon}
            alt="compare arrow"
            width={15}
            height={15}
          />
        </Flex>
        <NumberInput
          w={"100%"}
          value={maxValue == null ? "" : maxValue}
          ref={maxRef}
          miw={150}
          className={`rounded-[8px] ${maxFocused ? "!bg-mixedBlue20" : ""}`}
          radius={'md'}
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
