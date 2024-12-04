import { Box, Button, Flex, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";

export const MultipleSelect = ({
  name,
  onChange,
  data,
}: {
  name: string;
  onChange: (value: string) => void;
  data: { id: string; value: string }[];
}) => {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false), ["mouseup", "touchend"]);

  return (
    <Box pos={"relative"}>
      <Button variant="select" onClick={() => setOpened(opened ? false : true)}>
        {name}
      </Button>
      {opened && (
        <div
          ref={ref}
          className="absolute right-0 bottom-[-300px] z-30  left-[-500px] top-[100%]"
        >
          <div className="px-8 py-2.5 bg-[#F6F6FB] w-full">
            <Text c={"slateGrey"}>{name}</Text>
          </div>
          <Flex
            wrap={"wrap"}
            w={"100%"}
            justify={"stretch"}
            className="overflow-y-auto "
            h={"100%"}
            gap={20}
            px={18}
            py={36}
            bg={"white"}
          >
            {data.map((d) => {
              return <p key={d.id}>{d.value}</p>;
            })}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
              return (
                <Button key={d} variant="select">
                  Lorem ipsum dolor sit.{d}
                </Button>
              );
            })}
          </Flex>
        </div>
      )}
    </Box>
  );
};
