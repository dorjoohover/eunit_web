"use client";
import { Colors } from "@/base/constants";
import { ReportTitle } from "@/components/report/shared";
import { ContactFormValues } from "@/utils/values";
import { Box, Button, Flex, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface FormType {
  name?: string;
  position?: string;
  phone?: string;
  organization?: string;
  purpose?: string;
}

const Page = () => {
  const form = useForm<FormType>({
    mode: "uncontrolled",
    initialValues: {
      name: undefined,
      position: undefined,
      phone: undefined,
      organization: undefined,
      purpose: undefined,
    },
  });
  const submit = (values: FormType) => {};
  return (
    <Box pl={60} pt={60}>
      <ReportTitle text={"Холбогдох"}>
        <Box pb={100}>
          <Text fz={30} pb={40}>
            Бидэнтэй холбогдох хүсэлт
          </Text>
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <Flex w={"100%"} gap={30} h={"100%"}>
              <Box flex={1}>
                {Object.keys(form.values).map((key) => {
                  let k = key as keyof typeof ContactFormValues;
                  if (key != "purpose")
                    return (
                      <TextInput
                        my={5}
                        key={form.key(key)}
                        label={ContactFormValues[k].label}
                        placeholder={ContactFormValues[k].description}
                        variant="bottom"
                        __size="20px"
                        p={"2px"}
                        {...form.getInputProps(key)}
                      />
                    );
                })}
              </Box>
              <Flex direction={"column"} flex={1} justify={"space-between"}>
                <Textarea
                  key={form.key("purpose")}
                  label={ContactFormValues["purpose"].label}
                  placeholder={ContactFormValues["purpose"].description}
                  variant="bottom"
                  __size="20px"
                  p={"4px 2px"}
                  {...form.getInputProps("purpose")}
                />
                <Flex justify={"end"}>
                  <Button type="submit" py={15} px={30} h={"auto"}>
                    Хүсэлт илгээх
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </form>
        </Box>
      </ReportTitle>
    </Box>
  );
};

export default Page;
