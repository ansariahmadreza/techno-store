// src/app/api/carousel/[id]/route.ts

import { NextResponse } from "next/server";
import { carouselItems } from "../../../../../mocks/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const item = carouselItems.find(
    c => String(c.id) === id
  );

  if (!item) {
    return NextResponse.json(
      { message: "Carousel item not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(item);
}