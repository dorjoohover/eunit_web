import { IconAssets } from "@/utils/assets";
import { montserratAlternates } from "@/utils/fonts";
import { Box, Button, Flex, Text, TextProps, Title } from "@mantine/core";
import Image from "next/image";
import { ReactNode } from "react";

export const ReportTitle = ({
  text,
  children,
}: {
  text: string;
  children?: ReactNode;
}) => {
  return (
    <Box bg={"lightIvory"} px={56} pos={'relative'}>
      <Title
        pt={80}
        pb={108}
        fz={120}
        fw={"bolder"}
        c={"midnightBlue"}
        style={{
          lineHeight: 1.1,
          letterSpacing: 0,
        }}
        variant="full"
      >
        {text}
      </Title>
      {children}
    </Box>
  );
};

export const ReportList = ({
  title,
  text,
  label,
  onClick,
}: {
  title: string;
  label: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <Flex justify={"space-between"}>
      <Box>
        <Title fz={42} fw={"bolder"} c={"midnightBlue"}>
          {title}
        </Title>
        <Text fz={18} className={montserratAlternates.className}>
          {text}
        </Text>
      </Box>
      <Flex gap={69} w={"auto"}>
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
      <Text fz={24} {...textProps}>
        {text}
      </Text>
      <Text fz={40} {...labelProps}>
        {label}
      </Text>
    </Flex>
  );
};
