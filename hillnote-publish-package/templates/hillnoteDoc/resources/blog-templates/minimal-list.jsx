// Template: Minimal List
// Description: Clean, typography-focused list layout. Perfect for text-heavy blogs.
// Preview: Date and author on left, title and excerpt on right

"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'

const POSTS_PER_PAGE = 25

export default function BlogIndexPage() {
  const [posts, setPosts] = useState([])
  const [allTags, setAllTags] = useState([])
  const [selectedTag, setSelectedTag] = useState('all')
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPosts(data.posts || [])
          // Extract unique tags
          const tags = new Set()
          data.posts?.forEach(post => {
            post.tags?.forEach(tag => tags.add(tag))
          })
          setAllTags(Array.from(tags).sort())
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Reset visible count when tag changes
  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE)
  }, [selectedTag])

  const filteredPosts = selectedTag === 'all'
    ? posts
    : posts.filter(post => post.tags?.includes(selectedTag))

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Blog</h1>
          <p className="text-sm text-muted-foreground">
            Insights, updates, and stories from our team
          </p>
        </div>

        {/* Category Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6 pb-6 border-b">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedTag === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-accent/50 text-foreground'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-accent/50 text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <p className="text-muted-foreground py-8 text-sm">
            {posts.length === 0 ? 'No blog posts published yet.' : 'No posts found for this category.'}
          </p>
        ) : (
          <>
            <div className="space-y-5">
              {visiblePosts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="grid md:grid-cols-[140px,1fr] gap-4 items-start">
                    {/* Left: Meta info */}
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <time dateTime={post.publishDate} className="block">
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                      <span className="block truncate">{post.author}</span>
                      {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1.5">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-1.5 py-0.5 bg-muted rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Content */}
                    <div>
                      <h2 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {post.description}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-2 group-hover:gap-1.5 transition-all">
                        Read more
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}
                  className="px-6 py-2.5 bg-muted hover:bg-accent/50 rounded-lg text-sm font-medium transition-colors"
                >
                  Load More ({filteredPosts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
