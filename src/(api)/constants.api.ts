"use server";
import { Api } from "@/config/enum";
import { api } from "@/utils/routes";
import { cookies } from "next/headers";

export async function getConstants(
  route: string,
  method: Api,
  body?: {
    data: string;
  }
) {
  try {
    let res;
    if (method == Api.GET) {
      res = await fetch(`${api}${route}`, {}).then((d) => d.json());
    } else {
      res = await fetch(`${api}${route}`, {
        method: method,
        body: JSON.stringify(body),
      }).then((d) => d.json());
    }

    return res;
  } catch (error) {
    // console.error(error);
    // throw new Error(ErrorMessages.occured);
  }
}

export async function imageUploader(images: FormData): Promise<{
  file: string[];
} | null> {
  try {
    const token = (await cookies()).get("token");

    const res = await fetch(`${api}upload`, {
      method: "POST",
      headers: {
        cache: "no-store",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
      body: images,
    }).then((d) => d.json());
    images.delete("files");

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}
