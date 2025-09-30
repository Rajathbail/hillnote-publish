# @hillnote/publish

Transform your Hillnote workspace into a beautiful, SEO-optimized documentation website with Next.js.

## 🚀 Quick Start

```bash
# Navigate to your Next.js project
cd your-nextjs-project

# Run the initialization command
npx @hillnote/publish init

# Or if using src/app structure
npx @hillnote/publish init --src
```

That's it! The CLI will automatically set up the entire documentation system.

## 📦 What Gets Installed

- `hillnoteDoc/` - Complete documentation system with components, config, and utilities
- `app/api/` - API routes for search, document fetching, and AI sitemap
- `scripts/generate-pages.mjs` - Automatic page generation from your markdown files

## 🔧 Next Steps

1. **Add your Hillnote workspace:**
   ```bash
   cp -r "/path/to/Welcome to Hillnote!" public/
   ```

2. **Configure your site:**
   Edit `hillnoteDoc/config/site.config.js`

3. **Generate pages:**
   ```bash
   npm run generate-pages
   ```

4. **Start dev server:**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000/doc` to see your documentation!

## ✨ Features

- 📚 Beautiful hierarchical navigation sidebar
- 🎨 Dark/Light theme support
- 📱 Fully responsive design
- 🔍 Built-in search functionality
- 🤖 AI-crawler optimized (llms.txt, sitemap.xml)
- 📝 Advanced markdown rendering
- ⚡ Static page generation

## 📖 Documentation

For detailed documentation, visit: [https://hillnote.com](https://hillnote.com)

## 🐛 Issues

Report issues at: [https://github.com/Rajathbail/hillnote-publish/issues](https://github.com/Rajathbail/hillnote-publish/issues)

## 📄 License

MIT © Rajath Bail