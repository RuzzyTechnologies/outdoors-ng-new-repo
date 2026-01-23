import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.MYSQL_API_URL || '';
const API_KEY = process.env.MYSQL_API_KEY || '';

/**
 * Proxy API route to forward requests to your MySQL PHP API
 * This keeps your API key secure on the server side
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const searchParams = request.nextUrl.searchParams;
  
  if (!API_URL) {
    return NextResponse.json(
      { error: 'MySQL API not configured' },
      { status: 500 }
    );
  }

  try {
    const url = new URL(API_URL);
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        'X-API-Key': API_KEY,
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('MySQL API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from MySQL API' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const searchParams = request.nextUrl.searchParams;
  const body = await request.json();

  if (!API_URL) {
    return NextResponse.json(
      { error: 'MySQL API not configured' },
      { status: 500 }
    );
  }

  try {
    const url = new URL(API_URL);
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('MySQL API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from MySQL API' },
      { status: 500 }
    );
  }
}
