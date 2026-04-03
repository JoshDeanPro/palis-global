import React from 'react'

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strong?: boolean;
}

export function Card({ children, className = '', style, strong = false }: CardProps) {
  return (
    <div 
      className={`${strong ? 'surface-panel-strong' : 'surface-panel'} ${className}`} 
      style={style}
    >
      <div className="p-8">
        {children}
      </div>
    </div>
  )
}
