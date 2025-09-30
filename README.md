# @hillnote/publish

Transform your Hillnote workspace into a beautiful, SEO-optimized documentation website with Next.js and modern UI components.

## 🚀 Overview

`@hillnote/publish` is a complete documentation generation system that converts your Hillnote markdown workspace into a production-ready Next.js website. Simply run one command to set up the entire documentation system in your Next.js project.

## ✨ Features

- 📚 Beautiful documentation UI with hierarchical navigation sidebar
- 🎨 Dark/Light theme support with next-themes
- 📱 Fully responsive design
- 🔍 Built-in search functionality across all documents
- 🤖 AI-crawler optimized with llms.txt and structured data
- 📄 Automatic sitemap.xml and robots.txt generation
- 📁 Auto-expanding navigation for active documents
- 🔗 Smart URL routing with SEO-friendly slugs
- 📝 Advanced markdown rendering with syntax highlighting
- 🏷️ Support for document metadata, related documents, and author's notes
- ⚡ Static page generation for optimal performance
- 🛠️ Simple CLI setup - one command to install everything

## 🎯 Quick Start (Recommended)

### Install in Your Next.js Project

```bash
# Navigate to your Next.js project
cd your-nextjs-project

# Run the initialization command
npx @hillnote/publish init

# Or if using src/app structure
npx @hillnote/publish init --src
```

That's it! The CLI will automatically:
- ✓ Copy the `hillnoteDoc` system to your project
- ✓ Set up API routes for search and document fetching
- ✓ Add the page generation script
- ✓ Update your package.json with necessary scripts
- ✓ Configure everything based on your project structure

### Next Steps

1. **Add your Hillnote workspace:**
   ```bash
   cp -r "/path/to/Welcome to Hillnote!" public/
   ```

2. **Configure your site:**
   Edit `hillnoteDoc/config/site.config.js` (or `src/hillnoteDoc/config/site.config.js`)

3. **Generate pages:**
   ```bash
   npm run generate-pages
   ```

4. **Start your dev server:**
   ```bash
   npm run dev
   ```

Your documentation site will be live at `http://localhost:3000/doc`

## 📦 What Gets Installed

When you run `npx @hillnote/publish init`, the following structure is added to your project:

```
your-project/
├── hillnoteDoc/              # Documentation system (or src/hillnoteDoc/)
│   ├── components/          # UI components
│   ├── config/             # Configuration
│   ├── lib/                # Utilities
│   └── styles/             # Styles
├── app/api/                # API routes (or src/app/api/)
│   ├── ai-sitemap/
│   ├── docs/
│   └── search/
└── scripts/
    └── generate-pages.mjs  # Page generation script
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+
- Next.js 15+ project (with App Router)
- A Hillnote workspace exported with markdown files

### Step 1: Initialize
```bash
npx @hillnote/publish init
```

### Step 2: Add Your Workspace
Copy your Hillnote workspace folder to `public/`:
```bash
cp -r "/path/to/Welcome to Hillnote!" public/
```

### Step 3: Configure
Edit `hillnoteDoc/config/site.config.js`:
- Set your site name and description
- Update the workspace path to match your folder name
- Customize routing, SEO, and UI settings

### Step 4: Generate & Run
```bash
npm run generate-pages
npm run dev
```

## 📦 Alternative: Manual Setup (For Advanced Users)

If you prefer not to use the CLI or want more control:

### Option 1: Use the NextJS Boilerplate

1. **Copy the boilerplate to your project location:**
   ```bash
   cp -r "NextJS Boilerplate" /path/to/your-project-name
   cd /path/to/your-project-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add your Hillnote workspace:**
   ```bash
   # Copy your exported Hillnote workspace to the public folder
   cp -r "/path/to/Welcome to Hillnote!" public/
   ```

4. **Configure your site:**
   Edit `hillnoteDoc/config/site.config.js` with your site details (see Configuration section below)

5. **Generate pages and start:**
   ```bash
   npm run generate-pages
   npm run dev
   ```

   Your site will be live at `http://localhost:3000`

### Option 2: Add to Existing Next.js Project

1. **Copy the hillnoteDoc folder to your project root:**
   ```bash
   cp -r hillnoteDoc /path/to/your-nextjs-project/
   ```

2. **Copy the necessary files:**
   ```bash
   # Copy API routes
   cp -r "hillnoteDoc/-- TO BE MOVED --/api/"* your-project/app/api/
   # OR if using src folder:
   cp -r "hillnoteDoc/-- TO BE MOVED --/api/"* your-project/src/app/api/

   # Copy the generation script
   cp "hillnoteDoc/-- TO BE MOVED --/scripts/generate-pages-app.mjs" your-project/scripts/generate-pages.mjs
   # OR if using src folder:
   cp "hillnoteDoc/-- TO BE MOVED --/scripts/generate-pages-src.mjs" your-project/scripts/generate-pages.mjs
   ```

3. **Install required dependencies:**
   ```bash
   npm install @radix-ui/react-accordion @radix-ui/react-checkbox @radix-ui/react-dialog \
     @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot \
     @radix-ui/react-tabs class-variance-authority clsx gray-matter lucide-react \
     marked marked-gfm-heading-id next-themes tailwind-merge
   ```

4. **Add the generation script to package.json:**
   ```json
   {
     "scripts": {
       "generate-pages": "node scripts/generate-pages.mjs",
       "prebuild": "node scripts/generate-pages.mjs"
     }
   }
   ```

5. **Copy your Hillnote workspace to public folder and configure site.config.js**

## ⚙️ Configuration

Edit `hillnoteDoc/config/site.config.js`:

```javascript
export const siteConfig = {
  // Basic site information
  siteName: "Your Documentation Site",
  siteDescription: "Your site description",
  siteUrl: "https://your-domain.com",

  // Project Structure
  projectStructure: {
    useSrcFolder: false, // true if using src/app, false if using app/
  },

  // SEO Configuration
  seo: {
    titleTemplate: "%s | Your Site",
    defaultTitle: "Your Documentation",
    defaultDescription: "Default meta description",
    keywords: "your, keywords, here",
    author: "Your Name",
    publisher: "Your Organization",
    llmsIntro: "Introduction for AI crawlers",
    allowAIBots: true,
    crawlDelay: null,
  },

  // Routing Configuration
  routing: {
    docBase: "doc", // Base path for docs (e.g., /doc, /docs, /wiki)
    trailingSlash: false,
  },

  // Workspace Configuration
  workspace: {
    path: "/Welcome to Hillnote! /", // Your workspace folder name in public/
    enabled: true,
    documentsFolder: "documents",
    registryFile: "documents-registry.json",
    initialFile: "documents/Start Here .md",
  },

  // UI Configuration
  ui: {
    navigationMode: "wiki", // "emoji" or "wiki"
    showHeaders: true,
    authorsNotes: {
      enabled: true,
      title: "Author's Notes",
    },
    relatedDocuments: {
      enabled: true,
      title: "Related Documents",
    }
  }
}
```

## 📁 Project Structure

```
your-project/
├── app/ (or src/app/)          # Next.js app directory
│   ├── api/                    # API routes
│   │   ├── ai-sitemap/         # AI-readable sitemap
│   │   ├── docs/               # Document fetch API
│   │   └── search/             # Search API
│   └── doc/                    # Generated static pages (auto-generated)
├── hillnoteDoc/                # Documentation system
│   ├── components/             # UI components
│   │   ├── ask-ai-dialog.jsx
│   │   ├── navigation-sidebar.jsx
│   │   ├── search-dialog.jsx
│   │   ├── table-of-contents.jsx
│   │   ├── theme-provider.jsx
│   │   └── theme-toggle.jsx
│   ├── config/
│   │   └── site.config.js      # Main configuration file
│   ├── lib/                    # Utility functions
│   │   ├── debounce.js
│   │   ├── documents-server.js
│   │   ├── slug-utils.js
│   │   ├── static-routes.js
│   │   └── workspace.js
│   ├── styles/
│   │   └── markdown.css        # Markdown styling
│   └── -- TO BE MOVED --/      # Files to copy to your project
│       ├── api/                # API routes templates
│       └── scripts/            # Generation scripts
├── components/
│   └── ui/                     # Shadcn UI components
├── public/
│   ├── Welcome to Hillnote!/   # Your Hillnote workspace
│   ├── robots.txt              # Auto-generated
│   ├── sitemap.xml             # Auto-generated
│   └── llms.txt                # Auto-generated
├── scripts/
│   └── generate-pages.mjs      # Page generation script
└── package.json
```

## 🔧 Components

### Navigation Components

#### NavigationSidebar
Hierarchical sidebar with collapsible sections.
```jsx
import { NavigationSidebar } from '@/hillnoteDoc/components/navigation-sidebar'

<NavigationSidebar />
```

#### TableOfContents
Automatically generated from document headings.
```jsx
import { TableOfContents } from '@/hillnoteDoc/components/table-of-contents'

<TableOfContents />
```

### Interactive Components

#### SearchDialog
Full-text search across all documents.
```jsx
import { SearchDialog } from '@/hillnoteDoc/components/search-dialog'

<SearchDialog />
```

#### AskAIDialog
AI-powered question answering (requires API integration).
```jsx
import { AskAIDialog } from '@/hillnoteDoc/components/ask-ai-dialog'

<AskAIDialog />
```

#### ThemeToggle
Dark/light theme switcher.
```jsx
import { ThemeToggle } from '@/hillnoteDoc/components/theme-toggle'

<ThemeToggle />
```

## 🛠️ Utilities

### Workspace Functions
```javascript
import {
  getWorkspaceFileTree,
  buildFileTree,
  fetchWorkspaceRegistry
} from '@/hillnoteDoc/lib/workspace'
```

### Document Functions
```javascript
import {
  getDocumentRegistry,
  getDocumentByPath,
  findDocumentBySlug
} from '@/hillnoteDoc/lib/documents-server'
```

### Slug Utilities
```javascript
import {
  pathToSlug,
  documentPathToStaticUrl
} from '@/hillnoteDoc/lib/slug-utils'
```

## 📝 Page Generation

The `generate-pages.mjs` script automatically:

1. **Scans your Hillnote workspace** for markdown files
2. **Generates static Next.js pages** in `app/doc/` (or `src/app/doc/`)
3. **Creates SEO files:**
   - `public/sitemap.xml` - XML sitemap for search engines
   - `public/robots.txt` - Robot crawling rules
   - `public/llms.txt` - AI-readable content index
   - `public/llms-txt.txt` - Extended AI crawler content

### Running Generation

```bash
# Manual generation
npm run generate-pages

# Automatic on build (configured in package.json prebuild)
npm run build
```

## 🎨 Customization

### Styling

The package uses Tailwind CSS. Customize by:

1. **Edit Tailwind config** in `tailwind.config.js`
2. **Modify markdown styles** in `hillnoteDoc/styles/markdown.css`
3. **Customize component styles** directly in component files

### Navigation Modes

- **`wiki` mode**: Clean accordion-style navigation
- **`emoji` mode**: Shows emoji icons from document titles

Set in `site.config.js`:
```javascript
ui: {
  navigationMode: "wiki" // or "emoji"
}
```

### URL Customization

Change the base documentation path:
```javascript
routing: {
  docBase: "docs" // Changes /doc/* to /docs/*
}
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Vercel automatically detects Next.js and configures build
4. Deploy!

### Other Platforms
- **Netlify**: Supports Next.js with adapter
- **AWS Amplify**: Full Next.js support
- **Self-hosted**: `npm run build && npm start`

### Pre-deployment Checklist
- [ ] Update `siteUrl` in `site.config.js`
- [ ] Run `npm run generate-pages`
- [ ] Test build locally with `npm run build`
- [ ] Verify all images and assets are in `public/`

## 🔍 SEO Features

- **Automatic sitemap generation** - Search engines discover all pages
- **Structured metadata** - Rich snippets in search results
- **Open Graph tags** - Beautiful social media previews
- **AI crawler optimization** - llms.txt for AI search engines
- **Semantic HTML** - Proper heading hierarchy
- **Fast page loads** - Static generation for optimal performance

## 📋 Requirements

### Dependencies
```json
{
  "@radix-ui/react-accordion": "^1.2.12",
  "@radix-ui/react-checkbox": "^1.1.3",
  "@radix-ui/react-dialog": "^1.1.4",
  "@radix-ui/react-scroll-area": "^1.2.2",
  "@radix-ui/react-separator": "^1.1.0",
  "@radix-ui/react-slot": "^1.1.1",
  "@radix-ui/react-tabs": "^1.1.2",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "gray-matter": "^4.0.3",
  "lucide-react": "^0.468.0",
  "marked": "^16.1.0",
  "marked-gfm-heading-id": "^5.1.0",
  "next": "^15.5.2",
  "next-themes": "^0.5.1",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwind-merge": "^2.6.0"
}
```

### System Requirements
- Node.js 18+
- Next.js 15+
- A Hillnote workspace exported with:
  - `documents/` folder with markdown files
  - `documents-registry.json` metadata file
  - Optional: `resources/` folder for images

## 🐛 Troubleshooting

### Pages not generating?
- Verify workspace folder is in `public/`
- Check `documents-registry.json` exists
- Ensure `workspace.path` in config matches folder name

### Import errors?
- All imports should use `@/hillnoteDoc` alias
- Check `jsconfig.json` or `tsconfig.json` has correct paths

### Styling issues?
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run dev`

### API routes not working?
- Ensure API files are in `app/api/` (or `src/app/api/`)
- Check Next.js console for errors
- Verify `projectStructure.useSrcFolder` setting

## 📄 License

MIT License - Free to use, modify, and distribute.

## 🤝 Support

- **Issues**: Report bugs or request features in your repository
- **Documentation**: Check the example site in NextJS Boilerplate
- **Community**: Join the Hillnote community

---

Built with ❤️ for the Hillnote ecosystem using Next.js, Tailwind CSS, and Radix UI