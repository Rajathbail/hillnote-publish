#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { marked } from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

// ═══════════════════════════════════════════════════════════════════════════════
// VISUAL LOGGING UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',

  // Foreground colors
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',

  // Background colors
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
}

const icons = {
  success: '✓',
  error: '✗',
  warning: '⚠',
  info: 'ℹ',
  arrow: '→',
  bullet: '•',
  star: '★',
  folder: '📁',
  file: '📄',
  blog: '📝',
  rocket: '🚀',
  sparkles: '✨',
  check: '☑',
  clock: '⏱',
  link: '🔗',
  tag: '🏷',
}

const box = {
  topLeft: '╭',
  topRight: '╮',
  bottomLeft: '╰',
  bottomRight: '╯',
  horizontal: '─',
  vertical: '│',
  teeRight: '├',
  teeLeft: '┤',
}

function log(message = '') {
  console.log(message)
}

function logHeader(title) {
  const width = 60
  const padding = Math.max(0, Math.floor((width - title.length - 2) / 2))
  const paddingRight = width - title.length - 2 - padding

  log()
  log(`${colors.cyan}${box.topLeft}${box.horizontal.repeat(width)}${box.topRight}${colors.reset}`)
  log(`${colors.cyan}${box.vertical}${colors.reset}${' '.repeat(padding)}${colors.bold}${colors.white}${title}${colors.reset}${' '.repeat(paddingRight)}${colors.cyan}${box.vertical}${colors.reset}`)
  log(`${colors.cyan}${box.bottomLeft}${box.horizontal.repeat(width)}${box.bottomRight}${colors.reset}`)
  log()
}

function logSubHeader(title) {
  log()
  log(`${colors.cyan}${box.teeRight}${box.horizontal.repeat(3)}${colors.reset} ${colors.bold}${title}${colors.reset}`)
  log()
}

function logSuccess(message) {
  log(`  ${colors.green}${icons.success}${colors.reset} ${message}`)
}

function logError(message) {
  log(`  ${colors.red}${icons.error}${colors.reset} ${colors.red}${message}${colors.reset}`)
}

function logWarning(message) {
  log(`  ${colors.yellow}${icons.warning}${colors.reset} ${colors.yellow}${message}${colors.reset}`)
}

function logInfo(message) {
  log(`  ${colors.blue}${icons.info}${colors.reset} ${message}`)
}

function logStep(message) {
  log(`  ${colors.gray}${icons.arrow}${colors.reset} ${message}`)
}

function logBullet(message) {
  log(`    ${colors.gray}${icons.bullet}${colors.reset} ${message}`)
}

function logFile(action, filepath) {
  log(`  ${colors.green}${icons.success}${colors.reset} ${colors.dim}${action}:${colors.reset} ${colors.cyan}${filepath}${colors.reset}`)
}

function logProcessing(filename) {
  log(`  ${colors.yellow}${icons.clock}${colors.reset} Processing ${colors.bold}${filename}${colors.reset}...`)
}

function logPublished(slug) {
  log(`    ${colors.green}${icons.rocket}${colors.reset} Published ${colors.green}${icons.arrow}${colors.reset} ${colors.cyan}/blog/${slug}${colors.reset}`)
}

function logSkipped(filename, reason) {
  log(`    ${colors.yellow}${icons.warning}${colors.reset} Skipped: ${colors.dim}${reason}${colors.reset}`)
}

function logMoved(filename) {
  log(`    ${colors.blue}${icons.arrow}${colors.reset} Moved to ${colors.cyan}published/${colors.reset}`)
}

function logDivider() {
  log(`  ${colors.gray}${box.horizontal.repeat(50)}${colors.reset}`)
}

function logSummaryBox(title, items) {
  const width = 56
  log()
  log(`  ${colors.green}${box.topLeft}${box.horizontal.repeat(width)}${box.topRight}${colors.reset}`)
  log(`  ${colors.green}${box.vertical}${colors.reset} ${colors.bold}${icons.sparkles} ${title}${colors.reset}${' '.repeat(width - title.length - 4)}${colors.green}${box.vertical}${colors.reset}`)
  log(`  ${colors.green}${box.teeRight}${box.horizontal.repeat(width)}${box.teeLeft}${colors.reset}`)

  for (const item of items) {
    const displayItem = item.length > width - 4 ? item.slice(0, width - 7) + '...' : item
    log(`  ${colors.green}${box.vertical}${colors.reset}   ${displayItem}${' '.repeat(Math.max(0, width - displayItem.length - 3))}${colors.green}${box.vertical}${colors.reset}`)
  }

  log(`  ${colors.green}${box.bottomLeft}${box.horizontal.repeat(width)}${box.bottomRight}${colors.reset}`)
}

function logErrorBox(title, errors) {
  const width = 56
  log()
  log(`  ${colors.red}${box.topLeft}${box.horizontal.repeat(width)}${box.topRight}${colors.reset}`)
  log(`  ${colors.red}${box.vertical}${colors.reset} ${colors.bold}${colors.red}${icons.error} ${title}${colors.reset}${' '.repeat(width - title.length - 4)}${colors.red}${box.vertical}${colors.reset}`)
  log(`  ${colors.red}${box.teeRight}${box.horizontal.repeat(width)}${box.teeLeft}${colors.reset}`)

  for (const error of errors) {
    const displayError = error.length > width - 6 ? error.slice(0, width - 9) + '...' : error
    log(`  ${colors.red}${box.vertical}${colors.reset}   ${colors.red}${icons.bullet}${colors.reset} ${displayError}${' '.repeat(Math.max(0, width - displayError.length - 5))}${colors.red}${box.vertical}${colors.reset}`)
  }

  log(`  ${colors.red}${box.bottomLeft}${box.horizontal.repeat(width)}${box.bottomRight}${colors.reset}`)
}

function logProgress(current, total, label) {
  const width = 30
  const progress = Math.round((current / total) * width)
  const bar = '█'.repeat(progress) + '░'.repeat(width - progress)
  const percent = Math.round((current / total) * 100)
  log(`  ${colors.cyan}[${bar}]${colors.reset} ${percent}% ${colors.dim}(${current}/${total} ${label})${colors.reset}`)
}

// Prompt user for input
function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

// Import site config for centralized URL with fallback
let configPath = path.join(projectRoot, 'hillnoteDoc', 'config', 'site.config.js')
if (!fs.existsSync(configPath)) {
  configPath = path.join(projectRoot, 'src', 'hillnoteDoc', 'config', 'site.config.js')
}
const configModule = await import(configPath)
const siteConfig = configModule.siteConfig

// Determine app folder location (src/app or app)
const appFolder = fs.existsSync(path.join(projectRoot, 'src', 'app')) ? path.join('src', 'app') : 'app'

// Blog-specific paths
const BLOG_DRAFT_PATH = path.join(projectRoot, 'public', 'blog', 'draft')
const BLOG_PUBLISHED_PATH = path.join(projectRoot, 'public', 'blog', 'published')
const BLOG_OUTPUT_PATH = path.join(projectRoot, appFolder, 'blog')
const SITEMAP_PATH = path.join(projectRoot, 'public', 'sitemap.xml')
const BLOG_REGISTRY_PATH = path.join(projectRoot, 'public', 'blog', 'blog-registry.json')

// Templates path - look in hillnoteDoc/resources or src/hillnoteDoc/resources
let TEMPLATES_PATH = path.join(projectRoot, 'hillnoteDoc', 'resources', 'blog-templates')
if (!fs.existsSync(TEMPLATES_PATH)) {
  TEMPLATES_PATH = path.join(projectRoot, 'src', 'hillnoteDoc', 'resources', 'blog-templates')
}

// Required YAML frontmatter fields for blog posts
const REQUIRED_FRONTMATTER = ['title', 'publishDate', 'author']
// Optional fields: editDate, coverImage, description, tags, excerpt

// Parse blog post content - handles YAML in code blocks (```yaml ... ```)
function parseBlogContent(fileContent) {
  // Check for YAML code block at the start
  const yamlCodeBlockMatch = fileContent.match(/^```yaml\n([\s\S]*?)```\n*([\s\S]*)$/)

  if (yamlCodeBlockMatch) {
    const yamlContent = yamlCodeBlockMatch[1]
    const markdownContent = yamlCodeBlockMatch[2]

    // Parse YAML manually (simple key: value format with empty lines)
    const frontmatter = {}
    const lines = yamlContent.split('\n')

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue // Skip empty lines

      const colonIndex = trimmed.indexOf(':')
      if (colonIndex > 0) {
        const key = trimmed.slice(0, colonIndex).trim()
        let value = trimmed.slice(colonIndex + 1).trim()

        // Handle tags as comma-separated string
        if (key === 'tags' && value) {
          frontmatter[key] = value.split(',').map(t => t.trim()).filter(t => t)
        } else {
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          frontmatter[key] = value || null
        }
      }
    }

    return { data: frontmatter, content: markdownContent }
  }

  // Fallback to gray-matter for standard --- frontmatter
  const parsed = matter(fileContent)

  // Also handle comma-separated tags in standard frontmatter
  if (parsed.data.tags && typeof parsed.data.tags === 'string') {
    parsed.data.tags = parsed.data.tags.split(',').map(t => t.trim()).filter(t => t)
  }

  return { data: parsed.data, content: parsed.content }
}

// Parse template metadata from file comments
function parseTemplateMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n').slice(0, 10) // Check first 10 lines

  let name = path.basename(filePath, '.jsx')
  let description = ''
  let preview = ''

  for (const line of lines) {
    const templateMatch = line.match(/\/\/\s*Template:\s*(.+)/)
    const descMatch = line.match(/\/\/\s*Description:\s*(.+)/)
    const previewMatch = line.match(/\/\/\s*Preview:\s*(.+)/)

    if (templateMatch) name = templateMatch[1].trim()
    if (descMatch) description = descMatch[1].trim()
    if (previewMatch) preview = previewMatch[1].trim()
  }

  return { name, description, preview, file: path.basename(filePath) }
}

// Get available templates
function getAvailableTemplates() {
  if (!fs.existsSync(TEMPLATES_PATH)) {
    return []
  }

  const files = fs.readdirSync(TEMPLATES_PATH).filter(f => f.endsWith('.jsx'))
  return files.map(file => parseTemplateMetadata(path.join(TEMPLATES_PATH, file)))
}

// Display template selection menu
async function selectTemplate() {
  const templates = getAvailableTemplates()

  if (templates.length === 0) {
    logWarning('No templates found. Using default template.')
    return null
  }

  logSubHeader(`${icons.file} Available Blog Templates`)

  templates.forEach((template, index) => {
    log(`  ${colors.cyan}${index + 1}.${colors.reset} ${colors.bold}${template.name}${colors.reset}`)
    if (template.description) {
      log(`     ${colors.dim}${template.description}${colors.reset}`)
    }
    if (template.preview) {
      log(`     ${colors.blue}${icons.link}${colors.reset} ${colors.dim}Preview: ${template.preview}${colors.reset}`)
    }
    log()
  })

  const answer = await prompt(`  ${colors.yellow}?${colors.reset} Choose a template (1-${templates.length}): `)
  const choice = parseInt(answer, 10)

  if (choice >= 1 && choice <= templates.length) {
    return templates[choice - 1]
  }

  logWarning('Invalid choice. Using first template.')
  return templates[0]
}

// Ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// Convert filename to URL-safe slug
function toSlug(filename) {
  return filename
    .replace(/\.md$/, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '')
}

// Configure marked with the same options as docs
const renderer = new marked.Renderer()

renderer.link = function(options) {
  const { href, title, text } = options
  let processedText = text || ''

  processedText = processedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  processedText = processedText.replace(/__([^_]+)__/g, '<strong>$1</strong>')
  processedText = processedText.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  processedText = processedText.replace(/_([^_]+)_/g, '<em>$1</em>')
  processedText = processedText.replace(/`([^`]+)`/g, '<code>$1</code>')

  if (!href || typeof href !== 'string') {
    return `<a href="">${processedText}</a>`
  }

  if (href.startsWith('#') || href.startsWith('/blog/') || href.startsWith('/')) {
    return `<a href="${href}"${title ? ` title="${title}"` : ''}>${processedText}</a>`
  }

  return `<a href="${href}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${processedText}</a>`
}

marked.use({
  gfm: true,
  breaks: true,
  pedantic: false,
  renderer
})

marked.use(gfmHeadingId({
  prefix: 'heading-'
}))

// Process task lists HTML
function processTaskLists(html) {
  html = html.replace(/<input\s+(?:disabled=""\s+type="checkbox"|type="checkbox"\s+disabled="")\s*(checked="")?\s*>\s*/g, (match, checked) => {
    const icon = checked
      ? '<svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>'
      : '<svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>'
    return icon
  })

  html = html.replace(/<input\s+checked=""\s+(?:disabled=""\s+type="checkbox"|type="checkbox"\s+disabled="")\s*>\s*/g, () => {
    return '<svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>'
  })

  html = html.replace(/<ul>(\s*<li>.*?<svg class="w-4 h-4)/g, '<ul style="list-style: none;">$1')
  html = html.replace(/<ol>(\s*<li>.*?<svg class="w-4 h-4)/g, '<ol style="list-style: none;">$1')

  return html
}

// Parse custom markdown extensions for blog
function parseCustomMarkdown(markdown) {
  let processedMarkdown = markdown

  // Handle highlights
  processedMarkdown = processedMarkdown.replace(/==([^=]+)==/g, '<mark>$1</mark>')

  // Handle text colors
  processedMarkdown = processedMarkdown.replace(/<color:(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|[a-zA-Z]+)>([^<]+)<\/color>/g,
    '<span style="color:$1">$2</span>')

  // Handle [^n] notation to superscript
  processedMarkdown = processedMarkdown.replace(/\[\^([^\]]+)\]/g, '<sup>$1</sup>')

  // Convert images to have proper classes and absolute paths
  processedMarkdown = processedMarkdown.replace(/!\[([^\]]*)\](\([^)]+\))/g, (_, alt, src) => {
    const srcMatch = src.match(/\(([^)]+)\)/)
    if (srcMatch) {
      let imgSrc = srcMatch[1]

      // Convert relative blog paths to absolute paths
      if (imgSrc.startsWith('resources/') || imgSrc.startsWith('./resources/')) {
        imgSrc = `/blog/${imgSrc.replace(/^\.\//, '')}`
      } else if (imgSrc.startsWith('images/') || imgSrc.startsWith('./images/')) {
        imgSrc = `/blog/images/${imgSrc.replace(/^(\.\/)?images\//, '')}`
      } else if (!imgSrc.startsWith('/') && !imgSrc.startsWith('http')) {
        // Any other relative path, make it absolute under /blog/
        imgSrc = `/blog/${imgSrc}`
      }

      return `<img src="${imgSrc}" alt="${alt || ''}" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />`
    }
    return _
  })

  return processedMarkdown
}

// Validate frontmatter
function validateFrontmatter(frontmatter, filename) {
  const errors = []

  for (const field of REQUIRED_FRONTMATTER) {
    if (!frontmatter[field]) {
      errors.push(`Missing required field: ${field}`)
    }
  }

  if (frontmatter.publishDate && isNaN(Date.parse(frontmatter.publishDate))) {
    errors.push(`Invalid publishDate format: ${frontmatter.publishDate}`)
  }

  if (frontmatter.editDate && isNaN(Date.parse(frontmatter.editDate))) {
    errors.push(`Invalid editDate format: ${frontmatter.editDate}`)
  }

  if (errors.length > 0) {
    logErrorBox(`Validation Failed: ${filename}`, errors)
    return false
  }

  return true
}

// Helper function to escape strings for JavaScript
function escapeForJS(str) {
  if (!str) return ''
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}

// Generate blog layout file
function generateBlogLayout() {
  const existingLayout = fs.readdirSync(BLOG_OUTPUT_PATH).find(f => f.startsWith('layout.'))
  if (existingLayout) {
    logInfo(`Skipping layout: ${colors.dim}existing ${appFolder}/blog/${existingLayout}${colors.reset}`)
    return
  }

  const layoutPath = path.join(BLOG_OUTPUT_PATH, 'layout.jsx')

  const layoutContent = `import '@/hillnoteDoc/styles/markdown.css'

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
`

  fs.writeFileSync(layoutPath, layoutContent)
  logFile('Created', `${appFolder}/blog/layout.jsx`)
}

// Generate blog index page from template
function generateBlogIndexPage(template) {
  const existingPage = fs.readdirSync(BLOG_OUTPUT_PATH).find(f => f.startsWith('page.'))
  if (existingPage) {
    logInfo(`Skipping index: ${colors.dim}existing ${appFolder}/blog/${existingPage}${colors.reset}`)
    return
  }

  const pagePath = path.join(BLOG_OUTPUT_PATH, 'page.jsx')

  if (template && template.file) {
    // Copy from template file
    const templatePath = path.join(TEMPLATES_PATH, template.file)
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, pagePath)
      logFile('Created', `${appFolder}/blog/page.jsx`)
      logBullet(`Using template: ${colors.cyan}${template.name}${colors.reset}`)
      return
    }
  }

  // Fallback: use first available template or error
  const templates = getAvailableTemplates()
  if (templates.length > 0) {
    const fallbackPath = path.join(TEMPLATES_PATH, templates[0].file)
    fs.copyFileSync(fallbackPath, pagePath)
    logFile('Created', `${appFolder}/blog/page.jsx`)
    logBullet(`Using template: ${colors.cyan}${templates[0].name}${colors.reset}`)
  } else {
    logError('No blog templates found in resources/blog-templates/')
  }
}

// Generate a single blog post page
function generateBlogPostPage(filePath, filename) {
  const content = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content: markdownContent } = parseBlogContent(content)

  // Validate frontmatter
  if (!validateFrontmatter(frontmatter, filename)) {
    return null
  }

  const slug = toSlug(filename)
  const title = frontmatter.title
  const description = frontmatter.description || frontmatter.excerpt || ''
  const author = frontmatter.author
  const publishDate = frontmatter.publishDate
  const editDate = frontmatter.editDate
  const tags = frontmatter.tags || []

  // Resolve cover image path - convert relative paths to /blog/resources/images/
  let coverImage = frontmatter.coverImage
  if (coverImage && !coverImage.startsWith('http') && !coverImage.startsWith('/')) {
    // Simple filename or relative path like "hello.png" or "cover/hello.png"
    coverImage = `/blog/resources/images/${coverImage}`
  }

  // Extract extra/custom fields (anything not in the known fields)
  const knownFields = ['title', 'description', 'excerpt', 'author', 'publishDate', 'editDate', 'coverImage', 'tags']
  const extraFields = {}
  for (const [key, value] of Object.entries(frontmatter)) {
    if (!knownFields.includes(key) && value != null) {
      extraFields[key] = value
    }
  }

  // Parse markdown
  let processedMarkdown = parseCustomMarkdown(markdownContent)
  let htmlContent = marked.parse(processedMarkdown)
  htmlContent = processTaskLists(htmlContent)

  // Create output directory
  const outputDir = path.join(BLOG_OUTPUT_PATH, slug)
  ensureDir(outputDir)

  // Escape content for JS
  const escapedContent = htmlContent
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.seo.publisher || siteConfig.siteName,
    },
    datePublished: publishDate,
    dateModified: editDate || publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/blog/${slug}`
    }
  }

  if (coverImage) {
    structuredData.image = coverImage
  }

  // Add extra fields to structured data if they exist
  if (Object.keys(extraFields).length > 0) {
    Object.assign(structuredData, extraFields)
  }

  // Generate extra metadata fields
  const extraMetaStr = Object.keys(extraFields).length > 0
    ? `,\n  other: ${JSON.stringify(extraFields, null, 2)}`
    : ''

  const pageContent = `// Generated blog post page
import { BlogArticle } from '@/hillnoteDoc/components/blog'

export const metadata = {
  title: '${escapeForJS(title)} | ${escapeForJS(siteConfig.siteName)} Blog',
  description: '${escapeForJS(description)}',
  authors: [{ name: '${escapeForJS(author)}' }],
  openGraph: {
    title: '${escapeForJS(title)}',
    description: '${escapeForJS(description)}',
    type: 'article',
    siteName: '${escapeForJS(siteConfig.siteName)}',
    locale: 'en_US',
    url: '/blog/${slug}',
    ${coverImage ? `images: ['${escapeForJS(coverImage)}'],` : ''}
  },
  twitter: {
    card: 'summary_large_image',
    title: '${escapeForJS(title)}',
    description: '${escapeForJS(description)}',
    ${coverImage ? `images: ['${escapeForJS(coverImage)}'],` : ''}
  },
  alternates: {
    canonical: '/blog/${slug}'
  }${extraMetaStr}
}

const postData = {
  slug: '${slug}',
  title: '${escapeForJS(title)}',
  author: '${escapeForJS(author)}',
  publishDate: '${publishDate}',
  editDate: ${editDate ? `'${editDate}'` : 'null'},
  coverImage: ${coverImage ? `'${escapeForJS(coverImage)}'` : 'null'},
  tags: ${JSON.stringify(tags)},
  structuredData: ${JSON.stringify(structuredData, null, 2)},
  extra: ${JSON.stringify(extraFields)}
}

const content = \`${escapedContent}\`

export default function Page() {
  return (
    <BlogArticle
      {...postData}
      content={content}
    />
  )
}
`

  const pageFilePath = path.join(outputDir, 'page.jsx')
  fs.writeFileSync(pageFilePath, pageContent)

  return {
    slug,
    title,
    description,
    author,
    publishDate,
    editDate,
    coverImage,
    tags
  }
}

// Update sitemap with new blog posts
function updateSitemap(newPosts) {
  const baseUrl = siteConfig.siteUrl
  const currentDate = new Date().toISOString()

  let existingSitemap = ''
  let existingUrls = []

  // Read existing sitemap if it exists
  if (fs.existsSync(SITEMAP_PATH)) {
    existingSitemap = fs.readFileSync(SITEMAP_PATH, 'utf8')

    // Extract existing URLs
    const urlMatches = existingSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)
    for (const match of urlMatches) {
      existingUrls.push(match[1])
    }
  }

  // Generate new blog post URLs
  const newBlogUrls = newPosts.map(post => {
    const url = `${baseUrl}/blog/${post.slug}`
    return {
      url,
      lastmod: post.editDate || post.publishDate || currentDate,
      priority: 0.7
    }
  }).filter(item => !existingUrls.includes(item.url))

  if (newBlogUrls.length === 0) {
    logInfo('No new blog URLs to add to sitemap')
    return
  }

  // If sitemap exists, insert new URLs before closing tag
  if (existingSitemap) {
    const newUrlsXml = newBlogUrls.map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')

    // Insert before </urlset>
    const updatedSitemap = existingSitemap.replace(
      '</urlset>',
      `${newUrlsXml}\n</urlset>`
    )
    fs.writeFileSync(SITEMAP_PATH, updatedSitemap)
  } else {
    // Create new sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Main Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Blog Posts -->
${newBlogUrls.map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`
    fs.writeFileSync(SITEMAP_PATH, sitemap)
  }

  logSuccess(`Added ${colors.bold}${newBlogUrls.length}${colors.reset} new blog URLs to sitemap`)
}

// Generate blog registry JSON from all published posts
function generateBlogRegistry() {
  if (!fs.existsSync(BLOG_PUBLISHED_PATH)) {
    return
  }

  const files = fs.readdirSync(BLOG_PUBLISHED_PATH).filter(f => f.endsWith('.md'))

  const posts = files.map(filename => {
    const filePath = path.join(BLOG_PUBLISHED_PATH, filename)
    const content = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter } = parseBlogContent(content)
    const slug = toSlug(filename)

    // Resolve cover image path
    let coverImage = frontmatter.coverImage
    if (coverImage && !coverImage.startsWith('http') && !coverImage.startsWith('/')) {
      coverImage = `/blog/resources/images/${coverImage}`
    }

    return {
      slug,
      title: frontmatter.title || filename.replace(/\.md$/, ''),
      author: frontmatter.author,
      publishDate: frontmatter.publishDate,
      editDate: frontmatter.editDate || null,
      description: frontmatter.description || frontmatter.excerpt || '',
      coverImage: coverImage || null,
      tags: frontmatter.tags || [],
      path: `/blog/${slug}`
    }
  })

  // Sort by publish date (newest first)
  posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))

  const registry = {
    generatedAt: new Date().toISOString(),
    count: posts.length,
    posts
  }

  fs.writeFileSync(BLOG_REGISTRY_PATH, JSON.stringify(registry, null, 2))
  logSuccess(`Updated blog registry with ${colors.bold}${posts.length}${colors.reset} post(s)`)
}

// Move published post from draft to published folder
function moveToPublished(filename) {
  const sourcePath = path.join(BLOG_DRAFT_PATH, filename)
  const destPath = path.join(BLOG_PUBLISHED_PATH, filename)

  ensureDir(BLOG_PUBLISHED_PATH)
  fs.renameSync(sourcePath, destPath)
  logMoved(filename)
}

// Setup command - creates necessary folders and files
async function runSetup() {
  logHeader(`${icons.folder} Blog Setup`)

  logSubHeader(`${icons.folder} Creating Directory Structure`)

  // Create draft and published folders
  ensureDir(BLOG_DRAFT_PATH)
  logFile('Created', 'public/blog/draft')

  ensureDir(BLOG_PUBLISHED_PATH)
  logFile('Created', 'public/blog/published')

  // Create blog output folder
  ensureDir(BLOG_OUTPUT_PATH)
  logFile('Created', `${appFolder}/blog`)

  logSubHeader(`${icons.file} Generating Files`)

  // Generate layout
  generateBlogLayout()

  // Let user select a template for the index page
  const selectedTemplate = await selectTemplate()

  // Generate index page with selected template
  generateBlogIndexPage(selectedTemplate)

  // Create example draft post if draft folder is empty
  const draftFiles = fs.readdirSync(BLOG_DRAFT_PATH).filter(f => f.endsWith('.md'))
  if (draftFiles.length === 0) {
    const examplePost = `\`\`\`yaml
title: My First Blog Post

publishDate: ${new Date().toISOString().split('T')[0]}

author: Your Name

description: This is an example blog post to get you started.

tags: getting-started, example

coverImage:

editDate:
\`\`\`

# Welcome to Your Blog

This is an example blog post. Edit or replace this file with your own content.

## Getting Started

1. Edit the YAML frontmatter above with your post details
2. Write your content in Markdown
3. Run \`node generate-blog.mjs --publish\` to publish

## Required Fields

- **title**: The title of your blog post
- **publishDate**: The date to publish (YYYY-MM-DD format)
- **author**: The author's name

## Optional Fields

- **description**: A short description/excerpt
- **tags**: Comma-separated list of tags
- **coverImage**: URL to a cover image
- **editDate**: Last edit date (YYYY-MM-DD format)

Happy blogging!
`
    fs.writeFileSync(path.join(BLOG_DRAFT_PATH, 'my-first-post.md'), examplePost)
    logFile('Created', 'public/blog/draft/my-first-post.md')
    logBullet('Example draft post created for you to edit')
  }

  logSummaryBox('Setup Complete!', [
    `${icons.success} Blog directories created`,
    `${icons.success} Layout and index page generated`,
    '',
    `${icons.arrow} Next steps:`,
    '  1. Add markdown files to public/blog/draft/',
    '  2. Run: node generate-blog.mjs --publish',
  ])
}

// Publish command - processes drafts and moves to published
function runPublish() {
  logHeader(`${icons.rocket} Publishing Blog Posts`)

  if (!fs.existsSync(BLOG_DRAFT_PATH)) {
    logErrorBox('Setup Required', ['Draft folder not found', 'Run --setup first to initialize'])
    process.exit(1)
  }

  ensureDir(BLOG_OUTPUT_PATH)
  ensureDir(BLOG_PUBLISHED_PATH)

  const draftFiles = fs.readdirSync(BLOG_DRAFT_PATH).filter(f => f.endsWith('.md'))

  if (draftFiles.length === 0) {
    logWarning('No draft posts found in public/blog/draft/')
    log()
    logInfo('Add markdown files to public/blog/draft/ and run again')
    return
  }

  logInfo(`Found ${colors.bold}${draftFiles.length}${colors.reset} draft(s) to process`)
  log()
  logDivider()

  const publishedPosts = []
  const skippedPosts = []

  for (let i = 0; i < draftFiles.length; i++) {
    const filename = draftFiles[i]
    const filePath = path.join(BLOG_DRAFT_PATH, filename)

    log()
    logProcessing(filename)

    const post = generateBlogPostPage(filePath, filename)

    if (post) {
      publishedPosts.push(post)
      moveToPublished(filename)
      logPublished(post.slug)

      if (post.tags && post.tags.length > 0) {
        logBullet(`${icons.tag} Tags: ${colors.dim}${post.tags.join(', ')}${colors.reset}`)
      }
    } else {
      skippedPosts.push(filename)
      logSkipped(filename, 'validation failed')
    }

    logProgress(i + 1, draftFiles.length, 'posts')
  }

  log()
  logDivider()

  if (publishedPosts.length > 0) {
    // Update sitemap
    log()
    logSubHeader(`${icons.link} Updating Sitemap & Registry`)
    updateSitemap(publishedPosts)
    generateBlogRegistry()

    logSummaryBox('Publishing Complete!', [
      `${icons.success} ${publishedPosts.length} post(s) published successfully`,
      ...(skippedPosts.length > 0 ? [`${icons.warning} ${skippedPosts.length} post(s) skipped`] : []),
      '',
      ...publishedPosts.map(p => `${icons.arrow} /blog/${p.slug}`),
    ])
  } else {
    logErrorBox('No Posts Published', [
      'All posts failed validation',
      'Check the errors above and fix your markdown files',
    ])
  }
}

// Update command - regenerates all published blog post pages
function runUpdate() {
  logHeader(`${icons.sparkles} Updating Blog Posts`)

  if (!fs.existsSync(BLOG_PUBLISHED_PATH)) {
    logErrorBox('Setup Required', ['Published folder not found', 'Run --setup first to initialize'])
    process.exit(1)
  }

  ensureDir(BLOG_OUTPUT_PATH)

  const publishedFiles = fs.readdirSync(BLOG_PUBLISHED_PATH).filter(f => f.endsWith('.md'))

  if (publishedFiles.length === 0) {
    logWarning('No published posts found in public/blog/published/')
    return
  }

  logInfo(`Found ${colors.bold}${publishedFiles.length}${colors.reset} post(s) to update`)
  log()
  logDivider()

  let updatedCount = 0
  const skippedPosts = []

  for (let i = 0; i < publishedFiles.length; i++) {
    const filename = publishedFiles[i]
    const filePath = path.join(BLOG_PUBLISHED_PATH, filename)

    log()
    logProcessing(filename)

    const post = generateBlogPostPage(filePath, filename)

    if (post) {
      updatedCount++
      logSuccess(`Updated ${colors.cyan}/blog/${post.slug}${colors.reset}`)
    } else {
      skippedPosts.push(filename)
      logSkipped(filename, 'validation failed')
    }

    logProgress(i + 1, publishedFiles.length, 'posts')
  }

  log()
  logDivider()

  if (updatedCount > 0) {
    // Update blog registry
    log()
    logSubHeader(`${icons.link} Updating Registry`)
    generateBlogRegistry()

    logSummaryBox('Update Complete!', [
      `${icons.success} ${updatedCount} post(s) updated successfully`,
      ...(skippedPosts.length > 0 ? [`${icons.warning} ${skippedPosts.length} post(s) skipped`] : []),
      '',
      `${icons.info} Remember to check public/sitemap.xml if URLs changed`,
    ])
  } else {
    logErrorBox('No Posts Updated', [
      'All posts failed validation',
      'Check the errors above and fix your markdown files',
    ])
  }
}

// Parse command-line arguments
const args = process.argv.slice(2)
const options = {
  setup: args.includes('--setup'),
  publish: args.includes('--publish'),
  update: args.includes('--update'),
  help: args.includes('--help') || args.includes('-h')
}

// Show help if requested
if (options.help) {
  logHeader(`${icons.blog} Blog Generator Help`)

  log(`  ${colors.bold}Usage:${colors.reset} node generate-blog.mjs [options]`)
  log()

  logSubHeader('Commands')
  log(`  ${colors.cyan}--setup${colors.reset}     Create blog folders and generate layout/index page`)
  log(`  ${colors.cyan}--publish${colors.reset}   Publish all drafts from public/blog/draft`)
  log(`              and move them to public/blog/published`)
  log(`  ${colors.cyan}--update${colors.reset}    Regenerate all blog post pages from published/`)
  log(`              ${colors.dim}(useful after updating blog components)${colors.reset}`)
  log(`  ${colors.cyan}-h, --help${colors.reset}  Show this help message`)
  log()

  logSubHeader('Blog Post Frontmatter (YAML)')
  log(`  ${colors.green}Required:${colors.reset}`)
  log(`    ${colors.yellow}title${colors.reset}        ${colors.dim}Post title${colors.reset}`)
  log(`    ${colors.yellow}publishDate${colors.reset}  ${colors.dim}Publication date (YYYY-MM-DD)${colors.reset}`)
  log(`    ${colors.yellow}author${colors.reset}       ${colors.dim}Author name${colors.reset}`)
  log()
  log(`  ${colors.blue}Optional:${colors.reset}`)
  log(`    ${colors.yellow}description${colors.reset}  ${colors.dim}Short description/excerpt${colors.reset}`)
  log(`    ${colors.yellow}editDate${colors.reset}     ${colors.dim}Last edit date (YYYY-MM-DD)${colors.reset}`)
  log(`    ${colors.yellow}coverImage${colors.reset}   ${colors.dim}Cover image URL${colors.reset}`)
  log(`    ${colors.yellow}tags${colors.reset}         ${colors.dim}Array of tags${colors.reset}`)
  log()

  logSubHeader('Examples')
  log(`  ${colors.dim}$${colors.reset} node generate-blog.mjs ${colors.cyan}--setup${colors.reset}`)
  log(`    ${colors.dim}Initial setup - creates folders and files${colors.reset}`)
  log()
  log(`  ${colors.dim}$${colors.reset} node generate-blog.mjs ${colors.cyan}--publish${colors.reset}`)
  log(`    ${colors.dim}Publish all drafts${colors.reset}`)
  log()
  log(`  ${colors.dim}$${colors.reset} node generate-blog.mjs ${colors.cyan}--update${colors.reset}`)
  log(`    ${colors.dim}Regenerate all published posts${colors.reset}`)
  log()
  log(`  ${colors.dim}$${colors.reset} node generate-blog.mjs ${colors.cyan}--setup --publish${colors.reset}`)
  log(`    ${colors.dim}Setup and publish in one go${colors.reset}`)
  log()

  process.exit(0)
}

// Main execution
async function main() {
  if (!options.setup && !options.publish && !options.update) {
    logHeader(`${icons.blog} Blog Generator`)
    logWarning('No action specified')
    log()
    log(`  ${colors.dim}Available commands:${colors.reset}`)
    log(`    ${colors.cyan}--setup${colors.reset}     Initialize blog structure`)
    log(`    ${colors.cyan}--publish${colors.reset}   Publish draft posts`)
    log(`    ${colors.cyan}--update${colors.reset}    Regenerate published posts`)
    log(`    ${colors.cyan}--help${colors.reset}      Show full help`)
    log()
    process.exit(0)
  }

  if (options.setup) {
    await runSetup()
  }

  if (options.publish) {
    runPublish()
  }

  if (options.update) {
    runUpdate()
  }
}

main().catch(err => {
  log()
  logErrorBox('Unexpected Error', [err.message || String(err)])
  process.exit(1)
})
