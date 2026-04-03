import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'

export default function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-shell">
        <div className="lp-footer__grid">
          <div>
            <div className="lp-footer__brand">
              <BrandMark className="h-8 w-8" />
              <span className="lp-footer__wordmark">Palis Global</span>
            </div>
            <p className="lp-footer__tagline">
              Ancient knowing expressed through modern form.<br />The oracle has always been here.
            </p>
          </div>
          <div>
            <p className="section-label" style={{ marginBottom: '1.2rem' }}>Practice</p>
            <ul className="lp-footer__links">
              <li><a href="/#method">The Method</a></li>
              <li><a href="/#offerings">Offerings</a></li>
              <li><Link to="/auth">Begin a Reading</Link></li>
              <li><Link to="/portal">The Sanctum</Link></li>
            </ul>
          </div>
          <div>
            <p className="section-label" style={{ marginBottom: '1.2rem' }}>Traditions</p>
            <ul className="lp-footer__links">
              <li><a href="/#method">Astrology</a></li>
              <li><a href="/#method">Tarot</a></li>
              <li><a href="/#method">I Ching</a></li>
              <li><a href="/#method">Hermetics</a></li>
            </ul>
          </div>
        </div>
        <div className="lp-footer__bottom">
          <span className="lp-footer__copy">© 2026 Palis Global · All rites reserved</span>
          <span className="lp-footer__moon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.6 }}>
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
            Waxing Gibbous · April 2026
          </span>
        </div>
      </div>
    </footer>
  )
}
