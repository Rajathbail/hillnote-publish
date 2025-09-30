// Convert a document path to a URL-friendly slug
export function pathToSlug(path) {
  return path
    .replace('documents/', '')
    .replace('.md', '')
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-\/]+/g, '')     // Remove special characters except hyphens and slashes
    .replace(/\-\-+/g, '-')          // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')              // Remove leading hyphens
    .replace(/-+$/, '')              // Remove trailing hyphens
}

// Convert a slug back to a document path
export function slugToPath(slug) {
  // This is a mapping that we'll need to maintain
  // For now, we'll create a simple reverse lookup
  // In production, you might want to use a database or JSON file for this mapping
  return `documents/${slug}.md`
}

// Create a bidirectional mapping for documents
export function createSlugMap(documents) {
  const slugMap = new Map()
  const pathMap = new Map()
  
  documents.forEach(doc => {
    const slug = pathToSlug(doc.path)
    slugMap.set(slug, doc.path)
    pathMap.set(doc.path, slug)
  })
  
  return { slugMap, pathMap }
}