export function BlogCoverImage({ src, alt }) {
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt}
      className="w-full aspect-video object-cover rounded-xl mb-10"
    />
  )
}
