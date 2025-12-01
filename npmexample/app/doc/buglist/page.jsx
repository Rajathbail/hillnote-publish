// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Buglist | Hillnote Documentation',
  description: 'Have a bug to report?\nYou can write to us at hello@hillnote.com',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Buglist',
    description: 'Have a bug to report?\nYou can write to us at hello@hillnote.com',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/buglist',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buglist',
    description: 'Have a bug to report?\nYou can write to us at hello@hillnote.com',
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
    canonical: '/doc/buglist'
  }
}

// Document information
const documentPath = 'documents/Buglist.md'
const documentTitle = 'Buglist'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Buglist",
  "description": "Have a bug to report?\nYou can write to us at hello@hillnote.com",
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
    "@id": "/doc/buglist"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h2 id="heading-have-a-bug-to-report"><strong>Have a bug to report?</strong></h2>
<p>You can write to us at <a href="mailto:hello@hillnote.com" target="_blank" rel="noopener noreferrer">hello@hillnote.com</a></p>
<hr>
<h1 id="heading-known-bugs"><img src="/Welcome to Hillnote! /resources/images/Buglist/1758093255045.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />Known Bugs</h1>
<ul style="list-style: none;">
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Closing the app without quitting removes all of the workspaces</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Emoji&#39;s during rename default to cactus always</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>App Crashes when the sidebar(chat, TOC, etc) is opened in the empty state</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>React dialog used instead of ui dialog in Navigation sidebar</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Auto-save instead of user pressing cmd+s manually - <strong>will work on this</strong></p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Emojis randomly disappear some times in NavigationSidebar</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Third column of task lists don&#39;t work</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Top bar + format toolbar loose stickiness when an image is inserted</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>When a new document is created the editor does not switch to it</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Align tools don&#39;t make sense</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Subscript and superscript not supported</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Extra lines appear at the end of document links</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Paste does not work in TipTap editor</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>AI chat text is broken in dark theme</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Need to completely remove nomic-embed</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Resolve email ID in comments</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Credit refresh after login to use premium models</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Export as HTML to use superior renderer in hillnote-wiki</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Remove MCP redundancies</p>
<ul style="list-style: none;">
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Edit doc</li>
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Delete section</li>
</ul>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m8 12 4 4 7-7" stroke="white" fill="none"/></svg>Ability to edit the tabs</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Pasting text in dark mode, text is not seen.</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Header columns are not stored in the Markdown</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Can’t write &#39;@&#39; without pasting HTML or triggering the document linking</p>
</li>
</ul>
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
