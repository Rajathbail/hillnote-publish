// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Get in touch | Hillnote Documentation',
  description: 'Hillnote encourages user feedback and contributions via email, promoting AIs role in future development.',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Get in touch',
    description: 'Hillnote encourages user feedback and contributions via email, promoting AIs role in future development.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/get-in-touch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get in touch',
    description: 'Hillnote encourages user feedback and contributions via email, promoting AIs role in future development.',
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
    canonical: '/doc/get-in-touch'
  }
}

// Document information
const documentPath = 'documents/Get in touch.md'
const documentTitle = 'Get in touch'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Get in touch",
  "description": "Hillnote encourages user feedback and contributions via email, promoting AIs role in future development.",
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
    "@id": "/doc/get-in-touch"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h3 id="heading-need-to-talk-or-have-features-youd-like-to-see"><strong>Need to talk or have features you&#39;d like to see?</strong></h3>
<p>You can write to me at <a href="mailto:hello@hillnote.com" target="_blank" rel="noopener noreferrer">hello@hillnote.com</a></p>
<p>Thank you so much for trying Hillnote and for your support. I believe AI has a huge role to play in the coming future and this is one way I see how.</p>
<p>If there&#39;s anything you&#39;d like to add, contribute or suggest please do reach out.</p>
<img src="/Welcome to Hillnote! /resources/images/Get in touch/1758028394382.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

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
          
          <div className="px-4 sm:px-8 md:px-12" dangerouslySetInnerHTML={{ __html: `
  <div class="mt-12 border-t pt-8">
    <h2 class="text-xl font-semibold mb-4">Author's Notes</h2>
    
    <div class="border-l-2 border-muted-foreground/20 pl-4 mb-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="font-medium text-sm">Rajath Bail</span>
        <span class="text-xs text-muted-foreground">5/9/2025</span>
      </div>
      <div class="text-sm text-foreground/80"><p>I hope Hillnote helps you create something wonderful! 🚀</p></div>
    </div>
  </div>` }} />
        </div>
      </div>
    </>
  )
}
