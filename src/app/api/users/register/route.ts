import { NextResponse } from "next/server";
import { users } from "../../../../../mocks/data";

const generateRandomSlug = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const existingUser = users.find(
      (u) => u.email === body.email
    );

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "این ایمیل قبلاً ثبت نام کرده است",
        },
        { status: 409 }
      );
    }

    const newUser = {
      slug: generateRandomSlug(),
      namefamily: body.namefamily,
      email: body.email.toLowerCase(),
      password: body.password,
      confrimPassword: body.confrimPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    const { password, confrimPassword, ...safeUser } = newUser;
    return NextResponse.json(
      {
        success: true,
        message: "ثبت نام با موفقیت انجام شد",
        user: safeUser,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "خطای داخلی سرور",
      },
      { status: 500 }
    );
  }
}