import { Api } from "@/config/enum";
import { api } from "@/utils/values";

export async function getConstants(route: string, method: Api, body?: any) {
  try {
    ("use server");
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
    console.error(error);
    // throw new Error(ErrorMessages.occured);
  }
}
