import { Colors } from "@/base/constants";
import { locale } from "@/base/vocabs/mn";
import { IconAssets } from "@/utils/assets";
import { montserratAlternates } from "@/utils/fonts";
import { api } from "@/utils/routes";
import { districts, ServiceFormValues } from "@/utils/values";
import {
  Box,
  Button,
  Flex,
  NumberInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useFetch, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { ReportList, ReportTitle } from "./shared";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

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
      px={{
        md: 56,
        sm: 40,
        base: 20,
      }}
      py={27}
      w={"100%"}
      align={"center"}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Flex w={"12vw"}>
        <Box
          h={{
            sm: 92,
            base: 56,
          }}
          w={{
            sm: 96,
            base: 58,
          }}
          className="flex justify-center relative items-center"
        >
          <Image
            src={district.img}
            alt={district.name}
            layout="fill"
            objectFit="contain"
          />
        </Box>
      </Flex>
      <ReportList
        title={district.name}
        text={district.text}
        label={district.label}
      />
    </Flex>
  );
};

type ServiceType = {
  area?: number;
  no?: string;
  floor?: number;
  room?: number;
};

export const ServiceForm = ({
  submit,
}: {
  submit: (values: {
    area: number;
    no?: string;
    floor?: number;
    room?: number;
  }) => void;
}) => {
  const form = useForm<ServiceType>({
    initialValues: {
      area: undefined,
      no: undefined,
      floor: undefined,
      room: undefined,
    },
  });
  const onSubmit = (values: ServiceType) => {
    if (values.area) {
      submit({
        area: values.area,
        no: values.no,
        floor: values.floor,
        room: values.room,
      });
    } else {
      notifications.show({
        position: "top-center",
        message: "Талбайн хэмжээг оруулна уу",
        title: "Анхааруулга",
      });
    }
  };
  const matches = useMediaQuery("(min-width: 36em)");

  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmit(values))}
      className="relative"
    >
      <Flex
        w={"100%"}
        direction={{
          sm: "row",
          base: "column",
        }}
        pb={{
          md: 40,
          base: 20,
        }}
        columnGap={"50px"}
      >
        <Box flex={1}>
          {Object.keys(form.values).map((key) => {
            let k = key as keyof typeof ServiceFormValues;
            return k == "no" ? (
              <TextInput
                __size={matches ? "24px" : "16px"}
                mb={20}
                error={ServiceFormValues[k].message}
                label={ServiceFormValues[k].label}
                placeholder={ServiceFormValues[k].description}
                c={"grey"}
                {...form.getInputProps(key)}
                key={key}
                fz={matches ? 21 : 15}
                variant="bottom"
                mr={50}
                w={"100%"}
                maw={"100%"}
              />
            ) : (
              <NumberInput
                __size={matches ? "24px" : "16px"}
                mb={20}
                fz={matches ? 21 : 15}
                error={ServiceFormValues[k].message}
                label={ServiceFormValues[k].label}
                placeholder={ServiceFormValues[k].description}
                c={"grey"}
                {...form.getInputProps(key)}
                key={key}
                variant="bottom"
                mr={50}
                w={"100%"}
                maw={"100%"}
              />
            );
          })}
        </Box>
        <Box flex={1} p={28} bg={"white"} style={{ borderRadius: 30 }}>
          <Text
            mb={20}
            fz={{
              md: 20,
              base: 16,
            }}
          >
            Жишиг
          </Text>
          {Object.keys(form.values).map((key) => {
            let k = key as keyof typeof ServiceFormValues;
            return (
              <ServiceFormExample
                key={key}
                value={ServiceFormValues[k].example}
                name={ServiceFormValues[k].label}
              />
            );
          })}
        </Box>
      </Flex>
      <Flex w={"100%"} justify={"center"} mt={16}>
        <Button
          w={{
            sm: "auto",
            base: "100%",
          }}
          mb={32}
          c={"white"}
          px={30}
          py={{
            sm: 8,
            base: 16,
          }}
          h={"auto"}
          bg={"main"}
          radius={matches ? 20 : 5}
          fz={{
            sm: 20,
            base: 16,
          }}
          type="submit"
        >
          Боловсруулах
        </Button>
      </Flex>
    </form>
  );
};

const ServiceFormExample = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  return (
    <Box w={"100%"}>
      <Text
        fz={{
          md: 20,
          base: 16,
        }}
        mb={8}
      >
        {name}
      </Text>
      <Text
        fz={{
          md: 16,
          base: 14,
        }}
        mb={8}
      >
        {value}
      </Text>
      <Box
        h={1}
        mb={{
          md: 16,
          base: 14,
        }}
        bg={"black"}
        w={"100%"}
      />
    </Box>
  );
};
