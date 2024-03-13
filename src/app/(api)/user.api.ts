"use server";
import { UserModel } from "@/models/user.model";
import { ErrorMessages } from "@/utils/string";
import { UserApi, api } from "@/utils/values";
import { cookies } from "next/headers";

export async function getUser(): Promise<UserModel> {
  try {
    let token = cookies().get("token");
    if (token?.value != "") {
      let res = await fetch(`${api}${UserApi.me}`, {
        headers: {
          Authorization: `Bearer ${token?.value ?? ""}`,
        },
      }).then((d) => d.json());
      cookies().set("current", res._id);
      return res;
    }
    cookies().delete("token");
    cookies().delete("current");
    throw new Error(ErrorMessages.cookieExpired);
  } catch (error) {
    console.error(error);
    cookies().delete("current");
    cookies().delete("token");
    throw new Error(ErrorMessages.occured);
  }
}

export const sendFeedback = async (message: string, title: string) => {
  let token = cookies().get("token");
  if (token) {
    try {
      const res = await fetch(`${api}${UserApi.me}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value ?? ""}`,
        },
        body: JSON.stringify({
          message: message,
          title: title,
        }),
      }).then((d) => d.json());

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return false;
};
