// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Connect with Perplexity | Hillnote Documentation',
  description: 'My favourite way to work with Perplexity is to\nPerplexity only allows for connectors in the Mac App',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Connect with Perplexity',
    description: 'My favourite way to work with Perplexity is to\nPerplexity only allows for connectors in the Mac App',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connect/aitools/connect-with-perplexity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect with Perplexity',
    description: 'My favourite way to work with Perplexity is to\nPerplexity only allows for connectors in the Mac App',
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
    canonical: '/doc/connect/aitools/connect-with-perplexity'
  }
}

// Document information
const documentPath = 'documents/Connect/aitools/Connect with Perplexity.md'
const documentTitle = 'Connect with Perplexity'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Connect with Perplexity",
  "description": "My favourite way to work with Perplexity is to\nPerplexity only allows for connectors in the Mac App",
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
    "@id": "/doc/connect/aitools/connect-with-perplexity"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h2 id="heading-my-favourite-way-to-work-with-perplexity-is-to"><img src="/Welcome to Hillnote! /resources/images/Connect with Perplexity/1758049443363.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />My favourite way to work with Perplexity is to</h2>
<p><strong><mark>Perplexity only allows for connectors in the Mac App</mark></strong></p>
<ol>
<li><p><img src="/Welcome to Hillnote! /resources/images/Connect with Perplexity/1757145069017.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />use the <strong>Perplexity Desktop app</strong> for general tasks with MCP enabled to Hillnote &amp; Filesystem</p>
</li>
<li><p><strong>Sync my files to Google-drive</strong> and connect it with my <strong>Perplexity Account</strong> to continue conversations in mobile on the move</p>
</li>
</ol>
<h3 id="heading-perplexity-desktop-app">Perplexity Desktop App</h3>
<ol>
<li><p>Linking Hillnote with the Perplexity app is fairly simple and fairly well explained here: <a href="https://www.perplexity.ai/help-center/en/articles/11502712-local-and-remote-mcps-for-perplexity" target="_blank" rel="noopener noreferrer">https://www.perplexity.ai/help-center/en/articles/11502712-local-and-remote-mcps-for-perplexity</a></p>
<ol>
<li><p>Download the mac app</p>
</li>
<li><p>Go to connectors and download the additional package required</p>
</li>
<li><p>Click on Add connector and paste the configuration JSON into the required fields</p>
</li>
</ol>
</li>
<li><p>Once configured restart Perplexity</p>
</li>
<li><p>Verify the connection by asking Perplexity to list your workspaces</p>
</li>
</ol>
<img src="/Welcome to Hillnote! /resources/images/Connect with Perplexity/1757144864925.webp" alt="" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-perplexity-spaces">Perplexity Spaces</h3>
<ol>
<li><p>Once you have a certain set of documents ready to use as permanent reference you can upload the .md files directly to Perplexity within a “Space”. These <strong>documents will then be referenced in all future responses giving you a great project assistant to speak with (even on mobile when you’re on the move.)</strong></p>
</li>
<li><p>You can always ask Perplexity to prepare a document for you and then <strong>simply save the document within your workspace/documents</strong> to then have it immediately appear within your Hillnote workspace.</p>
</li>
</ol>
<img src="/Welcome to Hillnote! /resources/images/Connect with Perplexity/1757144978563.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-via-another-app">Via another app</h3>
<p>Apps like <strong>Google Drive, Github</strong> can be used to sync your files and connect them to your Perplexity account as a source. This allows Perplexity to reference documents, allows you to attach documents, etc directly from the cloud system.</p>
<img src="/Welcome to Hillnote! /resources/images/Connect with Perplexity/1757145093156.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />`

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
