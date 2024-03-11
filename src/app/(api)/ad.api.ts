
import { Api } from "@/config/enum";
import { UserModel } from "@/models/user.model";
import { ErrorMessages } from "@/utils/string";
import { FetchAdType } from "@/utils/type";
import { AdApi, api } from "@/utils/values";

import { cookies } from "next/headers";

export async function getAds(num: number):Promise<FetchAdType> {
  try {
  
    let res = await fetch(`${api}${AdApi.view}${num}`, {
      
    }).then((d) => d.json());
    console.log('object');
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(ErrorMessages.occured);
  }
}
export async function getSearchAds(value: string):Promise<FetchAdType> {
  try {
  
    let res = await fetch(`${api}${AdApi.search}${value}`, {
      
    }).then((d) => d.json());
    console.log('object');
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(ErrorMessages.occured);
  }
}
