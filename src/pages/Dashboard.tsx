import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BrandMark from '../components/layout/BrandMark'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { FieldWrap, SelectField, TextArea, TextInput } from '../components/ui/Field'
import { EmptyState, LoadingState, StatusAlert } from '../components/ui/States'
import '../styles/Dashboard.css'

type DashboardMode = 'sanctuary' | 'ritual' | 'grimoire' | 'settings'
type DashboardProps = { mode: DashboardMode }

const tabs = [
  { label: 'Readings', href: '/portal' },
  { label: 'Insights', href: '/portal/ritual' },
  { label: 'History',  href: '/portal/grimoire' },
  { label: 'Settings', href: '/portal/settings' },
]

const readingCards = [
  {
    title: 'Season of restraint',
    status: 'Active',
    note: 'The reading suggests that clarity is arriving through subtraction. Protect quiet before making anything public.',
  },
  {
    title: 'Relationship crossing',
    status: 'Revisit',
    note: 'The current question is less about prediction than recognition. The repeated pattern concerns boundaries, not longing.',
  },
  {
    title: 'Energy and vocation',
    status: 'New',
    note: 'Exhaustion here looks less like weakness and more like misalignment between effort and meaning.',
  },
]

const insightDeck = [
  {
    title: 'The Lantern',
    subtitle: 'Observation, patience, inner steadiness',
    message: 'You do not need a louder sign. You need a calmer relationship to what has already become visible.',
    ritual: 'Take one evening without input, prediction, or performance. Write only what remains true in the quiet.',
  },
  {
    title: 'The Turning Sky',
    subtitle: 'Cycle change, alignment, willingness',
    message: 'The threshold is real, but it cannot be crossed by force. Let the next step be chosen by fit, not by urgency.',
    ritual: 'Name the next faithful action in one sentence. Remove every word written to impress or defend.',
  },
  {
    title: 'The Rooted Flame',
    subtitle: 'Care, devotion, embodied power',
    message: 'The answer may be quieter than expected because it belongs to practice, not to spectacle.',
    ritual: 'Protect one restorative habit for seven days and treat it as part of the guidance, not separate from it.',
  },
]

const historyItems = [
  {
    date: 'April 2, 2026',
    title: 'Reading: work realignment',
    copy: 'The session reframed pressure as a mismatch between external demand and internal season. Follow-up notes suggested relief after reducing unnecessary visibility.',
  },
  {
    date: 'March 29, 2026',
    title: 'Insight thread: returning contact',
    copy: 'The discussion clarified that the real question was self-trust under renewed attention, not romance alone.',
  },
  {
    date: 'March 21, 2026',
    title: 'Archive: fatigue and vocation',
    copy: 'Low energy was interpreted as a sign of misfit rather than failure, which opened a more strategic response.',
  },
]

export default function Dashboard({ mode }: DashboardProps) {
  const [question, setQuestion] = useState('')
  const [focus, setFocus] = useState('timing')
  const [drawCount, setDrawCount] = useState(0)
  const [archiveLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle')
  const [profileName, setProfileName] = useState('The Returning One')
  const selectedInsight = useMemo(() => insightDeck[drawCount % insightDeck.length], [drawCount])

  const navTabs = tabs.map(tab => ({
    ...tab,
    active: mode === 'sanctuary' ? tab.href === '/portal' : tab.href.endsWith(mode),
  }))

  const currentTitle = tabs.find(t =>
    mode === 'sanctuary' ? t.href === '/portal' : t.href.endsWith(mode)
  )?.label || 'Readings'

  return (
    <div className="dashboard-content animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* ── Tabs Navigation (Standard Mono Look) ── */}
      <nav className="dashboard-tabs" aria-label="Portal tabs">
        {navTabs.map(tab => (
          <Link
            key={tab.href}
            to={tab.href}
            className={`dashboard-tab ${tab.active ? 'dashboard-tab--active' : ''}`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="dashboard-grid">
        
        {/* ── Main Panel ── */}
        <section className="dashboard-main">
          <div className="dashboard-header-flex">
            <h1 className="editorial-title" style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{currentTitle}</h1>
            <p className="balanced-copy" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
              Welcome back. The current atmosphere suggests steady focus over sudden movement.
            </p>
          </div>

          <div className="subtle-divider" style={{ marginBottom: '2.5rem' }} />

          {mode === 'sanctuary' && (
            <div className="grid gap-8">
              {readingCards.map((card, idx) => (
                <Card key={card.title} className="reveal-block" data-idx={idx}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="section-label" style={{ fontSize: '0.75rem', marginBottom: 0 }}>{card.title}</h3>
                    <Badge tone={card.status === 'Active' ? 'warm' : 'neutral'}>{card.status}</Badge>
                  </div>
                  <p className="balanced-copy" style={{ fontSize: '0.95rem' }}>{card.note}</p>
                  <div className="mt-6 flex gap-4">
                    <button className="btn btn-secondary" style={{ fontSize: '0.65rem' }}>View Record</button>
                    <button className="btn btn-primary" style={{ fontSize: '0.65rem' }}>Add Note</button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {mode === 'ritual' && (
            <div className="dashboard-insight-focus">
              <Card strong className="mb-8">
                <div className="text-center py-6">
                  <span className="section-label" style={{ marginBottom: '1.5rem' }}>Drawn Observation</span>
                  <h2 className="editorial-title" style={{ fontSize: '2.4rem' }}>{selectedInsight.title}</h2>
                  <p className="balanced-copy" style={{ fontStyle: 'italic', color: 'rgba(230, 230, 230, 0.45)', marginBottom: '2rem' }}>
                    {selectedInsight.subtitle}
                  </p>
                  <p className="balanced-copy" style={{ fontSize: '1.15rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
                    "{selectedInsight.message}"
                  </p>
                  <div className="subtle-divider" style={{ width: '40px', margin: '0 auto 2.5rem' }} />
                  <p className="section-label" style={{ fontSize: '0.65rem', marginBottom: '1rem' }}>Today's Practice</p>
                  <p className="balanced-copy" style={{ fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto' }}>
                    {selectedInsight.ritual}
                  </p>
                </div>
              </Card>
              <div className="flex justify-center">
                <button className="btn btn-primary" onClick={() => setDrawCount(c => c + 1)}>Draw New Insight</button>
              </div>
            </div>
          )}

          {mode === 'grimoire' && (
             <div className="grid gap-6">
               {historyItems.map((item, idx) => (
                 <Card key={idx} className="folio-panel" style={{ background: 'transparent' }}>
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="section-label" style={{ fontSize: '0.6rem' }}>{item.date}</span>
                      <h4 className="section-label" style={{ color: '#fff', fontSize: '0.75rem', marginBottom: 0 }}>{item.title}</h4>
                    </div>
                    <p className="balanced-copy" style={{ fontSize: '0.9rem' }}>{item.copy}</p>
                 </Card>
               ))}
               {archiveLoading && <LoadingState title="Accessing records" />}
             </div>
          )}

          {mode === 'settings' && (
             <Card>
               <div className="grid gap-8">
                 <div>
                    <h3 className="section-label" style={{ marginBottom: '1.2rem' }}>Profile Identity</h3>
                    <FieldWrap label="Name as you wish to be seen">
                      <TextInput 
                        value={profileName} 
                        onChange={(e) => setProfileName(e.target.value)}
                        placeholder="The Seeker"
                      />
                    </FieldWrap>
                 </div>
                 
                 <div className="subtle-divider" />

                 <div>
                    <h3 className="section-label" style={{ marginBottom: '1.2rem' }}>Session Preferences</h3>
                    <FieldWrap label="Area of primary focus">
                      <SelectField 
                        value={focus} 
                        onChange={(e) => setFocus(e.target.value)}
                        options={[
                          { label: 'Timing & Rhythm', value: 'timing' },
                          { label: 'Relationships & Connection', value: 'relationship' },
                          { label: 'Vocation & Purpose', value: 'work' },
                        ]} 
                      />
                    </FieldWrap>
                 </div>

                 <div className="flex justify-end pt-4">
                    <button 
                      className="btn btn-primary" 
                      disabled={saveStatus === 'saving'}
                      onClick={() => {
                        setSaveStatus('saving')
                        setTimeout(() => setSaveStatus('success'), 800)
                        setTimeout(() => setSaveStatus('idle'), 3000)
                      }}
                    >
                      {saveStatus === 'success' ? 'Profile Updated' : saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                    </button>
                 </div>
               </div>
             </Card>
          )}
        </section>

        {/* ── Sidebar (Contextual) ── */}
        <aside className="dashboard-side">
          <Card className="mb-6 folio-panel">
            <h4 className="section-label" style={{ marginBottom: '1rem' }}>Atmosphere</h4>
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                 <span className="text-[1.2rem]">☽</span>
                 <div>
                    <p className="section-label" style={{ fontSize: '0.55rem', marginBottom: 0 }}>Lunar Phase</p>
                    <p className="balanced-copy" style={{ fontSize: '0.8rem', color: '#fff' }}>Waxing Gibbous</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[1.2rem]">☉</span>
                 <div>
                    <p className="section-label" style={{ fontSize: '0.55rem', marginBottom: 0 }}>Solar Season</p>
                    <p className="balanced-copy" style={{ fontSize: '0.8rem', color: '#fff' }}>Aries / Threshold</p>
                 </div>
              </div>
            </div>
          </Card>

          <Card className="folio-panel">
            <h4 className="section-label" style={{ marginBottom: '1rem' }}>Resources</h4>
            <ul className="grid gap-3">
              <li><Link to="/merch" className="quiet-link" style={{ fontSize: '0.8rem' }}>✦ Study Decks</Link></li>
              <li><Link to="/merch" className="quiet-link" style={{ fontSize: '0.8rem' }}>✦ Shadow Journals</Link></li>
              <li><a href="#help" className="quiet-link" style={{ fontSize: '0.8rem' }}>✦ Help & Methodology</a></li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  )
}
