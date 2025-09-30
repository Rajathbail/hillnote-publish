// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Use with Grok, Gemini, Deepseek and more | Hillnote Documentation',
  description: 'Grok, Deepseek Projects &amp; Gemini Gems',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Use with Grok, Gemini, Deepseek and more',
    description: 'Grok, Deepseek Projects &amp; Gemini Gems',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connect/aitools/use-with-grok-gemini-deepseek-and-more',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Use with Grok, Gemini, Deepseek and more',
    description: 'Grok, Deepseek Projects &amp; Gemini Gems',
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
    canonical: '/doc/connect/aitools/use-with-grok-gemini-deepseek-and-more'
  }
}

// Document information
const documentPath = 'documents/Connect/aitools/Use with Grok, Gemini, Deepseek and more.md'
const documentTitle = 'Use with Grok, Gemini, Deepseek and more'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Use with Grok, Gemini, Deepseek and more",
  "description": "Grok, Deepseek Projects &amp; Gemini Gems",
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
    "@id": "/doc/connect/aitools/use-with-grok-gemini-deepseek-and-more"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h2 id="heading-grok-deepseek-projects--gemini-gems"><img src="/Welcome to Hillnote! /resources/images/Use with Grok, Gemini, Deepseek and more/1758049473706.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />Grok, Deepseek Projects &amp; Gemini Gems</h2>
<ol>
<li><p>Once you have a certain set of documents ready to use as permanent reference you can upload the .md files directly to the assistant of your choice within a “Project/gem space”. These <strong>documents will then be referenced in all future responses giving you a great project assistant to speak with (even on mobile when you’re on the move.)</strong></p>
</li>
<li><p>You can always ask your assistance to prepare a .md document for you and then <strong>simply save the document within your workspace/documents</strong> to then have it immediately appear within your Hillnote workspace.</p>
</li>
</ol>
<h3 id="heading-via-another-app">Via another app</h3>
<p>Some assistants can connect with your apps like <strong>Google Drive, Github</strong> to sync your files directly to the platform. This allows the assistant to reference documents, allows you to attach documents, etc directly from the cloud system.</p>
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
