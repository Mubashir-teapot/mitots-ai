import { useState } from 'react'
import InputField from '../ui/InputField'
import SelectField from '../ui/SelectField'
import GenerateButton from './GenerateButton'

const DOC_TYPES = ['Quotation','Proforma Invoice','Tax Invoice','Service Invoice']

export default function InvoiceModule({ onGenerate, loading, output }) {
  const [docType, setDocType] = useState('Quotation')
  const [clientName, setClientName] = useState('')
  const [company, setCompany] = useState('')
  const [items, setItems] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!clientName.trim()) e.clientName = 'Client name is required'
    if (!items.trim()) e.items = 'Items/services are required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleGenerate() {
    if (!validate()) return
    const date = new Date().toISOString().split('T')[0]
    onGenerate(`Generate a professional ${docType}.
Date: ${date}
Document Type: ${docType}
Client Name: ${clientName.trim()}
Client Company: ${company.trim() || clientName.trim()}
Services / Items:
${items.trim()}
Payment Notes: ${notes.trim() || '50% advance on Purchase Order, 50% upon delivery and go-live'}

Include: document number (e.g. QT-2026-001), itemized list with unit prices in PKR, subtotal, GST 18%, grand total, payment terms, validity period of 30 days, and Ora-Tech bank details note.`)
  }

  return (
    <div className="flex flex-col h-full p-5">
      <p className="mitots-label mb-4">INPUT DETAILS</p>
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="DOCUMENT TYPE" value={docType} onChange={setDocType} options={DOC_TYPES} />
          <InputField label="CLIENT NAME" value={clientName} onChange={setClientName}
            placeholder="e.g. Mr. Ahmed Khan" required error={errors.clientName} />
        </div>
        <InputField label="CLIENT COMPANY (FULL NAME)" value={company} onChange={setCompany}
          placeholder="e.g. MCB Bank Limited" />
        <InputField label="SERVICES / ITEMS (ONE PER LINE)" value={items} onChange={setItems}
          rows={5} required error={errors.items}
          placeholder={'Oracle ERP License — 100 users — 1 year\nImplementation Services — 200 hours\nAnnual Maintenance & Support'} />
        <InputField label="NOTES / PAYMENT TERMS" value={notes} onChange={setNotes}
          rows={2} placeholder="e.g. 50% advance on PO, 50% on go-live. Valid for 30 days." />
      </div>
      <GenerateButton loading={loading} onClick={handleGenerate} label="GENERATE INVOICE" hasOutput={!!output} />
    </div>
  )
}
