import '@/hillnoteDoc/styles/markdown.css'

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
