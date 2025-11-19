import { useState } from 'react'
import { motion } from 'framer-motion'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import SourceCard from './components/SourceCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState(null)

  const onSearch = async (q) => {
    setError('')
    setLoading(true)
    setResults(null)
    try {
      const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(q)}`)
      if (!res.ok) throw new Error('Failed to search')
      const data = await res.json()

      // Reorder: Ensure Steamrip would be first if present (N/A since we only query legal sources)
      setResults(data)
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40" aria-hidden>
        <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] bg-gradient-to-tr from-blue-600/60 to-indigo-600/60 blur-3xl rounded-full"></div>
        <div className="absolute top-1/2 -right-32 w-[40rem] h-[40rem] bg-gradient-to-tr from-indigo-600/50 to-blue-600/50 blur-3xl rounded-full"></div>
      </div>

      <Header />

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <SearchBar onSearch={onSearch} />
        </motion.div>

        <div className="mt-8 min-h-[300px]">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <motion.div
                className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
              />
            </div>
          )}

          {error && (
            <div className="text-center text-red-300 bg-white/5 border border-white/10 rounded-2xl p-4">
              {error}
            </div>
          )}

          {results && (
            <div>
              <div className="text-blue-200/80 text-sm mb-3">Search results for: <span className="text-white font-semibold">{results.query}</span></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.sources.map((src, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <SourceCard source={src} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="mt-16 text-center text-blue-200/60 text-xs">
          Data comes from the official stores and archives that legally list free games.
        </footer>
      </main>
    </div>
  )
}

export default App
