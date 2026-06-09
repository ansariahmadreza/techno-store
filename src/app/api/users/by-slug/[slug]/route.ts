import { NextResponse } from "next/server";
import { users } from "../../../../../../mocks/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const user = users.find(
    (u) => u.slug === slug
  );
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "کاربر یافت نشد",
      },
      { status: 404 }
    );
  }
  const { password, confrimPassword, ...safeUser } = user;
  return NextResponse.json(safeUser);
}