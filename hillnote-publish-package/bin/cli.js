#!/usr/bin/env node

import { Command } from 'commander'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import ora from 'ora'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageRoot = join(__dirname, '..')

const program = new Command()

program
  .name('hillnote-publish')
  .description('Setup Hillnote documentation system in your Next.js project')
  .version('1.0.0')

program
  .command('init')
  .description('Initialize Hillnote documentation system in current directory')
  .option('--src', 'Use src/app structure instead of app/')
  .action(async (options) => {
    const spinner = ora('Initializing Hillnote Publish...').start()

    try {
      const cwd = process.cwd()
      const useSrc = options.src || fs.existsSync(join(cwd, 'src', 'app'))
      const appPath = useSrc ? 'src/app' : 'app'
      const hillnoteDocPath = useSrc ? 'src/hillnoteDoc' : 'hillnoteDoc'

      // Check if this is a Next.js project
      const packageJsonPath = join(cwd, 'package.json')
      if (!fs.existsSync(packageJsonPath)) {
        spinner.fail('No package.json found. Please run this command in a Next.js project.')
        process.exit(1)
      }

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      if (!packageJson.dependencies?.next) {
        spinner.warn('Next.js not detected in dependencies. This package is designed for Next.js projects.')
      }

      spinner.text = 'Copying hillnoteDoc system...'

      // Copy hillnoteDoc folder
      const sourcePath = join(packageRoot, 'templates', 'hillnoteDoc')
      const destPath = join(cwd, hillnoteDocPath)

      if (fs.existsSync(destPath)) {
        spinner.fail(`${hillnoteDocPath} already exists. Please remove it first or use a different project.`)
        process.exit(1)
      }

      await fs.copy(sourcePath, destPath)

      spinner.text = 'Setting up API routes...'

      // Copy API routes
      const apiSourcePath = join(packageRoot, 'templates', 'api')
      const apiDestPath = join(cwd, appPath, 'api')

      await fs.ensureDir(apiDestPath)
      await fs.copy(apiSourcePath, apiDestPath, { overwrite: false })

      spinner.text = 'Setting up scripts...'

      // Copy generation script (single script with fallback logic)
      const scriptsDir = join(cwd, 'scripts')
      await fs.ensureDir(scriptsDir)

      const scriptSource = join(packageRoot, 'templates', 'scripts', 'generate-pages.mjs')
      const scriptDest = join(scriptsDir, 'generate-pages.mjs')

      await fs.copy(scriptSource, scriptDest)

      spinner.text = 'Updating package.json...'

      // Update package.json with scripts
      if (!packageJson.scripts) {
        packageJson.scripts = {}
      }

      if (!packageJson.scripts['generate-pages']) {
        packageJson.scripts['generate-pages'] = 'node scripts/generate-pages.mjs'
      }

      if (!packageJson.scripts['prebuild']) {
        packageJson.scripts['prebuild'] = 'node scripts/generate-pages.mjs'
      }

      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))

      spinner.text = 'Updating configuration...'

      // Update site.config.js with correct useSrcFolder value
      const configPath = join(cwd, hillnoteDocPath, 'config', 'site.config.js')
      let configContent = await fs.readFile(configPath, 'utf-8')
      configContent = configContent.replace(
        /useSrcFolder:\s*\w+/,
        `useSrcFolder: ${useSrc}`
      )
      await fs.writeFile(configPath, configContent)

      spinner.text = 'Creating output directories...'

      // Create app/doc directory for generated pages
      await fs.ensureDir(join(cwd, appPath, 'doc'))

      spinner.text = 'Installing dependencies...'

      // Install required dependencies
      const dependencies = [
        '@radix-ui/react-accordion@^1.2.12',
        '@radix-ui/react-checkbox@^1.3.3',
        '@radix-ui/react-dialog@^1.1.15',
        '@radix-ui/react-scroll-area@^1.2.10',
        '@radix-ui/react-separator@^1.1.7',
        '@radix-ui/react-slot@^1.2.3',
        '@radix-ui/react-tabs@^1.1.13',
        'class-variance-authority@^0.7.1',
        'clsx@^2.1.1',
        'gray-matter@^4.0.3',
        'lucide-react@^0.542.0',
        'marked@^16.2.1',
        'marked-gfm-heading-id@^4.1.2',
        'next-themes@^0.4.6',
        'tailwind-merge@^3.3.1'
      ]

      const { execSync } = await import('child_process')

      try {
        execSync(`npm install ${dependencies.join(' ')}`, {
          cwd,
          stdio: 'pipe'
        })
      } catch (error) {
        spinner.warn('Failed to auto-install dependencies. Please run: npm install')
      }

      spinner.succeed('Hillnote Publish initialized successfully!')

      console.log('\n' + chalk.green('✓') + ' Next steps:\n')
      console.log('  1. Copy your Hillnote workspace to ' + chalk.cyan('public/Welcome to Hillnote!/'))
      console.log('  2. Configure your site in ' + chalk.cyan(`${hillnoteDocPath}/config/site.config.js`))
      console.log('  3. Run ' + chalk.cyan('npm run generate-pages') + ' to generate documentation pages')
      console.log('  4. Start your dev server with ' + chalk.cyan('npm run dev'))
      console.log('\n' + chalk.dim('Visit https://hillnote.com for more information'))

    } catch (error) {
      spinner.fail('Failed to initialize Hillnote Publish')
      console.error(chalk.red(error.message))
      process.exit(1)
    }
  })

program.parse()