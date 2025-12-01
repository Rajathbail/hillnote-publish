// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Pair with Cursor | Hillnote Documentation',
  description: 'My favourite way to work with Cursor is to',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Pair with Cursor',
    description: 'My favourite way to work with Cursor is to',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connect/pair-with/pair-with-cursor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pair with Cursor',
    description: 'My favourite way to work with Cursor is to',
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
    canonical: '/doc/connect/pair-with/pair-with-cursor'
  }
}

// Document information
const documentPath = 'documents/Connect/Pair with/Pair with Cursor.md'
const documentTitle = 'Pair with Cursor'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Pair with Cursor",
  "description": "My favourite way to work with Cursor is to",
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
    "@id": "/doc/connect/pair-with/pair-with-cursor"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h2 id="heading-my-favourite-way-to-work-with-cursor-is-to"><img src="/Welcome to Hillnote! /resources/images/Pair with Cursor/1758049573789.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />My favourite way to work with Cursor is to</h2>
<ol>
<li><p>Use the <strong>Cursor app</strong> for project files with MCP enabled to Hillnote.</p>
</li>
<li><p>Add the Hillnote workspace within your cursor project as reference or notes.</p>
</li>
<li><p>Sync the Workspace along with the project via Github.</p>
</li>
<li><p>Setup a Cursor Rule in settings to write all documents/.md files in <code>&lt;workspace folder name&gt;/documents/cursorDocs</code></p>
</li>
</ol>
<h2 id="heading-mcp-connection">MCP connection</h2>
<p>To enable the MCP connection to hillnote</p>
<ol>
<li><p>Copy the configuration code</p>
</li>
<li><p>Go to settings &gt; tools and integrations &gt; New MCP server</p>
</li>
<li><p>Paste the code within the JSON</p>
</li>
</ol>
<img src="/Welcome to Hillnote! /resources/images/Pair with Cursor/1757251394537.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-readme-rules">Readme rules</h2>
<p>Save all documentation created in cursor to Hillnote to keep your work organized and easy to find.</p>
<p>Simply add a Cursor Rule in settings to write all documents/.md files in <code>&lt;workspace folder name&gt;/documents/cursorDocs</code></p>
<img src="/Welcome to Hillnote! /resources/images/Pair with Cursor/1757251513222.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-open-your-workspace">Open your workspace</h2>
<p>You can navigate to the workspace folder - open the same in Cursor. You can make changes, modify files and even create tools using Cursor.</p>
<h2 id="heading-via-another-app">Via another app</h2>
<p><strong>Github</strong> can be used to sync your files and connect them to your Cursor. This works great when paired with the background agent to automate workflows.</p>
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
