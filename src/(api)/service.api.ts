"use server";
import { ServiceType } from "@/config/enum";
import { api } from "@/utils/routes";
import { cookies } from "next/headers";

export const sendRequest = async (location: number, area: number) => {
  const token = (await cookies()).get("auth-token");
  if (!token?.value) return { token: false };
  try {
    const body = {
      location: location,
      area: area,
      service: ServiceType.REVIEW,
    };
    const res = await fetch(`${api}request`, {
      method: "POST",
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
    console.error(error);
  }
};
export const getRequestResult = async (id: number) => {
  const token = (await cookies()).get("auth-token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}request/service/${id}`, {
      method: "GET",
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
    console.error(error);
  }
};
