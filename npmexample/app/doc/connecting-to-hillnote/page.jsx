// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Connecting to Hillnote | Hillnote Documentation',
  description: 'Hillnote facilitates seamless integration of local and premium AI models with document commenting and a pay-as-you-go credit system.',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Connecting to Hillnote',
    description: 'Hillnote facilitates seamless integration of local and premium AI models with document commenting and a pay-as-you-go credit system.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connecting-to-hillnote',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connecting to Hillnote',
    description: 'Hillnote facilitates seamless integration of local and premium AI models with document commenting and a pay-as-you-go credit system.',
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
    canonical: '/doc/connecting-to-hillnote'
  }
}

// Document information
const documentPath = 'documents/Connecting to Hillnote.md'
const documentTitle = 'Connecting to Hillnote'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Connecting to Hillnote",
  "description": "Hillnote facilitates seamless integration of local and premium AI models with document commenting and a pay-as-you-go credit system.",
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
    "@id": "/doc/connecting-to-hillnote"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-connecting-to-hillnotecom"><strong>Connecting to</strong> <a href="http://Hillnote.com" target="_blank" rel="noopener noreferrer"><strong><mark>Hillnote.com</mark></strong></a></h1>
<img src="/Welcome to Hillnote! /resources/images/Connecting to Hillnote/1757069348844.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<p>You can login to your Hillnote account which then gives you access to additional features</p>
<h2 id="heading-premium-models"><strong>Premium models</strong></h2>
<p>Seamlessly integrate local models with powerful premium options like ChatGPT and Claude throughout your workflow. Select the most robust model – whether it’s a local option or a premium service – to tackle complex or demanding projects with maximum impact.</p>
<img src="/Welcome to Hillnote! /resources/images/Make it yours/1757064764789.webp" alt="" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-comments"><strong>Comments</strong></h2>
<p>Comments allow you to locally embed documents with notes and pointers that are then accessible to all those who have access to the document.</p>
<img src="/Welcome to Hillnote! /resources/images/Connecting to Hillnote/1757067066009.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-privacy"><strong>Privacy</strong></h2>
<p>Connecting to <a href="http://Hillnote.com" target="_blank" rel="noopener noreferrer">Hillnote.com</a> does NOT give access to any of your work, documents or resources to the platform. The only data received or shared is the data made available to the premium models which are subject to the terms and conditions of the individual platforms.</p>
<h2 id="heading-credits"><strong>Credits</strong></h2>
<p>Hillnote offers a flexible, pay-as-you-go approach, letting you only pay for the features you utilize. Purchase credits directly at Hillnote.com and use them primarily to use premium models via the in-built chat.</p>
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
