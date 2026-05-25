import { useState } from 'react'
import InputField from '../ui/InputField'
import SelectField from '../ui/SelectField'
import GenerateButton from './GenerateButton'

const EMAIL_TYPES = ['Client Inquiry Response','Follow-up Email','Introduction Email','Proposal Submission','Meeting Request','Support Response','Partnership Inquiry','Thank You Email']
const TONES = ['Formal','Semi-formal','Friendly Professional']

export default function EmailModule({ onGenerate, loading, output }) {
  const [emailType, setEmailType] = useState('Client Inquiry Response')
  const [tone, setTone] = useState('Formal')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipient, setRecipient] = useState('')
  const [company, setCompany] = useState('')
  const [subject, setSubject] = useState('')
  const [points, setPoints] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!recipient.trim()) e.recipient = 'Recipient name is required'
    if (!points.trim()) e.points = 'Key points are required'
    if (recipientEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim()))
      e.recipientEmail = 'Enter a valid email address'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleGenerate() {
    if (!validate()) return
    const date = new Date().toISOString().split('T')[0]
    onGenerate(`Draft a professional business email.
Date: ${date}
Email Type: ${emailType}
Subject: ${subject.trim() || 'Not specified'}
Recipient Name: ${recipient.trim()}
Recipient Email: ${recipientEmail.trim() || 'Not specified'}
Company: ${company.trim() || 'Not specified'}
Key Points: ${points.trim()}
Tone: ${tone}

Include subject line clearly labeled, salutation, full body, and professional sign-off from Ora-Tech Systems with contact details.`)
  }

  return (
    <div className="flex flex-col h-full p-5">
      <p className="mitots-label mb-4">INPUT DETAILS</p>
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="EMAIL TYPE" value={emailType} onChange={setEmailType} options={EMAIL_TYPES} />
          <SelectField label="TONE" value={tone} onChange={setTone} options={TONES} />
        </div>
        <InputField label="SEND TO (EMAIL ADDRESS)" value={recipientEmail} onChange={setRecipientEmail}
          type="email" placeholder="e.g. client@company.com" error={errors.recipientEmail} />
        <div className="grid grid-cols-2 gap-3">
          <InputField label="RECIPIENT NAME" value={recipient} onChange={setRecipient}
            placeholder="e.g. Mr. Ahmed Khan" required error={errors.recipient} />
          <InputField label="RECIPIENT COMPANY" value={company} onChange={setCompany}
            placeholder="e.g. MCB Bank Ltd" />
        </div>
        <InputField label="SUBJECT" value={subject} onChange={setSubject}
          placeholder="e.g. Oracle ERP Proposal — MCB Bank" />
        <InputField label="KEY POINTS / CONTEXT" value={points} onChange={setPoints}
          rows={5} required error={errors.points}
          placeholder="e.g. Respond to their Oracle ERP inquiry, mention our banking clients UBL and Mobilink, request a meeting next week" />
      </div>
      <GenerateButton loading={loading} onClick={handleGenerate} label="GENERATE EMAIL" hasOutput={!!output} />
    </div>
  )
}
