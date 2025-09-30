export const siteConfig = {
  // Site metadata
  siteName: "HillnoteWiki",
  siteDescription: "Convert your Hillnote workspace into a beautiful documentation website",
  // Update this to your actual domain when deploying to production
  siteUrl: "http://localhost:3000", // Change to https://your-domain.com in production

  // Project Structure Configuration
  projectStructure: {
    useSrcFolder: true, // Set to true if your Next.js project uses src/app instead of app/
    // appPath is automatically determined based on useSrcFolder
    get appPath() {
      return this.useSrcFolder ? "src/app" : "app"
    }
  },

  // SEO Configuration
  seo: {
    titleTemplate: "%s | Hillnote Documentation", // %s will be replaced with page title
    defaultTitle: "Hillnote Documentation",
    defaultDescription: "Hillnote is a local AI note-taking app with built-in LLM support",
    keywords: "documentation, hillnote, markdown, notes, AI, LLM",
    author: "Hillnote Team",
    publisher: "Hillnote", // Publisher name for structured data
    twitterHandle: "@hillnote", // Optional: Twitter handle for Twitter cards
    ogImage: "/og-image.png", // Optional: Default Open Graph image

    // LLMs.txt configuration
    llmsIntro: "Welcome to Hillnote's documentation. This workspace contains comprehensive guides and references for using Hillnote, an AI-powered note-taking application with built-in LLM support.",

    // Robots.txt configuration
    allowAIBots: true, // Allow AI crawlers like GPTBot, Claude-Web, etc.
    crawlDelay: null, // Set to a number (in seconds) to add crawl-delay
  },

  // Routing Configuration
  routing: {
    // Base path for documentation pages (without leading slash)
    docBase: "doc", // Change this to customize your documentation URL (e.g., "docs", "wiki", "guide")
    // Enable trailing slashes
    trailingSlash: false,
  },

  // Workspace Configuration
  workspace: {
    // Path to the workspace folder (relative to public directory)
    path: "/Welcome to Hillnote! /",
    // Enable workspace connection
    enabled: true,
    // Documents folder name
    documentsFolder: "documents",
    // Registry file name
    registryFile: "documents-registry.json",
    // Initial file to display when the app loads (path relative to documents folder)
    initialFile: "documents/Start Here .md",
    // Custom document order (optional)
    // Define the order of documents/folders by their paths
    // Items not in this list will appear after, in their registry order
    customOrder: [

      // Add more paths here to customize the order
    ],
  },
  
  // UI Configuration - only keeping content-related settings
  ui: {
    // Navigation sidebar mode
    navigationMode: "wiki", // "emoji" or "wiki" - emoji shows emojis, wiki shows accordions without emojis

    // Show document title headers
    showHeaders: false, // Set to false to hide the document title section at the top of each page

    // Comments/Authors Notes section
    authorsNotes: {
      // Show/hide authors notes section at the bottom
      enabled: true,
      // Section title
      title: "Author's Notes",
    },

    // Related documents section
    relatedDocuments: {
      // Show/hide related documents section
      enabled: true,
      // Section title
      title: "Related Documents",
    }
  }
}