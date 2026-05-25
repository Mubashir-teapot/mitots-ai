import { useState } from 'react'

const BUILT_IN_MODULES = [
  { key: 'proposal', icon: '📄', title: 'Proposal Generator', hint: 'Tailored client proposals' },
  { key: 'email', icon: '✉️', title: 'Email Drafter', hint: 'Professional emails' },
  { key: 'invoice', icon: '🧾', title: 'Invoice & Quotation', hint: 'Quotes and invoices' },
  { key: 'resource', icon: '👥', title: 'Resource Augmentation', hint: 'Staffing requests' },
  { key: 'hr', icon: '🏢', title: 'HR & Admin', hint: 'HR documents' },
  { key: 'projectdoc', icon: '📋', title: 'Project Documentation', hint: 'Technical project docs' },
]

const ICON_OPTIONS = ['⚙️', '📊', '📁', '🔧', '💼', '📌', '🗂️', '📝', '🔍', '💬']

export default function Sidebar({ activeKey, onModuleSelect, customModules, onAddModule }) {
  const [showDialog, setShowDialog] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newHint, setNewHint] = useState('')
  const [newIcon, setNewIcon] = useState('⚙️')
  const [saving, setSaving] = useState(false)

  function openDialog() {
    setNewTitle('')
    setNewHint('')
    setNewIcon('⚙️')
    setShowDialog(true)
  }

  async function handleAdd() {
    if (!newTitle.trim()) return
    setSaving(true)
    await onAddModule({
      key: `custom_${Date.now()}`,
      icon: newIcon,
      title: newTitle.trim(),
      hint: newHint.trim() || 'Custom module',
    })
    setSaving(false)
    setShowDialog(false)
  }

  return (
    <>
      <aside className="w-[255px] min-w-[255px] h-full bg-navy flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="w-9 h-9 bg-gold rounded-[9px] flex items-center justify-center text-xl font-bold shadow">
            ✦
          </div>
          <div>
            <div className="text-white font-extrabold text-[15px] leading-tight tracking-wide">MITOTS AI</div>
            <div className="text-gold text-[9px] font-bold tracking-[1.4px]">SOLUTION</div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3.5 space-y-0.5">
          <NavLabel>MODULES</NavLabel>
          {BUILT_IN_MODULES.map(m => (
            <NavItem
              key={m.key}
              module={m}
              isActive={activeKey === m.key}
              onClick={() => onModuleSelect(m.key)}
            />
          ))}

          {customModules.length > 0 && (
            <>
              <div className="pt-3" />
              <NavLabel>CUSTOM MODULES</NavLabel>
              {customModules.map(m => (
                <NavItem
                  key={m.key}
                  module={m}
                  isActive={activeKey === m.key}
                  onClick={() => onModuleSelect(m.key)}
                />
              ))}
            </>
          )}

          <div className="pt-3" />
          {/* Add Module Button */}
          <button
            onClick={openDialog}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gold/40 hover:border-gold/70 hover:bg-gold/5 transition-all group"
          >
            <span className="w-5.5 h-5.5 bg-gold/15 rounded-md flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span className="text-gold text-[12px] font-semibold">Add Module</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="h-px bg-white/10" />
        <div className="px-[18px] py-4">
          <p className="text-white/20 text-[10px] leading-[1.7]">
            Ora-Tech Systems Pvt. Ltd.<br />
            Oracle Platinum Partner · Est. 1990<br />
            www.ora-tech.com
          </p>
        </div>
      </aside>

      {/* Add Module Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[400px] mx-4 overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-app-border">
              <div className="w-7 h-7 bg-gold-bg rounded-lg flex items-center justify-center text-sm">📦</div>
              <h3 className="text-[15px] font-bold text-text-primary">Add New Module</h3>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="mitots-label">MODULE NAME</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Contract Generator"
                  className="mitots-input"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleAdd()}
                />
              </div>

              <div>
                <label className="mitots-label">SHORT DESCRIPTION</label>
                <input
                  type="text"
                  value={newHint}
                  onChange={e => setNewHint(e.target.value)}
                  placeholder="e.g. Auto-generate contracts"
                  className="mitots-input"
                />
              </div>

              <div>
                <label className="mitots-label">PICK AN ICON</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {ICON_OPTIONS.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewIcon(icon)}
                      className={`w-9 h-9 rounded-lg text-[18px] flex items-center justify-center border-2 transition-all
                        ${newIcon === icon
                          ? 'border-gold bg-gold-bg'
                          : 'border-app-border bg-app-bg hover:border-gold/40'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-app-border">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newTitle.trim() || saving}
                className="btn-gold px-5 py-2 text-[13px]"
              >
                {saving ? <span className="spinner !w-3.5 !h-3.5" /> : null}
                Add Module
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function NavLabel({ children }) {
  return (
    <p className="px-2.5 pt-1 pb-2 text-[9px] font-bold text-white/22 tracking-[1.2px] uppercase">
      {children}
    </p>
  )
}

function NavItem({ module, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-left
        ${isActive ? 'bg-gold/15' : 'hover:bg-white/5'}`}
    >
      <span className={`text-[17px] leading-none transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
        {module.icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className={`text-[12px] font-${isActive ? 'bold' : 'normal'} truncate leading-tight
          ${isActive ? 'text-gold' : 'text-white/60'}`}>
          {module.title}
        </div>
        <div className="text-[10px] text-white/22 truncate leading-tight mt-0.5">
          {module.hint}
        </div>
      </div>
      {isActive && (
        <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  )
}
