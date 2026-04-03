import React from 'react'

interface SectionProps {
  id?: string;
  label?: string;
  title?: string;
  copy?: string;
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function Section({ id, label, title, copy, children, className = '', light = false }: SectionProps) {
  return (
    <section id={id} className={`py-40 ${className} ${light ? 'bg-white/5' : ''}`}>
      <div className="lp-shell">
        <div className="max-w-4xl mx-auto mb-20 text-center">
          {label && <span className="section-label mb-8">{label}</span>}
          {title && <h2 className="editorial-title mb-6">{title}</h2>}
          {copy && <p className="balanced-copy max-w-2xl mx-auto">{copy}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
