interface ScienceNoteProps {
  expert: string
  insight: string
  source: string
  sourceUrl?: string
}

export function ScienceNote({ expert, insight, source, sourceUrl }: ScienceNoteProps) {
  return (
    <div className="bg-slate-100 border-l-4 border-gold-300 p-6 my-8 rounded-r-lg max-w-full">
      <p className="text-xs font-semibold text-gold-300 uppercase tracking-wide mb-2">
        The Science
      </p>
      <p className="text-slate-800 mb-3 leading-relaxed break-words">
        &ldquo;{insight}&rdquo;
      </p>
      <p className="text-sm text-slate-600 break-words">
        — {expert}, <em>{source}</em>
        {sourceUrl && (
          <a 
            href={sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 text-coral hover:text-coral-500 transition-colors inline-block"
          >
            →
          </a>
        )}
      </p>
    </div>
  )
}
