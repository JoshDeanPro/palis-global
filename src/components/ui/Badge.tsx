import React from 'react'

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'warm' | 'neutral' | 'error';
  className?: string;
}

export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  const tones = {
    warm: 'bg-warm-primary/10 text-warm-primary border-warm-primary/20',
    neutral: 'bg-white/10 text-white/70 border-white/20',
    error: 'bg-red-500/10 text-red-500 border-red-500/20'
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-[1px] text-[0.6rem] font-medium border ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
