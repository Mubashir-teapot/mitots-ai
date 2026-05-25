import { useState } from 'react'
import InputField from '../ui/InputField'
import GenerateButton from './GenerateButton'

export default function CustomModule({ onGenerate, loading, output, title, icon, onDelete }) {
  const [recipient, setRecipient] = useState('')
  const [details, setDetails] = useState('')
  const [extra, setExtra] = useState('')
  const [errors, setErrors] = useState({})
  const [confirmDelete, setConfirmDelete] = useState(false)

  function validate() {
    const e = {}
    if (!details.trim()) e.details = 'Details are required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleGenerate() {
    if (!validate()) return
    const date = new Date().toISOString().split('T')[0]
    onGenerate(`Generate a professional ${title} document for Ora-Tech Systems Pvt. Ltd.
Date: ${date}
Module: ${title}
Recipient / Client: ${recipient.trim() || 'Not specified'}
Details: ${details.trim()}
Additional Instructions: ${extra.trim() || 'None'}

Write a complete, professional document. Follow Ora-Tech Systems' brand guidelines and include contact information at the end.`)
  }

  return (
    <div className="flex flex-col h-full p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <p className="text-sm font-bold text-text-primary">{title}</p>
        </div>
        <button
          onClick={() => setConfirmDelete(true)}
          className="text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Module
        </button>
      </div>

      {confirmDelete && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <p className="text-xs text-red-700 font-medium">Delete this module permanently?</p>
          <div className="flex gap-2">
            <button onClick={() => setConfirmDelete(false)}
              className="text-xs px-3 py-1 border border-app-border rounded-md text-text-secondary hover:bg-white">
              Cancel
            </button>
            <button onClick={onDelete}
              className="text-xs px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      )}

      <p className="mitots-label mb-3">INPUT DETAILS</p>
      <div className="flex-1 overflow-y-auto pr-1">
        <InputField label="RECIPIENT / CLIENT" value={recipient} onChange={setRecipient}
          placeholder="e.g. MCB Bank Limited" />
        <InputField label="DETAILS & CONTEXT" value={details} onChange={setDetails}
          rows={5} required error={errors.details}
          placeholder="Describe what you need — include key points, context, specific requirements..." />
        <InputField label="ADDITIONAL INSTRUCTIONS" value={extra} onChange={setExtra}
          rows={3} placeholder="e.g. Format as a formal letter, include specific clauses..." />
      </div>
      <GenerateButton loading={loading} onClick={handleGenerate} label={`GENERATE ${title.toUpperCase()}`} hasOutput={!!output} />
    </div>
  )
}
