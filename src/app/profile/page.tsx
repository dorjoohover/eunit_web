"use client";
import { saveUser } from "@/(api)/user.api";
import { useAppContext } from "@/_context";
import { Colors } from "@/base/constants";
import { ReportTitle, Spacer } from "@/components/report/shared";
import { ServiceHistory } from "@/components/table/history";
import { ProfileValues } from "@/utils/values";
import { Box, Button, Flex, Tabs, Text, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

type ProfileType = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
};
const Page = () => {
  const { user } = useAppContext();
  const form = useForm<ProfileType>({
    initialValues: {
      phone: user?.phone,
      lastname: user?.name,
      firstname: user?.firstname,
      email: user?.email,
    },
  });
  useEffect(() => {
    if (user) {
      form.setValues({
        phone: user.phone || "",
        lastname: user.lastname ?? (user.name || ""),
        firstname: user.firstname || "",
        email: user.email || "",
      });
    }
  }, [user]);
  const [edit, setEdit] = useState(false);
  const save = async (values: ProfileType) => {
    if (values.lastname && values.phone) {
      await saveUser(
        values.lastname,
        values.firstname ?? "",
        values.phone
      ).then((d) => {
        notifications.show({
          title: d.succeed ? "Амжилттай" : "Анхааруулга",
          message: d.succeed ? "Хадгаллаа" : d.message,
          color: d.succeed ? "green" : "red",
        });
      });
    } else {
      notifications.show({
        color: "warning",
        message: "Дутуу байна.",
        title: "Анхааруулга",
      });
    }
  };
  return (
    <Box>
      <ReportTitle text={"Хэрэглэгч"}>
        <Tabs defaultValue="profile" color="main">
          <Tabs.List>
            <Tabs.Tab value="profile" fz={30}>
              Хэрэглэгчийн хувийн мэдээллийн хэсэг
            </Tabs.Tab>
            <Tabs.Tab value="history" fz={30}>
              Үйлчилгээний түүх
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile">
            <Box>
              <Text fz={30} pb={40}></Text>
              <form
                onSubmit={form.onSubmit((values) => {
                  if (edit) {
                    save(values);
                    setEdit(false);
                  } else {
                    setEdit(true);
                  }
                })}
              >
                <Box>
                  {Object.keys(form.values).map((key) => {
                    let k = key as keyof typeof ProfileValues;
                    return (
                      <ProfileSide
                        key={key}
                        title={ProfileValues[k].text}
                        text={form.values[k] ?? ""}
                        form={form}
                        edit={k == "email" ? false : edit}
                        k={key}
                      />
                    );
                  })}
                </Box>
                <Button
                  type={"submit"}
                  fz={20}
                  bg={"main"}
                  py={16}
                  h={"auto"}
                  w={200}
                  my={32}
                >
                  {edit ? " Хадгалах" : "Засах"}
                </Button>
                <Spacer size={40} />
              </form>
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="history">
            <ServiceHistory />
          </Tabs.Panel>
        </Tabs>
      </ReportTitle>
    </Box>
  );
};

export default Page;

const ProfileSide = ({
  title,
  text,
  edit = false,
  form,
  k,
}: {
  title: string;
  text: string;
  edit?: boolean;
  form: UseFormReturnType<ProfileType, (values: ProfileType) => ProfileType>;
  k: string;
}) => {
  return (
    <Flex
      style={{
        borderBottom: `1px solid ${Colors.mainGrey} `,
      }}
      align={"center"}
      w={"auto"}
    >
      <Text c={"headBlue"} miw={200} fz={24} lh={3}>
        {title}
      </Text>
      {edit ? (
        <TextInput
          {...form.getInputProps(k)}
          key={form.key(k)}
          w={"100%"}
          maw={360}
          radius={10}
          pt={"5px"}
          pb={"5px"}
          fz={"24px"}
          c={"grey"}
          color="#546274"
        />
      ) : (
        <Text fz={24} c={"grey"} lh={3}>
          {text}
        </Text>
      )}
    </Flex>
  );
};
