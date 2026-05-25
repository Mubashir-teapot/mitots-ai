import { useState } from 'react'
import InputField from '../ui/InputField'
import SelectField from '../ui/SelectField'
import GenerateButton from './GenerateButton'

const DOC_TYPES = ['Job Posting','Internal Announcement','Offer Letter','Warning Letter','Leave Policy Update','HR Circular','Department Memo','Performance Review Template']

export default function HRModule({ onGenerate, loading, output }) {
  const [docType, setDocType] = useState('Job Posting')
  const [department, setDepartment] = useState('')
  const [details, setDetails] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!department.trim()) e.department = 'Department / recipient is required'
    if (!details.trim()) e.details = 'Details are required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleGenerate() {
    if (!validate()) return
    const date = new Date().toISOString().split('T')[0]
    onGenerate(`Generate a professional ${docType} document for Ora-Tech Systems Pvt. Ltd.
Date: ${date}
Document Type: ${docType}
Department / Recipient: ${department.trim()}
Details & Instructions: ${details.trim()}

Write a complete, formal document appropriate for an ISO-certified IT company. Include all standard sections for this document type.`)
  }

  return (
    <div className="flex flex-col h-full p-5">
      <p className="mitots-label mb-4">INPUT DETAILS</p>
      <div className="flex-1 overflow-y-auto pr-1">
        <SelectField label="DOCUMENT TYPE" value={docType} onChange={setDocType} options={DOC_TYPES} />
        <InputField label="DEPARTMENT / RECIPIENT" value={department} onChange={setDepartment}
          placeholder="e.g. IT Department / All Staff" required error={errors.department} />
        <InputField label="DETAILS & INSTRUCTIONS" value={details} onChange={setDetails}
          rows={6} required error={errors.details}
          placeholder="e.g. Job posting for Oracle DBA in Karachi, minimum 5 years experience, OCP certification preferred, competitive salary offered" />
      </div>
      <GenerateButton loading={loading} onClick={handleGenerate} label="GENERATE DOCUMENT" hasOutput={!!output} />
    </div>
  )
}
