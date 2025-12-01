// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Hillnote NPM | Hillnote Documentation',
  description: '@hillnote/wiki\nTurn your Hillnote workspace into beautiful documentation for your Next.js projects. The @hillnote/wiki NPM package provides ready-to-use compone',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Hillnote NPM',
    description: '@hillnote/wiki\nTurn your Hillnote workspace into beautiful documentation for your Next.js projects. The @hillnote/wiki NPM package provides ready-to-use compone',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connect/dev/hillnote-npm',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hillnote NPM',
    description: '@hillnote/wiki\nTurn your Hillnote workspace into beautiful documentation for your Next.js projects. The @hillnote/wiki NPM package provides ready-to-use compone',
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
    canonical: '/doc/connect/dev/hillnote-npm'
  }
}

// Document information
const documentPath = 'documents/Connect/Dev/Hillnote NPM.md'
const documentTitle = 'Hillnote NPM'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Hillnote NPM",
  "description": "@hillnote/wiki\nTurn your Hillnote workspace into beautiful documentation for your Next.js projects. The @hillnote/wiki NPM package provides ready-to-use compone",
  "author": {
    "@type": "Organization",
    "name": "HillnoteWiki"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Hillnote"
  },
  "datePublished": "2025-09-29T14:01:23.195Z",
  "dateModified": "2025-09-29T14:01:23.195Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "/doc/connect/dev/hillnote-npm"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-hillnotewiki">@hillnote/wiki</h1>
<p>Turn your Hillnote workspace into beautiful documentation for your Next.js projects. The @hillnote/wiki NPM package provides ready-to-use components for creating documentation sites powered by your Hillnote workspace.</p>
<h3 id="heading-github"><strong>Github</strong></h3>
<p>You can check out the repository here for boilerplates, examples and more: <a href="https://github.com/Rajathbail/hillnote-wiki?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">https://github.com/Rajathbail/hillnote-wiki?tab=readme-ov-file</a></p>
<h2 id="heading-features">Features</h2>
<ul>
<li><p>📚 Beautiful documentation UI with navigation sidebar</p>
</li>
<li><p>🎨 Dark/Light theme support</p>
</li>
<li><p>📱 Fully responsive design</p>
</li>
<li><p>🔍 SEO-friendly with sitemap generation</p>
</li>
<li><p>🤖 AI-crawler optimized with structured data</p>
</li>
<li><p>📁 Auto-expanding navigation for active documents</p>
</li>
<li><p>🔗 Smart URL routing with slugs</p>
</li>
<li><p>📝 Markdown rendering with syntax highlighting</p>
</li>
</ul>
<h2 id="heading-installation">Installation</h2>
<pre><code class="language-javascript">npm install @hillnote/wiki
# or
yarn add @hillnote/wiki
# or
pnpm add @hillnote/wiki
</code></pre>
<p><strong>Note:</strong> All required dependencies (@radix-ui components, gray-matter, etc.) will be automatically installed with the package.</p>
<h2 id="heading-quick-start">Quick Start</h2>
<h3 id="heading-1-setup-root-layout-with-theme-provider">1. Setup Root Layout with Theme Provider</h3>
<p>First, create a providers component and update your root layout:</p>
<pre><code class="language-javascript">// app/providers.js
&quot;use client&quot;

import { ThemeProvider } from &#39;@hillnote/wiki&#39;

export function Providers({ children }) {
  return (
    &lt;ThemeProvider
      attribute=&quot;class&quot;
      defaultTheme=&quot;system&quot;
      enableSystem
      disableTransitionOnChange
    &gt;
      {children}
    &lt;/ThemeProvider&gt;
  )
}
</code></pre>
<pre><code class="language-javascript">// app/layout.js
import { Providers } from &quot;./providers&quot;
import &quot;@hillnote/wiki/styles&quot;
import &quot;./globals.css&quot;

export default function RootLayout({ children }) {
  return (
    &lt;html lang=&quot;en&quot; suppressHydrationWarning&gt;
      &lt;body&gt;
        &lt;Providers&gt;{children}&lt;/Providers&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  )
}
</code></pre>
<h3 id="heading-2-create-your-wiki-pages">2. Create Your Wiki Pages</h3>
<p>Create the main wiki page and dynamic routing:</p>
<pre><code class="language-javascript">// app/page.js
&quot;use client&quot;

import { Document, Navbar, ConfigProvider, pathToSlug, initializeSlugMapping } from &#39;@hillnote/wiki&#39;
import { useEffect, useState } from &#39;react&#39;
import { useRouter } from &#39;next/navigation&#39;

const wikiConfig = {
  siteName: &quot;My Wiki&quot;,
  workspace: {
    path: &quot;/workspace/&quot;, // Path to your Hillnote workspace in public folder
    enabled: true,
    documentsFolder: &quot;documents&quot;,
    registryFile: &quot;documents-registry.json&quot;,
    initialFile: &quot;documents/Start Here.md&quot;
  },
  ui: {
    authorsNotes: true,
    navigationText: &quot;All Pages&quot;
  }
}

export default function WikiPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() =&gt; {
    setMounted(true)
    // Initialize slug mapping on mount
    initializeSlugMapping(wikiConfig)
  }, [])

  const handleFileSelect = (filePath) =&gt; {
    if (!filePath) return
    
    // Convert file path to URL slug
    const slug = pathToSlug(filePath)
    
    router.push(\`/doc/\${slug}\`)
  }

  if (!mounted) return null

  return (
    &lt;ConfigProvider config={wikiConfig}&gt;
      &lt;div className=&quot;h-screen flex flex-col&quot;&gt;
        &lt;Navbar siteName={wikiConfig.siteName} showThemeToggle={true} /&gt;
        &lt;Document 
          siteConfig={wikiConfig}
          initialFile={wikiConfig.workspace.initialFile}
          showNavigation={true}
          showTableOfContents={true}
          onFileSelect={handleFileSelect}
        /&gt;
      &lt;/div&gt;
    &lt;/ConfigProvider&gt;
  )
}
</code></pre>
<pre><code class="language-javascript">// app/doc/[...path]/page.js
&quot;use client&quot;

import { Document, Navbar, ConfigProvider, pathToSlug, slugToPath, initializeSlugMapping } from &#39;@hillnote/wiki&#39;
import { useEffect, useState } from &#39;react&#39;
import { useParams, useRouter } from &#39;next/navigation&#39;

const wikiConfig = {
  siteName: &quot;My Wiki&quot;,
  workspace: {
    path: &quot;/workspace/&quot;,
    enabled: true,
    documentsFolder: &quot;documents&quot;,
    registryFile: &quot;documents-registry.json&quot;,
    initialFile: &quot;documents/Start Here.md&quot;
  },
  ui: {
    authorsNotes: true,
    navigationText: &quot;All Pages&quot;
  }
}

export default function DocumentPage() {
  const params = useParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [filePath, setFilePath] = useState(wikiConfig.workspace.initialFile)
  
  // Get the slug from URL params
  const slug = params.path ? params.path.join(&#39;/&#39;) : null

  useEffect(() =&gt; {
    setMounted(true)
    // Initialize slug mapping and then set the file path
    const initAndSetPath = async () =&gt; {
      await initializeSlugMapping(wikiConfig)
      if (slug) {
        const path = slugToPath(slug)
        setFilePath(path)
      }
    }
    initAndSetPath()
  }, [slug])

  const handleFileSelect = (filePath) =&gt; {
    if (!filePath) return
    
    // Convert file path to URL slug
    const slug = pathToSlug(filePath)
    
    router.push(\`/doc/\${slug}\`)
  }

  if (!mounted) return null

  return (
    &lt;ConfigProvider config={wikiConfig}&gt;
      &lt;div className=&quot;h-screen flex flex-col&quot;&gt;
        &lt;Navbar siteName={wikiConfig.siteName} showThemeToggle={true} /&gt;
        &lt;Document 
          siteConfig={wikiConfig}
          initialFile={filePath}
          showNavigation={true}
          showTableOfContents={true}
          onFileSelect={handleFileSelect}
        /&gt;
      &lt;/div&gt;
    &lt;/ConfigProvider&gt;
  )
}
</code></pre>
<h3 id="heading-3-copy-your-hillnote-workspace">3. Copy Your Hillnote Workspace</h3>
<p>Copy your Hillnote workspace to your Next.js public folder:</p>
<pre><code class="language-javascript">cp -r ~/path-to-hillnote-workspace public/workspace
</code></pre>
<h3 id="heading-4-setup-styles-and-tailwind">4. Setup Styles and Tailwind</h3>
<ol>
<li>Update your <code>globals.css</code> with theme variables:</li>
</ol>
<pre><code class="language-javascript">/* app/globals.css */
@import &quot;tailwindcss&quot;;

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}
</code></pre>
<ol start="2">
<li>Create or update your <code>tailwind.config.js</code>:</li>
</ol>
<pre><code class="language-javascript">// tailwind.config.js
module.exports = {
  darkMode: [&quot;class&quot;],
  content: [
    // ... your other content paths
    &quot;./node_modules/@hillnote/wiki/dist/**/*.{js,mjs}&quot;
  ],
  theme: {
    extend: {
      colors: {
        border: &quot;hsl(var(--border))&quot;,
        input: &quot;hsl(var(--input))&quot;,
        ring: &quot;hsl(var(--ring))&quot;,
        background: &quot;hsl(var(--background))&quot;,
        foreground: &quot;hsl(var(--foreground))&quot;,
        primary: {
          DEFAULT: &quot;hsl(var(--primary))&quot;,
          foreground: &quot;hsl(var(--primary-foreground))&quot;,
        },
        secondary: {
          DEFAULT: &quot;hsl(var(--secondary))&quot;,
          foreground: &quot;hsl(var(--secondary-foreground))&quot;,
        },
        destructive: {
          DEFAULT: &quot;hsl(var(--destructive))&quot;,
          foreground: &quot;hsl(var(--destructive-foreground))&quot;,
        },
        muted: {
          DEFAULT: &quot;hsl(var(--muted))&quot;,
          foreground: &quot;hsl(var(--muted-foreground))&quot;,
        },
        accent: {
          DEFAULT: &quot;hsl(var(--accent))&quot;,
          foreground: &quot;hsl(var(--accent-foreground))&quot;,
        },
        popover: {
          DEFAULT: &quot;hsl(var(--popover))&quot;,
          foreground: &quot;hsl(var(--popover-foreground))&quot;,
        },
        card: {
          DEFAULT: &quot;hsl(var(--card))&quot;,
          foreground: &quot;hsl(var(--card-foreground))&quot;,
        },
      },
      borderRadius: {
        lg: &quot;var(--radius)&quot;,
        md: &quot;calc(var(--radius) - 2px)&quot;,
        sm: &quot;calc(var(--radius) - 4px)&quot;,
      },
    },
  },
  plugins: [],
}
</code></pre>
<h2 id="heading-components">Components</h2>
<h3 id="heading-navbar">Navbar</h3>
<p>The navigation bar component for your wiki.</p>
<pre><code class="language-javascript">import { Navbar } from &#39;@hillnote/wiki&#39;

&lt;Navbar 
  siteName=&quot;My Wiki&quot;
  showSiteName={true}
  showThemeToggle={true}
  className=&quot;custom-navbar&quot;
&gt;
  {/* Additional navbar items */}
&lt;/Navbar&gt;
</code></pre>
<h3 id="heading-document">Document</h3>
<p>The main document viewer with navigation sidebar and table of contents.</p>
<pre><code class="language-javascript">import { Document } from &#39;@hillnote/wiki&#39;

&lt;Document 
  siteConfig={wikiConfig}           // Pass the entire config object
  initialFile=&quot;documents/index.md&quot;  // Initial file to display
  showNavigation={true}              // Show navigation sidebar
  showTableOfContents={true}         // Show table of contents
  onFileSelect={(file) =&gt; console.log(&#39;Selected:&#39;, file)}  // File selection handler
/&gt;
</code></pre>
<h3 id="heading-tableofcontents">TableOfContents</h3>
<p>A standalone table of contents component.</p>
<pre><code class="language-javascript">import { TableOfContents } from &#39;@hillnote/wiki&#39;

&lt;TableOfContents 
  showTitle={true}
  title=&quot;Contents&quot;
/&gt;
</code></pre>
<h2 id="heading-configuration">Configuration</h2>
<p>The configuration object supports the following options:</p>
<pre><code class="language-javascript">const wikiConfig = {
  siteName: &quot;My Documentation&quot;,
  workspace: {
    path: &quot;/workspace/&quot;,              // Path to workspace in public folder
    enabled: true,
    documentsFolder: &quot;documents&quot;,     // Folder containing markdown files
    registryFile: &quot;documents-registry.json&quot;,  // Registry file name
    initialFile: &quot;documents/Start Here.md&quot;    // Initial document to display
  },
  ui: {
    authorsNotes: true,               // Enable author&#39;s notes section
    navigationText: &quot;All Pages&quot;,      // Navigation sidebar title
    navigationMode: &quot;wiki&quot;            // &quot;emoji&quot; or &quot;wiki&quot; (accordion style)
  }
}
</code></pre>
<h3 id="heading-navigation-modes">Navigation Modes</h3>
<p>The sidebar navigation supports two different display styles. You can switch between them using the <code>navigationMode</code> setting in your configuration.</p>
<h4 id="heading-1-emoji-mode-default">1. Emoji Mode (Default)</h4>
<p>Traditional file explorer style with emoji icons and arrow indicators.</p>
<p><strong>Features:</strong></p>
<ul>
<li><p>📁 Folder icons for directories</p>
</li>
<li><p>📄 File icons for documents</p>
</li>
<li><p>▶️ / ▼ Arrow indicators for expand/collapse</p>
</li>
<li><p>Visual hierarchy with indentation</p>
</li>
</ul>
<pre><code class="language-javascript">const wikiConfig = {
  ui: {
    navigationMode: &quot;emoji&quot;  // or omit for default
  }
}
</code></pre>
<h4 id="heading-2-wiki-mode">2. Wiki Mode</h4>
<p>Clean, modern accordion-style navigation similar to popular documentation sites.</p>
<p><strong>Features:</strong></p>
<ul>
<li><p>Clean text-based navigation</p>
</li>
<li><p>Smooth accordion expand/collapse animations</p>
</li>
<li><p>No visual clutter from icons</p>
</li>
<li><p>Folders stay open when selecting files inside them</p>
</li>
<li><p>Auto-expands to show the current document</p>
</li>
</ul>
<pre><code class="language-javascript">const wikiConfig = {
  ui: {
    navigationMode: &quot;wiki&quot;
  }
}
</code></pre>
<p><strong>Complete example with wiki mode:</strong></p>
<pre><code class="language-javascript">const wikiConfig = {
  siteName: &quot;My Documentation&quot;,
  workspace: {
    path: &quot;/workspace/&quot;,
    enabled: true,
    documentsFolder: &quot;documents&quot;,
    registryFile: &quot;documents-registry.json&quot;,
    initialFile: &quot;documents/Start Here.md&quot;
  },
  ui: {
    authorsNotes: true,
    navigationText: &quot;All Pages&quot;,
    navigationMode: &quot;wiki&quot;  // Set to &quot;wiki&quot; for accordion style
  }
}
</code></pre>
<h2 id="heading-advanced-usage">Advanced Usage</h2>
<h3 id="heading-custom-layout">Custom Layout</h3>
<p>You can compose the components to create custom layouts:</p>
<pre><code class="language-javascript">import { useState } from &#39;react&#39;
import { Navbar, Document, MarkdownRenderer, NavigationSidebar } from &#39;@hillnote/wiki&#39;

export default function CustomWiki() {
  const [selectedFile, setSelectedFile] = useState(null)
  
  return (
    &lt;div className=&quot;custom-layout&quot;&gt;
      &lt;Navbar siteName=&quot;My Wiki&quot; /&gt;
      
      &lt;div className=&quot;flex&quot;&gt;
        &lt;NavigationSidebar 
          onFileSelect={setSelectedFile}
          selectedFile={selectedFile}
        /&gt;
        
        &lt;main className=&quot;flex-1&quot;&gt;
          &lt;MarkdownRenderer 
            filePath={selectedFile}
            onFileSelect={setSelectedFile}
          /&gt;
        &lt;/main&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  )
}
</code></pre>
<h3 id="heading-url-routing-with-slugs">URL Routing with Slugs</h3>
<p>The package includes utilities for converting between file paths and URL-friendly slugs:</p>
<pre><code class="language-javascript">import { pathToSlug, slugToPath, initializeSlugMapping } from &#39;@hillnote/wiki&#39;

// Initialize slug mapping (required once on app mount)
await initializeSlugMapping(wikiConfig)

// Convert file path to URL slug
const slug = pathToSlug(&quot;documents/Getting Started.md&quot;)
// Returns: &quot;getting-started&quot;

// Convert slug back to file path
const path = slugToPath(&quot;getting-started&quot;)
// Returns: &quot;documents/Getting Started.md&quot;
</code></pre>
<h3 id="heading-workspace-utilities">Workspace Utilities</h3>
<p>The package exports utilities for working with your Hillnote workspace:</p>
<pre><code class="language-javascript">import { buildFileTree, fetchWorkspaceRegistry, getWorkspaceFileTree } from &#39;@hillnote/wiki&#39;

// Fetch the workspace registry
const registry = await fetchWorkspaceRegistry(wikiConfig)

// Build a hierarchical file tree from the registry
const fileTree = buildFileTree(registry.documents)

// Get the complete workspace file tree
const tree = await getWorkspaceFileTree(wikiConfig)
</code></pre>
<h2 id="heading-troubleshooting">Troubleshooting</h2>
<h3 id="heading-hydration-errors">Hydration Errors</h3>
<p>If you encounter hydration errors with Next.js, ensure you&#39;re using the client-side mounting pattern shown in the Quick Start example. The <code>mounted</code> state prevents theme-related attributes from causing mismatches between server and client rendering.</p>
<h2 id="heading-workspace-structure">Workspace Structure</h2>
<p>Your Hillnote workspace should have this structure in your public folder:</p>
<pre><code class="language-javascript">public/
└── workspace/
    ├── documents/
    │   ├── Getting Started.md
    │   ├── Installation.md
    │   └── ...
    └── documents-registry.json
</code></pre>
<p>The <code>documents-registry.json</code> file should contain metadata about your documents:</p>
<pre><code class="language-javascript">{
  &quot;documents&quot;: [
    {
      &quot;path&quot;: &quot;documents/Getting Started.md&quot;,
      &quot;title&quot;: &quot;Getting Started&quot;,
      &quot;lastModified&quot;: &quot;2024-01-01T00:00:00Z&quot;
    }
  ]
}
</code></pre>
<h2 id="heading-javascripttypescript-support">JavaScript/TypeScript Support</h2>
<p>The package works with both JavaScript and TypeScript. For TypeScript users, types are available:</p>
<pre><code class="language-javascript">import type { 
  NavbarProps, 
  DocumentProps, 
  TableOfContentsProps,
  HillnoteWikiConfig 
} from &#39;@hillnote/wiki&#39;
</code></pre>
<p>For JavaScript users, you can use JSDoc comments for type hints:</p>
<pre><code class="language-javascript">/** @type {import(&#39;@hillnote/wiki&#39;).HillnoteWikiConfig} */
const wikiConfig = {
  // your configuration
}
</code></pre>
<h2 id="heading-requirements">Requirements</h2>
<ul>
<li><p>Next.js 13+ (with App Router)</p>
</li>
<li><p>React 18+</p>
</li>
<li><p>Tailwind CSS (for styling)</p>
</li>
<li><p>A Hillnote workspace</p>
</li>
</ul>
<h2 id="heading-license">License</h2>
<p>MIT</p>
<h2 id="heading-contributing">Contributing</h2>
<p>Contributions are welcome! Please feel free to submit a Pull Request.</p>
<h2 id="heading-support">Support</h2>
<p>For issues and questions, please visit our <a href="https://github.com/Rajathbail/hillnote-wiki" target="_blank" rel="noopener noreferrer">GitHub repository</a>.</p>
<div class="resource-html-container w-full my-3">
  <a href="/Welcome to Hillnote! /resources/html/Hillnote NPM/1758048775489.html" target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors">
    <div class="flex items-center gap-3 flex-1">
      <span class="text-blue-500 text-lg">🌐</span>
      <span class="font-medium text-foreground text-sm">Pasted HTML</span>
    </div>
    <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  </a>
</div>`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="h-full overflow-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-4 pb-12">
          
          <div
            className="markdown-content px-4 sm:px-8 md:px-12 pt-8"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          
        </div>
      </div>
    </>
  )
}
