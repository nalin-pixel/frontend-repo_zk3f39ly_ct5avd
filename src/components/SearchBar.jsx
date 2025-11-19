import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const q = value.trim()
    if (!q) return
    onSearch(q)
  }

  return (
    <form onSubmit={submit} className="relative max-w-2xl w-full mx-auto">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur supports-[backdrop-filter]:bg-white/10 shadow-xl">
        <Search className="w-5 h-5 text-blue-200 ml-2" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for a game..."
          className="flex-1 bg-transparent outline-none text-white placeholder:text-blue-200/60 px-2 py-3"
        />
        <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-500 hover:to-indigo-500 transition-colors">
          Search
        </button>
      </div>
    </form>
  )
}
