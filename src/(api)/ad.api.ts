"use server";

import { api } from "@/utils/routes";
import { cookies } from "next/headers";

export const calcData = async (
  location: number,
  value: {
    area: number;
    count?: number;
  },
  service: number,
  startDate: Date,
  endDate: Date
) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const body = {
      location: location,
      area: value.area,
      type: service,
      startDate: startDate,
      endDate: endDate,
      // payment: payment,
    };
    const res = await fetch(`${api}ad/calc`, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    }).then((d) => d.json());

    return {
      data: res.payload,
      token: true,
      message: res?.payload?.message,
      status: res?.payload?.status,
      success: res.succeed,
    };
  } catch (error) {
    // console.error(error);
  }
};
