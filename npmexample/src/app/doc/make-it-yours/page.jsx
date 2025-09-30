// This is a server component that renders pre-generated HTML
import '@/hillnoteDoc/styles/markdown.css'

// SEO Metadata for search engines and social media
export const metadata = {
  title: 'Make it yours | Hillnote Documentation',
  description: 'Hillnote utilizes local AI models (LLMs) through Ollama, allowing users to experiment with models like Gemma and Llama directly on their computers. Users can configure prompts, add context from documents, and customize settings for optimal AI performance, leveraging GGUF formats for efficient local execution.',
  keywords: 'documentation, hillnote, markdown, notes, AI, LLM, referenced, related, illustrated',
  authors: [{ name: 'Hillnote Team' }],
  openGraph: {
    title: 'Make it yours',
    description: 'Hillnote utilizes local AI models (LLMs) through Ollama, allowing users to experiment with models like Gemma and Llama directly on their computers. Users can configure prompts, add context from documents, and customize settings for optimal AI performance, leveraging GGUF formats for efficient local execution.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/doc/make-it-yours',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Make it yours',
    description: 'Hillnote utilizes local AI models (LLMs) through Ollama, allowing users to experiment with models like Gemma and Llama directly on their computers. Users can configure prompts, add context from documents, and customize settings for optimal AI performance, leveraging GGUF formats for efficient local execution.',
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
    canonical: '/doc/make-it-yours'
  }
}

// Document information
const documentPath = 'documents/Make it yours.md'
const documentTitle = 'Make it yours'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Make it yours",
  "description": "Hillnote utilizes local AI models (LLMs) through Ollama, allowing users to experiment with models like Gemma and Llama directly on their computers. Users can configure prompts, add context from documents, and customize settings for optimal AI performance, leveraging GGUF formats for efficient local execution.",
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
    "@id": "/doc/make-it-yours"
  }
}

// Server component - this runs at build time and generates static HTML
export default function Page() {
  const htmlContent = `<h1 id="heading-local-models"><strong><mark>Local Models!!</mark></strong></h1>
<img src="/Welcome to Hillnote! /resources/images/Local AI/1757069283879.webp" alt="" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-a-quick-rundown-if-you-are-new-to-all-this">A quick rundown if you are new to all this.</h2>
<h3 id="heading-ai-in-hillnote-has-3-parts-to-it">AI in Hillnote has 3 parts to it.</h3>
<ol>
<li><p><strong>⛺️ Large Language Models (LLMs)</strong> are AI systems trained on lots of text. They can understand and create text like humans, allowing them to answer questions, write creatively, and translate languages accurately. They mimic how we communicate. You can switch between a wide variety of AI systems available at <a href="https://ollama.com/search" target="_blank" rel="noopener noreferrer">ollama.com/search</a> and <a href="https://huggingface.co/models?library=gguf&sort=trending" target="_blank" rel="noopener noreferrer">https://huggingface.co/models?library=gguf&sort=trending</a></p>
</li>
<li><p><strong>🏕️ The Context:</strong> This refers to the information and background the AI uses to best understand your requests and provide relevant answers.</p>
</li>
<li><p><strong>👋🏽 The Prompts</strong> represent the specific instructions and tasks you’ll be giving the LLM.</p>
</li>
</ol>
<blockquote>
<p><em><strong>Hillnote uses Ollama</strong></em><em>, a tool that simplifies working with large language models. Essentially, Ollama provides a local &quot;sandbox&quot; where you can run various AI models. Hillnote lets you access this sandbox, allowing you to experiment with and use different LLMs directly.</em></p>
<p><em>You can learn more about Ollama at</em> <a href="http://ollama.com" target="_blank" rel="noopener noreferrer"><em>ollama.com</em></a></p>
</blockquote>
<hr>
<h2 id="heading-configuring-your-ai"><strong>Configuring your AI</strong></h2>
<p>With Hillnote you can go beyond and configure your editor and the built-in AI to work exactly as you need it. You can have multiple models installed in Hillnote and switch between them seamlessly.</p>
<h3 id="heading-add-models"><strong>Add models</strong></h3>
<p>You can add and choose between models in the AI tab. The handpicked tab covers some of my favourite models. You can browse the various sections and hopefully find something you like.<br><img src="/Welcome to Hillnote! /resources/images/Make it yours/1757064527325.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" /></p>
<h3 id="heading-add-more-models"><strong>Add more models</strong></h3>
<p>Hillnote uses Ollama to run its AI features. Ollama is like a central hub for bringing pre-trained AI models – like Gemma, Phi or Llama – <span style="color:#111827">directly</span> to your computer.<br><img src="/Welcome to Hillnote! /resources/images/Make it yours/1757064623628.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" /></p>
<p>Add models under AI Settings &gt; Custom &gt; Ollama models. Simply type the name as mentioned in <a href="https://ollama.com/search" target="_blank" rel="noopener noreferrer">ollama.com/search</a>.</p>
<h3 id="heading-hugging-face-models"><strong>Hugging face models</strong></h3>
<p><a href="http://huggingface.co/" target="_blank" rel="noopener noreferrer">Huggingface.co</a> (Hugging Face) is like a central hub for all things Artificial Intelligence, specifically focusing on <em>language models</em>. Think of it like a giant toolbox filled with pre-trained AI models – these are essentially really smart computer programs that have already learned a <em>ton</em> about language from reading massive amounts of text.</p>
<p><strong>Here’s what makes it special:</strong></p>
<ul>
<li><p><strong>Pre-trained Models:</strong> They have models that can do amazing things like translate languages, write different kinds of creative content, answer your questions in an informative way, and even summarize text. The cool thing is, you don&#39;t have to train these models from scratch – they&#39;re ready to go!</p>
</li>
<li><p><strong>Hugging Face Hub:</strong> This is their online platform where you can <em>find</em> these models, but also share your own! It&#39;s like a GitHub for AI models.</p>
</li>
<li><p><span style="color:#111827"><strong>GGUF are formats</strong> that allow you to run large language models – like those hosted on Hugging Face –</span> <em>locally</em> <span style="color:#111827">on your computer, even if you don&#39;t have a super powerful GPU. Think of it like this: Hugging Face provides the</span> <em>brains</em> <span style="color:#111827">(the pre-trained model), and GGML/GGUF provides the</span> <em>body</em> <span style="color:#111827">– the way to run those brains efficiently.</span></p>
</li>
</ul>
<p>Add models under AI Settings &gt; Custom &gt; Huggingface models. You can run any <strong>GGUF</strong> model you find over at <a href="https://huggingface.co/models?library=gguf" target="_blank" rel="noopener noreferrer">huggingface.co/models?library=gguf</a> by entering one of the following</p>
<ul>
<li><p>Paste the full command: <code>ollama run hf.co/username/repository:quantization</code></p>
</li>
<li><p>Or just the path: <code>username/repository-name</code></p>
</li>
<li><p>Or full URL: <code>https://huggingface.co/username/repository</code></p>
</li>
</ul>
<h3 id="heading-switch-models"><strong>Switch models</strong></h3>
<p>Switch between models under AI settings. The active model denotes which model all the queries will be directed to.</p>
<img src="/Welcome to Hillnote! /resources/images/Make it yours/1757064764789.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h3 id="heading-temperature"><strong>Temperature</strong></h3>
<p>Temperature helps determine the models creativity. Lower values (0.0) make the output more focused and deterministic, while higher values (2.0) make it more creative and varied.<br><img src="/Welcome to Hillnote! /resources/images/Make it yours/1757064571389.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" /></p>
<h2 id="heading-providing-context"><strong>Providing Context</strong></h2>
<h3 id="heading-add-context"><strong>Add context</strong></h3>
<p>Add context to a prompt from another document by mentioning it using the ‘@’ key. You should see a dialog to help select the document.</p>
<img src="/Welcome to Hillnote! /resources/images/Make it yours/1757064913444.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-customise-your-preset-prompts"><strong>Customise your preset prompts</strong></h2>
<p><img src="/Welcome to Hillnote! /resources/images/Make it yours/1757065141007.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />You can custom prompts to the preset list by doing so under settings within custom prompts. These can be tailored to be specific to you.</p>
<img src="/Welcome to Hillnote! /resources/images/Make it yours/1757065072615.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<p>There are a couple of Prompt crafting websites online - do consult with them 🙂</p>
<h2 id="heading-change-the-system-prompts"><strong>Change the system Prompts</strong></h2>
<p>System prompts can be modified within Hillnote settings. This allows you to fundamentally change the Role and the core response structure of the AI model</p>
<img src="/Welcome to Hillnote! /resources/images/Make it yours/1757065179674.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<h2 id="heading-add-recipes-for-ai-models-to-understand-tasks-better"><strong>Add recipes for AI models to understand tasks better</strong></h2>
<p>Recipes act as detailed guides that combine multiple elements, such as reference documents and instructions. This structured approach allows you to modify content while capturing specific phrases that provide extra context for consistent usage.<sup>1</sup></p>
<img src="/Welcome to Hillnote! /resources/images/Make it yours/1757065243314.webp" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />

<hr>
<h2 id="heading-a-quick-note-on-performance"><strong>A quick note on Performance</strong></h2>
<p><strong>There is no performance hit from having multiple models installed</strong> because only a single model is run at any given time in Hillnote:</p>
<ol>
<li><p>Only one model is loaded into memory at a time</p>
</li>
<li><p>Models are stored on disk and only loaded when needed</p>
</li>
<li><p>The Ollama server manages memory efficiently by loading only the active model</p>
</li>
<li><p>When switching models, the previous model is unloaded before loading the new one</p>
</li>
</ol>
<p><strong>Hillnote’s performance depends on your computer’s RAM, GPU and CPU</strong>. The ideal LLM size you use is directly tied to your machine’s specifications. While we offer helpful indicators, a good starting point is to consider is the below table</p>
<table>
<thead>
<tr>
<th><strong>Model Parameters</strong></th>
<th><strong>Minimum RAM</strong></th>
<th><strong>Recommended RAM</strong></th>
<th><strong>GPU</strong></th>
<th><strong>CPU</strong></th>
</tr>
</thead>
<tbody><tr>
<td>1B</td>
<td>4GB</td>
<td>8GB</td>
<td>2GB</td>
<td>Most modern CPU&#39;s</td>
</tr>
<tr>
<td>3B</td>
<td>4GB</td>
<td>8GB</td>
<td>2GB</td>
<td>Most modern CPU&#39;s</td>
</tr>
<tr>
<td>4B</td>
<td>8GB</td>
<td>16GB</td>
<td>4GB</td>
<td>Most modern CPU&#39;s</td>
</tr>
<tr>
<td>7B</td>
<td>8GB</td>
<td>16GB</td>
<td>4GB</td>
<td>Most modern CPU&#39;s</td>
</tr>
<tr>
<td>8B</td>
<td>16GB</td>
<td>32GB</td>
<td>8GB</td>
<td>Most modern CPU&#39;s</td>
</tr>
<tr>
<td>10B</td>
<td>24GB</td>
<td>48GB</td>
<td>12GB</td>
<td>High end CPU</td>
</tr>
<tr>
<td>20B</td>
<td>48GB</td>
<td>64GB</td>
<td>24GB</td>
<td>High end CPU</td>
</tr>
<tr>
<td>70B</td>
<td>128GB</td>
<td>256GB</td>
<td>80GB</td>
<td>Server grade CPU</td>
</tr>
</tbody></table>
<h2 id="heading-importing-and-exporting-templates"><strong>Importing and Exporting templates</strong></h2>
<p>Export template is an option available under Hillnote settings. This exports all of your AI configurations and files you may have saved. This provides a clean template to then share, Import and use across multiple instances of Hillnote.</p>
<p>The following configurations are exported in a template</p>
<ol>
<li><p>Documents (structures and templates)</p>
</li>
<li><p>All custom prompts that have been configured</p>
</li>
</ol>
<p>You can import a template under Hillnote settings.</p>
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
      <div class="text-sm text-foreground/80"><p>The recipe feature described in [1] is still in infancy right now and is being expanded on slowly. </p></div>
    </div>
  </div>` }} />
        </div>
      </div>
    </>
  )
}
