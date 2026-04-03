import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Modal } from '../components/ui/States'
import { Section } from '../components/ui/Section'
import '../styles/Landing.css'

// ── Shared UI Components from Landing ──
function HermeticSigil({ className = '' }) {
  return (
    <svg className={`sigil-svg ${className}`} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="200" cy="200" r="175" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {[...Array(24)].map((_, i) => {
        const a = (i / 24) * Math.PI * 2
        const r1 = 175, r2 = 185
        return <line key={i} x1={200 + r1 * Math.cos(a)} y1={200 + r1 * Math.sin(a)} x2={200 + r2 * Math.cos(a)} y2={200 + r2 * Math.sin(a)} stroke="currentColor" strokeWidth="1" opacity="0.4" />
      })}
      <polygon points="200,60 340,290 60,290" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <polygon points="200,340 60,110 340,110" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="200" cy="200" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <ellipse cx="200" cy="200" rx="30" ry="20" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      <circle cx="200" cy="200" r="8" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

function AlchemyDivider() {
  return (
    <div className="alchemy-divider" aria-hidden="true" style={{ opacity: 0.15, margin: '6rem 0' }}>
      <svg viewBox="0 0 600 40" xmlns="http://www.w3.org/2000/svg" className="divider-svg" style={{ color: 'currentColor' }}>
        <line x1="0" y1="20" x2="220" y2="20" stroke="currentColor" strokeWidth="0.5" />
        <polygon points="230,10 245,20 230,30" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="20" r="3" fill="currentColor" />
        <polygon points="370,10 355,20 370,30" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="380" y1="20" x2="600" y2="20" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

function MysticCard({ glyph, title, message }: { glyph: string, title: string, message: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="mystic-card surface-panel" onClick={() => setFlipped(!flipped)} data-flipped={flipped}>
      <div className="mystic-card__inner">
        <div className="mystic-card__front">
          <div className="mystic-card__glyph">{glyph}</div>
          <h3 className="mystic-card__title">{title}</h3>
          <span className="mystic-card__hint">Tap to reveal</span>
        </div>
        <div className="mystic-card__back">
          <p className="mystic-card__msg">"{message}"</p>
          <div className="subtle-divider" style={{ margin: '1.5rem 0', width: '40%' }} />
          <span className="section-label" style={{ fontSize: '0.6rem' }}>The Oracle Speaks</span>
        </div>
      </div>
    </div>
  )
}

const offerings = [
  {
    glyph: '✦',
    name: 'Season reading',
    copy: 'A focused session on the patterns of your current month. Good for timing and quick clarity.',
    details: ['30-minute session', 'Digital summary', 'Audio record'],
    featured: false,
  },
  {
    glyph: '✧',
    name: 'Deep pattern thread',
    copy: 'A longer study of recurring life themes. We use your natal chart and a 7-card spread.',
    details: ['60-minute session', 'PDF folio', 'Email follow-up', 'Custom ritual'],
    featured: true,
  },
  {
    glyph: '❃',
    name: 'Practice build',
    copy: 'We help you start a daily or weekly practice. Includes card study and lunar tracking.',
    details: ['2 sessions', 'Full starter kit', '30-day monitor'],
    featured: false,
  },
]

const testimonials = [
  { quote: 'I finally found a place that sounds like a professional study, not a carnival.', name: 'Sarah M.', location: 'London' },
  { quote: 'The readings are calm and honest. No scary predictions, just real guidance.', name: 'David L.', location: 'Seattle' },
  { quote: 'Palis Global helped me turn my messy intuition into a practical daily habit.', name: 'Elena K.', location: 'Berlin' },
]

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Reveal animation intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
        }
      })
    }, { threshold: 0.1 })
    
    document.querySelectorAll('.reveal-block').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="lp-root bg-[#050505]">
      <div className="lp-grain" />
      <div className="lp-hero__stars" style={{ position: 'fixed', opacity: 0.3 }} />

      <Navbar />

      <main className="lp-main">
        {/* ─── Hero ─── */}
        <section className="lp-hero reveal-block" ref={heroRef} style={{ opacity: 1, transform: 'none' }}>
           <div className="lp-hero__content lp-shell">
              <HermeticSigil className="lp-hero__sigil" />
              <p className="section-label" style={{ marginBottom: '1.5rem' }}>Sacred Systems × Practical Clarity</p>
              <h1 className="editorial-title">
                The oracle is always here.<br />Step into your threshold.
              </h1>
              <p className="balanced-copy" style={{ maxWidth: '560px', margin: '0 auto 3rem' }}>
                We combine ancient wisdom with professional clarity to help you find focus. A private space for big questions and small daily practices.
              </p>
              <div className="lp-hero__actions">
                <Link to="/auth" className="btn btn-primary btn-lg">Begin Your Reading</Link>
                <Link to="/merch" className="btn btn-secondary btn-lg">Explore Tools</Link>
              </div>
           </div>
        </section>

        <div className="lp-shell">
          <AlchemyDivider />

          {/* ─── Method ─── */}
          <Section
            id="method"
            label="The Methodology"
            title="Interpretations born from order and silence"
            copy="Beneath the surface of daily life, ancient patterns move in silence. We help you find the rhythm in the noise."
            className="reveal-block"
          >
            <div className="lp-mystic-grid">
              <MysticCard 
                glyph="☉" 
                title="The Steady Light" 
                message="True power is not loud. It is the steady light that remains after the noise has faded." 
              />
              <MysticCard 
                glyph="☽" 
                title="The Inner Mirror" 
                message="The answer you seek is already written in your own silence. Look where you have been avoiding the light." 
              />
              <MysticCard 
                glyph="♃" 
                title="The Great Turning" 
                message="Patience is not waiting. It is the active movement of a soul in alignment with the seasons." 
              />
            </div>
          </Section>

          <AlchemyDivider />

          {/* ─── Offerings ─── */}
          <Section
            id="offerings"
            label="Offerings"
            title="Ways to begin your practice"
            copy="Choose a path to start exploring your personal patterns."
            className="reveal-block"
          >
            <div className="lp-offerings">
              {offerings.map((offer, idx) => (
                <Card key={offer.name} strong={offer.featured} className="lp-offering reveal-block">
                  <div className="lp-offering__header">
                    <span className="lp-offering__glyph" style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.7)' }}>{offer.glyph}</span>
                    <div>
                      <p className="section-label" style={{ marginBottom: '0.3rem' }}>{offer.name}</p>
                      {offer.featured ? <Badge tone="warm">Central path</Badge> : null}
                    </div>
                  </div>
                  <p className="balanced-copy" style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>{offer.copy}</p>
                  <ul className="lp-offering__list">
                    {offer.details.map(d => (
                      <li key={d} className="flex items-center gap-3 mb-2 opacity-60 text-[0.85rem]">
                        <span className="w-1 h-1 bg-white rounded-full" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth" className={`btn mt-8 ${offer.featured ? 'btn-primary' : 'btn-secondary'} w-full`}>Select This Path</Link>
                </Card>
              ))}
            </div>
          </Section>

          <AlchemyDivider />

           {/* ─── Testimonials ─── */}
          <Section
            id="witness"
            label="Shared Witness"
            title="Trust arrives through recognition"
            copy="Real stories from people who use our sanctuary to find clarity and calm."
            className="reveal-block"
          >
            <div className="lp-testimonials">
              {testimonials.map((item) => (
                <Card key={item.name} className="lp-testimonial reveal-block folio-panel">
                  <p className="balanced-copy" style={{ fontStyle: 'italic', marginBottom: '2rem' }}>"{item.quote}"</p>
                  <div className="lp-testimonial__author flex items-center gap-4">
                    <span className="section-label" style={{ marginBottom: 0 }}>{item.name} · {item.location}</span>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <AlchemyDivider />

          {/* ─── Final CTA ─── */}
          <section className="lp-cta reveal-block text-center" style={{ padding: '8rem 0' }}>
            <div className="section-label" style={{ marginBottom: '2rem' }}>☽ ✦ ☉</div>
            <h2 className="editorial-title" style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
              The oracle is always here. Step into a private place for big questions. We use ancient systems to help you find your path.
            </h2>
            <div className="flex justify-center gap-6">
              <Link to="/auth" className="btn btn-primary btn-lg">Begin Now</Link>
              <Link to="/merch" className="btn btn-secondary btn-lg">Learn More</Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
