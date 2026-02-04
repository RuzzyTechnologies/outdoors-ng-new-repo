import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

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

    // If filename is a URL, redirect to it
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return NextResponse.redirect(filename)
    }

    // If filename contains path separator, it might be a relative path from database
    // Try to fetch from external URL first
    if (filename.includes('/')) {
      // Construct potential external URLs
      const possibleUrls = [
        `https://outdoors.ng/${filename}`,
        `https://www.outdoors.ng/${filename}`,
        `https://outdoors.ng/uploads/${filename}`,
      ]

      for (const url of possibleUrls) {
        try {
          const response = await fetch(url, { method: 'HEAD' })
          if (response.ok) {
            return NextResponse.redirect(url)
          }
        } catch {
          continue
        }
      }
    }

    // Try to serve from local filesystem
    const filepath = join(process.cwd(), 'app', 'images', filename)

    // Check if file exists locally
    if (!existsSync(filepath)) {
      // Return placeholder image
      return NextResponse.redirect(
        `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent('Billboard')}`
      )
    }

    // Read file
    const fileBuffer = await readFile(filepath)

    // Determine content type from extension
    const extension = filename.split('.').pop()?.toLowerCase()
    let contentType = 'image/jpeg'

    switch (extension) {
      case 'png':
        contentType = 'image/png'
        break
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg'
        break
      case 'gif':
        contentType = 'image/gif'
        break
      case 'webp':
        contentType = 'image/webp'
        break
      case 'svg':
        contentType = 'image/svg+xml'
        break
    }

    // Return image with proper headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })

  } catch (error) {
    console.error('[Image API] Error:', error)
    // Return placeholder on error
    return NextResponse.redirect(
      `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent('Billboard')}`
    )
  }
}
