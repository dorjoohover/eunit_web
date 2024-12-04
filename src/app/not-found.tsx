import { Image, Stack, Text } from "@mantine/core";

import React from "react";

export default function NotFound() {
  return (
    <>
      <Stack
        display={"flex"}
        justify={"center"}
        w={"100%"}
        ta={"center"}
        my="10vh"
      >
        <Image
          src="/assets/images/404.png"
          alt="error image"
          w={{
            base: "80%",
            md: "70%",
            lg: "60%",
            xl: "40%",
          }}
          mx={"auto !important"}
        />
        <Text c={"grey"} fs="2em">
          Уучлаарай. Таны хайсан хуудас байхгүй байна.
        </Text>
      </Stack>
    </>
  );
}
