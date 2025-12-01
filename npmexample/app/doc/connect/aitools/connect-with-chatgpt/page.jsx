// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Connect with ChatGPT | Hillnote Documentation',
  description: 'My favourite way to work with ChatGPT is to\nChatGPT only allows for custom extensions for ChatGPT Pro or enterprise users',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Connect with ChatGPT',
    description: 'My favourite way to work with ChatGPT is to\nChatGPT only allows for custom extensions for ChatGPT Pro or enterprise users',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connect/aitools/connect-with-chatgpt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect with ChatGPT',
    description: 'My favourite way to work with ChatGPT is to\nChatGPT only allows for custom extensions for ChatGPT Pro or enterprise users',
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
    canonical: '/doc/connect/aitools/connect-with-chatgpt'
  }
}

// Document information
const documentPath = 'documents/Connect/aitools/Connect with ChatGPT.md'
const documentTitle = 'Connect with ChatGPT'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Connect with ChatGPT",
  "description": "My favourite way to work with ChatGPT is to\nChatGPT only allows for custom extensions for ChatGPT Pro or enterprise users",
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
    "@id": "/doc/connect/aitools/connect-with-chatgpt"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h2 id="heading-my-favourite-way-to-work-with-chatgpt-is-to"><img src="/Welcome to Hillnote! /resources/images/Connect with ChatGPT/1758049421570.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />My favourite way to work with ChatGPT is to</h2>
<p><strong><mark>ChatGPT only allows for custom extensions for ChatGPT Pro or enterprise users</mark></strong></p>
<ol>
<li><p>use the <strong>ChatGPT Desktop app (Requires ChatGPT Pro)</strong> for general tasks with MCP enabled to Hillnote</p>
</li>
<li><p><strong>Sync my files to Google-drive</strong> and connect it with my <strong>ChatGPT app</strong> to continue conversations in mobile on the move</p>
</li>
</ol>
<h3 id="heading-chatgpt-desktop">ChatGPT Desktop</h3>
<ol>
<li><p>Linking Hillnote with ChatGPT desktop is easy</p>
<ol>
<li><p>Copy the configuration code</p>
</li>
<li><p>ChatGPT &gt; Settings &gt; Connectors &gt; Custom</p>
</li>
</ol>
</li>
<li><p>Once configured restart ChatGPT</p>
</li>
<li><p>Verify the connection by asking ChatGPT to list your workspaces</p>
</li>
</ol>
<blockquote>
<p>An alternative is to connect your Google Drive/Github to ChatGPT and then sync your files via there, While you can’t edit files - you will be able to read and reference files easily</p>
</blockquote>
<img src="/Welcome to Hillnote! /resources/images/Connect with ChatGPT/1757250791096.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-chatgpt-projects">ChatGPT Projects</h3>
<ol>
<li><p>Once you have a certain set of documents ready to use as permanent reference you can upload the .md files directly to ChatGPT within a “Project space”. These <strong>documents will then be referenced in all future responses giving you a great project assistant to speak with (even on mobile when you’re on the move.)</strong></p>
</li>
<li><p>You can always ask ChatGPT to prepare a document for you and then <strong>simply save the document within your workspace/documents</strong> to then have it immediately appear within your Hillnote workspace.</p>
</li>
</ol>
<img src="/Welcome to Hillnote! /resources/images/Connect with ChatGPT/1757250855677.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-via-another-app">Via another app</h3>
<p>Apps like <strong>Google Drive, Github</strong> can be used to sync your files and connect them to your ChatGPT account as a connector. This allows ChatGPT to reference documents, allows you to attach documents, etc directly from the cloud system.</p>
<img src="/Welcome to Hillnote! /resources/images/Connect with ChatGPT/1757250906896.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />`

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
