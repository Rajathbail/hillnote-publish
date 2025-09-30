// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Juuuuuuust the right Tool | Hillnote Documentation',
  description: 'Hillnote tools are customizable HTML programs created via AI assistants to automate tasks and enhance workflow within the Hillnote workspace.',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Juuuuuuust the right Tool',
    description: 'Hillnote tools are customizable HTML programs created via AI assistants to automate tasks and enhance workflow within the Hillnote workspace.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/juuuuuuust-the-right-tool',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juuuuuuust the right Tool',
    description: 'Hillnote tools are customizable HTML programs created via AI assistants to automate tasks and enhance workflow within the Hillnote workspace.',
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
    canonical: '/doc/juuuuuuust-the-right-tool'
  }
}

// Document information
const documentPath = 'documents/Juuuuuuust the right Tool.md'
const documentTitle = 'Juuuuuuust the right Tool'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Juuuuuuust the right Tool",
  "description": "Hillnote tools are customizable HTML programs created via AI assistants to automate tasks and enhance workflow within the Hillnote workspace.",
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
    "@id": "/doc/juuuuuuust-the-right-tool"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-tools-in-hillnote"><mark>Tools in Hillnote</mark></h1>
<p>Tools are little programs that can be written by most AI assistants to help you with simple tasks and to automate your workflow.</p>
<div class="resource-html-container w-full my-3">
  <a href="/Welcome to Hillnote! /resources/html/utilities/meeting-time-finder/index.html" target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-muted/30 border border-border rounded-lg hover:bg-muted/50 transition-colors">
    <div class="flex items-center gap-3 flex-1">
      <span class="text-blue-500 text-lg">🌐</span>
      <span class="font-medium text-foreground text-sm">An example tool (Meeting planner) - Press the 👁️ to close</span>
    </div>
    <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  </a>
</div>

<p>Need that tool to help you calculate the right timezone?<br>or a tool to be create a random 21 digit number?<br>or maybe its something to convert your image into hex values?<br><strong>Just add a tool for it to your workspace!</strong></p>
<hr>
<blockquote>
<p>Sometimes the best tool is the one only you would think to make.</p>
</blockquote>
<img src="/Welcome to Hillnote! /resources/images/Juuuuuuust the right Tool/1758094613500.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<p>Your workspace gets more powerful the more tools you add. Just ask the assistant of your choice to build the tool and add it to your document to get started!</p>
<p><strong>Below is an example of a Tool I created to help me balance all the cards of my card game Hexhunt.</strong></p>
<img src="/Welcome to Hillnote! /resources/images/Juuuuuuust the right Tool/1757069379543.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<blockquote>
<p>Like artists who craft custom brushes and pens for their specific needs, Hillnote Tools lets you create personal tools that help you work in your own unique way.</p>
</blockquote>
<h2 id="heading-html-embed">HTML embed</h2>
<p>At their essence - all tools are webpages that can be run and embedded right within your document. If you downloaded a tool or HTML page - add it to your resources directory within a folder call “html”. Then using the / command you can link the same.</p>
<p>Clicking on it will open the page in the sidebar.</p>
<h2 id="heading-create-one"><mark>Create one</mark></h2>
<h3 id="heading-you-have-2-options-here">You have 2 options here:</h3>
<img src="/Welcome to Hillnote! /resources/images/Juuuuuuust the right Tool/1757098601357.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<ol>
<li><p><strong>Connect Hillnote to Claude, ChatGPT, etc via MCP:</strong></p>
<ol>
<li><p>Go to Hillnote settings &gt; MCP and follow the instructions to connect the MCP server</p>
</li>
<li><p>Ask the AI assistant to create a tool for you</p>
</li>
</ol>
</li>
<li><p><strong>Create a tool by prompting the tool of your choice:</strong></p>
<ol>
<li><p>Ask the AI assistant of your choice to build a tool specific to your usecase. You can upload the supporting .md file as you need. Make sure to include the below sentence or variation of the same in your prompt. <code>please make the tool a HTML project which is mobile friendly. It can have multiple files. Make it user friendly while keeping it super fast and snappy.</code></p>
</li>
<li><p>Save the project folder in workspace/resources/html and then on your document link it as mentioned below.</p>
</li>
</ol>
</li>
</ol>
<h2 id="heading-link-it">Link it</h2>
<p>Make sure the tool is within the resources directory within a folder call “html”. Then using the / command you can link the same.</p>
<p><img src="/Welcome to Hillnote! /resources/images/Juuuuuuust the right Tool/1757098436259.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />Clicking on it will open the page in the sidebar.</p>
<h2 id="heading-get-more-from-your-workspace">Get more from your workspace</h2>
<p>Add tools as and when you see fit for every little task that you can automate. This helps extend your Hillnote workspace from a simple editor to something more!</p>
<h2 id="heading-under-the-hood">Under the hood</h2>
<p>Hillnote can display simple HTML files directly and handle complex projects with multiple files through its inbuilt Express server. This means it can work with both basic and advanced tools.</p>
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
      <div class="text-sm text-foreground/80"><p>comment on advanced tools, connection,etc</p></div>
    </div>
  </div>` }} />
        </div>
      </div>
    </>
  )
}
