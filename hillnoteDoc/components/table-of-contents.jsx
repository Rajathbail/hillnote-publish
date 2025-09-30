"use client"

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function TableOfContents({
  showTitle = true,
  title = "On This Page",
  contentSelector = '.markdown-content'
} = {}) {
  const pathname = usePathname()
  const [activeId, setActiveId] = useState('')
  const [tocItems, setTocItems] = useState([])
  const [collapsedItems, setCollapsedItems] = useState(new Set())

  // Extract headings from the content
  useEffect(() => {
    // Clear previous TOC items when path changes
    setTocItems([])
    setActiveId('')

    const extractHeadings = () => {
      // First try to find the content element
      let contentElement = document.querySelector(contentSelector)

      // If not found, try to find the main content area (for static pages)
      if (!contentElement) {
        // Look for the main content area in static pages
        contentElement = document.querySelector('main')
      }

      if (!contentElement) {
        console.log('TableOfContents: No content element found')
        return
      }

      const headings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
      console.log('TableOfContents: Found headings:', headings.length)
      
      const items = []
      const stack = []

      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1))
        // Use innerText to get the rendered text without HTML tags
        // fallback to textContent if innerText is not available
        const text = heading.innerText || heading.textContent || ''
        
        // Skip empty headings
        if (!text.trim()) return
        
        // Generate an ID if it doesn't exist
        if (!heading.id) {
          heading.id = `heading-${index}-${text.toLowerCase().replace(/[^\w]+/g, '-')}`
        }

        const item = {
          id: heading.id,
          title: text,
          level: level,
          children: []
        }

        // Find the parent for this item
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop()
        }

        if (stack.length === 0) {
          // This is a top-level item
          items.push(item)
        } else {
          // This is a child of the last item in the stack
          const parent = stack[stack.length - 1].item
          if (!parent.children) parent.children = []
          parent.children.push(item)
        }

        stack.push({ item, level })
      })

      console.log('TableOfContents: Extracted items:', items)
      setTocItems(items)
      
      // Set the first item as active if there are items
      if (items.length > 0 && !activeId) {
        setActiveId(items[0].id)
      }
    }

    // Listen for content loaded event
    const handleContentLoaded = () => {
      console.log('TableOfContents: Content loaded event received')
      setTimeout(extractHeadings, 100)
    }
    
    window.addEventListener('markdown-content-loaded', handleContentLoaded)

    // Try immediate extraction for static content
    extractHeadings()

    // Also try with delay for dynamic content
    const initialTimeout = setTimeout(() => {
      extractHeadings()
    }, 500)

    // Re-extract when content changes (use MutationObserver)
    const observer = new MutationObserver(() => {
      extractHeadings()
    })

    // Try to observe after a delay
    const observerTimeout = setTimeout(() => {
      const contentElement = document.querySelector(contentSelector)
      if (contentElement) {
        observer.observe(contentElement, { 
          childList: true, 
          subtree: true,
          characterData: true 
        })
      }
    }, 500)

    return () => {
      window.removeEventListener('markdown-content-loaded', handleContentLoaded)
      clearTimeout(initialTimeout)
      clearTimeout(observerTimeout)
      observer.disconnect()
    }
  }, [contentSelector, pathname]) // Re-run when pathname changes

  // Track scroll position to highlight active heading
  useEffect(() => {
    const handleScroll = () => {
      const getAllIds = (items) => {
        const ids = []
        items.forEach(item => {
          ids.push(item.id)
          if (item.children) {
            ids.push(...getAllIds(item.children))
          }
        })
        return ids
      }

      const allIds = getAllIds(tocItems)
      const headingElements = allIds.map(id => ({
        id,
        el: document.getElementById(id)
      })).filter(item => item.el)

      // Find the scrollable container
      const scrollContainer = document.querySelector('.markdown-content')?.closest('.overflow-auto') ||
                              document.querySelector('main')?.closest('.overflow-auto') ||
                              document.querySelector('main')
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY
      const offset = 100 // Offset for better UX

      let currentActiveId = ''
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const { id, el } = headingElements[i]
        if (el) {
          const rect = el.getBoundingClientRect()
          const containerRect = scrollContainer?.getBoundingClientRect()
          const topPosition = containerRect 
            ? rect.top - containerRect.top + scrollTop
            : rect.top + window.scrollY
            
          if (topPosition <= scrollTop + offset) {
            currentActiveId = id
            break
          }
        }
      }

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId)
      }
    }

    // Listen to both window and container scroll
    const scrollContainer = document.querySelector('.markdown-content')?.closest('.overflow-auto')
    
    const scrollHandler = () => handleScroll()
    
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', scrollHandler)
    }
    window.addEventListener('scroll', scrollHandler)
    
    handleScroll() // Initial check

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', scrollHandler)
      }
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [tocItems, activeId])

  const handleClick = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('TableOfContents: Clicking on heading with id:', id)
    setActiveId(id)
    
    // Debug: List all elements with IDs containing "heading"
    const allHeadings = document.querySelectorAll('[id*="heading"]')
    console.log('TableOfContents: All heading elements found:', allHeadings.length)
    allHeadings.forEach(h => console.log('  - ID:', h.id, 'Text:', h.textContent))
    
    // Find the target element
    const targetElement = document.getElementById(id)
    console.log('TableOfContents: Looking for element with id:', id)
    console.log('TableOfContents: Found element:', targetElement)
    
    if (!targetElement) {
      // Try to find by searching all headings
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      headings.forEach(h => {
        if (h.id === id) {
          console.log('TableOfContents: Found heading via query selector:', h)
        }
      })
      
      console.log('TableOfContents: Element not found for id:', id)
      return
    }
    
    // Simple approach: just use scrollIntoView
    console.log('TableOfContents: Scrolling to element')
    
    // Try multiple scroll methods
    try {
      // Method 1: Direct scrollIntoView
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      })
      console.log('TableOfContents: Used scrollIntoView')
    } catch (error) {
      console.error('TableOfContents: Error with scrollIntoView:', error)
      
      // Method 2: Manual scroll calculation
      try {
        const rect = targetElement.getBoundingClientRect()
        const absoluteTop = rect.top + window.pageYOffset
        window.scrollTo({
          top: absoluteTop - 100,
          behavior: 'smooth'
        })
        console.log('TableOfContents: Used window.scrollTo')
      } catch (error2) {
        console.error('TableOfContents: Error with window.scrollTo:', error2)
      }
    }
  }

  const toggleCollapse = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    
    setCollapsedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const renderTocItem = (item, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isCollapsed = collapsedItems.has(item.id)
    const isActive = activeId === item.id

    return (
      <div key={item.id}>
        <div className="flex items-center">
          {hasChildren && (
            <button
              onClick={(e) => toggleCollapse(e, item.id)}
              className="p-0.5 hover:bg-accent/50 rounded mr-1"
            >
              {isCollapsed ? (
                <ChevronRight className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
          )}
          <button
            onClick={(e) => handleClick(e, item.id)}
            className={cn(
              "flex-1 text-left text-sm py-1 px-2 rounded-md transition-colors",
              depth === 0 ? "font-medium" : "",
              depth === 1 ? "text-muted-foreground" : "",
              depth >= 2 ? "text-muted-foreground" : "",
              isActive
                ? "bg-accent text-accent-foreground font-medium"
                : "hover:bg-accent/50",
              !hasChildren && depth === 0 ? "ml-5" : "",
              !hasChildren && depth > 0 ? "ml-5" : ""
            )}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
          >
            {item.title}
          </button>
        </div>
        {hasChildren && !isCollapsed && (
          <div>
            {item.children.map(child => renderTocItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  // Show a message if no headings found
  if (tocItems.length === 0) {
    return (
      <div className="h-full p-3">
        <div className="h-full flex flex-col bg-muted rounded-lg">
          {showTitle && (
            <div className="px-6 pt-6 pb-4">
              <h3 className="text-xs text-primary/40 font-semibold">{title}</h3>
            </div>
          )}
          <div className="flex-1 px-4 py-2 text-sm text-muted-foreground">
            No headings found
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full p-3">
      <div className="h-full flex flex-col">
        {showTitle && (
          <div className="px-6 pt-6 pb-4 flex-shrink-0">
            <h3 className="text-xs text-primary/40 font-semibold">{title}</h3>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <nav className="space-y-1">
            {tocItems.map(item => renderTocItem(item))}
          </nav>
        </div>
      </div>
    </div>
  )
}