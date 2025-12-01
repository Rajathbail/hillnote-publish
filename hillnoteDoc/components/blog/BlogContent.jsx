export function BlogContent({ html }) {
  return (
    <div
      className="markdown-content prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
