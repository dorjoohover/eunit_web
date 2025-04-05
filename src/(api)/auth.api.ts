"use server";
import { UserModel } from "@/models/user.model";
import { api, AuthApi } from "@/utils/routes";
import { cookies } from "next/headers";
import { getUser } from "./user.api";

export const loginUser = async (
  email: string,
  profileImg: string,
  name: string
) => {
  const cookie = await cookies();
  const token = cookie.get("auth_token")?.value;
  if (!token) {
    try {
      console.log(token);
      const res = await fetch(`${api}${AuthApi.login}`, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          profileImg: profileImg,
          name: name,
        }),
      }).then((d) => d.json());
      console.log(res);
      if (res) {
        cookie.set("auth_token", res.payload.accessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });
      }

      return res.payload.user;
      // if (!data) {
      //   window.location.pathname = '/account/check';
      // }
    } catch (err) {
      // console.error(err);
    }
  }
};

export const getUsers = async () => {
  const token = (await cookies()).get("token");
  if (token) {
    try {
      const res = await fetch(`${api}user`, {
        headers: {
          mode: "no-cors",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value ?? ""}`,
          charset: "UTF-8",
        },
      }).then((d) => d.json());
      return res;
    } catch (error) {}
  }
};

export async function logOut() {
  try {
    const cookie = await cookies();
    console.log("logout");
    cookie.delete("auth_token");
    // console.log("Logout request succeeded:");
    // return res;
  } catch (error) {
    // console.error("Logout error:", error);
    throw error;
  }
}

export const getUserData = async () => {
  try {
    const token = (await cookies()).get("auth_token")?.value;
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
