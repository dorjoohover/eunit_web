import { Colors } from "@/base/constants";
import { locale } from "@/base/vocabs/mn";
import { IconAssets } from "@/utils/assets";
import { montserratAlternates } from "@/utils/fonts";
import { api } from "@/utils/routes";
import { districts } from "@/utils/values";
import { Box, Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import Image from "next/image";
import { ReportList, ReportTitle } from "./shared";
import { IconSearch } from "@tabler/icons-react";
import { LocationModel } from "@/models/location.model";
import { useEffect, useState } from "react";

export const ChooseLocation = ({
  onClick,
  location,
}: {
  location: {
    title: string;
    name?: string;
    zipcode?: string;
    text: string;
    label: string;
    high?: string;
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
      px={{
        md: 56,
        sm: 40,
        base: 20,
      }}
      className="cursor-pointer"
      onClick={onClick}
      py={27}
      align={"center"}
    >
      <ReportList
        name={location.name}
        zipcode={location.zipcode}
        high={location.high}
        title={location.title}
        text={location.text}
        label={location.label}
      />
    </Flex>
  );
};
