"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { Colors, Sizes } from "@/base/constants";
import { Icon } from "./shared/icon";
import { RangeInput } from "./shared/select";
import { useForm } from "@mantine/form";
import { locale } from "@/base/vocabs/mn";
import { MultipleSelect } from "./shared/button";
import { ReportConclusion, ReportDefination } from "./conclusion";
import { ReactNode } from "react";
// import { Signature } from "./signature";
interface ReviewType {
  minArea?: number;
  maxArea?: number;
}

export const Review = () => {
  const form = useForm<ReviewType>({
    initialValues: {
      minArea: undefined,
      maxArea: undefined,
    },
  });
  return (
    <Box>
      <Container variant="filter">
        <Flex variant="start">
          <Select
            leftSection={
              <Icon name="dashboard" color={Colors.black} size={14} />
            }
            placeholder="Pick value"
            variant="small"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
          <Select
            leftSection={
              <Icon name="apartment" color={Colors.black} size={14} />
            }
            variant="small"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
          <Select
            variant="small"
            leftSection={<Icon name="zoomOut" color={Colors.black} size={14} />}
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
        </Flex>
        <Flex>
          <Stack flex={7}>
            <RangeInput
              form={form}
              maxValue="maxArea"
              minValue="minArea"
              name={locale.data.REVIEW_TEXT.AREA}
            />
            <RangeInput
              form={form}
              maxValue="maxOperation"
              minValue="minOperation"
              name={locale.data.REVIEW_TEXT.OPERATION}
            />
            <RangeInput
              form={form}
              maxValue="maxSeveralFloor"
              minValue="minSeveralFloor"
              name={locale.data.REVIEW_TEXT.SEVERAL_FLOOR}
            />
          </Stack>
          <Stack flex={3} gap={25} my={23}>
            <MultipleSelect
              data={[]}
              name={locale.data.REVIEW_TEXT.LOCATION}
              onChange={(e) => {}}
            />
            <Select
              w={"100%"}
              placeholder={locale.data.REVIEW_TEXT.FLOOR}
              data={["React", "Angular", "Vue", "Svelte"]}
            />
            <Button>{locale.data.FILTER_ATTRIBUTE.SEARCH}</Button>
          </Stack>
        </Flex>
      </Container>
      <Container variant="row" mt={40}>
        <Flex flex={3} variant="col" bg={"transparent"}>
          <Title fw={700} c={"black"}>
            {locale.data.FILTER_ATTRIBUTE.SUGGESTED_FILTER}
          </Title>
          <RadioGroup
            name={locale.data.REVIEW_TEXT.GARAGE}
            label={locale.data.REVIEW_TEXT.GARAGE}
          >
            <Radio value="react" label="React" />
            <Radio value="svelte" label="Svelte" />
            <Radio value="ng" label="Angular" />
            <Radio value="vue" label="Vue" />
          </RadioGroup>
          <Box w={"100%"} h={1} bg={"stroke"} />
          <RadioGroup
            name={locale.data.REVIEW_TEXT.PAYMENT_CONDITION}
            label={locale.data.REVIEW_TEXT.PAYMENT_CONDITION}
          >
            <Radio value="react" label="React" />
            <Radio value="svelte" label="Svelte" />
            <Radio value="ng" label="Angular" />
            <Radio value="vue" label="Vue" />
          </RadioGroup>
        </Flex>
        <Flex flex={7} display={"flex"} direction={"column"}>
          <Box w={"100%"}>
            <ReportConclusion
              info="184 багц дата"
              price={4000000}
              title={locale.data.REVIEW_TEXT.APARTMENT_AVARAGE_PRICE}
            />
          </Box>
          <Box w={"100%"} bg={"white"} h={"100%"} px={Sizes.sm} py={Sizes.xs}>
            <ReportDefination />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
interface ReportType {
  minArea?: number;
  maxArea?: number;
}

export const Report = () => {
  const form = useForm<ReportType>({
    initialValues: {
      minArea: undefined,
      maxArea: undefined,
    },
  });
  return (
    <></>
    // <Container variant="report" mt={Sizes.lg}>
    //   <Title ta={"center"} variant="title" mb={Sizes["3xl"]} size={"lg"}>
    //     {locale.data.REPORT_TEXT.APARTMENT_REQUEST_INFO}
    //   </Title>
    //   <Title variant="title" mb={Sizes["3xl"]}>
    //     {locale.data.REPORT_TEXT.OWNER_PERSONAL_INFO}
    //   </Title>
    //   <Flex>
    //     <Box flex={1}>
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.LAST_NAME}
    //         child={<TextInput />}
    //       />
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.REGISTER}
    //         child={<TextInput />}
    //       />
    //     </Box>
    //     <Box flex={1}>
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.FIRST_NAME}
    //         child={<TextInput />}
    //       />
    //     </Box>
    //   </Flex>

    //   <Title variant="title" mb={Sizes["2xl"]}>
    //     {locale.data.REPORT_TEXT.APARTMENT_DESCRIPTION}
    //   </Title>
    //   <Flex>
    //     <Box flex={1}>
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.DISTRICT_CHOOSE}
    //         child={
    //           <Select
    //             data={Array.from({ length: 10 }, (_, i) => i + 1).map(
    //               (d) => `${d}`
    //             )}
    //           />
    //         }
    //       />
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.CERTIFICATE_NUMBER}
    //         child={<TextInput />}
    //       />
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.DOOR_NUMBER}
    //         child={<TextInput />}
    //       />
    //       <ReportValue
    //         name={`${locale.data.REPORT_TEXT.AREA} /${locale.data.FILTER_ATTRIBUTE.M_SQUERE}/`}
    //         child={<TextInput />}
    //       />
    //     </Box>
    //     <Box flex={1}>
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.TOWN_CHOOSE}
    //         child={
    //           <Select
    //             data={Array.from({ length: 10 }, (_, i) => i + 1).map(
    //               (d) => `${d}`
    //             )}
    //           />
    //         }
    //       />
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.FLOOR}
    //         child={<TextInput />}
    //       />
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.OPERATION}
    //         child={
    //           <Select
    //             data={Array.from({ length: 10 }, (_, i) => i + 1).map(
    //               (d) => `${d}`
    //             )}
    //           />
    //         }
    //       />
    //       <ReportValue
    //         name={locale.data.REPORT_TEXT.REAL_STATE_CERTIFICATE}
    //         child={<TextInput />}
    //       />
    //     </Box>
    //   </Flex>
    //   <ReportValue
    //     name={locale.data.REPORT_TEXT.SIGNATURE}
    //     child={<TextInput />}
    //   />
    //   <Signature />
    //   <Center mt={Sizes['2xl']}>
    //     <Button mx={"auto"}>{locale.data.REPORT_TEXT.PAY}</Button>
    //   </Center>
    // </Container>
  );
};

export const ReportValue = ({
  name,
  child,
}: {
  name: string;
  child: ReactNode;
}) => {
  return (
    <Box mb={Sizes.xl}>
      <Text fw={700} mb={Sizes.lg}>
        {name}
      </Text>
      {child}
    </Box>
  );
};
