// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Pair with Github CoPilot | Hillnote Documentation',
  description: 'My favourite way to work with Github CoPilot is to',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Pair with Github CoPilot',
    description: 'My favourite way to work with Github CoPilot is to',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connect/pair-with/pair-with-github-copilot',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pair with Github CoPilot',
    description: 'My favourite way to work with Github CoPilot is to',
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
    canonical: '/doc/connect/pair-with/pair-with-github-copilot'
  }
}

// Document information
const documentPath = 'documents/Connect/Pair with/Pair with Github CoPilot.md'
const documentTitle = 'Pair with Github CoPilot'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Pair with Github CoPilot",
  "description": "My favourite way to work with Github CoPilot is to",
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
    "@id": "/doc/connect/pair-with/pair-with-github-copilot"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h2 id="heading-my-favourite-way-to-work-with-github-copilot-is-to"><img src="/Welcome to Hillnote! /resources/images/Pair with Github CoPilot/1758049559001.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />My favourite way to work with Github CoPilot is to</h2>
<ol>
<li><p>Use <strong>VScode + Copilot</strong> for project files with MCP enabled to Hillnote.</p>
</li>
<li><p>Add the Hillnote workspace within your <strong>VScode</strong> project as reference or notes.</p>
</li>
<li><p>Sync the Workspace along with the project via Github.</p>
</li>
<li><p>Setup a <strong>Copilot</strong> Rule in settings to write all documents/.md files in <code>&lt;workspace folder name&gt;/documents/copilotDocs</code></p>
</li>
</ol>
<h2 id="heading-mcp-connection">MCP connection</h2>
<p>To enable the MCP connection to hillnote read the documents available at <a href="https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/extend-copilot-chat-with-mcp" target="_blank" rel="noopener noreferrer">https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/extend-copilot-chat-with-mcp</a></p>
<h2 id="heading-readme-rules">Readme rules</h2>
<p>Save all documentation created in Copilot to Hillnote to keep your work organized and easy to find.</p>
<p>Simply add a Copilot Rule in settings to write all documents/.md files in <code>&lt;workspace folder name&gt;/documents/copilotDocs</code></p>
<h2 id="heading-open-your-workspace">Open your workspace</h2>
<p>You can navigate to the workspace folder - open the same in <strong>VScode</strong>. You can make changes, modify files and even create tools using Copilot.</p>
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
