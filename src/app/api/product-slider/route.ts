import { NextResponse } from 'next/server';
import { productSlider } from '../../../../mocks/data';

// GET /api/product-slider
export async function GET() {
  try {
    return NextResponse.json(productSlider, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch product slider data' },
      { status: 500 }
    );
  }
}