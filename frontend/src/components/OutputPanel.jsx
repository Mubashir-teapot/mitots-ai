import { useState } from 'react'

export default function OutputPanel({ content, loading, onClear }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!content) return
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card flex flex-col p-5 h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <span className="text-[11px] font-bold text-text-secondary tracking-[1px]">
          📋 GENERATED OUTPUT
        </span>
        {content && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="btn-outline"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
            <button onClick={onClear} className="btn-outline">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 min-h-0 bg-[#F8FAFC] rounded-lg border border-app-border overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="spinner !w-7 !h-7" />
            <p className="text-sm text-text-secondary animate-pulse">Generating with AI…</p>
          </div>
        ) : content ? (
          <div className="h-full overflow-y-auto p-4">
            <pre className="font-mono text-[12px] leading-[1.75] text-text-primary whitespace-pre-wrap break-words">
              {content}
            </pre>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
            <div className="w-12 h-12 rounded-xl bg-app-bg border border-app-border flex items-center justify-center">
              <svg className="w-6 h-6 text-[#DDE3EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary">No output yet</p>
              <p className="text-xs text-text-secondary/70 mt-0.5">Fill in the details and click Generate</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
