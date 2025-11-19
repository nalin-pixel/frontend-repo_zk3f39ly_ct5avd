import { Flame, Github } from 'lucide-react'

export default function Header() {
  return (
    <header className="py-6">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl leading-tight">Game Finder</h1>
            <p className="text-blue-200/70 text-xs">Find legit free sources for the games you love</p>
          </div>
        </div>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-blue-200 hover:text-white inline-flex items-center gap-2">
          <Github className="w-5 h-5" />
          <span className="text-sm">Star</span>
        </a>
      </div>
    </header>
  )
}
