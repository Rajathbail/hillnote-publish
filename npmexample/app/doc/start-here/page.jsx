// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Start Here  | Hillnote Documentation',
  description: 'Hillnote is a local AI note-taking app with built-in LLM support, guiding users through workspace creation, AI tool connections, and file syncing.',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, references, links, documentation, referenced, related',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Start Here ',
    description: 'Hillnote is a local AI note-taking app with built-in LLM support, guiding users through workspace creation, AI tool connections, and file syncing.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/start-here',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Here ',
    description: 'Hillnote is a local AI note-taking app with built-in LLM support, guiding users through workspace creation, AI tool connections, and file syncing.',
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
    canonical: '/doc/start-here'
  }
}

// Document information
const documentPath = 'documents/Start Here .md'
const documentTitle = 'Start Here '

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Start Here ",
  "description": "Hillnote is a local AI note-taking app with built-in LLM support, guiding users through workspace creation, AI tool connections, and file syncing.",
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
    "@id": "/doc/start-here"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-hello"><strong><mark>Hello!👋🏽</mark></strong></h1>
<p>Welcome to Hillnote! We’re so excited to have you here and Thank you for giving it a try. 🎉</p>
<p>This quick guide will provide you with an overview of the app and some ideas to help you get started. We do hope you enjoy exploring!</p>
<p><img src="/Welcome to Hillnote! /resources/images/Start Here /1758023478740.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" /><strong>This shouldn&#39;t take longer than 7 minutes</strong><br>(12 minutes if you want to read the advanced stuff too)</p>
<h1 id="heading-what-is-hillnote"><mark>What is Hillnote?</mark></h1>
<p>Hillnote is a <strong>local first, note-taking app designed to supercharge your AI workflow</strong>. Create notes and documents that are ready to be integrated with all of your favourite AI tools including but not limited to Claude, ChatGPT, Gemini, Grok, Deep Seek, Perplexity, Cursor, Github CoPilot and more!</p>
<p>Hillnote also comes with Ollama built in, letting you run powerful local Large Language Models – like Gemma, GPT-OSS, Llama, Phi, and DeepSeek – directly from the app, even when offline. 🎉</p>
<img src="/Welcome to Hillnote! /resources/images/Start Here /1758026721423.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h1 id="heading-workspaces-and-file-structure"><mark>Workspaces and file structure</mark></h1>
<p>Within Hillnote, everything is organised inside of a workspace document – you decide exactly where it’s stored. These workspaces contain both documents, formatted in easy-to-use Markdown (.md) files (which AI models and agents particularly favour!), and helpful resources like a readme and document registry, designed to streamline any AI agent’s work within the space.</p>
<p><img src="/Welcome to Hillnote! /resources/images/Start Here /1755083595272.webp" alt="" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" /><strong>An example of what this workspace will look like if you are on a mac 👆</strong><br><a href="/doc/the-filesystem" class="document-link text-primary underline hover:no-underline">The Filesystem</a> goes over what each file/folder does.</p>
<h1 id="heading-what-next"><mark>What next?</mark></h1>
<ul style="list-style: none;">
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Read <a href="/doc/about-the-editor" class="document-link text-primary underline hover:no-underline">About the Editor</a> (👈 you can just click on it)<sup>1</sup></p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Read <a href="/doc/the-filesystem" class="document-link text-primary underline hover:no-underline">The Filesystem</a> to understand how files are stored on your system</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Read <a href="/doc/using-ai-in-hillnote" class="document-link text-primary underline hover:no-underline">Using AI in Hillnote</a> to see how you can use the built in AI tools within Hillnote</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Read <a href="/doc/connecting-to-hillnote" class="document-link text-primary underline hover:no-underline">Connecting to Hillnote</a> and <a href="/doc/make-it-yours" class="document-link text-primary underline hover:no-underline">Make it yours</a> to go over how to use Hillnote’s more advanced features including premium models like ChatGPT and Claude right within the editor.</p>
<ul style="list-style: none;">
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Create an account on <a href="http://Hillnote.com" target="_blank" rel="noopener noreferrer">Hillnote.com</a></li>
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Login to your Hillnote app for advanced features such as access to premium models</li>
</ul>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg><strong><mark>Create your first workspace</mark></strong></p>
<ul style="list-style: none;">
<li><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Create your first document</li>
</ul>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg><a href="/doc/connect" class="document-link text-primary underline hover:no-underline">Connect</a> the workspace with your tools</p>
</li>
<li><p><svg class="w-4 h-4 inline-block mr-2 align-text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Create your first tool as mentioned in <a href="/doc/juuuuuuust-the-right-tool" class="document-link text-primary underline hover:no-underline">Juuuuuuust the right Tool</a> to get things up and running</p>
</li>
</ul>
<hr>
<h2 id="heading-have-a-question-️">Have a question? 🙋🏽‍♂️</h2>
<h2 id="heading-let-your-favourite-ai-model-answer-it-for-you"><mark>Let your favourite AI model answer it for you!</mark></h2>
<ol>
<li><p>Go to your favourite AI model (claude.com, Chatgpt.com, etc)</p>
</li>
<li><p>Simply type your question</p>
</li>
<li><p>At the end of the question paste all of the text <a href="https://hillnote.com/api/docs?map=true" target="_blank" rel="noopener noreferrer">seen in this link</a></p>
</li>
</ol>
<img src="/Welcome to Hillnote! /resources/images/Start Here /1758029488832.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

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
        <span class="text-xs text-muted-foreground">2/9/2025</span>
      </div>
      <div class="text-sm text-foreground/80"><p>Hey There! I&#39;m Rajath, the guy who build Hillnote and I just want to say thank you so much for giving it a try! This is an example of a comment which helps users collaborate and leave notes scattered within Hillnote. One of the many features we keep adding to App and hopefully one of the features you grow to love :) Anyways. You should probably get back to completing whats next in [1]</p></div>
    </div>
    <div class="border-l-2 border-muted-foreground/20 pl-4 mb-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="font-medium text-sm">Rajath Bail</span>
        <span class="text-xs text-muted-foreground">2/9/2025</span>
      </div>
      <div class="text-sm text-foreground/80"><p>Btw - this too is locally stored (within the document to be precise) so these comments here are only for those folks who you share the file with! 🎉</p></div>
    </div>
  </div>` }} />
        </div>
      </div>
    </>
  )
}
