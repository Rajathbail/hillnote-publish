import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <Link href="/doc">
        <button className="bg-emerald-300 hover:bg-emerald-400 text-black font-medium py-2 px-6 rounded-md text-sm transition-colors">
          Open Documentation
        </button>
      </Link>
    </div>
  )
}