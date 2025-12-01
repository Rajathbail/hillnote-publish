export function BlogFooter({ author, tags = [] }) {
  return (
    <footer className="mt-16 p-6 bg-muted rounded-xl">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-4 py-2 bg-background rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Author */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">Author</p>
        <p className="font-medium underline underline-offset-4">{author}</p>
      </div>
    </footer>
  )
}
