import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import OutputPanel from '../components/OutputPanel'
import { getHealth, getModules, createModule, deleteModule, generate } from '../services/api'

import ProposalModule from '../components/modules/ProposalModule'
import EmailModule from '../components/modules/EmailModule'
import InvoiceModule from '../components/modules/InvoiceModule'
import ResourceModule from '../components/modules/ResourceModule'
import HRModule from '../components/modules/HRModule'
import ProjectDocModule from '../components/modules/ProjectDocModule'
import CustomModule from '../components/modules/CustomModule'

const MODULE_META = {
  proposal:   { icon: '📄', title: 'Proposal Generator',      hint: 'Tailored client proposals' },
  email:      { icon: '✉️', title: 'Email Drafter',           hint: 'Professional emails' },
  invoice:    { icon: '🧾', title: 'Invoice & Quotation',     hint: 'Quotes and invoices' },
  resource:   { icon: '👥', title: 'Resource Augmentation',   hint: 'Staffing requests' },
  hr:         { icon: '🏢', title: 'HR & Admin',              hint: 'HR documents' },
  projectdoc: { icon: '📋', title: 'Project Documentation',   hint: 'Technical project docs' },
}

export default function MainLayout() {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('proposal')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [backendOnline, setBackendOnline] = useState(null)
  const [activeModel, setActiveModel] = useState('')
  const [customModules, setCustomModules] = useState([])

  const user = localStorage.getItem('mitots_user') || 'Admin'

  useEffect(() => {
    checkBackend()
    loadCustomModules()
  }, [])

  async function checkBackend() {
    try {
      const data = await getHealth()
      setBackendOnline(true)
      setActiveModel(data.activeModel || 'gemini')
    } catch {
      setBackendOnline(false)
    }
  }

  async function loadCustomModules() {
    try {
      const mods = await getModules()
      setCustomModules(mods.map(m => ({
        id: m.id,
        key: m.key,
        icon: m.icon,
        title: m.title,
        hint: m.hint,
      })))
    } catch {
      // silently fail — custom modules are optional
    }
  }

  function handleModuleSelect(key) {
    setActiveKey(key)
    setOutput('')
  }

  const handleGenerate = useCallback(async (prompt) => {
    setLoading(true)
    setOutput('')
    try {
      const data = await generate(activeKey, prompt)
      setOutput(data.content || '')
    } catch (err) {
      setOutput(`Error: ${err.message}\n\nMake sure the backend is running:\n  cd backend && npm run dev`)
    } finally {
      setLoading(false)
    }
  }, [activeKey])

  async function handleAddModule(mod) {
    try {
      const saved = await createModule({ key: mod.key, icon: mod.icon, title: mod.title, hint: mod.hint })
      setCustomModules(prev => [...prev, { ...mod, id: saved.id }])
    } catch {
      setCustomModules(prev => [...prev, mod])
    }
  }

  async function handleDeleteModule(key) {
    const mod = customModules.find(m => m.key === key)
    if (mod?.id) {
      try { await deleteModule(mod.id) } catch { /* ignore */ }
    }
    setCustomModules(prev => prev.filter(m => m.key !== key))
    setActiveKey('proposal')
    setOutput('')
  }

  function handleLogout() {
    localStorage.removeItem('mitots_token')
    localStorage.removeItem('mitots_user')
    navigate('/login')
  }

  // Resolve active module meta
  const isCustom = !MODULE_META[activeKey]
  const customMod = isCustom ? customModules.find(m => m.key === activeKey) : null
  const meta = isCustom
    ? { icon: customMod?.icon || '⚙️', title: customMod?.title || 'Custom Module', hint: customMod?.hint || 'Custom module' }
    : MODULE_META[activeKey]

  return (
    <div className="h-screen flex overflow-hidden bg-app-bg">
      <Sidebar
        activeKey={activeKey}
        onModuleSelect={handleModuleSelect}
        customModules={customModules}
        onAddModule={handleAddModule}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Status banner */}
        {backendOnline === true && (
          <div className="shrink-0 px-6 py-1.5 bg-emerald-50 border-b border-emerald-100">
            <p className="text-[11px] font-semibold text-emerald-700">
              ✦&nbsp; Backend connected — live AI generation active
              <span className="ml-2 px-1.5 py-0.5 bg-gold/10 text-gold rounded text-[10px] font-bold uppercase">{activeModel}</span>
            </p>
          </div>
        )}
        {backendOnline === false && (
          <div className="shrink-0 px-6 py-1.5 bg-blue-50 border-b border-blue-100">
            <p className="text-[11px] font-semibold text-blue-700">
              ℹ️&nbsp; Backend offline — start it with: <code className="font-mono">cd backend &amp;&amp; npm run dev</code>
            </p>
          </div>
        )}

        {/* Top bar */}
        <div className="shrink-0 flex items-center gap-3 px-6 py-4 bg-white border-b border-app-border">
          <div className="w-9 h-9 bg-gold-bg rounded-lg flex items-center justify-center text-xl">
            {meta.icon}
          </div>
          <div>
            <h1 className="text-[17px] font-bold text-text-primary leading-tight">{meta.title}</h1>
            <p className="text-xs text-text-secondary leading-tight">{meta.hint}</p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* AI badge */}
            <span className="px-3 py-1.5 bg-gold-bg border border-gold/30 rounded-full text-[11px] font-bold text-gold uppercase tracking-wide">
              {activeModel || '…'}
            </span>

            {/* Settings */}
            <button
              onClick={() => navigate('/settings')}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-secondary hover:bg-app-bg hover:text-text-primary transition-colors"
              title="Settings"
            >
              <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* User / logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-text-secondary hover:bg-app-bg hover:text-text-primary transition-colors text-xs font-medium"
              title="Sign out"
            >
              <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center text-white text-[10px] font-bold">
                {user[0]?.toUpperCase()}
              </div>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main content: split panes */}
        <div className="flex-1 min-h-0 flex gap-5 p-5 overflow-hidden">
          {/* Input panel */}
          <div className="flex-1 min-w-0 card flex flex-col overflow-hidden">
            <ActiveModule
              moduleKey={activeKey}
              customMod={customMod}
              onGenerate={handleGenerate}
              loading={loading}
              output={output}
              onDeleteCustom={() => handleDeleteModule(activeKey)}
            />
          </div>

          {/* Output panel */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <OutputPanel
              content={output}
              loading={loading}
              onClear={() => setOutput('')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ActiveModule({ moduleKey, customMod, onGenerate, loading, output, onDeleteCustom }) {
  const props = { onGenerate, loading, output }
  switch (moduleKey) {
    case 'proposal':   return <ProposalModule {...props} />
    case 'email':      return <EmailModule {...props} />
    case 'invoice':    return <InvoiceModule {...props} />
    case 'resource':   return <ResourceModule {...props} />
    case 'hr':         return <HRModule {...props} />
    case 'projectdoc': return <ProjectDocModule {...props} />
    default:
      return (
        <CustomModule
          {...props}
          title={customMod?.title || 'Custom Module'}
          icon={customMod?.icon || '⚙️'}
          onDelete={onDeleteCustom}
        />
      )
  }
}
