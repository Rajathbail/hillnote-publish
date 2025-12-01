// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Connect with Claude  | Hillnote Documentation',
  description: 'My favourite way to work with Claude is to',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Connect with Claude ',
    description: 'My favourite way to work with Claude is to',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connect/aitools/connect-with-claude',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect with Claude ',
    description: 'My favourite way to work with Claude is to',
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
    canonical: '/doc/connect/aitools/connect-with-claude'
  }
}

// Document information
const documentPath = 'documents/Connect/aitools/Connect with Claude .md'
const documentTitle = 'Connect with Claude '

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Connect with Claude ",
  "description": "My favourite way to work with Claude is to",
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
    "@id": "/doc/connect/aitools/connect-with-claude"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h2 id="heading-my-favourite-way-to-work-with-claude-is-to"><img src="/Welcome to Hillnote! /resources/images/Connect with Claude /1758049431850.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />My favourite way to work with Claude is to</h2>
<ol>
<li><p>use the <strong>Claude Desktop app</strong> for general tasks with MCP enabled to Hillnote &amp; Filesystem</p>
</li>
<li><p><strong>Claude Code</strong> for execution within the cursor IDE with MCP enabled to Hillnote</p>
</li>
<li><p><strong>Sync my files to Google drive</strong> and connect it with my <strong>Claude app</strong> to continue conversations in mobile on the move</p>
</li>
</ol>
<img src="/Welcome to Hillnote! /resources/images/Connect with Claude /1757140084127.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-claude-desktop">Claude Desktop</h3>
<ol>
<li><p>Linking Hillnote with Claude desktop is a single button click in settings &gt; MCP &gt; connect with Claude &gt; Auto configure</p>
</li>
<li><p>Once configured restart Claude</p>
</li>
<li><p>Verify the connection by asking Claude to list your workspaces</p>
</li>
</ol>
<img src="/Welcome to Hillnote! /resources/images/Connect with Claude /1757139392606.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-claude-code">Claude Code</h3>
<ol>
<li><p><strong>Connect the MCP with Claude Code:</strong> <a href="https://docs.anthropic.com/en/docs/claude-code/mcp" target="_blank" rel="noopener noreferrer">https://docs.anthropic.com/en/docs/claude-code/mcp</a> is a great article to refer to</p>
</li>
<li><p><strong>Open the workspace in Claude Code:</strong> Navigate to the workspace folder - open the same in claude code and you are good to go</p>
</li>
<li><p><strong>Embed the Hillnote workspace in your project/code folder as notes.</strong> You can pair it with Github to keep it in sync across your team as well!</p>
</li>
</ol>
<h3 id="heading-claude-projects">Claude Projects</h3>
<ol>
<li><p>Once you have a certain set of documents ready to use as permanent reference you can upload the .md files directly to Claude within a “Project space”. These <strong>documents will then be referenced in all future responses giving you a great project assistant to speak with (even on mobile when you’re on the move.)</strong></p>
</li>
<li><p>You can always ask Claude to prepare a document for you and then <strong>simply save the document within your workspace/documents</strong> to then have it immediately appear within your Hillnote workspace.</p>
</li>
</ol>
<img src="/Welcome to Hillnote! /resources/images/Connect with Claude /1757140131231.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-via-another-app">Via another app</h3>
<p>Apps like <strong>Google Drive, Github</strong> can be used to sync your files and connect them to your Claude account as a connector. This allows Claude to reference documents, allows you to attach documents, etc directly from the cloud system.</p>
<img src="/Welcome to Hillnote! /resources/images/Connect with Claude /1757140084127.webp" alt="" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />`

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
