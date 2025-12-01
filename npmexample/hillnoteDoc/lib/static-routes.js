// Convert document path to static route URL
export function documentPathToStaticUrl(documentPath) {
  // Remove 'documents/' prefix and '.md' extension
  let cleanPath = documentPath
    .replace(/^documents\//, '')
    .replace(/\.md$/, '')

  // Convert to URL-safe slug
  const parts = cleanPath.split('/')
  const slugParts = parts.map(part =>
    part
      .trim() // Remove leading/trailing spaces
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
  )

  return `/doc/${slugParts.join('/')}`
}

// Navigate to a document using static route
export function navigateToDocument(documentPath) {
  const staticUrl = documentPathToStaticUrl(documentPath)
  window.location.href = staticUrl
}

// Check if we should use static routes (for navigation)
export function useStaticRoutes() {
  // Check if static pages exist - you could make this configurable
  return true
}