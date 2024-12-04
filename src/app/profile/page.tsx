"use client";
import { saveUser } from "@/(api)/user.api";
import { useAppContext } from "@/_context";
import { Colors } from "@/base/constants";
import { ReportTitle } from "@/components/report/shared";
import { ProfileValues } from "@/utils/values";
import { Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { notifications } from "@mantine/notifications";

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

  const save = async (values: ProfileType) => {
    if (values.email && values.lastname && values.phone) {
      await saveUser(
        values.email,
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
        color: "green",
        message: "Дутуу байна.",
        title: "Анхааруулга",
      });
    }
  };
  return (
    <Box>
      <ReportTitle text={"Хэрэглэгч"}>
        <Box>
          <Text fz={30} pb={40}>
            Хэрэглэгчийн хувийн мэдээллийн хэсэг
          </Text>
          <form onSubmit={form.onSubmit((values) => save(values))}>
            <Box>
              {Object.keys(form.values).map((key) => {
                let k = key as keyof typeof ProfileValues;
                return (
                  <ProfileSide
                    key={key}
                    title={ProfileValues[k].text}
                    text={ProfileValues[k].pl}
                    form={form}
                    k={key}
                  />
                );
              })}
            </Box>
            <Button type="submit">Хадгалах</Button>
          </form>
        </Box>
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
      w={"auto"}
    >
      <Text c={"headBlue"} miw={200} fz={24} lh={3}>
        {title}
      </Text>
      {edit ? (
        <TextInput {...form.getInputProps(k)} />
      ) : (
        <Text fz={24} c={"grey"} lh={3}>
          {text}
        </Text>
      )}
    </Flex>
  );
};
