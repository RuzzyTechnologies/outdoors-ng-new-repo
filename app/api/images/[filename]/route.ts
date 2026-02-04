import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params

    // Security: prevent path traversal
    if (filename.includes('..') || filename.includes('\\')) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }

    // If filename is already a full URL, redirect to it
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return NextResponse.redirect(filename)
    }

    // Try different possible image locations from your old site
    const possibleUrls = [
      `https://outdoors.ng/products/${filename}`,
      `https://outdoors.ng/uploads/${filename}`,
      `https://www.outdoors.ng/products/${filename}`,
      `https://www.outdoors.ng/uploads/${filename}`,
      `https://outdoors.ng/image/products/${filename}`,
    ]

    // Try each URL to find where the image is stored
    for (const url of possibleUrls) {
      try {
        const response = await fetch(url, {
          method: 'HEAD',
          headers: { 'User-Agent': 'Mozilla/5.0' },
        })
        if (response.ok) {
          // Found it! Redirect to this URL
          return NextResponse.redirect(url)
        }
      } catch {
        continue
      }
    }

    // If not found, return placeholder
    return NextResponse.redirect(
      `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent('Billboard')}`
    )

  } catch (error) {
    console.error('[Image API] Error:', error)
    return NextResponse.redirect(
      `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent('Billboard')}`
    )
  }
}
