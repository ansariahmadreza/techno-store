import { NextResponse } from "next/server";
import { users } from "../../../../mocks/data";

export async function GET() {
  const safeUsers = users.map(
    ({ password, confrimPassword, ...rest }) => rest
  );

  return NextResponse.json(safeUsers);
}