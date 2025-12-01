// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'About the Editor | Hillnote Documentation',
  description: 'Hillnote editor overview: Features include markdown editing, scratch spaces, sidebar navigation, formatting tools, document linking, and source mode for advanced users.',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, references, links, documentation, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'About the Editor',
    description: 'Hillnote editor overview: Features include markdown editing, scratch spaces, sidebar navigation, formatting tools, document linking, and source mode for advanced users.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/about-the-editor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About the Editor',
    description: 'Hillnote editor overview: Features include markdown editing, scratch spaces, sidebar navigation, formatting tools, document linking, and source mode for advanced users.',
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
    canonical: '/doc/about-the-editor'
  }
}

// Document information
const documentPath = 'documents/About the Editor.md'
const documentTitle = 'About the Editor'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "About the Editor",
  "description": "Hillnote editor overview: Features include markdown editing, scratch spaces, sidebar navigation, formatting tools, document linking, and source mode for advanced users.",
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
    "@id": "/doc/about-the-editor"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-the-editor-"><strong><mark>The editor 📝</mark></strong></h1>
<blockquote>
<p><strong>PRO TIP:</strong> You can use the Table of contents ( 𝍌 in the top bar ) to the side to easily navigate if you have any specific areas of interest</p>
</blockquote>
<h2 id="heading-basics"><strong>Basics</strong></h2>
<ol>
<li><p>Toggle between light mode and dark mode by clicking the ☼ / ☾ section in Settings</p>
</li>
<li><p>The <strong>format bar up top</strong> should be self explanatory, some cool features we do have is a <strong>youtube embed, AI Generation, Scratch space</strong> - You can remove the format bar in settings 🎈</p>
</li>
<li><p>There is also a <strong>word count</strong> at the bottom</p>
</li>
<li><p><strong>Enter a &quot;/&quot; anywhere</strong> to see the inline commands (these tend to be the same commands as the format bar up top)</p>
</li>
</ol>
<img src="/Welcome to Hillnote! /resources/images/About the Editor/1758027087094.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-context-menus">Context menu&#39;s</h2>
<p><mark>Select this text</mark></p>
<div class="scratch-space rounded-md border border-dashed border-border bg-muted/10">
  <details class="group">
    <summary class="flex items-center justify-between p-2 cursor-pointer hover:bg-muted/20 transition-colors">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 transition-transform group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span class="text-sm text-muted-foreground">An explanation</span>
      </div>
    </summary>
    <div class="px-4 pb-4 prose prose-sm dark:prose-invert max-w-none">
      <h3 id="heading-selecting-any-text-displays-a-contextual-menu-offering-options-to">Selecting any text displays a contextual menu offering options to…</h3>
<ol>
<li><p><mark>Highlight</mark></p>
</li>
<li><p><strong>Bold</strong></p>
</li>
<li><p><em>italics</em></p>
</li>
<li><p>Underline</p>
</li>
<li><p><del>Strike through</del></p>
</li>
<li><p>Add some <code>code</code></p>
</li>
<li><p>Add a link to a <a href="https://www.hillnote.com" target="_blank" rel="noopener noreferrer">website</a></p>
</li>
<li><p>Change the <span style="color:#2563eb">colour</span> of <span style="color:#dc2626">text</span></p>
</li>
<li><p>Edit text inline with AI</p>
</li>
</ol>
    </div>
  </details>
</div>

<h2 id="heading-shortcuts"><strong>Shortcuts</strong></h2>
<table>
<thead>
<tr>
<th><strong>Key</strong></th>
<th><strong>Action</strong></th>
</tr>
</thead>
<tbody><tr>
<td>cmd/ctrl + S</td>
<td>Save file</td>
</tr>
<tr>
<td>cmd/ctrl + Z</td>
<td>Undo</td>
</tr>
<tr>
<td>Shift + cmd/ctrl + Z</td>
<td>Redo</td>
</tr>
<tr>
<td>/</td>
<td>inline commands</td>
</tr>
<tr>
<td>1.</td>
<td>Start numbered bullets</td>
</tr>
<tr>
<td>enter (when in bullet points)</td>
<td>Next bullet point</td>
</tr>
<tr>
<td>cmd/ctrl + F</td>
<td>Search</td>
</tr>
<tr>
<td>cmd/ctrl + shift + T</td>
<td>Table of contents</td>
</tr>
</tbody></table>
<h2 id="heading-document-links"><strong>Document links</strong></h2>
<p>In Hillnote you can link documents to go to pages like the <a href="/doc/start-here" class="document-link text-primary underline hover:no-underline">Start Here</a> page you probably were just on.<br>Click on the link to <strong>go to the document.</strong></p>
<h2 id="heading-scratch-spaces"><strong>Scratch Spaces</strong></h2>
<p>Need a quiet space to work things out, think through ideas, or just do some private brainstorming?</p>
<div class="scratch-space rounded-md border border-dashed border-border bg-muted/10">
  <details class="group">
    <summary class="flex items-center justify-between p-2 cursor-pointer hover:bg-muted/20 transition-colors">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 transition-transform group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span class="text-sm text-muted-foreground">That's what scratch spaces are for!</span>
      </div>
    </summary>
    <div class="px-4 pb-4 prose prose-sm dark:prose-invert max-w-none">
      <p>Your private thoughts go here. Also you can collapse and expand scratch spaces.</p>
    </div>
  </details>
</div>

<h2 id="heading-import-and-export-options"><strong>Import and Export options</strong></h2>
<p>In Hillnote you can export documents either as a HTML by clicking on the 3 dot menu above.</p>
<img src="/Welcome to Hillnote! /resources/images/About the Editor/1757046094557.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-navigating-documents"><strong>Navigating documents</strong></h2>
<p>You can <strong>navigate between documents by using the sidebar</strong>. You can use the below icon to toggle the sidebar on and off. <img src="/Welcome to Hillnote! /resources/images/About the Editor/1755087137582.webp" alt="Screenshot 2025-08-13 at 5.41.48 PM.png" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />To <strong>create a new document or a folder</strong> to better organise the document press the ‘+’ symbol.</p>
<p><img src="/Welcome to Hillnote! /resources/images/About the Editor/1757014770498.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />You can also <strong>reorder the sidebar</strong> by dragging a file above or below</p>
<p><strong><img src="/Welcome to Hillnote! /resources/images/About the Editor/1757046033150.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" /></strong></p>
<h2 id="heading-word-count-and-time-to-read"><strong>Word count and time to read</strong></h2>
<p>Available at the bottom of the page.</p>
<img src="/Welcome to Hillnote! /resources/images/About the Editor/1755087180204.webp" alt="Screenshot 2025-08-13 at 5.42.55 PM.png" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<hr>
<h1 id="heading-the-sidebar-"><strong><mark>The sidebar 🧸</mark></strong></h1>
<p>You should see a few options in the top bar. These would be the sidebar options.</p>
<ol>
<li><p>💬 <strong>Chat</strong> - talk to your AI model.</p>
</li>
<li><p>👁️ <strong>Preview</strong> - You can open web pages or PDFs side-by-side with your text.</p>
</li>
<li><p>🔎 <strong>Search</strong> - Allows you to search the document for text or even answers.</p>
</li>
<li><p>𝍌 <strong>Table of contents</strong> - Breaks your document down to its headings to generate a table of contents you can use to navigate to relevant sections</p>
</li>
</ol>
<h2 id="heading-customising-the-options"><strong>Customising the options</strong></h2>
<p>You can customise the options to show and hide them in settings under <strong>editor settings</strong></p>
<p><strong><img src="/Welcome to Hillnote! /resources/images/About the Editor/1757014838182.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" /></strong></p>
<h1 id="heading-advanced-source-mode"><strong><mark>Advanced: Source mode</mark></strong></h1>
<p>All files in Hillnote are stored in the universally accessible format <strong>Markdown 👇🏽</strong></p>
<div class="resource-html-container w-full my-3">
  <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors">
    <div class="flex items-center gap-3 flex-1">
      <span class="text-blue-500 text-lg">🌐</span>
      <span class="font-medium text-foreground text-sm">What is Markdown? ( Press the 👁️ to close )</span>
    </div>
    <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  </a>
</div>

<h3 id="heading-to-view-the-raw-markdown-format">To view the RAW markdown format</h3>
<p>Click on the <strong><mark>&lt;/&gt;</mark></strong> button to enter source mode. Here you can directly edit the file or edit the syntax to change formatting. Markdown was designed to be human readable so its easy to read/edit once you get the hang of it.</p>
<img src="/Welcome to Hillnote! /resources/images/About the Editor/1757046652027.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

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
      <div class="text-sm text-foreground/80"></div>
    </div>
  </div>` }} />
        </div>
      </div>
    </>
  )
}
