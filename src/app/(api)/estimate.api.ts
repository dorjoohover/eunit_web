"use server";

import { ErrorMessages } from "@/utils/string";
import { EstimateApi, api } from "@/utils/values";
import { imageUploader } from "./constants.api";
import { AdSellType, AdStatus, EstimateStatus } from "@/config/enum";
import { EstimateItemType, EstimateType } from "@/utils/type";
import { cookies } from "next/headers";

export async function createEstimate(
  items: EstimateItemType[],
  cate: string,
  image: FormData
) {
  try {
    const token = cookies().get("token");
    let imageRes = "";
    await imageUploader(image).then((d) => {
      imageRes = d?.file[0] ?? "";
    });

    let res = await fetch(`${api}${EstimateApi.create}`, {
      method: "POST",
      body: JSON.stringify({
        file: imageRes,
        subCategory: cate,
        category: cate,
        sellType: AdSellType.sell,
        items: items,
        status: AdStatus.pending,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
        charset: "UTF-8",
      },
    }).then((d) => d.json());

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
export async function getMyEstimate() {
  try {
    const token = cookies().get("token");
 

    let res = await fetch(`${api}${EstimateApi.create}`, {
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
export async function getEstimateByStatus(status: EstimateStatus) {
  try {
    const token = cookies().get("token");
 

    let res = await fetch(`${api}${EstimateApi.create}${status}`, {
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
export async function updateEstimateById(status: EstimateStatus, id:string) {
  try {
    const token = cookies().get("token");
 

    let res = await fetch(`${api}${EstimateApi.update}${status}/${id}`, {
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
