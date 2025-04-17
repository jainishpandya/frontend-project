import React from 'react'

const Checkbox = ({ label, checked, onChange, className }) => {
  return (
    <label className={`inline-flex items-center space-x-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <span className="">{label}</span>
    </label>
  )
}

export default Checkbox