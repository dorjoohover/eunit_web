import { IconAssets } from "@/utils/assets";
import { montserratAlternates } from "@/utils/fonts";
import {
  Box,
  Button,
  Flex,
  MantineFontSize,
  MantineSize,
  MantineStyleProps,
  StyleProp,
  Text,
  TextProps,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { ReactNode } from "react";
import { exo2 } from "@/utils/fonts";
import { useMediaQuery } from "@mantine/hooks";
import { Colors } from "@/base/constants";
export const ReportTitle = ({
  text,
  children,
  text1,
  text2,
  fz = {
    md: 64,
    sm: 50,
    base: 40,
  },
}: {
  text: string;
  text1?: string;
  text2?: string;
  fz?: StyleProp<
    MantineFontSize | `h${1 | 2 | 3 | 4 | 5 | 6}` | number | (string & {})
  >;
  children?: ReactNode;
}) => {
  const matches = useMediaQuery("(min-width: 50em)");

  return (
    <Box
      bg={"lightIvory"}
      px={{
        md: 56,
        sm: 32,
        base: 16,
      }}
      pos={"relative"}
    >
      <Flex
        align={"center"}
        pb={{
          md: 108,
          sm: 64,
          base: 32,
        }}
        pt={{
          md: 80,
          sm: 48,
          base: 24,
        }}
      >
        <Title
          fz={fz}
          fw={"800"}
          c={"midnightBlue"}
          style={{
            lineHeight: 1,
            letterSpacing: 0,
            // textWrap: "nowrap",
          }}
          variant="full"
        >
          {text}
        </Title>
        {text1 && text2 ? (
          <Flex
            direction={"column"}
            justify={"center"}
            gap={0}
            columnGap={0}
            h={"100%"}
            rowGap={0}
          >
            <Title
              fz={{
                md: 45,
                sm: 28,
                base: 23,
              }}
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
              fz={{
                md: 45,
                sm: 28,
                base: 23,
              }}
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
        ) : (
          <Flex maw={matches ? "100%" : "0%"} />
        )}
      </Flex>
      {children}
    </Box>
  );
};

export const ReportList = ({
  title,
  text,
  label,
  zipcode,
  name,
  high,
}: {
  title: string;
  zipcode?: string;
  name?: string;
  label: string;
  high?: string;
  text: string;
}) => {
  const matches = useMediaQuery("(min-width: 50em)");

  return (
    <Flex justify={"space-between"} w={"100%"}>
      <Box
        w={{
          md: "55vw",
          base: "auto",
        }}
      >
        <Title
          fz={{
            md: 42,
            base: 16,
          }}
          fw={{
            md: "bolder",
            base: 900,
          }}
          c={"midnightBlue"}
        >
          {title}
        </Title>
        <Flex align={"center"} gap={0}>
          {high && (
            <Text
              fz={{
                md: 18,
                base: 12,
              }}
              tt={"uppercase"}
              className={montserratAlternates.className}
              fw="bold"
              mr={3}
              style={{
                textWrap: "wrap",
              }}
            >
              {`${high} `}
            </Text>
          )}
        </Flex>
        {text && (
          <Text
            fz={{
              md: 18,
              base: 12,
            }}
            className={montserratAlternates.className}
          >
            {`${text} ${`${zipcode ? "|" : ""} ${
              matches ? `${zipcode ?? ""}` : zipcode ?? text
            }`} `}
          </Text>
        )}
        {!matches && (
          <Flex align={"center"} columnGap={4} justify={"start"}>
            <Box w={5} h={5} bg={"main"} />
            <Text fz={12} fw={"bold"} tt={"uppercase"}>
              {label}
            </Text>
          </Flex>
        )}
      </Box>

      <Flex
        w={{
          base: "auto",
          md: "22vw",
          sm: "26vw",
        }}
        justify={"space-between"}
      >
        {matches && label && (
          <Flex align={"center"} justify={"start"} mr={32}>
            <Box w={9} h={9} bg={"main"} />
            <Text fz={18} fw={"bold"}>
              {label}
            </Text>
          </Flex>
        )}
        <Button
          unstyled
          style={{
            paddingRight: matches ? 0 : 16,
          }}
        >
          <Box
            className="flex items-center relative justify-center"
            w={24}
            h={26}
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
        <Text
          fz={{
            md: 20,
            base: 14,
            sm: 16,
          }}
          c={Colors.headBlue}
        >
          {text}
        </Text>
      </Flex>
    </Box>
  );
};

export const Spacer = ({
  size,
}: {
  size: StyleProp<React.CSSProperties["height"]>;
}) => {
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
    <Flex
      align={{
        md: "center",
        base: "start",
      }}
      direction={{
        md: "row",
        base: "column",
      }}
      gap={{
        sm: 16,
        base: 8,
      }}
    >
      <Text
        fz={{
          md: 30,
          sm: 24,
          base: 16,
        }}
        {...textProps}
      >
        {text}
      </Text>
      <Text
        fz={{
          sm: 30,
          base: 20,
        }}
        {...labelProps}
      >
        {label}
      </Text>
    </Flex>
  );
};
