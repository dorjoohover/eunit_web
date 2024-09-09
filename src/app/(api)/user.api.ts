"use server";
import { PointSendType, PointTitle, UserStatus, UserType } from "@/config/enum";
import { UserModel } from "@/models/user.model";
import { ErrorMessages } from "@/utils/string";
import { UserApi, api } from "@/utils/values";
import { cookies } from "next/headers";
import { imageUploader } from "./constants.api";
function clearCookie() {
  // const cookie = cookies();
  // const hasToken = cookie.has("token");
  // const hasCurrent = cookie.has("current");
  // if (hasCurrent) cookie.delete("current");
  // if (hasToken) cookie.delete("token");
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
        cache: 'no-store'
      })
      .then((d) => d.json())
      .catch((e) => {
        clearCookie();
        return null;
      });
      // const t = localStorage.setItem('token', res._id)
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


export const getFeedback = async () => {
  try {
    const token = cookies().get("token");

    let res = await fetch(`${api}${UserApi.feedbackGet}`, {
      headers: {
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    }).then((d) => d.json());

    
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

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

export const getUsers = async (): Promise<UserModel[] | boolean> => {
  try {
    const token = cookies().get("token");
    if (token?.value) {
      const res = await fetch(`${api}${UserApi.user}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value ?? ""}`,
        },
      }).then((d) => d.json());
      
      return res;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const updateProfile = async (
  images: FormData,
  oFile: FormData,
  isImage: boolean,
  isFile: boolean,
  body: any,
  agent: any,
  org: any,
  profileImage: string,
  isAgent: boolean,
  isOrg: boolean
) => {
  try {
    const token = cookies().get("token");
    if (token) {
      const profile = isImage
        ? await imageUploader(images).then((d) => d?.file?.[0])
        : profileImage;
      const file = isFile
        ? await imageUploader(oFile).then((d) => d?.file)
        : null;

      const agentAddition = isAgent
        ? {
            ...agent,
            organizationContract: file?.[0],
            identityCardFront: file?.[1],
            identityCardBack: file?.[2],
          }
        : null;
      const orgAddition = isOrg
        ? {
            ...org,
            organizationCertificationCopy: file?.[0],
          }
        : null;

      let userType = agent
        ? UserType.agent
        : org
        ? UserType.organization
        : UserType.default;
      const res = await fetch(`${api}${UserApi.user}`, {
        method: "PUT",
        body: JSON.stringify({
          ...body,
          agentAddition: agentAddition,
          organizationAddition: orgAddition,
          profileImg: profile,
          userType: userType,
          status: UserStatus.pending,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value ?? ""}`,
        },
      }).then((d) => d.json());
      
    }
    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
};



export const updateUserStatus = async (id: string, status: UserStatus, message?: string) => {
  try {
    const token = cookies().get('token')
    if(token?.value) {
      const res = await fetch(`${api}${UserApi.update}${id}/${status}/{message}?message=${message ?? ''}`, {
        headers: {
          "Content-Type": "application/json",
          // charset: "UTF-8",
          Authorization: `Bearer ${token?.value ?? ""}`,
        },
      }).then((d) => d.json())
    
      return true 
    } 
    return false
  } catch (error) {
    console.error(error)
    return false
    
  }
}


export const getUserById = async (id: string):Promise<UserModel | boolean> => {
  try {
    const user = await fetch(`${api}${UserApi.get}${id}`).then((d) => d.json())
    return user
  } catch (error) {
    console.error(error)
    return false
  }
}