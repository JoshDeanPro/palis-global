import React from 'react'

interface LoadingStateProps {
  title?: string;
  copy?: string;
}

export function LoadingState({ title = 'Reading the signs', copy }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-pulse">
      <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-6" />
      <h3 className="section-label mb-2">{title}</h3>
      {copy && <p className="balanced-copy text-sm opacity-50">{copy}</p>}
    </div>
  )
}

interface EmptyStateProps {
  title?: string;
  copy?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title = 'Nothing found', copy, action }: EmptyStateProps) {
  return (
    <div className="surface-panel p-16 text-center">
      <h3 className="editorial-title mb-4" style={{ fontSize: '1.5rem' }}>{title}</h3>
      {copy && <p className="balanced-copy mb-8">{copy}</p>}
      {action}
    </div>
  )
}

interface StatusAlertProps {
  children: React.ReactNode;
  tone?: 'warm' | 'error' | 'success' | 'neutral';
  className?: string;
}

export function StatusAlert({ children, tone = 'neutral', className = '' }: StatusAlertProps) {
  const tones = {
    warm: 'bg-warm-primary/10 text-warm-primary border-warm-primary/20',
    error: 'bg-red-500/10 text-red-500 border-red-500/20',
    success: 'bg-green-500/10 text-green-500 border-green-500/20',
    neutral: 'bg-white/10 text-white/70 border-white/20'
  }
  
  return (
    <div className={`p-4 border rounded-[2px] text-sm ${tones[tone]} ${className}`}>
      {children}
    </div>
  )
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative surface-panel-strong w-full max-w-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <h2 className="section-label mb-0">{title}</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition">✕</button>
        </div>
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
