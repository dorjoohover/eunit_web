import { Sizes } from "@/base/constants";
import { locale } from "@/base/vocabs/mn";
import { money } from "@/utils/functions";
import { Box, Button, Flex, rem, Tabs, Text, Title } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import {
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";

export const ReportDefination = ({}: {}) => {
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <Tabs defaultValue="gallery" color="main">
      <Tabs.List>
        <Tabs.Tab value="gallery" c={"main"}>
          {locale.data.REVIEW_TEXT.DEFINITION}{" "}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        <Flex align={"center"} py={Sizes.lg}>
          <Box>
            <Text px={Sizes.md}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus,
              facere.
            </Text>
            <br />
            <Text px={Sizes.md}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              animi ullam incidunt, officia tenetur illum cupiditate quas
              voluptate sit atque.
            </Text>
            <br />
            <Text variant="warn" c={"red"}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
              necessitatibus magni debitis beatae iste reiciendis unde.
            </Text>
          </Box>
          <Box miw={150} px={Sizes.md}>
            <DefinationValue
              text={upperFirst(
                `${locale.data.FILTER_ATTRIBUTE.M_SQUERE} ${locale.data.FILTER_ATTRIBUTE.PRICE}`
              )}
              value={money(`${500000}`)}
            />
            <Box h={Sizes.sm} />
            <DefinationValue
              text={upperFirst(
                `${locale.data.FILTER_ATTRIBUTE.TOTAL} ${locale.data.FILTER_ATTRIBUTE.PRICE}`
              )}
              value={money(`${50000000}`)}
            />
            <Box h={Sizes.sm} />
            <Button
              px={Sizes.sm}
              py={Sizes.xs}
              h={"auto"}
              variant="small"
              radius={Sizes.md}
              w={"100%"}
            >
              Excel
            </Button>
          </Box>
        </Flex>
      </Tabs.Panel>
    </Tabs>
  );
};

export const ReportConclusion = ({
  title,
  price,
  info,
}: {
  price: number;
  info: string;
  title: string;
}) => {
  return (
    <Flex variant="col" columnGap={0}>
      <Title
        ta={"start"}
        fw={500}
        w={"100%"}
        p={Sizes.md}
        c={"white"}
        bg={"darkBlue"}
      >
        {title}
      </Title>
      <Flex p={Sizes.md}>
        <ConclusionValue
          text={`${locale.data.REVIEW_TEXT.AVARAGE_PRICE} ${locale.data.FILTER_ATTRIBUTE.M_SQUERE}`}
          value={money(`${price}`)}
        />
        <ConclusionValue
          text={locale.data.REVIEW_TEXT.GENERAL_INFO}
          value={info}
        />
      </Flex>
    </Flex>
  );
};

export const ConclusionValue = ({
  text,
  value,
}: {
  text: string;
  value: string;
}) => {
  return (
    <Flex
      flex={1}
      display={"flex"}
      gap={0}
      direction={"column"}
      align={"center"}
    >
      <Text>{text}</Text>
      <Text>{value} ₮</Text>
    </Flex>
  );
};
export const DefinationValue = ({
  text,
  value,
}: {
  text: string;
  value: string;
}) => {
  return (
    <Flex
      flex={1}
      display={"flex"}
      gap={2}
      direction={"column"}
      align={"center"}
    >
      <Text fz={Sizes.sm} lh={1} c={"grey"}>
        {text}
      </Text>
      <Text lh={1} fz={Sizes.md}>
        {value} ₮
      </Text>
    </Flex>
  );
};
