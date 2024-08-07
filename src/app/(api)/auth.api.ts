"use server";
import { AuthApi, api } from "@/utils/values";
import { cookies } from "next/headers";

export const loginUser = async (
  email: string,
  profileImg: string,
  name: string
) => {
  const token = cookies().get("token");

  if (!token) {
    try {
      const res = await fetch(`${api}${AuthApi.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          profileImg: profileImg,
          name: name,
        }),
      }).then((d) => d.json());
      
      if (res) {
        cookies().set("token", res.token);
      }

      return res;
      // if (!data) {
      //   window.location.pathname = '/account/check';
      // }
    } catch (err) {
      console.error(err);
    }
  }
};

export const logOut = async () => {
  await cookies().delete("token");
  await cookies().delete("status");
  await cookies().delete("current");
  await cookies().delete("type");
  return true
};
