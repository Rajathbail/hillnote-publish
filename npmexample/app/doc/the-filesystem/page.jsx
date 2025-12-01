// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'The Filesystem | Hillnote Documentation',
  description: 'Hillnote facilitates AI agent workflows by organizing local files with workspaces, documents, and a registry for context and navigation.',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'The Filesystem',
    description: 'Hillnote facilitates AI agent workflows by organizing local files with workspaces, documents, and a registry for context and navigation.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/the-filesystem',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Filesystem',
    description: 'Hillnote facilitates AI agent workflows by organizing local files with workspaces, documents, and a registry for context and navigation.',
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
    canonical: '/doc/the-filesystem'
  }
}

// Document information
const documentPath = 'documents/The Filesystem.md'
const documentTitle = 'The Filesystem'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Filesystem",
  "description": "Hillnote facilitates AI agent workflows by organizing local files with workspaces, documents, and a registry for context and navigation.",
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
    "@id": "/doc/the-filesystem"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-an-overview-of-the-local-files"><mark>An overview of the local files</mark></h1>
<img src="/Welcome to Hillnote! /resources/images/Start Here /1755083595272.webp" alt="" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<p>Hillnote being a local first editor has a very intentional method to how it stored files. The idea is to keep it easy to manage while also providing all the context and resources to any AI agent that enters the workspace.</p>
<p>While we still a little ways out when it comes to true AI agentic software built right into our file management software I do think its close<sup>1</sup> so consider this as prep for when it happens. In the meantime however software like Claude Code, Claude desktop, Cursor, Copilot, Open AI, etc work great with the structure provided.</p>
<h3 id="heading--workspaces">📕 Workspaces</h3>
<p>Project workspaces serve as dedicated storage areas for your files and resources. You can choose to organize these workspaces across different locations on your computer, either grouping them together or keeping them separate based on your preferences. Think of a workspace as a master container that houses all your project-related content.</p>
<h3 id="heading--documents">📁 Documents</h3>
<p>The documents folder is where all documents are housed. Its where each file you see in this editor is present.</p>
<h3 id="heading--document-registry">📄 Document registry</h3>
<p>A centralized registry that contains essential information like document definitions and file paths, helping both AI models and Hillnote navigate and understand your workspace structure.</p>
<h3 id="heading--readme">📄 Readme</h3>
<p>This file serves as a guide that helps AI models understand the workspace and project structure, providing essential context to ensure they can navigate the directory effectively and work in the intended direction.</p>
<h3 id="heading--resources">📁 Resources</h3>
<p>All supporting materials to your documents like tools, PDF’s, Images or even files you want to store can be stored here. Its where anything that is not a document is stored.</p>
<h2 id="heading-reveal-in-finder">Reveal in finder</h2>
<p>Pretty self explanatory really but you can open a file in your machines file system manager by clicking on reveal in finder within the 3 dot menu in the sidebar.</p>
<img src="/Welcome to Hillnote! /resources/images/The Filesystem/1757070687980.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

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
      <div class="text-sm text-foreground/80"><p>As with all things AI - everything changes so rapidly that I feel the need to mention that I wrote [1] on September 5th 2025. Don&#39;t know if this still holds up. </p></div>
    </div>
  </div>` }} />
        </div>
      </div>
    </>
  )
}
