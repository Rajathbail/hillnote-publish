"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, Copy, Check, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function AskAIDialog() {
  const [copied, setCopied] = useState(false)
  const [docsData, setDocsData] = useState('')
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const fetchDocsData = async () => {
    if (docsData) return // Don't refetch if we already have the data

    setLoading(true)
    try {
      const response = await fetch('/api/docs?map=true')
      const text = await response.text()
      setDocsData(text)
    } catch (error) {
      console.error('Failed to fetch docs data:', error)
      setDocsData('Failed to load documentation context. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(docsData)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 mb-4 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300"
          onClick={fetchDocsData}
        >
          <Sparkles className="h-4 w-4" />
          <span>Ask AI</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Have a question? 🙋🏽‍♂️
          </DialogTitle>
          <DialogDescription>
            Let your favourite AI model answer it for you!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-4">
            <Image src="/images/ask-ai-dialog.jpg" className="rounded-lg" alt="Ask AI Dialog" width={1000} height={1000} />
            <ol className="space-y-4">
              <li className="flex items-start gap-4 bg-muted rounded-lg p-4">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-600 text-white font-semibold text-xs shrink-0">
                  1
                </span>
                <div className="space-y-1">
                  <span className="block font-medium text-foreground">Type your question in your favourite AI model</span>
                  <div className="flex gap-2 flex-wrap text-sm">
                    <a
                      href="https://Claude.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Claude.ai <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                    <span className="text-muted-foreground/50">•</span>
                    <a
                      href="https://chat.openai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                    >
                      ChatGPT.com <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="text-muted-foreground">others...</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3 bg-muted rounded-lg p-4">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-600 text-white font-semibold text-xs shrink-0">
                  2
                </span>
                <div className="space-y-2">
                  <span className="font-medium text-foreground block">Paste the documentation context at the end</span>
                  <Button
                    size="sm"
                    variant={copied ? "ghost" : "ghost"}
                    onClick={copyToClipboard}
                    disabled={!docsData || loading}
                    className="h-8 border border-dashed text-slate-500 hover:text-slate-800 hover:border-slate-600 transition-all duration-1000"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 mr-1.5" />
                        Copied to clipboard!
                      </>
                    ) : loading ? (
                      <>
                        Loading context...
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1.5" />
                        Copy documentation context
                      </>
                    )}
                  </Button>
                </div>
              </li>
            </ol>
          </div>

          {isExpanded && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">Documentation Context Preview:</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                    className="h-auto p-1"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsExpanded(false)}
                  className="text-xs"
                >
                  Hide
                </Button>
              </div>

              <div className="relative">
                <pre className={cn(
                  "bg-muted rounded-lg p-3 text-xs overflow-auto max-h-64",
                  "whitespace-pre-wrap break-words"
                )}>
                  {docsData}
                </pre>
              </div>
            </div>
          )}

          {docsData && !isExpanded && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(true)}
              className="w-full text-xs text-muted-foreground hover:text-foreground"
            >
              <ChevronDown className="h-3 w-3 mr-1" />
              Show documentation context preview
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}