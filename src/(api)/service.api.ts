"use server";
import { FormType } from "@/app/cars/page";
import { ServiceType } from "@/config/enum";
import { api } from "@/utils/routes";
import { VehicleInfo } from "@/utils/type";
import { cookies } from "next/headers";

export const sendRequest = async (
  location: number,
  value: {
    room?: number;
    floor?: number;
    area: number;
    no?: string;
    count?: number;
    startDate?: Date;
    endDate?: Date;
    payment: number;
    value?: any;
  },
  service: number
) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const body = {
      location: location,
      area: value.area,
      no: value.no,
      room: value.room,
      floor: value.floor,
      service: service,
      startDate: value.startDate,
      endDate: value.endDate,
      count: value.count,
      payment: value.payment,
      value: value.value,
    };
    const res = await fetch(`${api}request`, {
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

export const checkPayment = async (id: number, code: string) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}request/payment/${id}/${code}`, {
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
    // console.error(error);
  }
};
export const getRequestResult = async (id: number) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}request/service/${id}`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    }).then((d) => d.json());
    console.log(res);
    return {
      data: res.payload,
      token: true,
      message: res?.payload?.message ?? res.message,
      status: res?.payload?.status,
      success: res.succeed,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
export const getRequestUser = async (page: number, limit: number) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}request/user/${page}/${limit}`, {
      method: "GET",
      mode: "no-cors",
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
export const getRequestAllUser = async () => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}request/all`, {
      method: "GET",
      mode: "no-cors",
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

export const carEvaluate = async (
  value: {
    brand?: string;
    mark?: string;
    motor?: string;
    engine?: string;
    gearbox?: string;
    steerType?: string;
    drive?: string;
    color?: string;
    meter?: string;
    manufactured?: string;
    imported?: string;
    // type?: string;
    interior?: string;
    conditions?: string;
    lastname?: string;
    firstname?: string;
    org?: string;
    usage?: string;
    value?: any;
    vehicle: VehicleInfo;
  },
  service: number,
  payment = 2
  // payment: number
) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const body = {
      brand: value.brand,
      mark: value.mark,
      capacity: value.motor,
      engine: value.engine,
      gearbox: value.gearbox,
      hurd: value.steerType,
      drive: value.drive,
      color: value.color,
      mileage: value.meter,
      manufacture: value.manufactured,
      entry: value.imported,
      lastname: value.lastname,
      firstname: value.firstname,
      usage: value.usage,
      org: value.org,
      service,
      interior: value.interior,
      conditions: value.conditions,
      category: 20,
      payment: payment,
      value: value.value,
      vehicle: value.vehicle,
    };
    const res = await fetch(`${api}request`, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    }).then((d) => d.json());
    console.log(res);
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

export const getCarInfo = async (plateNumber: string) => {
  const token = (await cookies()).get("auth_token");
  if (!token?.value) return { token: false };
  try {
    const res = await fetch(`${api}info/car/${plateNumber}`, {
      method: "GET",
      mode: "no-cors",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }).then((d) => d.json());
    console.log(res.payload);
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
