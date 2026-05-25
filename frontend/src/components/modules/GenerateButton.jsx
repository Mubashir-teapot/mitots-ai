export default function GenerateButton({ loading, onClick, label = 'GENERATE WITH AI', hasOutput }) {
  return (
    <div className="pt-4 shrink-0">
      <button
        onClick={onClick}
        disabled={loading}
        className="btn-gold w-full py-3"
      >
        {loading ? (
          <>
            <span className="spinner !w-4 !h-4 !border-navy/30 [border-top-color:#0B1929]" />
            Generating…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 3l14 9-14 9V3z" />
            </svg>
            {hasOutput ? '↺ Regenerate' : label}
          </>
        )}
      </button>
    </div>
  )
}
