import { useState } from 'react'
import InputField from '../ui/InputField'
import GenerateButton from './GenerateButton'

export default function ResourceModule({ onGenerate, loading, output }) {
  const [clientName, setClientName] = useState('')
  const [role, setRole] = useState('')
  const [count, setCount] = useState('2')
  const [duration, setDuration] = useState('')
  const [skills, setSkills] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!clientName.trim()) e.clientName = 'Client name is required'
    if (!role.trim()) e.role = 'Role is required'
    if (!skills.trim()) e.skills = 'Required skills are required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleGenerate() {
    if (!validate()) return
    const date = new Date().toISOString().split('T')[0]
    onGenerate(`Generate a professional resource augmentation proposal.
Date: ${date}
Client: ${clientName.trim()}
Role Required: ${role.trim()}
Number of Resources: ${count.trim() || '1'}
Required Skills: ${skills.trim()}
Engagement Duration: ${duration.trim() || 'TBD'}
Additional Requirements: ${notes.trim() || 'None'}

Include: understanding of requirement, proposed resource profile with skills and certifications, our experience in this domain with relevant client references, engagement terms and conditions, onboarding timeline, next steps.`)
  }

  return (
    <div className="flex flex-col h-full p-5">
      <p className="mitots-label mb-4">INPUT DETAILS</p>
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3">
          <InputField label="CLIENT NAME" value={clientName} onChange={setClientName}
            placeholder="e.g. Telenor Pakistan" required error={errors.clientName} />
          <InputField label="ROLE / POSITION REQUIRED" value={role} onChange={setRole}
            placeholder="e.g. Oracle DBA" required error={errors.role} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <InputField label="NO. OF RESOURCES" value={count} onChange={setCount} placeholder="e.g. 2" />
          <InputField label="ENGAGEMENT DURATION" value={duration} onChange={setDuration} placeholder="e.g. 6 months" />
        </div>
        <InputField label="REQUIRED SKILLS & EXPERIENCE" value={skills} onChange={setSkills}
          rows={3} required error={errors.skills}
          placeholder="e.g. Oracle 19c, RAC, Data Guard, OCP certified, 5+ years experience" />
        <InputField label="ADDITIONAL REQUIREMENTS" value={notes} onChange={setNotes}
          rows={2} placeholder="e.g. On-site at client premises, Karachi location, Monday to Friday" />
      </div>
      <GenerateButton loading={loading} onClick={handleGenerate} label="GENERATE PROPOSAL" hasOutput={!!output} />
    </div>
  )
}
