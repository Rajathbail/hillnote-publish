// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Roadmap  | Hillnote Documentation',
  description: 'Product Roadmap',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Roadmap ',
    description: 'Product Roadmap',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/roadmap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roadmap ',
    description: 'Product Roadmap',
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
    canonical: '/doc/roadmap'
  }
}

// Document information
const documentPath = 'documents/Roadmap .md'
const documentTitle = 'Roadmap '

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Roadmap ",
  "description": "Product Roadmap",
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
    "@id": "/doc/roadmap"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-product-roadmap">Product Roadmap</h1>
<img src="/Welcome to Hillnote! /resources/images/Roadmap /1758084821186.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<hr>
<h1 id="heading-recently-released"><strong>Recently Released</strong></h1>
<p><mark>Last release: 25 September 2025</mark></p>
<h3 id="heading-product">Product</h3>
<p>Added Gemini 2.5 Pro and 2.5 Flash to the premium models available</p>
<h3 id="heading-other">Other</h3>
<p><strong>Hillnote NPM</strong> now has API’s to retrieve content</p>
<hr>
<h1 id="heading-in-development"><strong>In development</strong></h1>
<p><mark>Expect these in the next 1-3 months</mark></p>
<h3 id="heading-product-features">Product Features</h3>
<ul style="list-style: none;">
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Kanban view in document registry</li>
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Gemini integration</li>
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Grok integration</li>
</ul>
<h3 id="heading-product-distribution">Product Distribution</h3>
<ul style="list-style: none;">
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Windows version</li>
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Linux version</li>
</ul>
<h3 id="heading-website">Website</h3>
<ul style="list-style: none;">
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Google login</li>
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Credit purchase system</li>
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Add known bugs to website</li>
</ul>
<hr>
<h1 id="heading-pipeline"><strong>Pipeline</strong></h1>
<p><mark>No timeline set</mark></p>
<h3 id="heading-product-features-1">Product Features</h3>
<ul style="list-style: none;">
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Calendar integration</li>
</ul>
<h3 id="heading-product-distribution-1">Product Distribution</h3>
<ul style="list-style: none;">
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>iOS release</li>
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Android release</li>
</ul>
<hr>
<h3 id="heading-need-to-talk-or-have-features-youd-like-to-see"><strong>Need to talk or have features you&#39;d like to see?</strong></h3>
<p>You can write to us at <a href="mailto:hello@hillnote.com" target="_blank" rel="noopener noreferrer">hello@hillnote.com</a></p>
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
