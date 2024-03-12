"use server";
import { ErrorMessages } from "@/utils/string";
import { CategoryApi, api } from "@/utils/values";

export async function filterCategoryById(value: string) {
  try {
    let res = await fetch(`${api}${CategoryApi.filter}${value}`, {}).then((d) =>
      d.json()
    );

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
