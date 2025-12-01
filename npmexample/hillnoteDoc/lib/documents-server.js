import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { siteConfig } from '@/hillnoteDoc/config/site.config'
import { pathToSlug } from './slug-utils'

// Get the public directory path
const publicDir = path.join(process.cwd(), 'public')

// Get all documents from the registry
export async function getDocumentRegistry() {
  try {
    const registryPath = path.join(
      publicDir,
      siteConfig.workspace.path,
      siteConfig.workspace.registryFile
    )
    
    const registryContent = fs.readFileSync(registryPath, 'utf8')
    return JSON.parse(registryContent)
  } catch (error) {
    console.error('Error reading document registry:', error)
    return { documents: [], folders: [] }
  }
}

// Get all document paths for static generation
export async function getAllDocumentPaths() {
  const registry = await getDocumentRegistry()
  
  return registry.documents?.map(doc => {
    // Convert document path to URL slug
    const slug = pathToSlug(doc.path)
    const urlPath = slug.split('/')
    
    return {
      params: {
        path: urlPath
      }
    }
  }) || []
}

// Find document by slug
export async function findDocumentBySlug(slugSegments) {
  const registry = await getDocumentRegistry()
  const targetSlug = slugSegments.join('/')
  
  // Find the document that matches this slug
  const doc = registry.documents?.find(doc => {
    const docSlug = pathToSlug(doc.path)
    return docSlug === targetSlug
  })
  
  if (!doc) return null
  
  // Return the actual path segments (without documents/ and .md)
  return doc.path
    .replace('documents/', '')
    .replace('.md', '')
    .split('/')
}

// Get document content by path
export async function getDocumentByPath(pathSegments) {
  try {
    // First try to find the document by slug
    const actualPathSegments = await findDocumentBySlug(pathSegments)
    
    if (!actualPathSegments) {
      // Fallback to direct path (for backwards compatibility)
      const docPath = pathSegments.join('/')
      const fullPath = path.join(
        publicDir,
        siteConfig.workspace.path,
        'documents',
        `${docPath}.md`
      )
      
      if (!fs.existsSync(fullPath)) {
        return null
      }
    }
    
    // Reconstruct the document path
    const docPath = actualPathSegments ? actualPathSegments.join('/') : pathSegments.join('/')
    const fullPath = path.join(
      publicDir,
      siteConfig.workspace.path,
      'documents',
      `${docPath}.md`
    )
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    // Read the file content
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    
    // Parse frontmatter if it exists
    const { data: frontmatter, content } = matter(fileContent)
    
    // Extract first paragraph for description
    const firstParagraph = content
      .split('\n\n')
      .find(p => p.trim() && !p.startsWith('#'))
      ?.replace(/[#*`]/g, '')
      .trim()
      .substring(0, 160)
    
    // Extract headings for structured data
    const headings = []
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    let match
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        level: match[1].length,
        text: match[2],
        id: match[2].toLowerCase().replace(/[^\w]+/g, '-')
      })
    }
    
    // Construct the full document path that matches the registry format
    const fullDocPath = `documents/${actualPathSegments ? actualPathSegments.join('/') : docPath}.md`
    
    return {
      path: fullDocPath,
      title: frontmatter.title || pathSegments[pathSegments.length - 1].replace(/-/g, ' '),
      description: frontmatter.description || firstParagraph || '',
      content,
      frontmatter,
      headings,
      lastModified: fs.statSync(fullPath).mtime.toISOString()
    }
  } catch (error) {
    console.error('Error reading document:', error)
    return null
  }
}

// Generate breadcrumbs for a document path
export function generateBreadcrumbs(pathSegments) {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/doc' }
  ]
  
  let currentPath = '/doc'
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    breadcrumbs.push({
      name: segment.replace(/-/g, ' '),
      path: currentPath,
      isLast: index === pathSegments.length - 1
    })
  })
  
  return breadcrumbs
}

// Get related documents
export async function getRelatedDocuments(currentPath) {
  const registry = await getDocumentRegistry()
  
  // Find documents in the same folder
  const currentFolder = currentPath.split('/').slice(0, -1).join('/')
  
  const related = registry.documents
    ?.filter(doc => {
      const docFolder = doc.path.replace('documents/', '').split('/').slice(0, -1).join('/')
      return docFolder === currentFolder && !doc.path.includes(currentPath)
    })
    .slice(0, 5)
    .map(doc => ({
      title: doc.path.split('/').pop()?.replace('.md', '').replace(/-/g, ' '),
      path: `/doc/${doc.path.replace('documents/', '').replace('.md', '')}`
    }))
  
  return related || []
}