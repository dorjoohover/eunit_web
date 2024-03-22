"use server";
import { PointSendType, PointTitle } from "@/config/enum";
import { UserModel } from "@/models/user.model";
import { ErrorMessages } from "@/utils/string";
import { UserApi, api } from "@/utils/values";
import { cookies } from "next/headers";
function clearCookie() {
  const cookie = cookies();
  const hasToken = cookie.has("token");
  const hasCurrent = cookie.has("current");
  if (hasCurrent) cookie.delete("current");
  if (hasToken) cookie.delete("token");
}
export async function getUser(): Promise<UserModel | null> {
  try {
    const cookie = cookies();
    let token = cookie.get("token");
    let hasCurrent = cookie.has("current");
    let hasType = cookie.has("type");
    if (token?.value != "" && token) {
      let res = await fetch(`${api}${UserApi.me}`, {
        headers: {
          Authorization: `Bearer ${token?.value ?? ""}`,
        },
      })
        .then((d) => d.json())
        .catch((e) => {
          clearCookie();
          return null;
        });
      if (!hasCurrent) cookie.set("current", res._id);
      if (!hasType) cookie.set("type", res.userType);

      return res;
    }
    clearCookie();
    return null;
  } catch (error) {
    console.error(error);
    clearCookie();
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

export const sendPointByUser = async (
  email: string,
  point: number,
  type: PointTitle,
  message: string
) => {
  try {
    const token = cookies().get("token");
    let res = await fetch(
      `${api}${
        UserApi.point
      }${email.toLowerCase()}/${point}/${type}/{message}?message=${message}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value ?? ""}`,
        },
      }
    ).then((d) => d.json());

    return res["message"] == "success" ? true : false;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
};

export const bookmark = async (id: number) => {
  let token = cookies().get("token");
  if (token) {
    try {
      const res = await fetch(`${api}${UserApi.bookmark}${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value ?? ""}`,
        },
      }).then((d) => d.json());

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return false;
};
