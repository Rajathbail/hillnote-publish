import fs from 'fs'
import path from 'path'

// Get the public directory path
const publicDir = path.join(process.cwd(), 'public')
const blogDir = path.join(publicDir, 'blog')
const registryPath = path.join(blogDir, 'blog-registry.json')

// Cache for blog registry
let registryCache = null
let registryCacheTime = 0
const CACHE_TTL = 60000 // 1 minute cache

// Load blog registry from JSON file
function loadRegistry() {
  const now = Date.now()

  // Return cached version if still valid
  if (registryCache && (now - registryCacheTime) < CACHE_TTL) {
    return registryCache
  }

  if (!fs.existsSync(registryPath)) {
    return { posts: [], count: 0 }
  }

  try {
    const content = fs.readFileSync(registryPath, 'utf8')
    registryCache = JSON.parse(content)
    registryCacheTime = now
    return registryCache
  } catch (err) {
    console.error('Error loading blog registry:', err)
    return { posts: [], count: 0 }
  }
}

// Check if blog feature is enabled (folder exists)
export function isBlogEnabled() {
  return fs.existsSync(blogDir)
}

// Get all published blog posts (from registry)
export async function getBlogPosts() {
  const registry = loadRegistry()
  return registry.posts || []
}

// Get a single blog post by slug (from registry)
export async function getBlogPostBySlug(slug) {
  const posts = await getBlogPosts()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return null
  }

  return {
    ...post,
    url: `/api/blog?slug=${slug}`
  }
}

// Get all blog post paths for static generation
export async function getAllBlogPaths() {
  const posts = await getBlogPosts()

  return posts.map(post => ({
    params: {
      slug: post.slug
    }
  }))
}

// Get blog registry (similar to document registry format)
export async function getBlogRegistry() {
  if (!isBlogEnabled()) {
    return { posts: [], enabled: false }
  }

  const registry = loadRegistry()

  return {
    enabled: true,
    generatedAt: registry.generatedAt,
    count: registry.count,
    posts: (registry.posts || []).map(post => ({
      ...post,
      url: `/api/blog?slug=${post.slug}`
    }))
  }
}
