import { useState } from 'react'
import InputField from '../ui/InputField'
import SelectField from '../ui/SelectField'
import GenerateButton from './GenerateButton'

const INDUSTRIES = ['Banking','Insurance','Telecommunications','Oil & Gas','Pharmaceuticals','Education','Government','Healthcare','Retail','Other']

export default function ProposalModule({ onGenerate, loading, output }) {
  const [clientName, setClientName] = useState('')
  const [industry, setIndustry] = useState('Banking')
  const [services, setServices] = useState('')
  const [users, setUsers] = useState('')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!clientName.trim()) e.clientName = 'Client name is required'
    if (!services.trim()) e.services = 'Services are required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleGenerate() {
    if (!validate()) return
    const date = new Date().toISOString().split('T')[0]
    onGenerate(`Generate a complete professional business proposal.
Date: ${date}
Client: ${clientName.trim()}
Industry: ${industry}
Services Required: ${services.trim()}
Estimated Users: ${users.trim() || 'TBD'}
Project Duration: ${duration.trim() || 'TBD'}
Special Requirements: ${notes.trim() || 'None'}

Include: executive summary, about Ora-Tech with credentials, proposed solution, why choose us with relevant client references from the same industry, implementation approach, next steps, full contact info.`)
  }

  return (
    <div className="flex flex-col h-full p-5">
      <p className="mitots-label mb-4">INPUT DETAILS</p>
      <div className="flex-1 overflow-y-auto space-y-0 pr-1">
        <div className="grid grid-cols-2 gap-3">
          <InputField label="CLIENT NAME" value={clientName} onChange={setClientName}
            placeholder="e.g. National Bank of Pakistan" required error={errors.clientName} />
          <SelectField label="INDUSTRY" value={industry} onChange={setIndustry} options={INDUSTRIES} />
        </div>
        <InputField label="SERVICES REQUIRED" value={services} onChange={setServices}
          placeholder="e.g. Oracle ERP E-Business Suite Implementation" required error={errors.services} />
        <div className="grid grid-cols-2 gap-3">
          <InputField label="ESTIMATED USERS" value={users} onChange={setUsers} placeholder="e.g. 200" />
          <InputField label="PROJECT DURATION" value={duration} onChange={setDuration} placeholder="e.g. 6-12 months" />
        </div>
        <InputField label="SPECIAL REQUIREMENTS" value={notes} onChange={setNotes}
          rows={3} placeholder="e.g. Multi-branch support, integration with core banking..." />
      </div>
      <GenerateButton loading={loading} onClick={handleGenerate} label="GENERATE PROPOSAL" hasOutput={!!output} />
    </div>
  )
}
