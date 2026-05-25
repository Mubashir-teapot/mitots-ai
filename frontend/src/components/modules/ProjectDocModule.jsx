import { useState } from 'react'
import InputField from '../ui/InputField'
import SelectField from '../ui/SelectField'
import GenerateButton from './GenerateButton'

const DOC_TYPES = ['Project Proposal','Business Requirements Document (BRD)','Technical Specification Document','Project Status Report','Statement of Work (SOW)','Project Closure Report','Risk Assessment Document','System Design Document']

export default function ProjectDocModule({ onGenerate, loading, output }) {
  const [docType, setDocType] = useState('Project Proposal')
  const [projectName, setProjectName] = useState('')
  const [clientName, setClientName] = useState('')
  const [objective, setObjective] = useState('')
  const [scope, setScope] = useState('')
  const [team, setTeam] = useState('')
  const [timeline, setTimeline] = useState('')
  const [techStack, setTechStack] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!projectName.trim()) e.projectName = 'Project name is required'
    if (!clientName.trim()) e.clientName = 'Client name is required'
    if (!objective.trim()) e.objective = 'Project objective is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleGenerate() {
    if (!validate()) return
    const date = new Date().toISOString().split('T')[0]
    onGenerate(`Generate a complete professional ${docType} for Ora-Tech Systems Pvt. Ltd.
Date: ${date}
Document Type: ${docType}
Project Name: ${projectName.trim()}
Client Name: ${clientName.trim()}
Project Objective: ${objective.trim()}
Scope of Work: ${scope.trim() || 'To be defined'}
Project Team: ${team.trim() || 'Ora-Tech Project Team'}
Timeline / Duration: ${timeline.trim() || 'To be discussed'}
Technology Stack: ${techStack.trim() || 'Oracle Technologies'}
Additional Notes: ${notes.trim() || 'None'}

Write a complete, formal, professional ${docType}. Include all standard sections such as introduction, objectives, scope, deliverables, timeline, team structure, risks, and sign-off section. End with Ora-Tech Systems contact information.`)
  }

  return (
    <div className="flex flex-col h-full p-5">
      <p className="mitots-label mb-4">INPUT DETAILS</p>
      <div className="flex-1 overflow-y-auto pr-1">
        <SelectField label="DOCUMENT TYPE" value={docType} onChange={setDocType} options={DOC_TYPES} />
        <div className="grid grid-cols-2 gap-3">
          <InputField label="PROJECT NAME" value={projectName} onChange={setProjectName}
            placeholder="e.g. Oracle ERP Implementation — MCB Bank" required error={errors.projectName} />
          <InputField label="CLIENT NAME" value={clientName} onChange={setClientName}
            placeholder="e.g. MCB Bank Limited" required error={errors.clientName} />
        </div>
        <InputField label="PROJECT OBJECTIVE" value={objective} onChange={setObjective}
          rows={3} required error={errors.objective}
          placeholder="e.g. Implement Oracle EBS R12 to automate financial and HR operations across 50 branches" />
        <InputField label="SCOPE OF WORK" value={scope} onChange={setScope}
          rows={3} placeholder="e.g. Oracle Financials GL, AP, AR — Oracle HR and Payroll — data migration — user training" />
        <div className="grid grid-cols-2 gap-3">
          <InputField label="PROJECT TEAM" value={team} onChange={setTeam}
            placeholder="e.g. 1 PM, 2 Consultants, 1 DBA, 2 Developers" />
          <InputField label="TIMELINE / DURATION" value={timeline} onChange={setTimeline}
            placeholder="e.g. 6 months starting June 2026" />
        </div>
        <InputField label="TECHNOLOGY STACK" value={techStack} onChange={setTechStack}
          placeholder="e.g. Oracle EBS R12.2.9, Oracle Database 19c, Oracle Linux, Power BI" />
        <InputField label="ADDITIONAL NOTES" value={notes} onChange={setNotes}
          rows={3} placeholder="e.g. Integration with Temenos core banking system required" />
      </div>
      <GenerateButton loading={loading} onClick={handleGenerate} label="GENERATE DOCUMENT" hasOutput={!!output} />
    </div>
  )
}
