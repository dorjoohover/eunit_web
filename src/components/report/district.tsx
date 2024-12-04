import { Colors } from "@/base/constants";
import { locale } from "@/base/vocabs/mn";
import { IconAssets } from "@/utils/assets";
import { montserratAlternates } from "@/utils/fonts";
import { api } from "@/utils/routes";
import { districts } from "@/utils/values";
import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import Image from "next/image";
import { ReportList, ReportTitle } from "./shared";

export const ChooseDistrict = ({
  onClick,
  district,
}: {
  district: {
    img: string;
    name: string;
    text: string;
    label: string;
    id: string;
  };
  onClick: () => void;
}) => {
  return (
    <Flex
      style={{
        borderBottomColor: Colors.deepMose20,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
      px={56}
      py={27}
      // w={'100%'}
      align={"center"}
    >
      <Box
        h={92}
        w={96}
        mr={200}
        className="flex justify-center relative items-center"
      >
        <Image
          src={district.img}
          alt={district.name}
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <ReportList
        title={district.name}
        text={district.text}
        label={district.label}
        onClick={onClick}
      />
    </Flex>
  );
};
