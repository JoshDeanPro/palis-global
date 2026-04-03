import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type TabItem = {
  label: string
  href: string
  active?: boolean
}

type DashboardShellProps = {
  eyebrow: string
  title: string
  intro?: string
  tabs: TabItem[]
  children: ReactNode
}

export default function DashboardShell({ eyebrow, title, intro, tabs, children }: DashboardShellProps) {
  return (
    <div className="grid gap-8">
      <header className="card card-strong reveal">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div className="grid gap-3">
            <p className="section-label">{eyebrow}</p>
            <h1 className="font-serif text-3xl font-semibold leading-tight text-ivory sm:text-4xl">{title}</h1>
            {intro ? <p className="text-sm leading-relaxed">{intro}</p> : null}
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Dashboard sections">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                to={tab.href}
                className={cn('tab-item', tab.active && 'tab-item-active')}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="reveal">
        {children}
      </div>
    </div>
  )
}
