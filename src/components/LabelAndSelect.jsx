import React from 'react'

export function LabelandSelect({ label, name, labelclass, options, onchange, selectclass }) {
  return (
    <div>
      <label className={labelclass}>{label}</label>
      <select name={name} onChange={onchange} className={selectclass}>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
