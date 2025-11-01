import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  
  res.cookies.set("token", "", { httpOnly: true, secure: true, path: "/", maxAge: 0 });
  res.cookies.set("userData", "", { path: "/", maxAge: 0 });
  return res;
}
