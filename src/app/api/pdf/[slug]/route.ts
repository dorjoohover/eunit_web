// app/api/get-pdf/[id]/route.ts
import { api } from "@/utils/routes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const token = req.cookies.get("auth_token"); // Example: Bearer <token>
  try {
    const backendRes = await fetch(`${api}request/service/pdf/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
    });

    return new NextResponse(backendRes.body, {
      headers: {
        "Content-Type":
          backendRes.headers.get("content-type") || "application/pdf",
        "Content-Disposition":
          backendRes.headers.get("content-disposition") ||
          `inline; filename=document-${slug}.pdf`,
      },
      status: backendRes.status
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: error.status,
    });
  }
}
