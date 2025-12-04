interface ScienceNoteProps {
  expert: string
  insight: string
  source: string
  sourceUrl?: string
}

export function ScienceNote({ expert, insight, source, sourceUrl }: ScienceNoteProps) {
  return (
    <div className="bg-slate-100 border-l-4 border-sage-green-300 p-6 my-8 rounded-r-lg max-w-full">
      <p className="text-xs font-semibold text-sage-green-300 uppercase tracking-wide mb-2">
        The Science
      </p>
      <p className="text-slate-800 mb-3 leading-relaxed wrap-break-word">
        &ldquo;{insight}&rdquo;
      </p>
      <p className="text-sm text-slate-600 wrap-break-word">
        — {expert}, <em>{source}</em>
        {sourceUrl && (
          <a 
            href={sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 text-warm-coral hover:text-warm-coral-500 transition-colors inline-block"
          >
            →
          </a>
        )}
      </p>
    </div>
  )
}
