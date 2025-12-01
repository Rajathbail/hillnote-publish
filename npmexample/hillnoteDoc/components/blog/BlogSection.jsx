// BlogSection - Embeddable blog preview for homepages and landing pages
// Usage: <BlogSection limit={3} title="From the blog" description="Latest updates" />
// Customize styling by modifying the classes below

"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function BlogSection({
  limit = 3,
  title = "From the blog",
  description = "Latest updates and insights from our team",
  showViewAll = true,
  className = ""
}) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.posts) {
          setPosts(data.posts.slice(0, limit))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [limit])

  if (loading) {
    return (
      <section className={`py-24 sm:py-32 ${className}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="h-10 w-48 bg-muted rounded animate-pulse mx-auto" />
            <div className="h-6 w-64 bg-muted rounded animate-pulse mx-auto mt-4" />
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video w-full rounded-2xl bg-muted" />
                <div className="mt-8 h-4 w-24 bg-muted rounded" />
                <div className="mt-3 h-6 w-full bg-muted rounded" />
                <div className="mt-5 h-20 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <section className={`py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col items-start justify-between">
              {/* Image */}
              <div className="relative w-full">
                {post.coverImage ? (
                  <img
                    alt={post.title}
                    src={post.coverImage}
                    className="aspect-video w-full rounded-2xl bg-muted object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                ) : (
                  <div className="aspect-video w-full rounded-2xl bg-muted sm:aspect-[2/1] lg:aspect-[3/2] flex items-center justify-center">
                    <svg className="w-12 h-12 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
              </div>

              {/* Content */}
              <div className="flex max-w-xl grow flex-col justify-between">
                {/* Meta */}
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.publishDate} className="text-muted-foreground">
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                  {post.tags?.[0] && (
                    <span className="relative z-10 rounded-full bg-muted px-3 py-1.5 font-medium text-muted-foreground hover:bg-accent/50">
                      {post.tags[0]}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-muted-foreground">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  {post.description && (
                    <p className="mt-5 line-clamp-3 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                </div>

                {/* Author */}
                <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                  <div className="size-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                    {post.author?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">
                      {post.author}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        {showViewAll && (
          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View all posts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
