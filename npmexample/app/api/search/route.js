import { NextResponse } from 'next/server'
import { getDocumentRegistry, getDocumentByPath } from '@/hillnoteDoc/lib/documents-server'
import { documentPathToStaticUrl } from '@/hillnoteDoc/lib/static-routes'

// GET /api/search?q=query - Search documents
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Query parameter is required',
        usage: 'Add ?q=YOUR_SEARCH_TERM to search documents',
        syntax: {
          basic: '/api/search?q=YOUR_SEARCH_TERM',
          url_encoded: '/api/search?q=YOUR%20SEARCH%20TERM',
          description: 'Use ?q= parameter for search queries. Multi-word searches should be URL encoded with %20 for spaces.'
        },
        examples: [
          '/api/search?q=hillnote',
          '/api/search?q=claude',
          '/api/search?q=ai',
          '/api/search?q=getting%20started',
          '/api/search?q=connect%20with%20claude',
          '/api/search?q=local%20AI%20models'
        ],
        search_behavior: {
          case_sensitivity: 'Case-insensitive search',
          partial_matches: 'Supports partial word matches',
          scoring: 'Results ranked by relevance (title > headings > content)',
          limit: 'Returns top 20 results'
        },
        description: 'This API searches through all documentation and returns relevant results with snippets, scores, and matching headings.',
        response_format: {
          success: 'boolean',
          query: 'string - the search term used',
          total: 'number - total matching documents',
          results: [
            {
              title: 'Document title',
              description: 'Document description',
              path: 'Path to document',
              url: 'URL to access document',
              snippet: 'Text snippet with context around match',
              score: 'Relevance score (higher = more relevant)',
              headings: 'Array of matching headings in document'
            }
          ]
        }
      }, { status: 400 })
    }
    
    const registry = await getDocumentRegistry()
    const searchTerm = query.toLowerCase()
    const results = []
    
    // Search through all documents
    for (const doc of registry.documents || []) {
      const pathSegments = doc.path
        .replace('documents/', '')
        .replace('.md', '')
        .split('/')
      
      const document = await getDocumentByPath(pathSegments)
      
      if (!document) continue
      
      // Calculate relevance score
      let score = 0
      const titleLower = document.title.toLowerCase()
      const contentLower = document.content.toLowerCase()
      
      // Title match (highest weight)
      if (titleLower.includes(searchTerm)) {
        score += titleLower === searchTerm ? 100 : 50
      }
      
      // Heading matches
      document.headings.forEach(heading => {
        if (heading.text.toLowerCase().includes(searchTerm)) {
          score += 20 / heading.level // Higher level headings get more weight
        }
      })
      
      // Content matches
      const contentMatches = (contentLower.match(new RegExp(searchTerm, 'g')) || []).length
      score += Math.min(contentMatches * 2, 30) // Cap content score at 30
      
      if (score > 0) {
        // Extract snippet around first match
        const matchIndex = contentLower.indexOf(searchTerm)
        const snippetStart = Math.max(0, matchIndex - 100)
        const snippetEnd = Math.min(document.content.length, matchIndex + 200)
        const snippet = document.content
          .substring(snippetStart, snippetEnd)
          .replace(/^[^\s]*\s/, '') // Remove partial word at start
          .replace(/\s[^\s]*$/, '') // Remove partial word at end
          .trim()
        
        results.push({
          title: document.title,
          description: document.description,
          path: document.path,
          url: documentPathToStaticUrl(doc.path),
          snippet: `...${snippet}...`,
          score,
          headings: document.headings.filter(h =>
            h.text.toLowerCase().includes(searchTerm)
          )
        })
      }
    }
    
    // Sort by relevance score
    results.sort((a, b) => b.score - a.score)
    
    return NextResponse.json({
      success: true,
      query,
      total: results.length,
      results: results.slice(0, 20) // Limit to top 20 results
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Search failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}