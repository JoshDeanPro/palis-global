import React from 'react'

export const buttonVariants = {
  base: "inline-flex items-center justify-center transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  primary: "bg-white text-black hover:bg-white/90 shadow-[0_4px_12px_rgba(255,255,255,0.15)]",
  secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
  outline: "bg-transparent border border-white/30 text-white hover:bg-white/10",
  ghost: "bg-transparent text-white/70 hover:text-white"
}

export const buttonSizes = {
  sm: "h-9 px-4 text-[0.7rem] uppercase tracking-[0.1em]",
  md: "h-11 px-6 text-[0.75rem] uppercase tracking-[0.15em]",
  lg: "h-14 px-10 text-[0.8rem] uppercase tracking-[0.2em]",
  icon: "h-10 w-10"
}

export const buttonClassName = `${buttonVariants.base} ${buttonVariants.primary} ${buttonSizes.md}`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button className={`${buttonVariants.base} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`} {...props} />
  )
}
