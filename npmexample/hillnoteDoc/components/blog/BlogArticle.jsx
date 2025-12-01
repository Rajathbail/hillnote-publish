import { BackToBlog } from './BackToBlog'
import { BlogHeader } from './BlogHeader'
import { BlogFooter } from './BlogFooter'
import { BlogCoverImage } from './BlogCoverImage'
import { BlogContent } from './BlogContent'
import { RelatedArticles } from './RelatedArticles'

export function BlogArticle({
  slug,
  title,
  author,
  publishDate,
  editDate,
  coverImage,
  tags,
  content,
  structuredData
}) {
  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <article className="min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12">
          <BackToBlog />
          <BlogHeader
            title={title}
            publishDate={publishDate}
            editDate={editDate}
          />
          <BlogCoverImage src={coverImage} alt={title} />
          <BlogContent html={content} />
          <BlogFooter author={author} tags={tags} />
          <RelatedArticles currentSlug={slug} tags={tags} />
        </div>
      </article>
    </>
  )
}
