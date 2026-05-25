import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHealth } from '../services/api'

export default function SettingsPage() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(false)
  const [online, setOnline] = useState(null)
  const [healthData, setHealthData] = useState(null)

  useEffect(() => { checkHealth() }, [])

  async function checkHealth() {
    setChecking(true)
    try {
      const data = await getHealth()
      setOnline(true)
      setHealthData(data)
    } catch {
      setOnline(false)
      setHealthData(null)
    } finally {
      setChecking(false)
    }
  }

  const activeModel = healthData?.activeModel || ''
  const modelId = activeModel === 'claude' ? healthData?.claudeModel : healthData?.geminiModel

  return (
    <div className="min-h-screen bg-app-bg">
      {/* Top bar */}
      <div className="bg-navy px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate('/app')}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gold rounded-lg flex items-center justify-center text-sm">✦</div>
          <h1 className="text-white font-bold text-[15px]">Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Backend section */}
        <section>
          <SectionLabel>BACKEND</SectionLabel>
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  online === null ? 'bg-text-secondary' :
                  online ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-red-500'
                }`} />
                <span className={`text-sm font-bold ${
                  online === null ? 'text-text-secondary' :
                  online ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {online === null ? 'Unknown' : online ? 'Connected' : 'Offline'}
                </span>
              </div>
              <button
                onClick={checkHealth}
                disabled={checking}
                className="btn-outline"
              >
                {checking ? <span className="spinner !w-3 !h-3" /> : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                {checking ? 'Checking…' : 'Test Connection'}
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <InfoRow label="URL" value={import.meta.env.VITE_API_URL || 'http://localhost:8080'} mono />
            </div>

            {online === false && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs font-mono text-red-700 leading-relaxed">
                  cd backend<br />
                  npm run dev
                </p>
              </div>
            )}
          </div>
        </section>

        {/* AI Model section */}
        <section>
          <SectionLabel>AI MODEL</SectionLabel>
          <div className="card p-5">
            {online ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-gold-bg border border-gold/30 rounded-full text-[11px] font-bold text-gold uppercase tracking-wide">
                    {activeModel || '…'}
                  </span>
                  {activeModel === 'gemini' && (
                    <span className="text-xs text-text-secondary">Google Gemini</span>
                  )}
                  {activeModel === 'claude' && (
                    <span className="text-xs text-text-secondary">Anthropic Claude</span>
                  )}
                </div>
                {modelId && (
                  <div className="mt-3">
                    <InfoRow label="Model ID" value={modelId} mono />
                  </div>
                )}
                <div className="mt-3">
                  <InfoRow label="Configured in" value="backend/.env" mono />
                </div>
              </>
            ) : (
              <p className="text-sm text-text-secondary">Connect to backend to view model info</p>
            )}
          </div>
        </section>

        {/* Switch model section */}
        <section>
          <SectionLabel>HOW TO SWITCH MODEL</SectionLabel>
          <div className="card p-5 space-y-3">
            <p className="text-sm text-text-primary">
              Edit <code className="font-mono text-xs bg-app-bg px-1.5 py-0.5 rounded border border-app-border">backend/.env</code> and change <code className="font-mono text-xs bg-app-bg px-1.5 py-0.5 rounded border border-app-border">ACTIVE_MODEL</code>:
            </p>
            <CodeBlock>ACTIVE_MODEL=gemini   # uses Gemini 2.5 Flash</CodeBlock>
            <CodeBlock>ACTIVE_MODEL=claude   # uses Claude Sonnet</CodeBlock>
            <p className="text-xs text-text-secondary leading-relaxed">
              Restart the backend after changing the file. No frontend rebuild needed.
            </p>
          </div>
        </section>

        {/* Account section */}
        <section>
          <SectionLabel>ACCOUNT</SectionLabel>
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm">
                  {(localStorage.getItem('mitots_user') || 'A')[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {localStorage.getItem('mitots_user') || 'Admin'}
                  </p>
                  <p className="text-xs text-text-secondary">Administrator</p>
                </div>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('mitots_token')
                  localStorage.removeItem('mitots_user')
                  navigate('/login')
                }}
                className="btn-outline text-red-500 border-red-200 hover:border-red-400 hover:text-red-600"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-bold text-text-secondary tracking-[1.2px] uppercase mb-2.5 px-0.5">
      {children}
    </p>
  )
}

function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-text-secondary font-semibold shrink-0">{label}:</span>
      <span className={`text-text-primary ${mono ? 'font-mono text-[12px]' : ''}`}>{value}</span>
    </div>
  )
}

function CodeBlock({ children }) {
  return (
    <div className="w-full px-4 py-2.5 bg-navy rounded-lg">
      <code className="font-mono text-[12px] text-gold leading-relaxed">{children}</code>
    </div>
  )
}
