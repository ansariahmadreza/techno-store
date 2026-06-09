import { NextResponse } from 'next/server';
import { carouselItems } from '../../../../mocks/data';

export async function GET() {
  return NextResponse.json(carouselItems);
}