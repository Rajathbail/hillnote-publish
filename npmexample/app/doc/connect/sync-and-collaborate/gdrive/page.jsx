// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'GDrive | Hillnote Documentation',
  description: 'My favourite way to work with Google drive is to',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'GDrive',
    description: 'My favourite way to work with Google drive is to',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/connect/sync-and-collaborate/gdrive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDrive',
    description: 'My favourite way to work with Google drive is to',
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
    canonical: '/doc/connect/sync-and-collaborate/gdrive'
  }
}

// Document information
const documentPath = 'documents/Connect/Sync and collaborate/GDrive.md'
const documentTitle = 'GDrive'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "GDrive",
  "description": "My favourite way to work with Google drive is to",
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
    "@id": "/doc/connect/sync-and-collaborate/gdrive"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h2 id="heading-my-favourite-way-to-work-with-google-drive-is-to"><img src="/Welcome to Hillnote! /resources/images/GDrive/1758049690274.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />My favourite way to work with Google drive is to</h2>
<ol>
<li><p>Use the Google Drive app to have a folder in my laptop that syncs via the drive</p>
</li>
<li><p>Store all workspaces in the drive folder</p>
</li>
<li><p>Share individual workspaces as I see fit.</p>
</li>
<li><p>Connecting Google drive to an AI assistant of my choice (Claude, Open AI, etc)</p>
</li>
</ol>
<h2 id="heading-google-drive-app">Google Drive App</h2>
<p>Install the app onto your system and setup the folder on your machine.</p>
<p><img src="/Welcome to Hillnote! /resources/images/GDrive/1757258709552.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />Make sure to right click on your workspace folder and select “Make available offline”. This will keep your workspaces fast when opening in Hillnote.</p>
<img src="/Welcome to Hillnote! /resources/images/GDrive/1757258845744.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-collaborate">Collaborate</h2>
<h3 id="heading-share">Share</h3>
<p><strong>Share with individuals:</strong> Click on share and add individual emails to share the workspace with.</p>
<p><strong>Share with the team:</strong> If using a team space or drive for enterprise make sure to add your files in shared drives to share it across the team.</p>
<img src="/Welcome to Hillnote! /resources/images/GDrive/1757259013449.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-add-to-your-drive">Add to your drive</h3>
<p>Make sure to add the shared workspace to your drive by dragging and dropping it to your drive. This will make it visible in your local machine.</p>
<img src="/Welcome to Hillnote! /resources/images/GDrive/1757259119695.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-audit">Audit</h3>
<p>You can view activity by clicking on the 3 dot menu &gt; file information &gt; activity</p>
<img src="/Welcome to Hillnote! /resources/images/GDrive/1757259170228.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-handling-conflict">Handling Conflict</h2>
<p>When there’s conflict in a Google drive file (usually when some edits are made offline by 2 users on the same file) a second file is created with a “conflict” suffix. You can resolve the conflict manually.</p>
<h2 id="heading-connect-to-other-apps">Connect to other apps</h2>
<p><strong>Google drive connects</strong> to Claude, ChatGPT, Perplexity, etc via connectors which provides access to all synced files to the assistant. This is great when working on the move and accessing the files via your phone and other devices.</p>
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
