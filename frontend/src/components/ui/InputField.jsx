export default function InputField({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  rows,
  error,
  required = false,
}) {
  return (
    <div className="mb-3.5">
      <label className="mitots-label">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`mitots-input resize-none leading-relaxed ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`mitots-input ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
        />
      )}
      {error && (
        <p className="mt-1 text-[11px] text-red-500">{error}</p>
      )}
    </div>
  )
}
