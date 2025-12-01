"use client"

import React, { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, ChevronRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { debounce } from '@/hillnoteDoc/lib/debounce'

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [isMac, setIsMac] = useState(false)
  const router = useRouter()

  // Detect platform
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for CMD+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      // ESC to close
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setResults([])
        setSearched(false)
        return
      }

      setLoading(true)
      setSearched(true)

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        const data = await response.json()

        if (data.success) {
          setResults(data.results || [])
        } else {
          console.error('Search failed:', data.error)
          setResults([])
        }
      } catch (error) {
        console.error('Failed to search documents:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300),
    []
  )

  // Trigger search when query changes
  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  // Handle result click
  const handleResultClick = (result) => {
    router.push(result.url)
    setOpen(false)
    setQuery('')
    setResults([])
    setSearched(false)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' && results[index]) {
      handleResultClick(results[index])
    }
  }

  // Clear search when dialog closes
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
    if (!newOpen) {
      setQuery('')
      setResults([])
      setSearched(false)
    }
  }

  // Highlight matching text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={i} className="bg-emerald-200 dark:bg-emerald-800 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between gap-2 mb-2 hover:bg-primary/10 hover:border-slate-300 transition-all duration-300 group"
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search Docs</span>
          </div>
          <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Documentation
          </DialogTitle>
          <DialogDescription>
            Type to search through all documentation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for topics, features, or keywords..."
              className="pl-9 pr-4 h-10"
              autoFocus
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>

          {/* Search Results */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {!loading && searched && results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No results found</p>
                <p className="text-sm mt-1">Try searching with different keywords</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground px-1">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </p>

                {results.map((result, index) => (
                  <button
                    key={`${result.path}-${index}`}
                    onClick={() => handleResultClick(result)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-all",
                      "hover:bg-accent hover:border-accent-foreground/20",
                      "focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2",
                      "group"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <h3 className="font-medium text-sm truncate">
                            {highlightText(result.title, query)}
                          </h3>
                        </div>

                        {result.description && (
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                            {result.description}
                          </p>
                        )}

                        {result.snippet && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {highlightText(result.snippet, query)}
                          </p>
                        )}

                        {result.headings && result.headings.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {result.headings.slice(0, 3).map((heading, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-muted"
                              >
                                {heading.text}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                    </div>

                    {result.score && (
                      <div className="mt-2">
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 transition-all"
                            style={{ width: `${Math.min(result.score, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {!searched && !loading && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">Start typing to search</p>
                <p className="text-sm mt-1">Find documentation, guides, and more</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}