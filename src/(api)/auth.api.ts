"use server";
import redis from "@/lib/redis";
import { UserModel } from "@/models/user.model";
import { api, AuthApi, uri } from "@/utils/routes";
import { cookies } from "next/headers";
import { getUser } from "./user.api";
import { NextResponse } from "next/server";

export const loginUser = async (
  email: string,
  profileImg: string,
  name: string
) => {
  const cookie = await cookies();
  const token = cookie.get("auth-token")?.value;
  console.log(token);
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
        cookie.set("auth-token", res.payload.accessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000 * 12,
          sameSite: "none",
          secure: true,
        });
      }

      return res.payload.user;
      // if (!data) {
      //   window.location.pathname = '/account/check';
      // }
    } catch (err) {
      console.error(err);
    }
  }
};

export const getUsers = async () => {
  const token = (await cookies()).get("token");
  if (token) {
    try {
      const res = await fetch(`${api}user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value ?? ""}`,
          charset: "UTF-8",
        },
      }).then((d) => d.json());
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
};

export async function logOut() {
  try {
    const cookie = await cookies();
    cookie.delete("auth-token");
    console.log("Logout request succeeded:");
    // return res;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export const getUserData = async () => {
  try {
    const token = (await cookies()).get("auth-token")?.value;
    if (!token) {
      return { token: false };
    }

    const userData: UserModel | null = await getUser();

    if (!userData) {
      return { token: true, data: undefined };
    }
    return { data: userData, token: true };
  } catch (error) {
    return { token: false };
  }
};
