import { Box, Button, Flex, Text } from "@mantine/core";
import { Spacer } from "./report/shared";
import Link from "next/link";
import { Colors } from "@/base/constants";
import { IconAssets } from "@/utils/assets";

export const Footer = () => {
  return (
    <Box
      w={"100%"}
      bg="main"
      pt={{
        md: 150,
        sm: 120,
        base: 80,
      }}
      pos={"relative"}
      style={{
        zIndex: 1,
      }}
    >
      <Box
        style={{
          backgroundImage: `url('${IconAssets.footer}')`,
          backgroundPosition: "center",
          right: 0,
          left: "50%",
          bottom: 0,
          zIndex: 0,
          top: 0,
          position: "absolute",
        }}
      />
      <Box
        style={{
          zIndex: 1,
        }}
        pos={'relative'}
        px={{
          md: 80,
          sm: 40,
          base: 20,
        }}
        mx={"auto"}
        maw={1200}
      >
        <Text
          c={"lightIvory"}
          fz={{
            md: 20,
            sm: 16,
            base: 14,
          }}
          mb={20}
        >
          Бид яагаад хөрөнгийн үнэлгээний хамгийн шилдэг нь болохыг олж мэдээрэй
        </Text>
        <Text
          c={"lightIvory"}
          tt={"uppercase"}
          fw={900}
          mb={20}
          fz={{
            md: 120,
            sm: 75,
            base: 45,
          }}
        >
          Шууд залга!
        </Text>
        <Link
          href={"tel: +97695992333 "}
          style={{
            fontWeight: 700,
            fontSize: 18,
            textTransform: "uppercase",
            padding: "16px 24px",
            background: Colors.headBlue,
            color: "#ECEFF2",
          }}
        >
          холбогдох
        </Link>
        <Flex
          w={"100%"}
          mt={{
            md: 64,
            sm: 40,
            base: 30,
          }}
          gap={{
            base: 10,
            sm: 16,
          }}
          direction={{
            sm: "row",
            base: "column",
          }}
        >
          <Box flex={1}>
            <Text
              fz={{
                sm: 20,
                base: 16,
              }}
              c={"lightIvory"}
              mb={{
                sm: 20,
                base: 0,
              }}
            >
              Хаяг
            </Text>

            <Text c={"lightIvory"} fz={14} className="href">
              Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, UBH center{" "}
            </Text>
          </Box>
          <Box
            flex={{
              sm: 1,
              base: "auto",
            }}
          ></Box>
          <Box flex={1}>
            <Text
              fz={{
                sm: 20,
                base: 16,
              }}
              c={"lightIvory"}
              mb={{
                sm: 20,
                base: 0,
              }}
            >
              Утасны дугаар
            </Text>
            <Link
              href={"tel:+976-95992333"}
              style={{
                color: Colors.lightIvory,
              }}
              className="href text-[14px]"
            >
              Tel:+976-9599 2333
            </Link>
          </Box>
          <Box flex={1}>
            <Text
              fz={{
                sm: 20,
                base: 16,
              }}
              c={"lightIvory"}
              mb={{
                sm: 20,
                base: 0,
              }}
            >
              Цахим хаяг
            </Text>
            <Link
              href={"mailto:info@eunit.mn"}
              style={{
                color: Colors.lightIvory,
              }}
              className="href text-[14px]"
            >
              info@eunit.mn
            </Link>
          </Box>
        </Flex>
        <Spacer size={40} />
        <Text
          c={"lightIvory"}
          opacity={0.4}
          mb={{
            sm: 0,
            base: 60,
          }}
        >
          Бүх эрх хуулиар хамгаалагдсан ©2024
        </Text>
        <Spacer size={20} />
      </Box>
    </Box>
  );
};
