# HillnoteDoc - Documentation Website Generator

Transform your Hillnote workspace into a beautiful, SEO-optimized documentation website with Next.js and Shadcn UI.

## 🚀 Quick Start

Follow these steps to set up your documentation website:

### 1. Prerequisites

- Node.js 18+ installed
- A Hillnote workspace with markdown documents
- Basic knowledge of Next.js (optional)

### 2. Installation

```bash
# Clone or download this project
# Navigate to the project root directory
cd your-project-directory

# Install dependencies
npm install
```

### 3. Project Setup

#### Step 1: Move API Routes
Copy the API routes from the `hillnoteDoc` folder to your app's API directory:

```bash
# If you have API routes in hillnoteDoc/TO BE MOVED/api, move them to app/api
cp -r hillnoteDoc/"TO BE MOVED"/api/* app/api/
```

#### Step 2: Setup Generate Script
The page generation script should already be in the scripts folder:

```bash
# Verify the script exists
ls scripts/generate-pages.mjs

# If it doesn't exist, check if it's in another location
```

#### Step 3: Place Your Hillnote Workspace
Copy your Hillnote workspace to the public folder:

```bash
# Copy your workspace folder to public
cp -r "path/to/your/Welcome to Hillnote!" public/
```

Your workspace should contain:
- `documents/` - Your markdown files
- `documents-registry.json` - Document metadata
- `resources/` - Images and other assets

### 4. Configuration

Edit `hillnoteDoc/config/site.config.js` to customize your site:

```javascript
export const siteConfig = {
  // Basic site information
  siteName: "Your Documentation Site",
  siteDescription: "Your site description",
  siteUrl: "https://your-domain.com", // Update for production

  // Project Structure Configuration
  projectStructure: {
    useSrcFolder: false, // Set to true if your project uses src/app instead of app/
  },

  // SEO Configuration
  seo: {
    titleTemplate: "%s | Your Site", // Page title format
    defaultTitle: "Your Documentation",
    defaultDescription: "Default meta description",
    keywords: "your, keywords, here",
    author: "Your Name",
    publisher: "Your Organization",

    // LLMs.txt customization
    llmsIntro: "Introduction text for AI crawlers",

    // Robot.txt settings
    allowAIBots: true, // Allow AI crawlers
    crawlDelay: null,  // Set crawl delay in seconds if needed
  },

  // Routing Configuration
  routing: {
    docBase: "doc", // Base path for docs (e.g., /doc, /docs, /wiki)
    trailingSlash: false,
  },

  // Workspace Configuration
  workspace: {
    path: "/Welcome to Hillnote! /", // Your workspace folder name
    enabled: true,
    documentsFolder: "documents",
    registryFile: "documents-registry.json",
    initialFile: "documents/Start Here .md",
  },

  // UI Configuration
  ui: {
    navigationMode: "wiki", // "emoji" or "wiki"
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

### 5. Required Dependencies

Ensure your `package.json` includes these dependencies:

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-checkbox": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-scroll-area": "^1.2.2",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-sheet": "^1.1.2",
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
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.16",
    "eslint": "^8.57.1",
    "eslint-config-next": "15.5.2",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.5.7"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "generate-pages": "node scripts/generate-pages.mjs",
    "prebuild": "node scripts/generate-pages.mjs"
  }
}
```

### 6. Generate Static Pages

Run the generation script to create static pages from your markdown files:

```bash
npm run generate-pages
```

This will:
- Generate static pages in `app/doc/` (or `src/app/doc/` if using src folder) from your markdown files
- Create `public/sitemap.xml` for SEO
- Generate `public/robots.txt` with your configuration
- Create `public/llms.txt` for AI crawlers
- Generate `public/llms-txt.txt` with extended content

### 7. Start Development Server

```bash
npm run dev
```

Your documentation site will be available at `http://localhost:3000`

### 8. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
your-project/
├── app/                         # Next.js app directory
│   ├── api/                    # API routes for dynamic content
│   └── doc/                    # Generated static documentation pages
├── hillnoteDoc/                 # Documentation system (at project root)
│   ├── components/             # UI components
│   ├── config/                # Site configuration
│   ├── lib/                   # Utility functions
│   ├── styles/                # CSS styles
│   └── TO BE MOVED/           # API routes to be moved to app/api
├── components/
│   └── ui/                     # Shadcn UI components
├── public/
│   ├── Welcome to Hillnote!/   # Your Hillnote workspace
│   ├── robots.txt              # Generated robots.txt
│   ├── sitemap.xml             # Generated sitemap
│   └── llms.txt                # Generated LLM-readable file
├── scripts/
│   └── generate-pages.mjs      # Page generation script
└── package.json
```

## 🎨 Customization

### Changing the Documentation URL Path

Edit `routing.docBase` in `site.config.js`:
- `"doc"` → URLs like `/doc/page-name`
- `"docs"` → URLs like `/docs/page-name`
- `"wiki"` → URLs like `/wiki/page-name`

### Styling

- Edit Tailwind config in `tailwind.config.js`
- Modify component styles in `hillnoteDoc/styles/`
- Update theme colors in `app/globals.css`

### Navigation Mode

Set `ui.navigationMode` in config:
- `"emoji"` - Shows emoji icons in navigation
- `"wiki"` - Clean accordion-style navigation

## 🔧 Troubleshooting

### Common Issues

1. **"Cannot find module" errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that all paths in imports are correct

2. **Pages not generating**
   - Verify your workspace is in `public/` folder
   - Check that `documents-registry.json` exists
   - Ensure markdown files are in the `documents/` folder

3. **Styling issues**
   - Run `npm run dev` to ensure Tailwind CSS is compiled
   - Clear browser cache

4. **API routes not working**
   - Ensure API files are in `app/api/` not `hillnoteDoc/TO BE MOVED/api/`
   - Check Next.js console for error messages

5. **Import errors after moving hillnoteDoc**
   - All imports should use `@/hillnoteDoc` instead of `@/app/hillnoteDoc`
   - Run the provided update scripts if available

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables if needed
4. Deploy

### Other Platforms
- **Netlify**: Works with Next.js adapter
- **AWS Amplify**: Full Next.js support
- **Self-hosted**: Use `npm run build` and `npm start`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this software for any purpose.

## 🤝 Support

- Documentation: Visit your generated `/doc` pages
- Issues: Create an issue in your repository
- Community: Join the Hillnote community

---

Built with ❤️ using Next.js, Tailwind CSS, and Shadcn UI