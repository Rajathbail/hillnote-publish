import { getDocumentRegistry } from '@/hillnoteDoc/lib/documents-server'
import { pathToSlug } from '@/hillnoteDoc/lib/slug-utils'
import { siteConfig } from '@/hillnoteDoc/config/site.config'

export async function GET(request) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Static pages information - customize these based on your site
  const staticPages = [
    {
      title: "Home",
      url: baseUrl,
      description: siteConfig.siteDescription || "Documentation site built with Next.js",
      type: "page"
    },
    // Add more static pages as needed
  ]

  // Get documentation pages
  let documentPages = []
  try {
    const registry = await getDocumentRegistry()

    if (registry.documents) {
      documentPages = registry.documents.map(doc => {
        const slug = pathToSlug(doc.path)
        return {
          title: doc.name,
          url: `${baseUrl}/doc/${slug}`,
          contentAPI: `${baseUrl}/api/docs?path=${slug}`, // API endpoint for raw content
          path: doc.path,
          slug: slug,
          description: doc.description || `Documentation: ${doc.name}`,
          emoji: doc.emoji,
          lastModified: doc.lastModified,
          references: {
            referencedIn: doc.referencedIn || [],
            containsReferencesTo: doc.containsReferencesTo || []
          },
          type: "documentation"
        }
      })
    }
  } catch (error) {
    console.error('Error fetching document registry:', error)
  }

  // Create a structured response for AI models
  const aiSitemap = {
    site: {
      name: siteConfig.siteName || "HillnoteWiki",
      description: siteConfig.siteDescription || "Beautiful documentation with Next.js and Shadcn UI",
      baseUrl: baseUrl,
      platform: "Hillnote Wiki",
      version: "1.0.0"
    },
    pages: {
      static: staticPages,
      documentation: documentPages
    },
    navigation: {
      home: baseUrl,
      documentation: `${baseUrl}/doc`,
      aiSitemap: `${baseUrl}/api/ai-sitemap`,
      standardSitemap: `${baseUrl}/sitemap.xml`
    },
    api: {
      docs: {
        description: "API endpoint to fetch raw markdown content for documentation using URL-friendly slugs",
        listAll: `${baseUrl}/api/docs`,
        getBySlug: `${baseUrl}/api/docs?path={slug}`,
        note: "Paths use URL-friendly slugs (lowercase, hyphens instead of spaces)"
      }
    },
    metadata: {
      totalPages: staticPages.length + documentPages.length,
      totalDocuments: documentPages.length,
      lastUpdated: new Date().toISOString(),
      format: "This endpoint provides structured JSON data optimized for AI crawlers and language models",
      usage: "AI assistants can use this data to understand the site structure and provide better assistance to users"
    }
  }

  return Response.json(aiSitemap, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      'Access-Control-Allow-Origin': '*' // Allow AI crawlers from any origin
    }
  })
}