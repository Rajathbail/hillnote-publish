#!/usr/bin/env node

import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageRoot = join(__dirname, '..')
const sourceRoot = join(__dirname, '..', '..') // Go up to hillnote-publish folder

async function build() {
  console.log('Building @hillnote/publish...')

  const templatesDir = join(packageRoot, 'templates')

  // Clean templates directory
  if (fs.existsSync(templatesDir)) {
    await fs.remove(templatesDir)
  }

  await fs.ensureDir(templatesDir)

  // Copy hillnoteDoc folder (excluding TO BE MOVED and README)
  console.log('Copying hillnoteDoc...')
  await fs.copy(
    join(sourceRoot, 'hillnoteDoc'),
    join(templatesDir, 'hillnoteDoc'),
    {
      filter: (src) => {
        const relativePath = src.replace(join(sourceRoot, 'hillnoteDoc'), '')
        return !relativePath.includes('-- TO BE MOVED --') &&
               !relativePath.endsWith('README.md') &&
               !relativePath.includes('.DS_Store')
      }
    }
  )

  // Copy API routes from TO BE MOVED
  console.log('Copying API routes...')
  await fs.copy(
    join(sourceRoot, 'hillnoteDoc', '-- TO BE MOVED --', 'api'),
    join(templatesDir, 'api')
  )

  // Copy scripts from TO BE MOVED
  console.log('Copying generation scripts...')
  await fs.copy(
    join(sourceRoot, 'hillnoteDoc', '-- TO BE MOVED --', 'scripts'),
    join(templatesDir, 'scripts')
  )

  // Create dist directory (for npm compatibility)
  await fs.ensureDir(join(packageRoot, 'dist'))
  await fs.writeFile(
    join(packageRoot, 'dist', 'index.js'),
    '// This package is a CLI tool, use: npx @hillnote/publish init\n'
  )

  console.log('✓ Build complete!')
  console.log('Templates are in:', templatesDir)
}

build().catch(console.error)