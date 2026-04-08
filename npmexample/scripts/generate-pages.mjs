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

// Load site config by reading as text (avoids MODULE_TYPELESS_PACKAGE_JSON warning)
let configPath = path.join(projectRoot, 'hillnoteDoc', 'config', 'site.config.js')
if (!fs.existsSync(configPath)) {
  configPath = path.join(projectRoot, 'src', 'hillnoteDoc', 'config', 'site.config.js')
}
const siteConfig = new Function(
  fs.readFileSync(configPath, 'utf8').replace(/export\s+const\s+/, 'const ') + '\nreturn siteConfig;'
)()

// Determine app folder location (src/app or app)
const appFolder = fs.existsSync(path.join(projectRoot, 'src', 'app')) ? path.join('src', 'app') : 'app'

// Use paths from config
const workspacePath = siteConfig.workspace.path.replace(/^\//,'') // Remove leading slash if present
const HILLNOTE_PATH = path.join(projectRoot, 'public', workspacePath, siteConfig.workspace.documentsFolder)
const OUTPUT_PATH = path.join(projectRoot, appFolder, siteConfig.routing.docBase)
const REGISTRY_PATH = path.join(projectRoot, 'public', workspacePath, siteConfig.workspace.registryFile)

// Load document registry for metadata
let documentRegistry = { documents: [], folders: [] }
try {
  if (fs.existsSync(REGISTRY_PATH)) {
    const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf8')
    documentRegistry = JSON.parse(registryContent)
  }
} catch (err) {
  console.warn('Warning: Could not load documents-registry.json, using fallback metadata')
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
    .trim() // Remove leading/trailing spaces first
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
}

// Configure marked with the same options as markdown-renderer.jsx
const renderer = new marked.Renderer()

renderer.link = function(options) {
  const { href, title, text } = options

  // Simple inline markdown processing without recursion
  let processedText = text || ''

  // Handle basic markdown formatting manually to avoid recursion
  processedText = processedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  processedText = processedText.replace(/__([^_]+)__/g, '<strong>$1</strong>')
  processedText = processedText.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  processedText = processedText.replace(/_([^_]+)_/g, '<em>$1</em>')
  processedText = processedText.replace(/`([^`]+)`/g, '<code>$1</code>')

  if (!href || typeof href !== 'string') {
    return `<a href="">${processedText}</a>`
  }

  // Internal links - same tab (includes /doc/ links and # anchors)
  if (href.startsWith('#') || href.startsWith('doc:') || href.startsWith('/doc/') || href.startsWith('/')) {
    return `<a href="${href}"${title ? ` title="${title}"` : ''}>${processedText}</a>`
  }

  // External links - new tab
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

// Process task lists HTML (from markdown-renderer.jsx)
function processTaskLists(html) {
  // Replace checkbox inputs with Lucide square icons
  // Handle both attribute orders: disabled="" type="checkbox" AND type="checkbox" disabled=""
  html = html.replace(/<input\s+(?:disabled=""\s+type="checkbox"|type="checkbox"\s+disabled="")\s*(checked="")?\s*>\s*/g, (match, checked) => {
    // Use Lucide square icons as inline bullet points
    // square-check-big icon for checked (filled square with checkmark), square icon for unchecked
    const icon = checked
      ? '<svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>'
      : '<svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>'

    return icon
  })

  // Also handle the reverse order with checked attribute first
  html = html.replace(/<input\s+checked=""\s+(?:disabled=""\s+type="checkbox"|type="checkbox"\s+disabled="")\s*>\s*/g, () => {
    // This is always a checked checkbox
    return '<svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>'
  })

  // Add style to hide bullet points on lists that contain checkboxes
  html = html.replace(/<ul>(\s*<li>.*?<svg class="w-4 h-4)/g, '<ul style="list-style: none;">$1')
  html = html.replace(/<ol>(\s*<li>.*?<svg class="w-4 h-4)/g, '<ol style="list-style: none;">$1')

  return html
}

// Parse custom markdown extensions
function parseCustomMarkdown(markdown, relativePath) {
  let processedMarkdown = markdown

  // Handle scratchspaces - convert :::scratchspace to HTML
  processedMarkdown = processedMarkdown.replace(/:::scratchspace\s*"([^"]*)"\s*\n([\s\S]*?):::/g, (match, title, content) => {
    // Remove the AI note if present
    let cleanContent = content.replace(/^>\s*\*\*Note for AI:\*\*[^\n]*\n\n?/m, '').trim()

    // Pre-process color tags to prevent them being treated as links
    // Replace <color:#hex>text</color> with a temporary placeholder
    cleanContent = cleanContent.replace(/<color:(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|[a-zA-Z]+)>([^<]+)<\/color>/g,
      '§§COLOR:$1§§$2§§ENDCOLOR§§')

    // Convert markdown content to HTML
    let htmlContent = marked.parse(cleanContent)

    // Convert the color placeholders back to proper HTML spans
    htmlContent = htmlContent.replace(/§§COLOR:(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|[a-zA-Z]+)§§([^§]+)§§ENDCOLOR§§/g,
      '<span style="color:$1">$2</span>')

    // Fix any color tags that got parsed as links (fallback for edge cases)
    htmlContent = htmlContent.replace(/<a href="color:(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|[a-zA-Z]+)"[^>]*>color:[^<]+<\/a>([^<]*)<\/color>/g,
      '<span style="color:$1">$2</span>')

    // Clean up any escaped HTML entities and stray div tags in code blocks
    htmlContent = htmlContent
      .replace(/&lt;\/div&gt;/g, '') // Remove any escaped </div> tags
      .replace(/&lt;div&gt;/g, '')   // Remove any escaped <div> tags
      .replace(/<pre><code>&lt;\/div&gt;\n<\/code><\/pre>/g, '')  // Remove div in code blocks with newline
      .replace(/<pre><code>&lt;\/div&gt;<\/code><\/pre>/g, '')     // Remove div in code blocks without newline
      .replace(/\n\n<pre><code>&lt;\/div&gt;\n<\/code><\/pre>/g, '') // Remove with extra newlines
      .replace(/<\/color>/g, '') // Remove any leftover </color> tags
      .trim() // Clean up any trailing whitespace

    // Return a simple accordion using details/summary
    return `<div class="scratch-space rounded-md border border-dashed border-border bg-muted/10">
  <details class="group">
    <summary class="flex items-center justify-between p-2 cursor-pointer hover:bg-muted/20 transition-colors">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 transition-transform group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span class="text-sm text-muted-foreground">${title || 'Note'}</span>
      </div>
    </summary>
    <div class="px-4 pb-4 prose prose-sm dark:prose-invert max-w-none">
      ${htmlContent}
    </div>
  </details>
</div>`
  })

  // Handle HTML resource tiles - [html:title](path)
  processedMarkdown = processedMarkdown.replace(/\[html:([^\]]+)\]\(([^)]+)\)/g, (match, title, path) => {
    const fullPath = path.startsWith('resources/') ? `${siteConfig.workspace.path}${path}` : path
    return `<div class="resource-html-container w-full my-3">
  <a href="${fullPath}" target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors">
    <div class="flex items-center gap-3 flex-1">
      <span class="text-blue-500 text-lg">🌐</span>
      <span class="font-medium text-foreground text-sm">${title}</span>
    </div>
    <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  </a>
</div>`
  })

  // Handle PDF resource tiles - [pdf:title](path)
  processedMarkdown = processedMarkdown.replace(/\[pdf:([^\]]+)\]\(([^)]+)\)/g, (match, title, path) => {
    const fullPath = path.startsWith('resources/') ? `${siteConfig.workspace.path}${path}` : path
    return `<div class="resource-pdf-container w-full my-3">
  <a href="${fullPath}" target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors">
    <div class="flex items-center gap-3 flex-1">
      <span class="text-red-500 text-lg">📋</span>
      <span class="font-medium text-foreground text-sm">${title}</span>
    </div>
    <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  </a>
</div>`
  })

  // Handle YouTube embeds - [youtube:title](videoId)
  processedMarkdown = processedMarkdown.replace(/\[youtube:([^\]]+)\]\(([^)]+)\)/g, (match, title, videoId) => {
    return `<div class="resource-youtube-container w-full my-6">
  <div class="aspect-video w-full">
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/${videoId}"
      title="${title || 'YouTube Video'}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      class="w-full h-full rounded-lg"
    ></iframe>
  </div>
</div>`
  })

  // Handle resource files - [resource::path/to/file]
  processedMarkdown = processedMarkdown.replace(/\[resource::([^\]]+)\]/g, (match, path) => {
    const fileName = path.split('/').pop()
    const fullPath = path.startsWith('resources/') ? `${siteConfig.workspace.path}${path}` : path
    return `<div class="resource-file-container w-full my-3">
  <a href="${fullPath}" target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors">
    <div class="flex items-center gap-3 flex-1">
      <span class="text-lg">📎</span>
      <span class="font-medium text-foreground text-sm">${fileName}</span>
    </div>
    <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  </a>
</div>`
  })

  // Handle highlights - convert ==text== to <mark>text</mark>
  processedMarkdown = processedMarkdown.replace(/==([^=]+)==/g, '<mark>$1</mark>')

  // Handle text colors
  processedMarkdown = processedMarkdown.replace(/<color:(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|[a-zA-Z]+)>([^<]+)<\/color>/g,
    '<span style="color:$1">$2</span>')

  // Handle [^n] notation to superscript
  processedMarkdown = processedMarkdown.replace(/\[\^([^\]]+)\]/g, '<sup>$1</sup>')

  // Handle document links - convert [[title|doc:path]] to HTML
  processedMarkdown = processedMarkdown.replace(/\[\[([^\|]+)\|doc:([^\]]+)\]\]/g, (_match, title, href) => {
    let docPath = href
    if (!docPath.endsWith('.md')) {
      docPath = `${docPath}.md`
    }
    if (!docPath.startsWith('documents/')) {
      docPath = `documents/${docPath}`
    }
    const staticUrl = docPathToStaticUrl(docPath)
    return `<a href="${staticUrl}" class="document-link text-primary underline hover:no-underline">${title}</a>`
  })

  // Handle simple document links [[Document Name]]
  processedMarkdown = processedMarkdown.replace(/\[\[([^\]]+)\]\]/g, (match, docName) => {
    if (!match.includes('|doc:')) {
      let docPath = `documents/${docName}`
      if (!docPath.endsWith('.md')) {
        docPath = `${docPath}.md`
      }
      const staticUrl = docPathToStaticUrl(docPath)
      return `<a href="${staticUrl}" class="document-link text-primary underline hover:no-underline">${docName}</a>`
    }
    return match
  })

  // Convert images to have proper classes
  processedMarkdown = processedMarkdown.replace(/!\[([^\]]*)\](\([^)]+\))/g, (_, alt, src) => {
    const srcMatch = src.match(/\(([^)]+)\)/)
    if (srcMatch) {
      const imgSrc = srcMatch[1]
      if (imgSrc.startsWith('resources/')) {
        // Use the workspace path from siteConfig
        const fullPath = `${siteConfig.workspace.path}${imgSrc}`
        return `<img src="${fullPath}" alt="${alt || ''}" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />`
      }
      return `<img src="${imgSrc}" alt="${alt || ''}" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />`
    }
    return _
  })

  return processedMarkdown
}

// Clean up old generated pages (except [...path] folder, page.* and layout.* files)
function cleanOldPages(dir) {
  if (!fs.existsSync(dir)) return

  const items = fs.readdirSync(dir)
  for (const item of items) {
    const itemPath = path.join(dir, item)
    const stat = fs.statSync(itemPath)

    // Skip the dynamic route folder, root page.* and layout.* files (always preserved)
    if (item === '[...path]' || item.startsWith('page.') || item.startsWith('layout.')) continue

    if (stat.isDirectory()) {
      fs.rmSync(itemPath, { recursive: true })
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      fs.unlinkSync(itemPath)
    }
  }
}

// Generate the shared layout file for all doc pages
function generateLayout() {
  // Check if any layout.* file exists (preserve user's custom layout)
  const existingLayout = fs.readdirSync(OUTPUT_PATH).find(f => f.startsWith('layout.'))
  if (existingLayout) {
    console.log(`  ⏭ Skipping layout generation: existing /${appFolder}/${siteConfig.routing.docBase}/${existingLayout}`)
    return
  }

  const layoutPath = path.join(OUTPUT_PATH, 'layout.jsx')

  const layoutContent = `"use client"

import { NavigationSidebar } from '@/hillnoteDoc/components/navigation-sidebar'
import { TableOfContents } from '@/hillnoteDoc/components/table-of-contents'
import { ThemeToggle } from '@/hillnoteDoc/components/theme-toggle'
import { siteConfig } from '@/hillnoteDoc/config/site.config'
import '@/hillnoteDoc/styles/markdown.css'
import { Menu, List, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export default function DocLayout({ children }) {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  const showTitleBar = true
  const showNavigation = true
  const showTableOfContents = true
  const showSiteName = true
  const showThemeToggle = true
  const enableThemeToggle = true

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      {showTitleBar && (
        <>
          <header className="h-16 bg-background flex items-center justify-between px-4 md:px-8 pt-8 pb-4">
            {showSiteName && (
              <span className="font-semibold text-lg">{siteConfig.siteName}</span>
            )}
            {showThemeToggle && enableThemeToggle && (
              <ThemeToggle />
            )}
          </header>

          {/* Mobile Toolbar */}
          <div className="md:hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center h-12 px-2">
              {showNavigation && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setMobileNavOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}

              <div className="flex-1 flex items-center px-2 text-sm text-muted-foreground overflow-hidden">
                <span className="truncate">
                  <span>Documents</span>
                  <ChevronRight className="h-3 w-3 inline mx-1" />
                  <span className="text-foreground">
                    {pathname.split('/').pop()}
                  </span>
                </span>
              </div>

              {showTableOfContents && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 lg:hidden"
                  onClick={() => setMobileTocOpen(true)}
                >
                  <List className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex max-w-8xl mx-auto">

          {/* Left Sidebar - Navigation (Desktop Only) */}
          {showNavigation && (
            <aside className="hidden md:block w-64 border-r border-border border-dashed overflow-y-auto flex-shrink-0">
              <NavigationSidebar
                showTitle={true}
                title="All Pages"
                selectedFile={pathname}
              />
            </aside>
          )}

          {/* Center - Main Content */}
          <main className="flex-1 bg-background overflow-y-auto">
            {children}
          </main>

          {/* Right Sidebar - Table of Contents (Large Desktop Only) */}
          {showTableOfContents && (
            <aside className="hidden lg:block w-64 overflow-y-auto flex-shrink-0">
              <TableOfContents
                showTitle={true}
                title="On This Page"
              />
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      {showNavigation && (
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent side="left" className="w-80 p-0 flex flex-col h-full">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle>All Pages</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <NavigationSidebar
                  showTitle={false}
                  selectedFile={pathname}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Table of Contents Sheet (Tablet and Mobile) */}
      {showTableOfContents && (
        <Sheet open={mobileTocOpen} onOpenChange={setMobileTocOpen}>
          <SheetContent side="right" className="w-80 p-0 flex flex-col h-full">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle>On This Page</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <TableOfContents
                  showTitle={false}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
`

  // Write the layout file
  fs.writeFileSync(layoutPath, layoutContent)
  console.log(`  ✓ Generated shared layout: /${appFolder}/${siteConfig.routing.docBase}/layout.jsx`)
}

// Helper function to convert document path to static URL
function docPathToStaticUrl(docPath) {
  const cleanPath = docPath
    .replace(/^documents\//, '')
    .replace(/\.md$/, '')

  const parts = cleanPath.split('/')
  const slugParts = parts.map(part => toSlug(part))

  return `/${siteConfig.routing.docBase}/${slugParts.join('/')}`
}

// Extract comments from HTML content
function extractComments(htmlContent) {
  const comments = []
  const commentRegex = /<!-- COMMENT\s+({[^}]+})\s+-->\s*([^<]+(?:<[^>]+>[^<]*<\/[^>]+>)*[^<]*)/g
  let match

  while ((match = commentRegex.exec(htmlContent)) !== null) {
    try {
      const metadata = JSON.parse(match[1])
      const content = match[2].trim()
      comments.push({ ...metadata, content })
    } catch (e) {
      // Skip malformed comments
    }
  }

  return comments
}

// Generate comments section HTML
function generateCommentsSection(comments) {
  if (!comments || comments.length === 0) return ''

  const commentsHtml = comments.map(comment => {
    const date = new Date(comment.timestamp).toLocaleDateString()
    return `
    <div class="border-l-2 border-muted-foreground/20 pl-4 mb-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="font-medium text-sm">${comment.name}</span>
        <span class="text-xs text-muted-foreground">${date}</span>
      </div>
      <div class="text-sm text-foreground/80">${comment.content}</div>
    </div>`
  }).join('')

  const title = siteConfig.ui.authorsNotes?.title || "Author's Notes"
  return `
  <div class="mt-12 border-t pt-8">
    <h2 class="text-xl font-semibold mb-4">${title}</h2>
    ${commentsHtml}
  </div>`
}


// Process markdown file and generate JSX page
function generateStaticPage(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content: markdownContent } = matter(content)

  const filename = path.basename(filePath, '.md')

  // Find metadata from registry
  const documentPath = `documents/${relativePath.replace(/\\/g, '/')}`
  const registryDoc = documentRegistry.documents?.find(doc => doc.path === documentPath)

  // Use registry metadata if available, fallback to frontmatter or filename
  const title = registryDoc?.name || frontmatter.title || filename
  const emoji = registryDoc?.emoji || frontmatter.emoji || ''

  // Parse custom markdown and convert to HTML
  let processedMarkdown = parseCustomMarkdown(markdownContent, relativePath)

  // Convert markdown to HTML using marked
  let htmlContent = marked.parse(processedMarkdown)

  // Post-process HTML for task lists
  htmlContent = processTaskLists(htmlContent)

  // Extract comments if enabled
  let comments = []
  if (siteConfig.ui.authorsNotes?.enabled !== false) {
    comments = extractComments(htmlContent)
    // Remove comments from main content
    htmlContent = htmlContent.replace(/<!-- COMMENTS_SECTION_START -->.*<!-- COMMENTS_SECTION_END -->/s, '')
  }

  // Create slug path
  const pathParts = relativePath.split(path.sep)
  const slugParts = pathParts.map(part => toSlug(part.replace('.md', '')))

  // Create directory structure for the page
  let outputDir = OUTPUT_PATH
  for (let i = 0; i < slugParts.length - 1; i++) {
    outputDir = path.join(outputDir, slugParts[i])
    ensureDir(outputDir)
  }

  // For the last part (filename), create a directory
  outputDir = path.join(outputDir, slugParts[slugParts.length - 1])
  ensureDir(outputDir)

  // Helper function to escape strings for JavaScript string literals
  const escapeForJS = (str) => {
    if (!str) return ''
    return str
      .replace(/\\/g, '\\\\')  // Escape backslashes first
      .replace(/'/g, "\\'")     // Escape single quotes
      .replace(/"/g, '\\"')     // Escape double quotes
      .replace(/\n/g, '\\n')    // Escape newlines
      .replace(/\r/g, '\\r')    // Escape carriage returns
      .replace(/\t/g, '\\t')    // Escape tabs
  }

  // Generate additional sections
  const commentsHTML = siteConfig.ui.authorsNotes?.enabled !== false ? generateCommentsSection(comments) : ''

  // Escape the HTML content for embedding in JavaScript template literals
  const escapedContent = htmlContent
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')

  // Escape additional sections
  const escapedComments = commentsHTML
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')

  // Use registry description if available, otherwise extract from content
  let description = registryDoc?.description || frontmatter.description || ''

  if (!description) {
    // Extract first paragraph for description if not provided from HTML
    const firstParagraph = htmlContent
      .replace(/<[^>]*>/g, '') // Strip HTML tags
      .split('\n\n')
      .find(p => p.trim())
      ?.trim()
      .substring(0, 160) || ''
    description = firstParagraph
  }

  // Extract headings for structured data from HTML
  const headings = []
  const headingRegex = /<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/gi
  let match
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      text: match[2].replace(/<[^>]*>/g, '').trim()
    })
  }

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: siteConfig.siteName
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.seo.publisher || siteConfig.siteName,
    },
    datePublished: registryDoc?.lastModified || frontmatter.date || new Date().toISOString(),
    dateModified: registryDoc?.lastModified || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/${siteConfig.routing.docBase}/${slugParts.join('/')}`
    }
  }

  // Add keywords from references if available
  const keywords = []
  if (registryDoc?.containsReferencesTo?.length > 0) {
    keywords.push('references', 'links', 'documentation')
  }
  if (registryDoc?.referencedIn?.length > 0) {
    keywords.push('referenced', 'related')
  }
  if (emoji) {
    keywords.push('illustrated')
  }
  const keywordString = keywords.length > 0
    ? `${frontmatter.keywords || siteConfig.seo.keywords}, ${keywords.join(', ')}`
    : (frontmatter.keywords || siteConfig.seo.keywords)

  // Generate page with metadata

  const pageContent = `// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: '${escapeForJS(title)} | Hillnote Documentation',
  description: '${escapeForJS(description)}',
  keywords: '${escapeForJS(keywordString)}',
  authors: [{ name: '${escapeForJS(siteConfig.seo.author)}' }],
  openGraph: {
    title: '${escapeForJS(title)}',
    description: '${escapeForJS(description)}',
    type: 'article',
    siteName: '${escapeForJS(siteConfig.siteName)}',
    locale: 'en_US',
    url: '/${siteConfig.routing.docBase}/${slugParts.join('/')}',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${escapeForJS(title)}',
    description: '${escapeForJS(description)}',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/${siteConfig.routing.docBase}/${slugParts.join('/')}'
  }
}

// Document information
const documentPath = 'documents/${relativePath.replace(/\\/g, '/')}'
const documentTitle = '${escapeForJS(title)}'

// Structured data for SEO
const structuredData = ${JSON.stringify(structuredData, null, 2)}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = \`${escapedContent}\`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="h-full overflow-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-4 pb-12">
          ${siteConfig.ui.showHeaders ? `{/* Document Title */}
          <div className="mb-8 px-4 sm:px-6 md:px-8 py-6 md:py-8 bg-muted rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers2-icon lucide-layers-2"><path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z"/><path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845"/></svg>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mt-2">
              {documentTitle}
            </h1>
            <div className="h-px bg-border mt-4"></div>
          </div>

          ` : ''}
          <div
            className="markdown-content px-4 sm:px-8 md:px-12${!siteConfig.ui.showHeaders ? ' pt-8' : ''}"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          ${escapedComments ? `
          <div className="px-4 sm:px-8 md:px-12" dangerouslySetInnerHTML={{ __html: \`${escapedComments}\` }} />` : ''}
        </div>
      </div>
    </>
  )
}
`

  // Write the JSX page (always overwrite - these are generated from markdown)
  const pageFilePath = path.join(outputDir, 'page.jsx')
  fs.writeFileSync(pageFilePath, pageContent)

  return {
    path: relativePath,
    slug: slugParts.join('/'),
    title,
    description,
    emoji,
    lastModified: registryDoc?.lastModified,
    position: registryDoc?.position
  }
}

// Process all markdown files recursively
function processDirectory(dirPath, baseDir = '') {
  const pages = []

  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`)
    return pages
  }

  const items = fs.readdirSync(dirPath)

  for (const item of items) {
    const itemPath = path.join(dirPath, item)
    const stat = fs.statSync(itemPath)
    const relativePath = baseDir ? path.join(baseDir, item) : item

    if (stat.isDirectory()) {
      pages.push(...processDirectory(itemPath, relativePath))
    } else if (item.endsWith('.md')) {
      const page = generateStaticPage(itemPath, relativePath)
      pages.push(page)
      console.log(`  ✓ Generated: /${siteConfig.routing.docBase}/${page.slug}`)
    }
  }

  return pages
}

// Generate LLMs.txt file according to https://llmstxt.org/
function generateLLMsTxt(pages) {
  const siteName = siteConfig.siteName || siteConfig.siteName
  const siteDescription = siteConfig.siteDescription || 'AI-powered note-taking and documentation system'
  const baseUrl = siteConfig.siteUrl

  // Sort pages by importance and hierarchy using config
  const sortedPages = [...pages].sort((a, b) => {
    // Check if pages are in customOrder from config
    const customOrder = siteConfig.workspace.customOrder || []

    // Convert paths to find index in customOrder
    const aPath = `documents/${a.path}`
    const bPath = `documents/${b.path}`

    const aIndex = customOrder.findIndex(path => path === aPath)
    const bIndex = customOrder.findIndex(path => path === bPath)

    // If both are in customOrder, sort by their order
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex
    }

    // If only one is in customOrder, it comes first
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1

    // Check for initial file from config
    const initialFile = siteConfig.workspace.initialFile
    if (initialFile) {
      const initialSlug = toSlug(initialFile.replace(/^documents\//, '').replace(/\.md$/, ''))
      if (a.slug === initialSlug) return -1
      if (b.slug === initialSlug) return 1
    }

    // Then sort by depth (top-level first) and alphabetically
    const depthA = a.slug.split('/').length
    const depthB = b.slug.split('/').length
    if (depthA !== depthB) return depthA - depthB

    return a.slug.localeCompare(b.slug)
  })

  // Group pages by category/folder
  const groupedPages = {}
  const topLevelPages = []

  sortedPages.forEach(page => {
    const parts = page.slug.split('/')
    if (parts.length === 1) {
      topLevelPages.push(page)
    } else {
      const category = parts[0]
      if (!groupedPages[category]) {
        groupedPages[category] = []
      }
      groupedPages[category].push(page)
    }
  })

  // Generate main llms.txt file
  let llmsTxt = `# ${siteName}

> ${siteDescription}

${siteConfig.seo.llmsIntro || siteDescription}

## Core Documentation

`

  // Add top-level pages first
  topLevelPages.forEach(page => {
    const url = `${baseUrl}/${siteConfig.routing.docBase}/${page.slug}`
    llmsTxt += `- [${page.title}](${url}): ${page.description || 'Documentation page'}\n`
  })

  // Add categorized pages
  Object.keys(groupedPages).sort().forEach(category => {
    llmsTxt += `\n## ${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}\n\n`
    groupedPages[category].forEach(page => {
      const url = `${baseUrl}/${siteConfig.routing.docBase}/${page.slug}`
      const title = page.title.replace(`${category}/`, '')
      llmsTxt += `- [${title}](${url}): ${page.description || 'Documentation page'}\n`
    })
  })

  // Add API endpoints section
  llmsTxt += `
## API Access

For programmatic access to documentation:

- REST API: ${baseUrl}/api/docs - Query documentation content
- Search API: ${baseUrl}/api/search?q=YOUR_SEARCH_TERM - Full-text search across all documents
  - Syntax: Use ?q= parameter, URL encode spaces as %20
  - Example: ${baseUrl}/api/search?q=connect%20with%20claude

## Additional Resources
- Main Site: ${baseUrl}
- Documentation Index: ${baseUrl}/${siteConfig.routing.docBase}
- Sitemap: ${baseUrl}/sitemap.xml
`

  // Write main llms.txt to public root
  fs.writeFileSync(path.join(projectRoot, 'public', 'llms.txt'), llmsTxt)

  // Generate extended llms-txt.txt with markdown content snippets
  let extendedLLMs = `# ${siteName} - Extended LLMs Documentation

> Complete documentation with content snippets for LLM context building

This extended file provides additional context from each document, making it easier for LLMs to understand the full scope of the documentation.

`

  // Add document summaries with content excerpts
  sortedPages.forEach(page => {
    extendedLLMs += `\n## ${page.title}\n`
    extendedLLMs += `URL: ${baseUrl}/${siteConfig.routing.docBase}/${page.slug}\n`
    if (page.emoji) {
      extendedLLMs += `Icon: ${page.emoji}\n`
    }
    extendedLLMs += `\n${page.description || 'No description available'}\n`

    // Read the actual markdown file to get a content preview
    const mdPath = path.join(HILLNOTE_PATH, page.path)
    if (fs.existsSync(mdPath)) {
      const content = fs.readFileSync(mdPath, 'utf8')
      const { content: markdownContent } = matter(content)

      // Extract first 500 characters of actual content (excluding frontmatter)
      const preview = markdownContent
        .replace(/^#+\s+.*$/gm, '') // Remove headers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
        .replace(/\n{3,}/g, '\n\n') // Normalize newlines
        .trim()
        .substring(0, 500)

      if (preview) {
        extendedLLMs += `\n### Content Preview:\n\`\`\`\n${preview}${preview.length >= 500 ? '...' : ''}\n\`\`\`\n`
      }
    }

    extendedLLMs += '\n---\n'
  })

  // Write extended llms-txt.txt
  fs.writeFileSync(path.join(projectRoot, 'public', 'llms-txt.txt'), extendedLLMs)
}

// Generate sitemap for SEO
function generateSitemap(pages) {
  const baseUrl = siteConfig.siteUrl
  const currentDate = new Date().toISOString()

  // Generate comprehensive sitemap with all pages
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
    <loc>${baseUrl}/${siteConfig.routing.docBase}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <!-- Documentation Pages -->
${pages.map(page => {
    // Determine priority based on page depth and importance
    let priority = 0.8
    const depth = page.slug.split('/').length
    if (depth === 1) priority = 0.85 // Top-level pages
    else if (depth === 2) priority = 0.75
    else priority = 0.65

    // Special pages get higher priority based on config
    const initialFile = siteConfig.workspace.initialFile
    if (initialFile) {
      const initialSlug = toSlug(initialFile.replace(/^documents\//, '').replace(/\.md$/, ''))
      if (page.slug === initialSlug) {
        priority = 0.9  // Initial file is important but not more than /doc
      }
    }

    // Check if page is in customOrder
    const customOrder = siteConfig.workspace.customOrder || []
    const pagePath = `documents/${page.path}`
    const orderIndex = customOrder.findIndex(path => path === pagePath)
    if (orderIndex !== -1 && orderIndex < 3) {
      // First 3 items in customOrder get higher priority
      priority = 0.88 - (orderIndex * 0.01)
    }

    return `  <url>
    <loc>${baseUrl}/${siteConfig.routing.docBase}/${page.slug}</loc>
    <lastmod>${page.lastModified || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  }).join('\n')}
</urlset>`

  fs.writeFileSync(path.join(projectRoot, 'public', 'sitemap.xml'), sitemap)
}

// Generate robots.txt file
function generateRobotsTxt() {
  const baseUrl = siteConfig.siteUrl
  const allowAIBots = siteConfig.seo.allowAIBots !== false // Default to true
  const crawlDelay = siteConfig.seo.crawlDelay

  let robotsContent = `# Robots.txt for ${siteConfig.siteName}
# https://www.robotstxt.org/robotstxt.html

# Allow all search engines to crawl the site
User-agent: *
Allow: /
${crawlDelay ? `Crawl-delay: ${crawlDelay}\n` : ''}
# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# API endpoints for AI agents and documentation access
Allow: /api/docs
Allow: /api/ai-sitemap
Allow: /api/documents
Allow: /api/document/
Allow: /api/search

# Allow search engines to access static assets
Allow: /images/
Allow: /*.js$
Allow: /*.css$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.svg$
Allow: /*.webp$
`

  // Add AI bot rules if enabled
  if (allowAIBots) {
    robotsContent += `
# AI/ML crawlers - ALLOWED for documentation learning
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Perplexity-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Amazonbot
Allow: /
`
  } else {
    robotsContent += `
# AI/ML crawlers - DISALLOWED
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Perplexity-ai
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Amazonbot
Disallow: /
`
  }

  // Write robots.txt to public root
  fs.writeFileSync(path.join(projectRoot, 'public', 'robots.txt'), robotsContent)
}

// ─── Interactive CLI ──────────────────────────────────────────────────────────

const colors = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m', gray: '\x1b[90m', white: '\x1b[37m',
}

const toggles = {
  sitemap: true,
  robots: true,
  llms: true,
}

// ─── Config Editor ───────────────────────────────────────────────────────────

const CONFIG_FIELDS = [
  { key: 'siteName',                    label: 'Site name',            hint: 'Displayed in header & metadata' },
  { key: 'siteDescription',             label: 'Site description',     hint: 'Meta description for the site' },
  { key: 'siteUrl',                     label: 'Site URL',             hint: 'Production URL (e.g. https://docs.example.com)' },
  { key: 'workspace.path',              label: 'Workspace path',       hint: 'Path under public/ to your workspace' },
  { key: 'workspace.documentsFolder',   label: 'Documents folder',     hint: 'Folder name inside workspace' },
  { key: 'workspace.registryFile',      label: 'Registry file',        hint: 'Name of documents-registry.json' },
  { key: 'workspace.initialFile',       label: 'Initial file',         hint: 'First document shown on load' },
  { key: 'routing.docBase',             label: 'Doc base path',        hint: 'URL prefix for docs (e.g. "doc", "docs", "wiki")' },
  { key: 'seo.author',                  label: 'Author',               hint: 'Author name for metadata' },
  { key: 'seo.publisher',               label: 'Publisher',            hint: 'Publisher for structured data' },
  { key: 'seo.keywords',                label: 'Keywords',             hint: 'Comma-separated SEO keywords' },
  { key: 'seo.twitterHandle',           label: 'Twitter handle',       hint: 'e.g. @yourhandle' },
  { key: 'seo.allowAIBots',             label: 'Allow AI bots',        hint: 'Allow GPTBot, Claude-Web, etc. in robots.txt', type: 'bool' },
  { key: 'ui.navigationMode',           label: 'Navigation mode',      hint: '"emoji" or "wiki"', choices: ['emoji', 'wiki'] },
  { key: 'ui.showHeaders',              label: 'Show headers',         hint: 'Document title at top of page', type: 'bool' },
  { key: 'ui.authorsNotes.enabled',     label: "Author's notes",       hint: 'Show notes section at bottom', type: 'bool' },
  { key: 'ui.relatedDocuments.enabled', label: 'Related documents',    hint: 'Show related docs section', type: 'bool' },
]

function getNestedValue(obj, dotPath) {
  return dotPath.split('.').reduce((o, k) => o?.[k], obj)
}

function setNestedValue(obj, dotPath, value) {
  const keys = dotPath.split('.')
  let target = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (!target[keys[i]]) target[keys[i]] = {}
    target = target[keys[i]]
  }
  target[keys[keys.length - 1]] = value
}

function printConfig() {
  console.log()
  console.log(`  ${colors.bold}Site Configuration${colors.reset}  ${colors.dim}${path.basename(configPath)}${colors.reset}`)
  console.log()

  for (let i = 0; i < CONFIG_FIELDS.length; i++) {
    const f = CONFIG_FIELDS[i]
    const val = getNestedValue(siteConfig, f.key)
    const display = val === null || val === undefined ? `${colors.dim}(not set)${colors.reset}`
      : typeof val === 'boolean' ? (val ? `${colors.green}true${colors.reset}` : `${colors.dim}false${colors.reset}`)
      : `${colors.white}${val}${colors.reset}`
    const num = String(i + 1).padStart(2)
    console.log(`    ${colors.cyan}${num}${colors.reset}  ${f.label.padEnd(22)} ${display}`)
    console.log(`        ${colors.dim}${f.hint}${colors.reset}`)
  }
  console.log()
  console.log(`  ${colors.dim}Type a number to edit, or${colors.reset} ${colors.cyan}q${colors.reset} ${colors.dim}to go back${colors.reset}`)
  console.log()
}

function writeConfigToDisk() {
  let content = fs.readFileSync(configPath, 'utf8')

  for (const field of CONFIG_FIELDS) {
    const val = getNestedValue(siteConfig, field.key)
    const lastKey = field.key.split('.').pop()

    if (typeof val === 'boolean') {
      const re = new RegExp(`(${lastKey}:\\s*)(?:true|false)`)
      content = content.replace(re, `$1${val}`)
    } else if (val === null) {
      const re = new RegExp(`(${lastKey}:\\s*)(?:"[^"]*"|'[^']*'|null)`)
      content = content.replace(re, `$1null`)
    } else {
      const escaped = String(val).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
      const re = new RegExp(`(${lastKey}:\\s*)(?:"[^"]*"|'[^']*'|null)`)
      content = content.replace(re, `$1"${escaped}"`)
    }
  }

  fs.writeFileSync(configPath, content, 'utf8')
}

async function configEditor(ask) {
  printConfig()

  while (true) {
    const input = (await ask(`  ${colors.cyan}config>${colors.reset} `)).trim()

    if (input === 'q' || input === 'back' || input === '') break

    const idx = parseInt(input, 10) - 1
    if (isNaN(idx) || idx < 0 || idx >= CONFIG_FIELDS.length) {
      console.log(`  ${colors.dim}Pick 1–${CONFIG_FIELDS.length} or q to go back${colors.reset}`)
      continue
    }

    const field = CONFIG_FIELDS[idx]
    const current = getNestedValue(siteConfig, field.key)

    if (field.type === 'bool') {
      const newVal = !current
      setNestedValue(siteConfig, field.key, newVal)
      console.log(`  ${colors.green}✓${colors.reset} ${field.label} → ${newVal ? `${colors.green}true${colors.reset}` : `${colors.dim}false${colors.reset}`}`)
    } else if (field.choices) {
      console.log(`  ${colors.dim}Options: ${field.choices.join(', ')}${colors.reset}`)
      const val = (await ask(`  ${colors.yellow}?${colors.reset} ${field.label} [${current}]: `)).trim()
      if (val && field.choices.includes(val)) {
        setNestedValue(siteConfig, field.key, val)
        console.log(`  ${colors.green}✓${colors.reset} ${field.label} → ${colors.white}${val}${colors.reset}`)
      } else if (val) {
        console.log(`  ${colors.dim}Must be one of: ${field.choices.join(', ')}${colors.reset}`)
        continue
      }
    } else {
      const val = (await ask(`  ${colors.yellow}?${colors.reset} ${field.label} [${current ?? ''}]: `)).trim()
      if (val) {
        setNestedValue(siteConfig, field.key, val)
        console.log(`  ${colors.green}✓${colors.reset} ${field.label} → ${colors.white}${val}${colors.reset}`)
      }
    }

    writeConfigToDisk()
    console.log(`  ${colors.dim}Saved to site.config.js${colors.reset}`)
  }
}

function printMenu() {
  const on = `${colors.green}on${colors.reset}`
  const off = `${colors.dim}off${colors.reset}`

  console.log()
  console.log(`${colors.cyan}╭────────────────────────────────────────────────────────────╮${colors.reset}`)
  console.log(`${colors.cyan}│${colors.reset}${colors.bold}${colors.white}  Hillnote Publish — Page Generator                        ${colors.reset}${colors.cyan}│${colors.reset}`)
  console.log(`${colors.cyan}╰────────────────────────────────────────────────────────────╯${colors.reset}`)
  console.log()
  console.log(`  ${colors.bold}Actions${colors.reset}`)
  console.log(`    ${colors.cyan}1${colors.reset}  Generate all pages`)
  console.log(`    ${colors.cyan}2${colors.reset}  Clean generated pages only`)
  console.log()
  console.log(`  ${colors.bold}Options${colors.reset}  ${colors.dim}(type to toggle)${colors.reset}`)
  console.log(`    ${colors.cyan}/sitemap${colors.reset}  Generate sitemap.xml          ${toggles.sitemap ? on : off}`)
  console.log(`    ${colors.cyan}/robots${colors.reset}   Generate robots.txt           ${toggles.robots ? on : off}`)
  console.log(`    ${colors.cyan}/llms${colors.reset}     Generate llms.txt             ${toggles.llms ? on : off}`)
  console.log()
  console.log(`    ${colors.cyan}/config${colors.reset}   Edit site.config.js`)
  console.log(`    ${colors.cyan}/help${colors.reset}     Show reference`)
  console.log(`    ${colors.cyan}q${colors.reset}         Exit`)
  console.log()
}

function printHelp() {
  console.log()
  console.log(`  ${colors.bold}Page Generation${colors.reset}`)
  console.log(`  ${colors.dim}Converts Hillnote markdown documents into static Next.js pages.${colors.reset}`)
  console.log(`  ${colors.dim}doc/page.* and doc/layout.* files are always preserved.${colors.reset}`)
  console.log()
  console.log(`  ${colors.bold}Generated Files${colors.reset}`)
  console.log(`    ${colors.yellow}sitemap.xml${colors.reset}    ${colors.dim}Search engine sitemap (public/)${colors.reset}`)
  console.log(`    ${colors.yellow}robots.txt${colors.reset}     ${colors.dim}Crawler directives (public/)${colors.reset}`)
  console.log(`    ${colors.yellow}llms.txt${colors.reset}       ${colors.dim}LLM-readable site index (public/)${colors.reset}`)
  console.log(`    ${colors.yellow}llms-txt.txt${colors.reset}   ${colors.dim}Extended LLM file with content previews${colors.reset}`)
  console.log()
  console.log(`  ${colors.bold}CLI Flags${colors.reset} ${colors.dim}(for CI / npm scripts)${colors.reset}`)
  console.log(`    ${colors.cyan}--no-sitemap${colors.reset}  ${colors.dim}Skip sitemap generation${colors.reset}`)
  console.log(`    ${colors.cyan}--no-robots${colors.reset}   ${colors.dim}Skip robots.txt generation${colors.reset}`)
  console.log(`    ${colors.cyan}--no-llms${colors.reset}     ${colors.dim}Skip llms.txt generation${colors.reset}`)
  console.log(`    ${colors.cyan}-h, --help${colors.reset}    ${colors.dim}Show this help and exit${colors.reset}`)
  console.log()
}

function runGenerate(opts) {
  console.log('\n🔄 Generating SEO-optimized static pages from Hillnote documents...\n')

  cleanOldPages(OUTPUT_PATH)
  generateLayout()

  const pages = processDirectory(HILLNOTE_PATH)

  if (pages.length === 0) {
    console.error('❌ No markdown files found in:', HILLNOTE_PATH)
    return
  }

  if (opts.sitemap) {
    generateSitemap(pages)
  } else {
    console.log('  ⏭ Skipping sitemap.xml generation')
  }

  if (opts.robots) {
    generateRobotsTxt()
  } else {
    console.log('  ⏭ Skipping robots.txt generation')
  }

  if (opts.llms) {
    generateLLMsTxt(pages)
  } else {
    console.log('  ⏭ Skipping llms.txt generation')
  }

  console.log(`\n✅ Successfully generated ${pages.length} static pages!`)
  console.log('📁 Pages created in:', OUTPUT_PATH)
  if (opts.sitemap) console.log('🗺️  Sitemap created: public/sitemap.xml (all pages)')
  if (opts.robots) console.log('🤖 Robots.txt: public/robots.txt')
  if (opts.llms) {
    console.log('🤖 LLMs.txt: public/llms.txt (main LLM-readable file)')
    console.log('📚 Extended LLMs: public/llms-txt.txt (with content previews)')
  }
}

// Parse command-line arguments (for CI / npm scripts — bypass interactive mode)
const args = process.argv.slice(2)
const hasFlags = args.length > 0

if (hasFlags) {
  if (args.includes('--help') || args.includes('-h')) {
    printHelp()
    process.exit(0)
  }

  runGenerate({
    sitemap: !args.includes('--no-sitemap'),
    robots: !args.includes('--no-robots'),
    llms: !args.includes('--no-llms'),
  })
  process.exit(0)
}

// Interactive mode
async function interactive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const ask = (q) => new Promise((res) => rl.question(q, res))

  printMenu()

  while (true) {
    const input = (await ask(`${colors.cyan}>${colors.reset} `)).trim().toLowerCase()

    if (input === 'q' || input === 'exit') {
      break
    } else if (input === '1') {
      runGenerate({ ...toggles })
      printMenu()
    } else if (input === '2') {
      console.log('\n🧹 Cleaning generated pages...')
      cleanOldPages(OUTPUT_PATH)
      console.log('✅ Done. Layout and page.* files preserved.\n')
    } else if (input === '/sitemap') {
      toggles.sitemap = !toggles.sitemap
      printMenu()
    } else if (input === '/robots') {
      toggles.robots = !toggles.robots
      printMenu()
    } else if (input === '/llms') {
      toggles.llms = !toggles.llms
      printMenu()
    } else if (input === '/config') {
      await configEditor(ask)
      printMenu()
    } else if (input === '/help') {
      printHelp()
    } else if (input === '') {
      // ignore empty
    } else {
      console.log(`  ${colors.dim}Unknown command. Type a number or /option.${colors.reset}`)
    }
  }

  rl.close()
}

interactive().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})