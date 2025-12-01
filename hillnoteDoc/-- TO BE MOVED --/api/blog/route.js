import { NextResponse } from 'next/server'
import { getBlogPosts, getBlogPostBySlug, getBlogRegistry, isBlogEnabled } from '@/hillnoteDoc/lib/blog-server'

export async function GET(request) {
  try {
    // Check if blog feature is enabled
    if (!isBlogEnabled()) {
      return NextResponse.json(
        { success: false, error: 'Blog feature is not enabled. Create public/blog folder to enable.' },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const listFormat = searchParams.get('list')
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hillnote.com'

    // If slug is provided, return single post
    if (slug) {
      const post = await getBlogPostBySlug(slug)

      if (!post) {
        return NextResponse.json(
          { success: false, error: 'Blog post not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        post: {
          slug: post.slug,
          title: post.title,
          author: post.author,
          publishDate: post.publishDate,
          editDate: post.editDate,
          description: post.description,
          coverImage: post.coverImage,
          tags: post.tags,
          content: post.content,
          headings: post.headings,
          lastModified: post.lastModified
        }
      })
    }

    // Return list of all posts
    const registry = await getBlogRegistry()

    // If list=true, return plain text format
    if (listFormat === 'true' || listFormat === '1') {
      const urlList = registry.posts.map(post =>
        `${baseUrl}/blog/${post.slug}`
      )
      const textVersion = `Blog posts:\n\n${urlList.join('\n')}`

      return new Response(textVersion, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    return NextResponse.json({
      success: true,
      enabled: registry.enabled,
      count: registry.posts.length,
      posts: registry.posts.map(post => ({
        ...post,
        fullUrl: `${baseUrl}${post.path}`,
        apiUrl: `${baseUrl}${post.url}`
      }))
    })

  } catch (error) {
    console.error('Error in /api/blog:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
