export default function SelectField({ label, value, onChange, options, required = false }) {
  return (
    <div className="mb-3.5">
      <label className="mitots-label">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="mitots-select"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
