// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Connect | Hillnote Documentation',
  description: 'Hillnote connections',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, references, links, documentation, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Connect',
    description: 'Hillnote connections',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect',
    description: 'Hillnote connections',
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
    canonical: '/doc/connect'
  }
}

// Document information
const documentPath = 'documents/Connect.md'
const documentTitle = 'Connect'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Connect",
  "description": "Hillnote connections",
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
    "@id": "/doc/connect"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-hillnote-connections"><mark>Hillnote connections</mark></h1>
<blockquote>
<p>Last updated on 17th September 2025 • Currently features 7 Tools</p>
</blockquote>
<p>This is a compilation of all the various ways to connect Hillnote with the various tools that you may have existing in your workspace.</p>
<p>If you would like to add a tool here, please do write to <a href="mailto:hello@hillnote.com" target="_blank" rel="noopener noreferrer">hello@hillnote.com</a></p>
<hr>
<img src="/Welcome to Hillnote! /resources/images/Connect/1758028307535.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-methods-to-connect-with-hillnote">Methods to connect with Hillnote</h2>
<ol>
<li><p>Via MCP (<a href="/doc/dear-mcp-and-npm" class="document-link text-primary underline hover:no-underline">Dear MCP and NPM</a>)</p>
</li>
<li><p>Via your Filesystem (<a href="/doc/the-filesystem" class="document-link text-primary underline hover:no-underline">The Filesystem</a>)</p>
</li>
</ol>
<hr>
<h2 id="heading-types-of-connections">Types of connections</h2>
<h3 id="heading-rajaths-picks-for-september"><mark>Rajath’s Picks for September</mark></h3>
<ol>
<li><p>Our favourite AI tool: <strong>Claude (</strong><a href="/doc/connect/aitools/connect-with-claude" class="document-link text-primary underline hover:no-underline">Connect with Claude</a> <strong>)</strong></p>
</li>
<li><p>Our favourite way to Sync: <strong>Google Drive (</strong><a href="/doc/connect/sync-and-collaborate/gdrive" class="document-link text-primary underline hover:no-underline">GDrive</a><strong>)</strong></p>
</li>
<li><p>Our favourite IDE to pair with: <strong>Cursor</strong> <strong>(</strong><a href="/doc/connect/pair-with/pair-with-cursor" class="document-link text-primary underline hover:no-underline">Pair with Cursor</a><strong>)</strong></p>
</li>
</ol>
<h3 id="heading-ai-tools">Ai Tools</h3>
<p><a href="/doc/connect/aitools/connect-with-chatgpt" class="document-link text-primary underline hover:no-underline">Connect with ChatGPT</a> ✨</p>
<p><a href="/doc/connect/aitools/connect-with-claude" class="document-link text-primary underline hover:no-underline">Connect with Claude</a> ✨</p>
<p><a href="/doc/connect/aitools/connect-with-perplexity" class="document-link text-primary underline hover:no-underline">Connect with Perplexity</a> ✨</p>
<p><a href="/doc/connect/aitools/use-with-grok-gemini-deepseek-and-more" class="document-link text-primary underline hover:no-underline">Use with Grok, Gemini, Deepseek and more</a> ✨</p>
<h3 id="heading-applications">Applications</h3>
<p><a href="/doc/connect/pair-with/pair-with-cursor" class="document-link text-primary underline hover:no-underline">Pair with Cursor</a> 🚀</p>
<p><a href="/doc/connect/pair-with/pair-with-github-copilot" class="document-link text-primary underline hover:no-underline">Pair with Github CoPilot</a> 🚀</p>
<h3 id="heading-sync-and-collaborate">Sync and collaborate</h3>
<p><a href="/doc/connect/sync-and-collaborate/gdrive" class="document-link text-primary underline hover:no-underline">GDrive</a> 🫱🏽‍🫲🏼</p>
<h3 id="heading-dev">Dev</h3>
<p><a href="/doc/connect/dev/hillnote-npm" class="document-link text-primary underline hover:no-underline">Hillnote NPM</a> 🔧</p>
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
