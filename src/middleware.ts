import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const middleware = async (request: NextRequest) => {
  const cookieStore = cookies();
  const token = cookieStore.get("uid")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
  try {
    const secret = new TextEncoder().encode("jyotiproject1234#");
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/", "/result", "/test-page"],
};
