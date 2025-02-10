"use server";
import { locale } from "@/base/vocabs/mn";
import { PointTitle } from "@/config/enum";
import { UserModel } from "@/models/user.model";
import { api, PaymentApi, UserApi } from "@/utils/routes";
import { cookies } from "next/headers";
function clearCookie() {
  // const cookie = cookies();
  // const hasToken = cookie.has("token");
  // const hasCurrent = cookie.has("current");
  // if (hasCurrent) cookie.delete("current");
  // if (hasToken) cookie.delete("token");
}
export async function getUser(): Promise<UserModel | null> {
  const cookie = await cookies();
  const token = cookie.get("auth_token")?.value;

  if (token) {
    try {
      const res = await fetch(`${api}${UserApi.me}`, {
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
        cache: "no-store",
      })
        .then((d) => d.json())
        .catch((e) => {
          console.log(e)
          cookie.delete("auth_token");
          return null;
        });
      if (res?.succeed) {
        return res.payload as UserModel;
      } else {
        console.log('else')
        cookie.delete("auth_token");
        return null;
      }
    } catch (error: any) {
      if (error.message == "expired") {
        console.log('expired')
        cookie.delete("auth_token");
      }
      return null;
    }
  } else {
    return null;
  }
}

export const userHistory = async (limit: number, page: number) => {
  const token = (await cookies()).get("auth_token")?.value;
  if (token) {
    try {
      const res = await fetch(`${PaymentApi.user}/${limit}/${page}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
      }).then((d) => d.json());
      return res;
    } catch (error) {
      // console.error(error);
      return false;
    }
  }
  return false;
};

export const sendFeedback = async (message: string, title: string) => {
  const token = (await cookies()).get("auth_token")?.value;
  if (token) {
    try {
      await fetch(`${api}${UserApi.me}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
          message: message,
          title: title,
        }),
      }).then((d) => d.json());

      return true;
    } catch (error) {
      // console.error(error);
      return false;
    }
  }
  return false;
};

export const getFeedback = async () => {
  try {
    const token = (await cookies()).get("auth_token")?.value;

    const res = await fetch(`${api}${UserApi.feedbackGet}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => d.json());

    return res;
  } catch (error) {
    // console.error(error);
    throw new Error(locale.data.ERROR_MESSAGES.ERROR_OCCURED);
  }
};

export const sendPointByUser = async (
  email: string,
  point: number,
  message: string
) => {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    const res = await fetch(`${PaymentApi.transaction}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify({
        message: message,
        receiver: email,
        point: point,
      }),
    }).then((d) => d.json());

    return res;
  } catch (error) {
    // console.error(error);
    throw new Error(locale.data.ERROR_MESSAGES.ERROR_OCCURED);
  }
};

export const saveUser = async (
  lastname: string,
  firstname: string,
  phone: string
) => {
  try {
    const cookie = await cookies();
    const token = cookie.get("auth_token")?.value;
    const body = {
      lastname: lastname,
      firstname: firstname,
      phone: phone,
    };
    const res = await fetch(`${api}user`, {
      method: "PUT",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify(body),
    }).then((d) => d.json());
    return res;
  } catch (error) {
    console.log(error);
    return {
      succeed: false,
      message: "Алдаа гарлаа",
    };
  }
};

export const getUsers = async (): Promise<UserModel[] | boolean> => {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    if (token) {
      const res = await fetch(`${api}${UserApi.user}`, {
        headers: {
          mode: "no-cors",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
      }).then((d) => d.json());

      return res;
    }
    return false;
  } catch (error) {
    // console.error(error);
    return false;
  }
};
