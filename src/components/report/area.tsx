import { Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { ReportTitle } from "./shared";
import { districts } from "@/utils/values";

export const InputArea = ({
  onClick,
  onChange,
  town,
  area,
}: {
  area?: number;
  town: string;
  onChange: (e: number) => void;
  onClick: (actions: { key: string; value: string | number }[]) => void;
}) => {
  return (
    <Box h={"calc(100vh - 60px)"} bg={"lightIvory"}>
      <ReportTitle text={town}>
        <Box>
          <Text fz={30} mb={100}>
            Шаардлагатай мэдээлэл бөглөх хэсэг
          </Text>

          <Flex
            mx={160}
            w={"full"}
            justify={"center"}
            align={"center"}
            gap={180}
          >
            <TextInput
              label="Орон сууцны м.кв"
              placeholder="Зөвхөн тоо оруулна уу."
              c={"grey"}
              onChange={(e) => {
                const value = e.target.value;
                const v =
                  value == undefined || value == ""
                    ? 0
                    : isNaN(parseFloat(value))
                    ? 0
                    : parseFloat(value);

                if (value != null) onChange(v);
              }}
              value={area}
              pattern="/^[\d,]+$/"
              variant="bottom"
              mr={50}
              w={"100%"}
            />
            <Button
              c={"white"}
              w={"100%"}
              onClick={() => {
                onClick([]);
              }}
              px={60}
              py={20}
              h={"auto"}
              bg={"main"}
            >
              Боловсруулах
            </Button>
          </Flex>
        </Box>
      </ReportTitle>
    </Box>
  );
};
