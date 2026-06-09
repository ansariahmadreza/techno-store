import { NextResponse } from "next/server";
import { users } from "../../../../../mocks/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const user = users.find(
    (u) => u.email === email
  );

  if (user) {
    const { password, confrimPassword, ...safeUser } = user;
    return NextResponse.json({
      exists: true,
      user: safeUser,
    });
  }

  return NextResponse.json({
    exists: false,
  });
}