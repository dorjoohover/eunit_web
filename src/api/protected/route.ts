// import { NextRequest, NextResponse } from "next/server";
// import admin from "@/lib/firebase-admin";

// export async function GET(req: NextRequest) {
//   const token = req.headers.get("Authorization")?.split("Bearer ")[1];

//   if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     return NextResponse.json({ success: true, user: decoded });
//   } catch (error) {
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }
// }