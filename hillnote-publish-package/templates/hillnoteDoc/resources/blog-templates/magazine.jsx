// Template: Magazine
// Description: Magazine-style layout with large images and editorial feel.
// Preview: Full-width featured image, 2-column layout for other posts

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

  const featuredPost = visiblePosts[0]
  const otherPosts = visiblePosts.slice(1)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Blog</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Stories, insights, and ideas from our team
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Category Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                selectedTag === 'all'
                  ? 'bg-foreground text-background'
                  : 'bg-muted hover:bg-accent/50 text-foreground'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-foreground text-background'
                    : 'bg-muted hover:bg-accent/50 text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">
            {posts.length === 0 ? 'No blog posts published yet.' : 'No posts found for this category.'}
          </p>
        ) : (
          <>
            {/* Featured Post - Full Width */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`} className="block group mb-8">
                <article className="relative">
                  <div className="aspect-[21/9] overflow-hidden rounded-lg bg-muted">
                    {featuredPost.coverImage ? (
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-muted to-muted/50">
                        <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      {featuredPost.tags?.[0] && (
                        <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded text-xs font-medium uppercase tracking-wide">
                          {featuredPost.tags[0]}
                        </span>
                      )}
                      <time dateTime={featuredPost.publishDate}>
                        {new Date(featuredPost.publishDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {featuredPost.description}
                      </p>
                    )}
                    <div className="mt-2 text-xs text-muted-foreground">
                      By <span className="font-medium text-foreground">{featuredPost.author}</span>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Other Posts - 2 Column Grid */}
            {otherPosts.length > 0 && (
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
                {otherPosts.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <article>
                      <div className="aspect-[16/9] overflow-hidden rounded-md bg-muted mb-3">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-muted to-muted/50">
                            <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                        {post.tags?.[0] && (
                          <span className="font-medium text-primary uppercase tracking-wide">
                            {post.tags[0]}
                          </span>
                        )}
                        <span>•</span>
                        <time dateTime={post.publishDate}>
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                      <h3 className="text-sm font-medium mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {post.description}
                        </p>
                      )}
                      <div className="mt-2 text-xs text-muted-foreground">
                        By <span className="font-medium">{post.author}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

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
