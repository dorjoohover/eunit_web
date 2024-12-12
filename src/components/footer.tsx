import { Box, Button, Flex, Text } from "@mantine/core";
import { Spacer } from "./report/shared";

export const Footer = () => {
  return (
    <Box w={"100%"} bg="main" pt={150}>
      <Box px={80} mx={"auto"} maw={1200}>
        <Text c={"lightIvory"} fz={20} mb={20}>
          Бид яагаад хөрөнгийн үнэлгээний хамгийн шилдэг нь болохыг олж мэдээрэй
        </Text>
        <Text c={"lightIvory"} tt={"uppercase"} fw={900} mb={20} fz={120}>
          Шууд залга!
        </Text>
        <Button
          fw={700}
          radius={0}
          fz={18}
          tt={"uppercase"}
          px={24}
          py={16}
          h={"auto"}
          bg={"headBlue"}
          c={"#ECEFF2"}
        >
          холбогдох
        </Button>
        <Flex w={"100%"} mt={64}>
          <Box flex={1}>
            <Text fz={20} c={"lightIvory"} mb={20}>
              Хаяг
            </Text>
            <Text c={"lightIvory"}>
              Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, UBH center{" "}
            </Text>
          </Box>
          <Box flex={1}></Box>
          <Box flex={1}>
            <Text fz={20} c={"lightIvory"} mb={20}>
              Утасны дугаар
            </Text>
            <Text c={"lightIvory"}>Tel:+976-8899 2864</Text>
          </Box>
          <Box flex={1}>
            <Text fz={20} c={"lightIvory"} mb={20}>
              Цахим хаяг
            </Text>
            <Text c={"lightIvory"}>bomarketm@gmail.com</Text>
          </Box>
        </Flex>
        <Spacer size={40} />
        <Text c={"lightIvory"} opacity={0.4}>
          Бүх эрх хуулиар хамгаалагдсан ©2024
        </Text>
        <Spacer size={20} />
      </Box>
    </Box>
  );
};
