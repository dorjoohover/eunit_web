import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { api } from "@/utils/routes";

const API_URL = api + "auth/register";

export async function POST(req: NextRequest) {
  let response = new NextResponse();
  const cookie = await cookies();
  try {
    const body = await req.json();
    const { firstname, lastname, email, token } = body;
    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      response = NextResponse.json(
        {
          success: false,
          message: data.message,
        },
        { status: data.statusCode }
      );
    } else {
      cookie.set("auth_token", token, {
        sameSite: "strict",
        maxAge: 60 * 60 * 1000 * 24 * 7,
      });

      response = NextResponse.json({
        success: true,
        data: data.payload.message,
      });
    }

    return response;
  } catch (error: any) {
    cookie.delete("auth_token");
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: error.statusCode ?? error.status ?? 500 }
    );
  }
}
