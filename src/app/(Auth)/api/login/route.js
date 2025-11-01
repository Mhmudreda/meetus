import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const response = await fetch("https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
      isEmployee: true,
    }),
  });

  const data = await response.json();

  if (response.ok && data.token) {
    const res = NextResponse.json({ success: true, user: data.userInfo });
    const isProd = process.env.NODE_ENV === 'production';
    res.cookies.set("token", data.token, {
      httpOnly: true,
      secure: isProd, 
      sameSite: 'lax',
      path: "/",
      maxAge: 60 * 60 * 24 * 5, 
    });
    return res;
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
