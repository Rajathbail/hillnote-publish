// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Dear MCP and NPM | Hillnote Documentation',
  description: 'Hillnotes MCP server facilitates AI tool connections for seamless note management and document interaction, prioritizing local data privacy.',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, references, links, documentation, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Dear MCP and NPM',
    description: 'Hillnotes MCP server facilitates AI tool connections for seamless note management and document interaction, prioritizing local data privacy.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/dear-mcp-and-npm',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dear MCP and NPM',
    description: 'Hillnotes MCP server facilitates AI tool connections for seamless note management and document interaction, prioritizing local data privacy.',
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
    canonical: '/doc/dear-mcp-and-npm'
  }
}

// Document information
const documentPath = 'documents/Dear MCP and NPM.md'
const documentTitle = 'Dear MCP and NPM'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Dear MCP and NPM",
  "description": "Hillnotes MCP server facilitates AI tool connections for seamless note management and document interaction, prioritizing local data privacy.",
  "author": {
    "@type": "Organization",
    "name": "HillnoteWiki"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Hillnote"
  },
  "datePublished": "2025-09-29T14:01:23.196Z",
  "dateModified": "2025-09-29T14:01:23.196Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "/doc/dear-mcp-and-npm"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<img src="/Welcome to Hillnote! /resources/images/Dear MCP and NPM/1758027282559.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-the-mcp-server"><mark>The MCP server</mark></h2>
<p>Hillnote comes with an inbuilt MCP server ready to connect with all of your favourite AI tools directly. You can find instructions to link the same in the settings page inside of “MCP”.</p>
<div class="scratch-space rounded-md border border-dashed border-border bg-muted/10">
  <details class="group">
    <summary class="flex items-center justify-between p-2 cursor-pointer hover:bg-muted/20 transition-colors">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 transition-transform group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span class="text-sm text-muted-foreground">What is MCP - a detour</span>
      </div>
    </summary>
    <div class="px-4 pb-4 prose prose-sm dark:prose-invert max-w-none">
      <p><strong>Think of MCP as a translator between your AI assistant and your apps.</strong></p>
<p>Just like you might connect your phone to your car to play music, MCP lets AI assistants connect to Hillnote to work with your documents. It&#39;s the bridge that lets AI understand and help manage your notes.</p>
<h4 id="heading-how-it-works"><strong>HOW IT WORKS</strong></h4>
<ul>
<li><p>•Creates a bridge between AI and your Hillnote documents</p>
</li>
<li><p>•AI tools can read, search, and manage notes directly</p>
</li>
<li><p>•All data stays local on your computer</p>
</li>
<li><p>•You control what AI assistants can access</p>
</li>
</ul>
<h4 id="heading-benefits"><strong>BENEFITS</strong></h4>
<ul>
<li><p>•Ask AI about your notes without copy-pasting</p>
</li>
<li><p>•AI understands your full knowledge base</p>
</li>
<li><p>•Works with any MCP-compatible AI</p>
</li>
<li><p>•Automate document organization</p>
</li>
</ul>
<p><strong>Privacy:</strong> MCP runs locally. Documents never leave your computer unless explicitly shared.</p>
    </div>
  </details>
</div>

<img src="/Welcome to Hillnote! /resources/images/Dev/1757098144134.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-do-more-with-your-files"><mark>Do more with your files</mark></h2>
<p>If you are a developer looking to extend your workspace into other projects like Wiki’s, Websites, Documentation, etc please check out <a href="/doc/connect" class="document-link text-primary underline hover:no-underline">Connect</a> for tools like our open source Markdown → HTML renderer or our NPM package (<a href="https://www.npmjs.com/package/@hillnote/wiki" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/@hillnote/wiki</a>).</p>
`

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
