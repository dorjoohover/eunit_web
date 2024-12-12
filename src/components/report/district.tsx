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
import { useFetch } from "@mantine/hooks";
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
      px={56}
      py={27}
      // w={'100%'}
      align={"center"}
    >
      <Flex w={"15vw"}>
        <Box
          h={92}
          w={96}
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
        onClick={onClick}
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
        message: "Талбайн хэмжээг оруулна уу",
        title: "Анхааруулга",
      });
    }
  };
  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Flex w={"100%"} columnGap={"50px"}>
        <Box flex={1}>
          {Object.keys(form.values).map((key) => {
            let k = key as keyof typeof ServiceFormValues;
            return k == "no" ? (
              <TextInput
                mb={20}
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
            ) : (
              <NumberInput
                mb={20}
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
          <Text mb={20} fz={20}>
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
      <Flex w={"100%"} justify={"center"} mt={32}>
        <Button
          mb={32}
          c={"white"}
          px={30}
          py={8}
          h={"auto"}
          bg={"main"}
          radius={20}
          fz={20}
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
      <Text fz={20} mb={8}>
        {name}
      </Text>
      <Text fz={16} mb={8}>
        {value}
      </Text>
      <Box h={1} mb={16} bg={"black"} w={"100%"} />
    </Box>
  );
};
