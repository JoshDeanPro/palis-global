import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import '../styles/Landing.css'
import '../styles/Merch.css'

const PRODUCTS = [
  {
    id: 1, category: 'journals',
    name: 'Shadow Work Journal',
    subtitle: 'Printable Journal · 52 Pages',
    desc: '40 prompts organized across four moon phases. Print, write, descend.',
    price: 14, tag: 'Bestseller',
    icon: <svg viewBox="0 0 60 72" fill="none"><rect x="6" y="2" width="44" height="64" rx="2" stroke="currentColor" strokeWidth="1.2"/><rect x="3" y="5" width="44" height="64" rx="2" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/><line x1="14" y1="20" x2="42" y2="20" stroke="currentColor" strokeWidth="1"/><line x1="14" y1="29" x2="42" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.6"/><line x1="14" y1="38" x2="36" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.4"/><circle cx="28" cy="10" r="4" stroke="currentColor" strokeWidth="1" opacity="0.6"/></svg>
  },
  {
    id: 2, category: 'journals',
    name: '90-Day Tarot Pull Journal',
    subtitle: 'Printable Journal · 108 Pages',
    desc: 'Morning pulls, evening reflections, weekly pattern tracking. Your practice made visible.',
    price: 16, tag: null,
    icon: <svg viewBox="0 0 60 72" fill="none"><rect x="12" y="1" width="38" height="60" rx="2" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="4" width="38" height="60" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/><rect x="4" y="7" width="38" height="60" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/><line x1="18" y1="17" x2="42" y2="17" stroke="currentColor" strokeWidth="1"/><line x1="18" y1="25" x2="42" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.5"/></svg>
  },
  {
    id: 3, category: 'trackers',
    name: 'Moon Cycle Tracker',
    subtitle: 'Printable Templates · 14 Pages',
    desc: '12 monthly lunar tracking pages. Energy, intentions, card pulls mapped to each phase.',
    price: 12, tag: null,
    icon: <svg viewBox="0 0 60 72" fill="none"><circle cx="30" cy="32" r="22" stroke="currentColor" strokeWidth="1.2"/><path d="M30 10 Q40 21 40 32 Q40 43 30 54 Q20 43 20 32 Q20 21 30 10Z" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5"/><circle cx="30" cy="32" r="4" fill="currentColor" opacity="0.35"/><line x1="30" y1="60" x2="30" y2="68" stroke="currentColor" strokeWidth="1" opacity="0.4"/></svg>
  },
  {
    id: 4, category: 'guides',
    name: "The Lovers' Oracle Guide",
    subtitle: 'PDF Guide · 38 Pages',
    desc: 'Three signature spreads, relational card interpretations, and ritual preparation for love readings.',
    price: 18, tag: 'Most Popular',
    icon: <svg viewBox="0 0 60 72" fill="none"><path d="M30 58 C14 46 6 34 6 22 C6 13 13 8 20 8 C24 8 28 11 30 15 C32 11 36 8 40 8 C47 8 54 13 54 22 C54 34 46 46 30 58Z" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M30 46 C20 38 16 30 16 22 C16 17 19 13 23 13 C26 13 28 15 30 18 C32 15 34 13 37 13 C41 13 44 17 44 22 C44 30 40 38 30 46Z" stroke="currentColor" strokeWidth="0.6" opacity="0.4" fill="none"/></svg>
  },
  {
    id: 5, category: 'guides',
    name: 'Astro-Tarot Blueprint',
    subtitle: 'PDF Guide · 60 Pages',
    desc: 'Planet-to-card correspondences, sign mappings, and natal chart reading through the tarot.',
    price: 38, tag: 'Exclusive',
    icon: <svg viewBox="0 0 60 72" fill="none"><circle cx="30" cy="34" r="22" stroke="currentColor" strokeWidth="1.2"/><circle cx="30" cy="34" r="14" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/><circle cx="30" cy="34" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/><line x1="30" y1="12" x2="30" y2="56" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/><line x1="8" y1="34" x2="52" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/><circle cx="30" cy="12" r="2.5" fill="currentColor" opacity="0.6"/></svg>
  },
  {
    id: 6, category: 'decks',
    name: 'Palis Oracle Deck',
    subtitle: 'Printable Cards · 36 Cards',
    desc: 'A complete oracle deck across four domains. Print on cardstock, cut, and use immediately.',
    price: 28, tag: 'Limited',
    icon: <svg viewBox="0 0 60 72" fill="none"><rect x="16" y="4" width="28" height="44" rx="2" stroke="currentColor" strokeWidth="1.2"/><rect x="10" y="9" width="28" height="44" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/><rect x="4" y="14" width="28" height="44" rx="2" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/><circle cx="30" cy="27" r="8" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/></svg>
  },
  {
    id: 7, category: 'decks',
    name: 'Full Moon Ritual Deck',
    subtitle: 'Printable Cards · 13 Cards',
    desc: 'One ceremony card per Full Moon. Timing, ritual steps, tarot pairing, and materials for each.',
    price: 22, tag: null,
    icon: <svg viewBox="0 0 60 72" fill="none"><circle cx="30" cy="30" r="18" stroke="currentColor" strokeWidth="1.2"/><circle cx="30" cy="30" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/><path d="M20 30 Q25 23 30 30 Q35 37 40 30" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6"/><line x1="30" y1="52" x2="30" y2="62" stroke="currentColor" strokeWidth="1" opacity="0.4"/></svg>
  },
  {
    id: 8, category: 'workbooks',
    name: 'Manifestation Workbook',
    subtitle: 'PDF Workbook · 44 Pages',
    desc: '21 exercises moving from vague wanting to energetic alignment. Belief audits, identity shifts, scripting.',
    price: 19, tag: null,
    icon: <svg viewBox="0 0 60 72" fill="none"><rect x="8" y="4" width="44" height="58" rx="2" stroke="currentColor" strokeWidth="1.2"/><line x1="18" y1="18" x2="44" y2="18" stroke="currentColor" strokeWidth="1"/><line x1="18" y1="26" x2="44" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.6"/><line x1="18" y1="34" x2="44" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.4"/><line x1="18" y1="42" x2="36" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.3"/><circle cx="30" cy="53" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>
  },
  {
    id: 9, category: 'workbooks',
    name: 'New Moon Intention Kit',
    subtitle: 'Printable Kit · 28 Pages',
    desc: '13 monthly worksheets aligned to each New Moon sign. Ritual checklist, intention templates included.',
    price: 14, tag: null,
    icon: <svg viewBox="0 0 60 72" fill="none"><path d="M30 14 C20 14 12 22 12 34 C12 46 20 56 30 60 C40 56 48 46 48 34 C48 22 40 14 30 14Z" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="30" cy="4" r="3.5" stroke="currentColor" strokeWidth="1" opacity="0.6"/><line x1="30" y1="7.5" x2="30" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/><circle cx="30" cy="34" r="5" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/></svg>
  },
  {
    id: 10, category: 'bundles',
    name: 'The Seeker Bundle',
    subtitle: '4 Products · Save $20',
    desc: "Lovers' Oracle + Shadow Journal + Moon Tracker + Tarot Journal. The complete starter practice.",
    price: 44, tag: 'Best Value',
    icon: <svg viewBox="0 0 60 72" fill="none"><rect x="4" y="16" width="30" height="44" rx="2" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/><rect x="10" y="10" width="30" height="44" rx="2" stroke="currentColor" strokeWidth="0.9" opacity="0.7"/><rect x="16" y="4" width="30" height="44" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M26 22 L30 28 L42 18" stroke="currentColor" strokeWidth="1.2"/></svg>
  },
  {
    id: 11, category: 'bundles',
    name: 'Inner Circle Library',
    subtitle: 'All 9 Products · Save $73',
    desc: 'Every guide, journal, deck, workbook, and tracker. One purchase, yours forever.',
    price: 88, tag: 'Circle Exclusive',
    icon: <svg viewBox="0 0 60 72" fill="none"><polygon points="30,4 36,22 56,22 40,34 46,52 30,40 14,52 20,34 4,22 24,22" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="30" cy="26" r="5" stroke="currentColor" strokeWidth="0.8" opacity="0.55"/></svg>
  },
]

const FILTERS = ['All', 'Journals', 'Guides', 'Decks', 'Trackers', 'Workbooks', 'Bundles']

export default function Merch() {
  const [active, setActive] = useState('All')
  const [cart, setCart] = useState<{id: number, quantity: number}[]>(() => {
    try { 
      const saved = localStorage.getItem('palis-cart');
      const parsed = JSON.parse(saved || '[]');
      return parsed.map((item: any) => typeof item === 'number' ? {id: item, quantity: 1} : {id: item.id, quantity: item.quantity || 1});
    } catch { return [] }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [addedId, setAddedId] = useState<number | null>(null)

  useEffect(() => {
    localStorage.setItem('palis-cart', JSON.stringify(cart))
  }, [cart])

  const filtered = active === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === active.toLowerCase())

  function addToCart(product: any) {
    if (!product || cart.find(i => i.id === product.id)) return
    setCart(prev => [...prev, { id: product.id, quantity: 1 }])
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  const cartItems = cart.map(item => {
    const p = PRODUCTS.find(p => p.id === item.id)
    return p ? { ...p, quantity: item.quantity } : null
  }).filter(Boolean) as any[]

  const total = cartItems.reduce((s, i) => s + i.price, 0)
  const inCart = (id: number) => !!cart.find(i => i.id === id)

  return (
    <div className="lp-root merch-root">
      <div className="lp-grain" />
      <div className="lp-hero__stars" style={{ position: 'fixed', opacity: 0.3 }} />

      <Navbar />

      {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />}

      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="serif">Collection</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">No items selected yet.</p>
          ) : cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-icon">{item.icon}</div>
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>{item.subtitle}</p>
              </div>
              <div className="cart-item-right">
                <span className="cart-item-price">${item.price}</span>
                <button onClick={() => setCart(p => p.filter(i => i.id !== item.id))} className="remove-item">Remove</button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span className="cart-total-num">${total}</span>
            </div>
            <p className="cart-note">✦ Instant download via email</p>
            <div className="stripe-checkout">
              <button className="btn btn-primary w-full">
                Checkout Securely
              </button>
              <p className="stripe-badge">Powered by Stripe</p>
            </div>
          </div>
        )}
      </aside>

      <main className="merch-main">
        <section className="merch-hero reveal-block" style={{ opacity: 1, transform: 'none' }}>
          <p className="section-label" style={{ marginBottom: '1.4rem', textAlign: 'center' }}>The Digital Sanctum</p>
          <h1 className="editorial-title" style={{ textAlign: 'center' }}>Tools for Study</h1>
          <p className="balanced-copy" style={{ textAlign: 'center', margin: '0 auto 3rem', maxWidth: '540px' }}>
            Printable journals, decks, and systems crafted for established practitioners and dedicated seekers.
          </p>
        </section>

        <div className="merch-filters">
          {FILTERS.map(f => (
            <button key={f} className={`merch-filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>{f}</button>
          ))}
        </div>

        <section className="merch-grid">
          {filtered.map(product => (
            <article key={product.id} className="merch-card surface-panel">
              <div className="merch-card__icon">{product.icon}</div>
              <div className="merch-card__body">
                <p className="section-label" style={{ fontSize: '0.6rem', marginBottom: '0.8rem' }}>{product.subtitle}</p>
                <h3 className="merch-card__name" style={{ fontFamily: 'Cinzel', letterSpacing: '0.05em' }}>{product.name}</h3>
                <p className="balanced-copy" style={{ fontSize: '0.9rem', marginBottom: '1.4rem' }}>{product.desc}</p>
              </div>
              <div className="merch-card__footer">
                <span className="merch-card__price" style={{ fontFamily: 'Cinzel' }}>${product.price}</span>
                <button
                  className={`btn ${inCart(product.id) ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}
                  onClick={() => addToCart(product)}
                  disabled={inCart(product.id)}
                >
                  {inCart(product.id) ? 'In Collection' : 'Add to Cart'}
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="merch-cta reveal-block" style={{ opacity: 1, transform: 'none' }}>
           <div className="surface-panel-strong" style={{ padding: '4rem', textAlign: 'center' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>Complete Series</p>
            <h2 className="editorial-title" style={{ fontSize: '2.2rem' }}>The Seeker's Library</h2>
            <p className="balanced-copy" style={{ marginBottom: '2.5rem', margin: '0 auto 2.5rem', maxWidth: '440px' }}>
              Every guide, journal, and deck in our collection. A lifetime of resources for one sacred investment.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => addToCart(PRODUCTS.find(p => p.id === 11))}>
              Inquire $88
            </button>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
