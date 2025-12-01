// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Using AI in Hillnote | Hillnote Documentation',
  description: 'Hillnote empowers users to utilize AI models for document editing, content generation, and offline assistance via a library interface with tools like spellcheck, prompts, and deep thinking mode.',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Using AI in Hillnote',
    description: 'Hillnote empowers users to utilize AI models for document editing, content generation, and offline assistance via a library interface with tools like spellcheck, prompts, and deep thinking mode.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/using-ai-in-hillnote',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Using AI in Hillnote',
    description: 'Hillnote empowers users to utilize AI models for document editing, content generation, and offline assistance via a library interface with tools like spellcheck, prompts, and deep thinking mode.',
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
    canonical: '/doc/using-ai-in-hillnote'
  }
}

// Document information
const documentPath = 'documents/Using AI in Hillnote.md'
const documentTitle = 'Using AI in Hillnote'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Using AI in Hillnote",
  "description": "Hillnote empowers users to utilize AI models for document editing, content generation, and offline assistance via a library interface with tools like spellcheck, prompts, and deep thinking mode.",
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
    "@id": "/doc/using-ai-in-hillnote"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-ai-in-hillnote-"><strong><mark>AI in Hillnote 🚀</mark></strong></h1>
<h3 id="heading-setup-and-getting-started-with-ai"><strong>Setup and Getting started with AI</strong></h3>
<p>Hillnote empowers you to take control of your AI, and you don’t need to set everything up at once. Begin by exploring the <strong>AI Tab in the Library</strong></p>
<p><img src="/Welcome to Hillnote! /resources/images/Make it yours/1757064527325.webp" alt="" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />You’ll discover a wide range of AI models to choose from. Pick the one that suits your needs and download it immediately! Before you start, be sure to check its performance rating on your machine for the best results.</p>
<hr>
<h2 id="heading-using-the-ai"><strong><mark>Using the AI</mark></strong></h2>
<p>Once its downloaded, open a document and you’re ready to get started. <strong>It works even when you&#39;re offline 😉</strong></p>
<blockquote>
<p><em>The AI model also has a view of the document you are writing so it takes that into account as context for all of its replies.</em></p>
</blockquote>
<hr>
<h3 id="heading-in-the-editor"><strong>In the editor</strong></h3>
<p>You can <strong>access the AI options</strong> by selecting any piece of text to pull up the context menu</p>
<p><img src="/Welcome to Hillnote! /resources/images/Using AI in Hillnote/1757066278633.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" /><strong>The Sparkle ✨</strong> fixes both spellings and grammar of the selected text and replaces the same</p>
<blockquote>
<p>Try it on this <mark>sentece</mark> - select the sentence or word and click the sparkle icon to fix it!</p>
</blockquote>
<p><strong>The wand</strong> helps run a set of pre-defined prompts</p>
<blockquote>
<p><em>Pro tip: You could add one of your own prompts here in settings</em></p>
</blockquote>
<p><img src="/Welcome to Hillnote! /resources/images/Make it yours/1757065141007.webp" alt="" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" /><strong>The type</strong> helps run a custom prompt on the selected text</p>
<blockquote>
<p><em>Pro tip: Deep thinking may take longer but is great with local models you need a more elaborate response</em></p>
</blockquote>
<img src="/Welcome to Hillnote! /resources/images/Using AI in Hillnote/1757066528705.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<hr>
<h3 id="heading-in-the-sidebar"><strong>In the Sidebar</strong></h3>
<p><strong>Chat</strong> allows you to talk directly to your AI assistant. You can add any text there directly to your editor and even add it to context for the AI to refer to later.</p>
<img src="/Welcome to Hillnote! /resources/images/Using AI in Hillnote/1757066574190.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-search-your-workspaces-for-an-answer"><strong>Search your workspaces for an answer</strong></h3>
<p>You can also directly talk to your entire library by using the AI search feature within the Library screen – simply type your question and get instant answers.</p>
<img src="/Welcome to Hillnote! /resources/images/Using AI in Hillnote/1757066679967.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-ai-generation"><strong>AI generation</strong></h3>
<p>Need a fresh document and a starting point? Perhaps you’re looking for a draft, a creative prompt, or even want to weave in a winter-themed poem? AI generation allows you to directly create text from your AI model.</p>
<img src="/Welcome to Hillnote! /resources/images/Using AI in Hillnote/1757066642307.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-inline-ai-generation">Inline AI generation</h3>
<p>You can press ‘/’ and continue typing to generate content from your local AI model</p>
<img src="/Welcome to Hillnote! /resources/images/Using AI in Hillnote/1757066809795.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-deep-thinking-mode"><strong>Deep thinking mode</strong></h3>
<p>Deep thinking mode is a great way to generate more elaborate responses and to get detailed answers out of your AI. You&#39;ll find it littered everywhere. Do keep in mind that these tend to take longer and requires a few minutes atleast.</p>
<img src="/Welcome to Hillnote! /resources/images/Using AI in Hillnote/1757066851925.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />`

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
