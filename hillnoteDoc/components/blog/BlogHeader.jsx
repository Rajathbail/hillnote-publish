export function BlogHeader({ title, publishDate, editDate }) {
  return (
    <header className="mb-12 text-center">
      {/* Date */}
      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
        <time dateTime={publishDate}>
          {new Date(publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        {editDate && (
          <>
            <span>•</span>
            <span>Updated {new Date(editDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
        {title}
      </h1>
    </header>
  )
}
