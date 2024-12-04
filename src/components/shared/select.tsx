import { compareArrowIcon } from "@/utils/assets";
import {
  Box,
  Button,
  Flex,
  NumberInput,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useFocusWithin } from "@mantine/hooks";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
interface FormType {
  minArea?: number;
  maxArea?: number;
}
export const RangeInput = ({
  name,
  minValue,
  maxValue,
  // minChange,
  // maxChange,
  form,
}: {
  name: string;
  minValue: string;
  maxValue: string;
  // minChange: (value: number | null) => void;
  // maxChange: (value: number | null) => void;
  form: UseFormReturnType<FormType, (values: FormType) => FormType>;
}) => {
  const { ref: minRef, focused: minFocused } = useFocusWithin();
  const { ref: maxRef, focused: maxFocused } = useFocusWithin();

  // const { ref as maxRef, focused as maxFocused }= useFocusWithin();
  return (
    <Stack>
      <Title h={21} ta={"center"}>
        {name}
      </Title>
      <Flex>
        <NumberInput
          placeholder="Доод"
          key={form.key(minValue)}
          {...form.getInputProps(minValue)}
          ref={minRef}
          rightSection={
            minFocused ? (
              <Button
                unstyled
                className="rounded-full z-40 w-[20px] flex items-center justify-center h-[20px] bg-mixedBlue50"
                onClick={() => {
                  console.log("asdf");
                  // minChange(-1);
                }}
              >
                <IoMdClose />
              </Button>
            ) : (
              <></>
            )
          }
        />
        <Box pos={"relative"}>
          <Paper bg={"main"} w={25} h={25} variant="roundedIcon">
            <Image
              objectFit="contain"
              src={compareArrowIcon}
              alt="compare arrow"
              width={16}
              height={16}
            />
          </Paper>
        </Box>

        <NumberInput
          key={form.key(maxValue)}
          {...form.getInputProps(maxValue)}
          ref={maxRef}
          rightSection={
            maxFocused ? (
              <Button
                unstyled
                className="rounded-full w-[20px] flex items-center justify-center h-[20px] bg-mixedBlue50"
                // onClick={() => maxChange(-1)}
              >
                <IoMdClose />
              </Button>
            ) : (
              <></>
            )
          }
          placeholder="Дээд"
        />
      </Flex>
    </Stack>
  );
};
