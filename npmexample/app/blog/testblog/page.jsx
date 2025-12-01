// Generated blog post page
import { BlogArticle } from '@/hillnoteDoc/components/blog'

export const metadata = {
  title: 'A blog template | HillnoteWiki Blog',
  description: 'This is an example blog post to get you started.',
  authors: [{ name: 'Rajath Bail' }],
  openGraph: {
    title: 'A blog template',
    description: 'This is an example blog post to get you started.',
    type: 'article',
    siteName: 'HillnoteWiki',
    locale: 'en_US',
    url: '/blog/testblog',
    images: ['https://images.unsplash.com/photo-1609111036741-e9cd2a8e7a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A blog template',
    description: 'This is an example blog post to get you started.',
    images: ['https://images.unsplash.com/photo-1609111036741-e9cd2a8e7a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
  alternates: {
    canonical: '/blog/testblog'
  }
}

const postData = {
  slug: 'testblog',
  title: 'A blog template',
  author: 'Rajath Bail',
  publishDate: '2025-12-01',
  editDate: null,
  coverImage: 'https://images.unsplash.com/photo-1609111036741-e9cd2a8e7a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  tags: ["getting-started","example"],
  structuredData: {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "A blog template",
  "description": "This is an example blog post to get you started.",
  "author": {
    "@type": "Person",
    "name": "Rajath Bail"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Hillnote"
  },
  "datePublished": "2025-12-01",
  "dateModified": "2025-12-01",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "/blog/testblog"
  },
  "image": "https://images.unsplash.com/photo-1609111036741-e9cd2a8e7a9f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
  extra: {}
}

const content = `<h1 id="heading-welcome-to-your-blog">Welcome to Your Blog</h1>
<p>This is an example blog post. Edit or replace this file with your own content.</p>
<h2 id="heading-getting-started">Getting Started</h2>
<ol>
<li><p>Edit the YAML frontmatter above with your post details</p>
</li>
<li><p>Write your content in Markdown</p>
</li>
<li><p>Run <code>node generate-blog.mjs --publish</code> to publish</p>
</li>
</ol>
<h2 id="heading-required-fields">Required Fields</h2>
<ul>
<li><p><strong>title</strong>: The title of your blog post</p>
</li>
<li><p><strong>publishDate</strong>: The date to publish (YYYY-MM-DD format)</p>
</li>
<li><p><strong>author</strong>: The author&#39;s name</p>
</li>
</ul>
<h2 id="heading-optional-fields">Optional Fields</h2>
<ul>
<li><p><strong>description</strong>: A short description/excerpt</p>
</li>
<li><p><strong>tags</strong>: Comma-separated list of tags</p>
</li>
<li><p><strong>coverImage</strong>: URL to a cover image</p>
</li>
<li><p><strong>editDate</strong>: Last edit date (YYYY-MM-DD format)</p>
</li>
</ul>
<h3 id="heading-images">Images</h3>
<p>Images, resources and other material appear in the resources folder. Just place the resources folder from your workspace in the public/blog folder.</p>
<p><img src="/blog/resources/images/Script test/1764586175427.png" alt="Pasted image" loading="lazy" class="markdown-image rounded-lg max-w-full h-auto" />Photo from <strong>unsplash by</strong> <span style="color:#111111"><strong>Henry Be</strong></span></p>
<hr>
<p>Happy blogging!</p>
`

export default function Page() {
  return (
    <BlogArticle
      {...postData}
      content={content}
    />
  )
}
