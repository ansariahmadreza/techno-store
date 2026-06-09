import { NextResponse } from "next/server";
import { users } from "../../../../../mocks/data";

const generateRandomSlug = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 12; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      namefamily,
      email,
      password,
      confrimPassword,
    } = body;

    // اعتبارسنجی ساده
    if (!namefamily || !email || !password || !confrimPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "تمام فیلدها الزامی هستند",
        },
        { status: 400 }
      );
    }

    if (password !== confrimPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "رمز عبور و تکرار آن مطابقت ندارند",
        },
        { status: 400 }
      );
    }

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
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
      namefamily: namefamily.trim(),
      email: email.trim().toLowerCase(),
      password,
      confrimPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    const token = `mock-token-${newUser.slug}-${Date.now()}`;

    const {
      password: _password,
      confrimPassword: _confrimPassword,
      ...safeUser
    } = newUser;

    return NextResponse.json(
      {
        success: true,
        message: "ثبت نام با موفقیت انجام شد",
        user: safeUser,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطای داخلی سرور",
      },
      { status: 500 }
    );
  }
}