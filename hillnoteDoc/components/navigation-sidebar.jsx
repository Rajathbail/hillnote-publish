"use client"

import React, { useState, useEffect } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Loader2,
  BookOpen,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getWorkspaceFileTree } from '@/hillnoteDoc/lib/workspace'
import { siteConfig } from '@/hillnoteDoc/config/site.config'
import { AskAIDialog } from './ask-ai-dialog'
import { SearchDialog } from './search-dialog'
import { documentPathToStaticUrl } from '@/hillnoteDoc/lib/static-routes'
import { useRouter, usePathname } from 'next/navigation'

// Check if a folder contains the active file
const folderContainsActiveFile = (node, currentFile) => {
  if (!node.children || !currentFile) return false
  
  return node.children.some(child => {
    if (child.id === currentFile) return true
    if (child.children) return folderContainsActiveFile(child, currentFile)
    return false
  })
}

// Wiki mode accordion component
const WikiTreeNode = ({ node, currentFile, onFileSelect, router, parentPath = '' }) => {
  const staticUrl = node.type === 'file' ? documentPathToStaticUrl(node.id) : null
  const isActive = staticUrl && currentFile === staticUrl
  const hasChildren = node.children && node.children.length > 0
  const accordionValue = parentPath ? `${parentPath}-${node.id}` : node.id

  // Check if this folder contains the active file by comparing static URLs
  const folderContainsActive = (node, current) => {
    if (!node.children || !current) return false

    return node.children.some(child => {
      if (child.type === 'file') {
        const childUrl = documentPathToStaticUrl(child.id)
        if (childUrl === current) return true
      }
      if (child.children) return folderContainsActive(child, current)
      return false
    })
  }

  const shouldBeOpen = folderContainsActive(node, currentFile)

  if (node.type === 'file') {
    return (
      <button
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors w-full text-left",
          isActive ? "bg-accent font-semibold" : "hover:bg-accent/50"
        )}
        onClick={() => {
          router.push(staticUrl)
          onFileSelect(staticUrl)
        }}
      >
        <span className="break-words">
          {node.name.endsWith('.md') ? node.name.replace(/\.md$/, '') : node.name}
        </span>
      </button>
    )
  }

  if (!hasChildren) {
    return (
      <div className="px-3 py-1.5 text-sm text-muted-foreground">
        {node.name}
      </div>
    )
  }

  return (
    <Accordion 
      type="single" 
      collapsible 
      className="w-full"
      defaultValue={shouldBeOpen ? accordionValue : undefined}
    >
      <AccordionItem value={accordionValue} className="border-b-0">
        <AccordionTrigger className="px-3 py-2 text-sm hover:no-underline hover:bg-accent/50 rounded-md">
          {node.name}
        </AccordionTrigger>
        <AccordionContent className="pl-3">
          <div className="flex flex-col space-y-1">
            {node.children?.map((child) => (
              <WikiTreeNode
                key={child.id}
                node={child}
                currentFile={currentFile}
                onFileSelect={onFileSelect}
                router={router}
                parentPath={accordionValue}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

// Emoji mode tree component
const TreeNodeComponent = ({ node, level = 0, currentFile, onFileSelect, router, mode = 'emoji' }) => {
  const staticUrl = node.type === 'file' ? documentPathToStaticUrl(node.id) : null

  // Check if this folder contains the active file by comparing static URLs
  const folderContainsActive = (node, current) => {
    if (!node.children || !current) return false

    return node.children.some(child => {
      if (child.type === 'file') {
        const childUrl = documentPathToStaticUrl(child.id)
        if (childUrl === current) return true
      }
      if (child.children) return folderContainsActive(child, current)
      return false
    })
  }

  const shouldBeOpen = folderContainsActive(node, currentFile)
  const [isExpanded, setIsExpanded] = useState(shouldBeOpen)

  const isActive = staticUrl && currentFile === staticUrl
  const hasChildren = node.children && node.children.length > 0
  
  // Update expansion state when currentFile changes
  useEffect(() => {
    if (shouldBeOpen) {
      setIsExpanded(true)
    }
  }, [shouldBeOpen, currentFile])

  const handleClick = () => {
    if (node.type === 'file' && staticUrl) {
      router.push(staticUrl)
      onFileSelect(staticUrl)
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <>
      <div className="relative group">
        <button
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors w-full text-left relative",
            isActive ? "bg-accent font-bold opacity-100" : "hover:bg-accent/50 opacity-80"
          )}
          onClick={handleClick}
          style={{ paddingLeft: `${level * 8 + 8}px` }}
        >
          {mode === 'emoji' && (
            <>
              {node.type === 'directory' && (
                <span className="transition-transform">
                  {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </span>
              )}
              
              {node.type === 'directory' ? (
                isExpanded ? <span className='text-md'>📁</span> : <span className='text-md'>📂</span>
              ) : (
                <span className="text-xs ml-5 shrink-0">{node.emoji || '🌵'}</span>
              )}
            </>
          )}
          
          {mode === 'wiki' && node.type === 'directory' && (
            <span className="transition-transform">
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </span>
          )}
          
          <span className="truncate">
            {node.type === 'file' && node.name.endsWith('.md') ? node.name.replace(/\.md$/, '') : node.name}
          </span>
        </button>
      </div>

      {isExpanded && hasChildren && (
        <div className="relative">
          {node.children?.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              currentFile={currentFile}
              onFileSelect={onFileSelect}
              router={router}
              mode={mode}
            />
          ))}
        </div>
      )}
    </>
  )
}

export function NavigationSidebar({
  showTitle = true,
  title = "All Pages",
  onFileSelect,
  selectedFile
} = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentFile, setCurrentFile] = useState(selectedFile || pathname || null)
  const [fileTree, setFileTree] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [navigationMode, setNavigationMode] = useState(siteConfig.ui?.navigationMode || 'emoji')

  // Update currentFile when selectedFile prop or pathname changes
  useEffect(() => {
    setCurrentFile(selectedFile || pathname || null)
  }, [selectedFile, pathname])

  useEffect(() => {
    const loadWorkspace = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        if (siteConfig.workspace.enabled) {
          const tree = await getWorkspaceFileTree()
          setFileTree(tree)
          
          if (tree.length === 0) {
            setError("No documents found in workspace")
          } else {
            // Auto-select initial file if configured
            if (siteConfig.workspace.initialFile && !currentFile) {
              const initialFile = siteConfig.workspace.initialFile
              setCurrentFile(initialFile)
              if (onFileSelect) {
                onFileSelect(initialFile)
              }
            }
          }
        } else {
          // Use dummy data if workspace is disabled
          setFileTree([
            {
              id: '1',
              name: 'Getting Started',
              type: 'directory',
              path: 'documents/Getting Started',
              children: [
                { id: '1-1', name: 'Introduction.md', type: 'file', path: 'documents/Getting Started/Introduction.md', emoji: '👋' },
                { id: '1-2', name: 'Installation.md', type: 'file', path: 'documents/Getting Started/Installation.md', emoji: '💿' },
                { id: '1-3', name: 'Quick Start.md', type: 'file', path: 'documents/Getting Started/Quick Start.md', emoji: '🚀' }
              ]
            },
            { id: '4', name: 'README.md', type: 'file', path: 'documents/README.md', emoji: '📖' },
          ])
        }
      } catch (err) {
        console.error('Error loading workspace:', err)
        setError('Failed to load workspace')
      } finally {
        setIsLoading(false)
      }
    }

    loadWorkspace()
  }, [])

  return (
    <div className="h-full flex flex-col p-3">
      {showTitle && (
        <div className="px-3 pt-6 pb-4">
          <h3 className="text-xs text-primary/40 font-semibold">{title}</h3>
        </div>
      )}
      <div className="px-2 space-y-2">
        <SearchDialog />
        <AskAIDialog />
      </div>
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full px-2 py-2">
          <div className="flex flex-col space-y-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-xs text-muted-foreground text-center py-4">
                {error}
              </div>
            ) : fileTree.length === 0 ? (
              <div className="text-xs text-muted-foreground text-center py-4">
                No documents found
              </div>
            ) : (
              navigationMode === 'wiki' ? (
                fileTree.map((node) => (
                  <WikiTreeNode
                    key={node.id}
                    node={node}
                    currentFile={currentFile}
                    router={router}
                    onFileSelect={(url) => {
                      setCurrentFile(url)
                      if (onFileSelect) {
                        onFileSelect(url)
                      }
                    }}
                  />
                ))
              ) : (
                fileTree.map((node) => (
                  <TreeNodeComponent
                    key={node.id}
                    node={node}
                    level={0}
                    currentFile={currentFile}
                    router={router}
                    onFileSelect={(url) => {
                      setCurrentFile(url)
                      if (onFileSelect) {
                        onFileSelect(url)
                      }
                    }}
                    mode={navigationMode}
                  />
                ))
              )
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}