import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { user, openLoginModal, logout } = useAuth()

  const isEditor = location.pathname.startsWith('/editor')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${isEditor ? 'header--editor' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#logo-gradient)" />
              <path d="M8 9h12M8 14h8M8 19h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="header__logo-text">Snap<span className="gradient-text">CV</span></span>
        </Link>

        <nav className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`}>
          <Link to="/" className={`header__link ${location.pathname === '/' ? 'header__link--active' : ''}`}>Home</Link>
          <Link to="/templates" className={`header__link ${location.pathname === '/templates' ? 'header__link--active' : ''}`}>Templates</Link>
          <Link to="/#pricing" className="header__link" onClick={() => setMobileOpen(false)}>Pricing</Link>
          {user && (
            <Link to="/dashboard" className={`header__link ${location.pathname === '/dashboard' ? 'header__link--active' : ''}`}>Dashboard</Link>
          )}
          
          {user ? (
            <div className="header__user-menu">
              <img src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=7C3AED&color=fff&size=32`} alt="Avatar" className="header__avatar" />
              <button onClick={logout} className="header__logout-btn">Logout</button>
            </div>
          ) : (
            <button onClick={openLoginModal} className="header__signin-btn">Sign In</button>
          )}

          <Link to="/editor" className="btn btn-primary btn-sm header__cta">
            Create Resume
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5 3.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </nav>

        <button
          className={`header__burger ${mobileOpen ? 'header__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
