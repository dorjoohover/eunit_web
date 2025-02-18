"use client";
import { logOut } from "@/(api)/auth.api";
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
import { HiOutlineExternalLink } from "react-icons/hi";

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
          <Tabs.List grow>
            <Tabs.Tab
              value="profile"
              fz={{
                md: 30,
                base: 16,
              }}
            >
              Хэрэглэгчийн хувийн мэдээллийн хэсэг
            </Tabs.Tab>
            <Tabs.Tab
              value="history"
              fz={{
                md: 30,
                base: 16,
              }}
            >
              Үйлчилгээний түүх
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile">
            <Box>
              <Text pb={40}></Text>
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
                  bg={edit ? "#546274" : "main"}
                  py={16}
                  h={"auto"}
                  w={{
                    sm: 200,
                    base: "100%",
                  }}
                  my={32}
                >
                  {edit ? " Хадгалах" : "Засах"}
                </Button>
                <Button
                  onClick={() => logOut()}
                  fz={20}
                  variant="outline"
                  c={"red"}
                  py={16}
                  h={"auto"}
                  color="red"
                  w={{
                    sm: 200,
                    base: "100%",
                  }}
                >
                  <HiOutlineExternalLink /> <span className="ml-4">Гарах</span>
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
      justify={"space-between"}
    >
      <Text
        c={"headBlue"}
        miw={200}
        fz={{
          md: 24,
          base: 16,
        }}
        lh={3}
      >
        {title}
      </Text>
      {edit ? (
        <Box>
          <TextInput
            {...form.getInputProps(k)}
            key={form.key(k)}
            w={"100%"}
            maw={360}
            radius={10}
            pt={{ md: "5px", base: "0px" }}
            pb={{ md: "5px", base: "0px" }}
            fz={{
              md: "24px",
              base: "16px",
            }}
            lh={1.1}
            c={"grey"}
            color="#546274"
          />
        </Box>
      ) : (
        <Text
          c={"grey"}
          fz={{
            md: 24,
            base: 16,
          }}
          lh={{
            md: 3,
          }}
          w={"100%"}
        >
          {text}
        </Text>
      )}
    </Flex>
  );
};
