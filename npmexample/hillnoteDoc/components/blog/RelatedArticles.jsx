"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function RelatedArticles({ currentSlug, tags = [], limit = 3 }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.posts) {
          // Filter out current post
          const otherPosts = data.posts.filter(post => post.slug !== currentSlug)

          // Score and sort by matching tags
          if (tags.length > 0) {
            const scored = otherPosts.map(post => ({
              ...post,
              score: post.tags?.filter(tag => tags.includes(tag)).length || 0
            }))
            scored.sort((a, b) => {
              if (b.score !== a.score) return b.score - a.score
              return new Date(b.publishDate) - new Date(a.publishDate)
            })
            setPosts(scored.slice(0, limit))
          } else {
            setPosts(otherPosts.slice(0, limit))
          }
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [currentSlug, tags, limit])

  if (loading || posts.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="h-full">
              {post.coverImage ? (
                <div className="aspect-[16/10] overflow-hidden rounded-lg bg-muted mb-4">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] rounded-lg bg-muted mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                {post.tags?.[0] && (
                  <>
                    <span>•</span>
                    <span>{post.tags[0]}</span>
                  </>
                )}
              </div>
              <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {post.description}
                </p>
              )}
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
