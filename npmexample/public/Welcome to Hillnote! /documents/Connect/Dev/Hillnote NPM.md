# @hillnote/wiki

Turn your Hillnote workspace into beautiful documentation for your Next.js projects. The @hillnote/wiki NPM package provides ready-to-use components for creating documentation sites powered by your Hillnote workspace.

### **Github**

You can check out the repository here for boilerplates, examples and more: [https://github.com/Rajathbail/hillnote-wiki?tab=readme-ov-file](https://github.com/Rajathbail/hillnote-wiki?tab=readme-ov-file)

## Features

-   📚 Beautiful documentation UI with navigation sidebar
    
-   🎨 Dark/Light theme support
    
-   📱 Fully responsive design
    
-   🔍 SEO-friendly with sitemap generation
    
-   🤖 AI-crawler optimized with structured data
    
-   📁 Auto-expanding navigation for active documents
    
-   🔗 Smart URL routing with slugs
    
-   📝 Markdown rendering with syntax highlighting
    

## Installation

```javascript
npm install @hillnote/wiki
# or
yarn add @hillnote/wiki
# or
pnpm add @hillnote/wiki
```

**Note:** All required dependencies (@radix-ui components, gray-matter, etc.) will be automatically installed with the package.

## Quick Start

### 1\. Setup Root Layout with Theme Provider

First, create a providers component and update your root layout:

```javascript
// app/providers.js
"use client"

import { ThemeProvider } from '@hillnote/wiki'

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
```

```javascript
// app/layout.js
import { Providers } from "./providers"
import "@hillnote/wiki/styles"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### 2\. Create Your Wiki Pages

Create the main wiki page and dynamic routing:

```javascript
// app/page.js
"use client"

import { Document, Navbar, ConfigProvider, pathToSlug, initializeSlugMapping } from '@hillnote/wiki'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const wikiConfig = {
  siteName: "My Wiki",
  workspace: {
    path: "/workspace/", // Path to your Hillnote workspace in public folder
    enabled: true,
    documentsFolder: "documents",
    registryFile: "documents-registry.json",
    initialFile: "documents/Start Here.md"
  },
  ui: {
    authorsNotes: true,
    navigationText: "All Pages"
  }
}

export default function WikiPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    // Initialize slug mapping on mount
    initializeSlugMapping(wikiConfig)
  }, [])

  const handleFileSelect = (filePath) => {
    if (!filePath) return
    
    // Convert file path to URL slug
    const slug = pathToSlug(filePath)
    
    router.push(`/doc/${slug}`)
  }

  if (!mounted) return null

  return (
    <ConfigProvider config={wikiConfig}>
      <div className="h-screen flex flex-col">
        <Navbar siteName={wikiConfig.siteName} showThemeToggle={true} />
        <Document 
          siteConfig={wikiConfig}
          initialFile={wikiConfig.workspace.initialFile}
          showNavigation={true}
          showTableOfContents={true}
          onFileSelect={handleFileSelect}
        />
      </div>
    </ConfigProvider>
  )
}
```

```javascript
// app/doc/[...path]/page.js
"use client"

import { Document, Navbar, ConfigProvider, pathToSlug, slugToPath, initializeSlugMapping } from '@hillnote/wiki'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const wikiConfig = {
  siteName: "My Wiki",
  workspace: {
    path: "/workspace/",
    enabled: true,
    documentsFolder: "documents",
    registryFile: "documents-registry.json",
    initialFile: "documents/Start Here.md"
  },
  ui: {
    authorsNotes: true,
    navigationText: "All Pages"
  }
}

export default function DocumentPage() {
  const params = useParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [filePath, setFilePath] = useState(wikiConfig.workspace.initialFile)
  
  // Get the slug from URL params
  const slug = params.path ? params.path.join('/') : null

  useEffect(() => {
    setMounted(true)
    // Initialize slug mapping and then set the file path
    const initAndSetPath = async () => {
      await initializeSlugMapping(wikiConfig)
      if (slug) {
        const path = slugToPath(slug)
        setFilePath(path)
      }
    }
    initAndSetPath()
  }, [slug])

  const handleFileSelect = (filePath) => {
    if (!filePath) return
    
    // Convert file path to URL slug
    const slug = pathToSlug(filePath)
    
    router.push(`/doc/${slug}`)
  }

  if (!mounted) return null

  return (
    <ConfigProvider config={wikiConfig}>
      <div className="h-screen flex flex-col">
        <Navbar siteName={wikiConfig.siteName} showThemeToggle={true} />
        <Document 
          siteConfig={wikiConfig}
          initialFile={filePath}
          showNavigation={true}
          showTableOfContents={true}
          onFileSelect={handleFileSelect}
        />
      </div>
    </ConfigProvider>
  )
}
```

### 3\. Copy Your Hillnote Workspace

Copy your Hillnote workspace to your Next.js public folder:

```javascript
cp -r ~/path-to-hillnote-workspace public/workspace
```

### 4\. Setup Styles and Tailwind

1.  Update your `globals.css` with theme variables:
    

```javascript
/* app/globals.css */
@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

2.  Create or update your `tailwind.config.js`:
    

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    // ... your other content paths
    "./node_modules/@hillnote/wiki/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

## Components

### Navbar

The navigation bar component for your wiki.

```javascript
import { Navbar } from '@hillnote/wiki'

<Navbar 
  siteName="My Wiki"
  showSiteName={true}
  showThemeToggle={true}
  className="custom-navbar"
>
  {/* Additional navbar items */}
</Navbar>
```

### Document

The main document viewer with navigation sidebar and table of contents.

```javascript
import { Document } from '@hillnote/wiki'

<Document 
  siteConfig={wikiConfig}           // Pass the entire config object
  initialFile="documents/index.md"  // Initial file to display
  showNavigation={true}              // Show navigation sidebar
  showTableOfContents={true}         // Show table of contents
  onFileSelect={(file) => console.log('Selected:', file)}  // File selection handler
/>
```

### TableOfContents

A standalone table of contents component.

```javascript
import { TableOfContents } from '@hillnote/wiki'

<TableOfContents 
  showTitle={true}
  title="Contents"
/>
```

## Configuration

The configuration object supports the following options:

```javascript
const wikiConfig = {
  siteName: "My Documentation",
  workspace: {
    path: "/workspace/",              // Path to workspace in public folder
    enabled: true,
    documentsFolder: "documents",     // Folder containing markdown files
    registryFile: "documents-registry.json",  // Registry file name
    initialFile: "documents/Start Here.md"    // Initial document to display
  },
  ui: {
    authorsNotes: true,               // Enable author's notes section
    navigationText: "All Pages",      // Navigation sidebar title
    navigationMode: "wiki"            // "emoji" or "wiki" (accordion style)
  }
}
```

### Navigation Modes

The sidebar navigation supports two different display styles. You can switch between them using the `navigationMode` setting in your configuration.

#### 1\. Emoji Mode (Default)

Traditional file explorer style with emoji icons and arrow indicators.

**Features:**

-   📁 Folder icons for directories
    
-   📄 File icons for documents
    
-   ▶️ / ▼ Arrow indicators for expand/collapse
    
-   Visual hierarchy with indentation
    

```javascript
const wikiConfig = {
  ui: {
    navigationMode: "emoji"  // or omit for default
  }
}
```

#### 2\. Wiki Mode

Clean, modern accordion-style navigation similar to popular documentation sites.

**Features:**

-   Clean text-based navigation
    
-   Smooth accordion expand/collapse animations
    
-   No visual clutter from icons
    
-   Folders stay open when selecting files inside them
    
-   Auto-expands to show the current document
    

```javascript
const wikiConfig = {
  ui: {
    navigationMode: "wiki"
  }
}
```

**Complete example with wiki mode:**

```javascript
const wikiConfig = {
  siteName: "My Documentation",
  workspace: {
    path: "/workspace/",
    enabled: true,
    documentsFolder: "documents",
    registryFile: "documents-registry.json",
    initialFile: "documents/Start Here.md"
  },
  ui: {
    authorsNotes: true,
    navigationText: "All Pages",
    navigationMode: "wiki"  // Set to "wiki" for accordion style
  }
}
```

## Advanced Usage

### Custom Layout

You can compose the components to create custom layouts:

```javascript
import { useState } from 'react'
import { Navbar, Document, MarkdownRenderer, NavigationSidebar } from '@hillnote/wiki'

export default function CustomWiki() {
  const [selectedFile, setSelectedFile] = useState(null)
  
  return (
    <div className="custom-layout">
      <Navbar siteName="My Wiki" />
      
      <div className="flex">
        <NavigationSidebar 
          onFileSelect={setSelectedFile}
          selectedFile={selectedFile}
        />
        
        <main className="flex-1">
          <MarkdownRenderer 
            filePath={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </main>
      </div>
    </div>
  )
}
```

### URL Routing with Slugs

The package includes utilities for converting between file paths and URL-friendly slugs:

```javascript
import { pathToSlug, slugToPath, initializeSlugMapping } from '@hillnote/wiki'

// Initialize slug mapping (required once on app mount)
await initializeSlugMapping(wikiConfig)

// Convert file path to URL slug
const slug = pathToSlug("documents/Getting Started.md")
// Returns: "getting-started"

// Convert slug back to file path
const path = slugToPath("getting-started")
// Returns: "documents/Getting Started.md"
```

### Workspace Utilities

The package exports utilities for working with your Hillnote workspace:

```javascript
import { buildFileTree, fetchWorkspaceRegistry, getWorkspaceFileTree } from '@hillnote/wiki'

// Fetch the workspace registry
const registry = await fetchWorkspaceRegistry(wikiConfig)

// Build a hierarchical file tree from the registry
const fileTree = buildFileTree(registry.documents)

// Get the complete workspace file tree
const tree = await getWorkspaceFileTree(wikiConfig)
```

## Troubleshooting

### Hydration Errors

If you encounter hydration errors with Next.js, ensure you're using the client-side mounting pattern shown in the Quick Start example. The `mounted` state prevents theme-related attributes from causing mismatches between server and client rendering.

## Workspace Structure

Your Hillnote workspace should have this structure in your public folder:

```javascript
public/
└── workspace/
    ├── documents/
    │   ├── Getting Started.md
    │   ├── Installation.md
    │   └── ...
    └── documents-registry.json
```

The `documents-registry.json` file should contain metadata about your documents:

```javascript
{
  "documents": [
    {
      "path": "documents/Getting Started.md",
      "title": "Getting Started",
      "lastModified": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## JavaScript/TypeScript Support

The package works with both JavaScript and TypeScript. For TypeScript users, types are available:

```javascript
import type { 
  NavbarProps, 
  DocumentProps, 
  TableOfContentsProps,
  HillnoteWikiConfig 
} from '@hillnote/wiki'
```

For JavaScript users, you can use JSDoc comments for type hints:

```javascript
/** @type {import('@hillnote/wiki').HillnoteWikiConfig} */
const wikiConfig = {
  // your configuration
}
```

## Requirements

-   Next.js 13+ (with App Router)
    
-   React 18+
    
-   Tailwind CSS (for styling)
    
-   A Hillnote workspace
    

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please visit our [GitHub repository](https://github.com/Rajathbail/hillnote-wiki).

[html:Pasted HTML](resources/html/Hillnote NPM/1758048775489.html)