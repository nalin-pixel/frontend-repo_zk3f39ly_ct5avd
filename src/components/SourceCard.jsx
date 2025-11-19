import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

export default function SourceCard({ source }) {
  const [expanded, setExpanded] = useState(false)

  const hasMore = source.total_hits > source.preview.length
  const hitsToShow = expanded ? source.hits : source.preview

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur supports-[backdrop-filter]:bg-white/10 hover:border-blue-400/30 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-lg">{source.source}</h3>
        <a href={source.more_url} target="_blank" rel="noreferrer" className="text-blue-300 text-sm hover:underline inline-flex items-center gap-1">
          More on site <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {hitsToShow && hitsToShow.length > 0 ? (
        <ul className="space-y-2">
          {hitsToShow.map((hit, idx) => (
            <li key={idx} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <span className="text-blue-100 truncate pr-3">{hit.title}</span>
              <a href={hit.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white inline-flex items-center gap-1 text-sm">
                Open <ExternalLink className="w-4 h-4" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-blue-200/70 text-sm">No exact free entries found here for your search.</p>
      )}

      {hasMore && (
        <button onClick={() => setExpanded((v) => !v)} className="mt-4 w-full inline-flex items-center justify-center gap-2 text-blue-100 hover:text-white bg-white/5 border border-white/10 rounded-xl py-2">
          {expanded ? (
            <>
              Show fewer <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              More hits <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  )
}
