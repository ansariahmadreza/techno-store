import { NextResponse } from 'next/server';
import { products } from '../../../../mocks/data';

// GET /api/products?_page=1&_per_page=10&title=...
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get('_page') || '1');
    const per_page = parseInt(url.searchParams.get('_per_page') || '10');
    const title = url.searchParams.get('title') || '';

    let filteredProducts = [...products];

    // search filter
    if (title) {
      filteredProducts = filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // pagination
    const start = (page - 1) * per_page;
    const end = start + per_page;
    const paginated = filteredProducts.slice(start, end);

    return NextResponse.json(paginated, {
      status: 200,
      headers: {
        'X-Total-Count': filteredProducts.length.toString(),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}