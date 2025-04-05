import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { api } from "@/utils/routes";

const API_URL = api + "auth/phone-login";

export async function POST(req: NextRequest) {
  let response = new NextResponse();
  const cookie = await cookies();
  try {
    const body = await req.json();
    const token = body.token;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const res = await fetch(API_URL, {
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
          message: data,
        },
        { status: response.status }
      );
    } else {
      cookie.set("auth_token", token, {
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });

      response = NextResponse.json({ success: true, data: data.payload });
    }

    return response;
  } catch (error: any) {
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Immediately expire the cookie
    });
    console.error("❌ Error in phone-login route:", error.message);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  // Check for authentication
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  let response = new NextResponse();
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!data?.payload?.registered) {
      response = NextResponse.json(
        { success: false, message: "Бүртгэлгүй хэрэглэгч байна." },
        { status: 401 }
      );
    }
    response = NextResponse.json({ success: true, data: data.payload });
    return response;
  } catch (error: any) {
    if (error.message == "expired") {
      cookieStore.delete("auth_token");
    }
  }
}

export async function DELETE(request: NextRequest) {
  // Logout - clear the authentication cookie
  const response = NextResponse.json({
    message: "Logged out successfully",
  });

  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Immediately expire the cookie
  });

  return response;
}

// // Middleware-like token refresh function
// export async function PUT(request: NextRequest) {
//   const cookieStore = cookies();
//   const token = cookieStore.get("auth_token")?.value;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   // Verify existing token
//   const user = await verifyToken(token);

//   if (!user) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }

//   // Generate new token
//   const newToken = await generateToken(user);

//   // Set new token in cookie
//   const response = NextResponse.json({
//     message: "Token refreshed",
//     user: { id: user.id, email: user.email, role: user.role },
//   });

//   response.cookies.set("auth_token", newToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 2 * 60 * 60, // 2 hours
//   });

//   return response;
// }
