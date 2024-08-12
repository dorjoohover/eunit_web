"use server";
import {
  AdStatus,
  AdTypes,
  AdView,
  Api,
  CreateAdSteps,
  ItemPosition,
  ItemTypes,
} from "@/config/enum";
import { CategoryStepsModel } from "@/models/category.model";
import { ItemModel } from "@/models/items.model";
import { UserModel } from "@/models/user.model";
import { ErrorMessages } from "@/utils/string";
import {
  AdFilterType,
  CreateAdType,
  FetchAdType,
  FetchAdUnitType,
  StepTypes,
} from "@/utils/type";
import { AdApi, api } from "@/utils/values";

import { cookies } from "next/headers";
import { getUser } from "./user.api";
import { imageUploader } from "./constants.api";

export async function getAds(
  num: number,
  limit: number,
  type: AdTypes,
  length: number
): Promise<FetchAdUnitType> {
  try {
    let res = await fetch(
      `${api}${AdApi.view}${num}/${limit}/${type}/${length}`,
      {}
    ).then((d) => d.json());

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
export async function getSearchAds(value: string): Promise<FetchAdType> {
  try {
    let res = await fetch(`${api}${AdApi.search}${value}`, {}).then((d) =>
      d.json()
    );

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function createAd(
  images: string[],
  data: StepTypes,
  types: CreateAdType,
  filters: any,
  cateId: string,
  isFile = false,
  file?: FormData
) {
  try {
    const token = cookies().get("token");

    let fileRes = file != undefined ? await imageUploader(file) : null;
    if (images != null) {
      const body = isFile
        ? {
            images: images,
            title: data.title,
            description: data.desc,
            location: data.map,
            subCategory: types.subCategoryId,
            category: cateId,
            sellType: types.sellType,
            items: filters,
            adType: types.adType == "sharing" ? "sharing" : "default",
            adStatus: "pending",
            view: "hide",
            file: fileRes?.file[0],
          }
        : {
            images: images,
            title: data.title,
            description: data.desc,
            location: data.map,
            subCategory: types.subCategoryId,
            category: cateId,
            sellType: types.sellType,
            items: filters,
            adType: types.adType == "sharing" ? "sharing" : "default",
            adStatus: "pending",
            view: "hide",
          };
      console.log(JSON.stringify(body).length, "bytes");
      let res = await fetch(`${api}${AdApi.create}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value ?? ""}`,
          charset: "UTF-8",
        },
        body: JSON.stringify(body),
      }).then((d) => d.json());

      return res;
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function getManyAds(
  num: number,
  self: boolean,
  limit: number,
  status: AdStatus,
  type: AdTypes,
  ads: string[],
  length: number,
  id?: string
): Promise<FetchAdUnitType> {
  try {
    let res = await fetch(
      `${api}${AdApi.many}${num}/${self}/${limit}/${status}/${type}/${length}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dto: ads,
          cateId: id,
        }),
      }
    ).then((d) => d.json());
    if (res.statusCode == 404)
      return {
        ads: [],
        limit: 0,
      };
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function getMyAds(
  num: number,
  limit: number,
  status: AdStatus,
  cate: string,
  length: number,
  type: AdTypes
) {
  try {
    const token = cookies().get("token");
    if (token?.value) {
      let res = await fetch(
        `${api}${AdApi.my}${num}/${limit}/${cate}/${status}/${type}/${length}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Access-Control-Allow-Headers": "*",
          },
        }
      ).then((d) => d.json());
      return res;
    }
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function getAdByCategory(id: string, num: number) {
  try {
    let res = await fetch(`${api}${AdApi.create}${id}/${num}`).then((d) =>
      d.json()
    );
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function getFilteredAd(
  id: string,
  num: number,
  types: string[],
  items: AdFilterType[] = [],
  type: AdTypes,
  limit: number,
  length: number
) {
  try {
    let res = await fetch(
      `${api}${AdApi.filter}${num}/${type}/${limit}/${length}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cateId: id,
          sellTypes: types,
          items: items,
        }),
      }
    ).then((d) => d.json());

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
export async function getAdById(id: string) {
  try {
    let res = await fetch(`${api}${AdApi.id}${id}`).then((d) => d.json());

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function updateAdStatus(
  id: string,
  status: AdStatus,
  view: AdView,
  message: string
) {
  try {
    const token = cookies().get("token");
    if (token?.value) {
      let res = await fetch(
        `${api}${AdApi.update}${id}/${status}/${view}/{message}?message=${message}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Access-Control-Allow-Headers": "*",
          },
        }
      ).then((d) => d.json());

      return res.success ? 1 : -1;
    } else {
      return -1;
    }
  } catch (error) {
    console.error(error);
    return -2;
  }
}

export async function getAdminAds(
  type: AdTypes,
  num: number,
  status: AdStatus,
  limit: number,
  length: number,
  cate: string
) {
  try {
    const token = cookies().get("token");

    let res = await fetch(
      `${api}${AdApi.admin}${
        cate == "" ? "%20" : cate
      }/${type}/${num}/${limit}/${status}/${length}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value ?? ""}`,
          charset: "UTF-8",
        },
      }
    ).then((d) => d.json());

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
export async function getSuggestionAds(
  id: string,
  body: {
    id: string;
    value: string;
  },
  num: number
) {
  try {
    let res = await fetch(`${api}${AdApi.suggestion}${id}/4/${num}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "UTF-8",
      },
      body: JSON.stringify(body),
    }).then((d) => d.json());

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
export async function getSuggestionAdsByCategory(id: string) {
  try {
    let res = await fetch(`${api}${AdApi.suggestion}${id}/0`, {}).then((d) =>
      d.json()
    );

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
