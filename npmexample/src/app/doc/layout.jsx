"use client"

import { NavigationSidebar } from '@/hillnoteDoc/components/navigation-sidebar'
import { TableOfContents } from '@/hillnoteDoc/components/table-of-contents'
import { ThemeToggle } from '@/hillnoteDoc/components/theme-toggle'
import { siteConfig } from '@/hillnoteDoc/config/site.config'
import '@/hillnoteDoc/styles/markdown.css'
import { Menu, List, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export default function DocLayout({ children }) {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  const showTitleBar = true
  const showNavigation = true
  const showTableOfContents = true
  const showSiteName = true
  const showThemeToggle = true
  const enableThemeToggle = true

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      {showTitleBar && (
        <>
          <header className="h-16 bg-background flex items-center justify-between px-4 md:px-8 pt-8 pb-4">
            {showSiteName && (
              <span className="font-semibold text-lg">{siteConfig.siteName}</span>
            )}
            {showThemeToggle && enableThemeToggle && (
              <ThemeToggle />
            )}
          </header>

          {/* Mobile Toolbar */}
          <div className="md:hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center h-12 px-2">
              {showNavigation && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setMobileNavOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}

              <div className="flex-1 flex items-center px-2 text-sm text-muted-foreground overflow-hidden">
                <span className="truncate">
                  <span>Documents</span>
                  <ChevronRight className="h-3 w-3 inline mx-1" />
                  <span className="text-foreground">
                    {pathname.split('/').pop()}
                  </span>
                </span>
              </div>

              {showTableOfContents && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 lg:hidden"
                  onClick={() => setMobileTocOpen(true)}
                >
                  <List className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex max-w-8xl mx-auto">

          {/* Left Sidebar - Navigation (Desktop Only) */}
          {showNavigation && (
            <aside className="hidden md:block w-64 border-r border-border border-dashed overflow-y-auto flex-shrink-0">
              <NavigationSidebar
                showTitle={true}
                title="All Pages"
                selectedFile={pathname}
              />
            </aside>
          )}

          {/* Center - Main Content */}
          <main className="flex-1 bg-background overflow-y-auto">
            {children}
          </main>

          {/* Right Sidebar - Table of Contents (Large Desktop Only) */}
          {showTableOfContents && (
            <aside className="hidden lg:block w-64 overflow-y-auto flex-shrink-0">
              <TableOfContents
                showTitle={true}
                title="On This Page"
              />
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      {showNavigation && (
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent side="left" className="w-80 p-0 flex flex-col h-full">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle>All Pages</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <NavigationSidebar
                  showTitle={false}
                  selectedFile={pathname}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Table of Contents Sheet (Tablet and Mobile) */}
      {showTableOfContents && (
        <Sheet open={mobileTocOpen} onOpenChange={setMobileTocOpen}>
          <SheetContent side="right" className="w-80 p-0 flex flex-col h-full">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle>On This Page</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <TableOfContents
                  showTitle={false}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
