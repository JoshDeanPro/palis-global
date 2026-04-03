import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BrandMark from './BrandMark'

interface NavbarProps {
  scrolled?: boolean;
}

export default function Navbar({ scrolled: externalScrolled }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isScrolled = externalScrolled ?? scrolled

  return (
    <header className={`lp-nav ${isScrolled ? 'lp-nav--scrolled' : ''}`}>
      <Link to="/" className="lp-nav__brand">
        <BrandMark className="h-9 w-9" />
        <span className="lp-nav__wordmark">Palis Global</span>
      </Link>
      
      <nav className={`lp-nav__links ${mobileOpen ? 'lp-nav__links--open' : ''}`}>
        <a href="/#method" onClick={() => setMobileOpen(false)}>Method</a>
        <a href="/#offerings" onClick={() => setMobileOpen(false)}>Offerings</a>
        <Link to="/merch" onClick={() => setMobileOpen(false)}>Shop</Link>
        <Link to="/auth" className="lp-nav__enter" onClick={() => setMobileOpen(false)}>Enter Sanctuary</Link>
      </nav>

      <button 
        className="lp-nav__toggle" 
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </header>
  )
}
