import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { siteConfig } from '@/hillnoteDoc/config/site.config'
import { getDocumentRegistry, findDocumentBySlug } from '@/hillnoteDoc/lib/documents-server'
import { pathToSlug } from '@/hillnoteDoc/lib/slug-utils'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const docPath = searchParams.get('path')
    const mapFormat = searchParams.get('map')
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hillnote.com'

    if (!docPath) {
      // Return list of all documents if no path specified
      try {
        const registry = await getDocumentRegistry()

        // Return simplified list of documents with slug-based URLs
        const docsList = registry.documents?.map(doc => {
          const slug = pathToSlug(doc.path)
          return {
            title: doc.name,
            path: doc.path,
            slug: slug,
            url: `/api/docs?path=${slug}`,
            fullUrl: `${baseUrl}/api/docs?path=${slug}`
          }
        }) || []

        // If map=true, return a clean format for copying
        if (mapFormat === 'true' || mapFormat === '1') {
          const urlList = [
            `${baseUrl}/api/ai-sitemap`,
            ...docsList.map(doc => doc.fullUrl)
          ]
          const textVersion = `The links of the documentation are:\n\n${urlList.join('\n\n')}`

          // Always return plain text for map=true
          return new Response(textVersion, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'public, max-age=300',
              'Access-Control-Allow-Origin': '*'
            }
          })
        }

        return NextResponse.json({
          success: true,
          count: docsList.length,
          documents: docsList
        })
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to read document registry' },
          { status: 500 }
        )
      }
    }

    // Handle slug-based path - convert slug to actual document path
    const slugSegments = docPath.split('/')
    const actualPathSegments = await findDocumentBySlug(slugSegments)

    if (!actualPathSegments) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    // Reconstruct the full file path
    const publicDir = path.join(process.cwd(), 'public')
    const fullPath = path.join(
      publicDir,
      siteConfig.workspace.path,
      'documents',
      `${actualPathSegments.join('/')}.md`
    )

    // Security check - prevent directory traversal
    const normalizedPath = path.normalize(fullPath)
    const expectedBase = path.join(publicDir, siteConfig.workspace.path, 'documents')
    if (!normalizedPath.startsWith(expectedBase)) {
      return NextResponse.json(
        { success: false, error: 'Invalid path' },
        { status: 400 }
      )
    }

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { success: false, error: 'Document file not found' },
        { status: 404 }
      )
    }

    // Read the raw markdown content
    const content = fs.readFileSync(fullPath, 'utf8')

    return NextResponse.json({
      success: true,
      slug: docPath,
      path: `documents/${actualPathSegments.join('/')}.md`,
      content: content
    })

  } catch (error) {
    console.error('Error in /api/docs:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}