import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const response = await fetch("https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/user-info", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ user: data });
    }

    return NextResponse.json({ error: 'Failed to fetch user info' }, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


