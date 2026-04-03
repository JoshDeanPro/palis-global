import React from 'react'

interface FieldWrapProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function FieldWrap({ label, children, className = '' }: FieldWrapProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {label && <label className="section-label" style={{ fontSize: '0.6rem' }}>{label}</label>}
      {children}
    </div>
  )
}

export function TextInput({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      className={`field-base ${className}`} 
      {...props} 
    />
  )
}

export function TextArea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea 
      className={`field-base min-h-[120px] ${className}`} 
      {...props} 
    />
  )
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

export function SelectField({ options, className = '', ...props }: SelectFieldProps) {
  return (
    <select className={`field-base ${className}`} {...props}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}
