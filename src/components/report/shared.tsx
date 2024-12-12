import { IconAssets } from "@/utils/assets";
import { montserratAlternates } from "@/utils/fonts";
import { Box, Button, Flex, Text, TextProps, Title } from "@mantine/core";
import Image from "next/image";
import { ReactNode } from "react";
import { exo2 } from "@/utils/fonts";
export const ReportTitle = ({
  text,
  children,
  text1,
  text2,
  fz = 64,
}: {
  text: string;
  text1?: string;
  text2?: string;
  fz?: number;
  children?: ReactNode;
}) => {
  return (
    <Box bg={"lightIvory"} px={56} pos={"relative"}>
      <Flex align={"center"} pb={108} pt={80}>
        <Title
          fz={fz}
          fw={"800"}
          c={"midnightBlue"}
          style={{
            lineHeight: 1,
            letterSpacing: 0,
            textWrap: "nowrap",
          }}
          variant="full"
        >
          {text}
        </Title>
        <Flex
          direction={"column"}
          justify={"center"}
          gap={0}
          columnGap={0}
          h={"100%"}
          rowGap={0}
        >
          <Title
            fz={45}
            fw={"800"}
            c={"midnightBlue"}
            style={{
              lineHeight: 1,
              letterSpacing: 0,
            }}
            variant="full"
          >
            {text1}
          </Title>
          <Title
            fz={45}
            fw={"800"}
            c={"midnightBlue"}
            style={{
              lineHeight: 1,
              letterSpacing: 0,
            }}
            variant="full"
          >
            {text2}
          </Title>
        </Flex>
      </Flex>
      {children}
    </Box>
  );
};

export const ReportList = ({
  title,
  text,
  label,
  onClick,
  high,
}: {
  title: string;
  label: string;
  high?: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <Flex justify={"space-between"}>
      <Box w={"55vw"}>
        <Title fz={42} fw={"bolder"} c={"midnightBlue"}>
          {title}
        </Title>
        <Flex align={"center"} gap={0}>
          {high && (
            <Text
              fz={20}
              tt={"uppercase"}
              className={montserratAlternates.className}
              fw="bold"
              mr={3}
            >
              {`${high} `}
            </Text>
          )}
          <Text fz={18} className={montserratAlternates.className}>
            {`${text}`}
          </Text>
        </Flex>
      </Box>
      <Flex w={"20vw"}> 
        <Flex align={"center"} justify={"start"} mr={69}>
          <Box w={9} h={9} bg={"main"} />
          <Text fz={18} fw={"bold"}>
            {label}
          </Text>
        </Flex>
        <Button unstyled onClick={onClick}>
          <Box
            className="flex items-center relative justify-center"
            w={36}
            h={38}
          >
            <Image
              src={IconAssets.rightArrow}
              objectFit="contain"
              alt="Arrow"
              layout="fill"
            />
          </Box>
        </Button>
      </Flex>
    </Flex>
  );
};

export const IconText = ({
  text,
  child,
}: {
  text: string;
  child: ReactNode;
}) => {
  return (
    <Box>
      <Flex align={"center"}>
        {child}
        <Text fz={20}>{text}</Text>
      </Flex>
    </Box>
  );
};

export const Spacer = ({ size }: { size: number }) => {
  return <Box h={size} />;
};

export const InlineText = ({
  text,
  label,
  textProps,
  labelProps,
}: {
  text: string;
  label: string;
  textProps?: TextProps;
  labelProps?: TextProps;
}) => {
  return (
    <Flex align={"center"} gap={16}>
      <Text fz={30} {...textProps}>
        {text}
      </Text>
      <Text fz={30} {...labelProps}>
        {label}
      </Text>
    </Flex>
  );
};
