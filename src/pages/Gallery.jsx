import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { templates, categories } from '../data/templates.js'
import Footer from '../components/Footer.jsx'
import './Gallery.css'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    window.scrollTo(0, 0)
  }, [])

  const filtered = activeCategory === 'All'
    ? templates
    : templates.filter(t => t.category === activeCategory)

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <div className="gallery-hero__bg">
          <div className="gallery-hero__orb"></div>
        </div>
        <div className="container">
          <div className={`gallery-hero__content ${visible ? 'visible' : ''}`}>
            <span className="section-tag">Templates</span>
            <h1 className="gallery-hero__title">Choose Your<br /><span className="gradient-text">Perfect Template</span></h1>
            <p className="gallery-hero__subtitle">
              Professionally designed templates that balance creativity with ATS compatibility.
              Start with any template and customize it to match your style.
            </p>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          {/* Filters */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery-filter ${activeCategory === cat ? 'gallery-filter--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {filtered.map((tmpl, i) => (
              <div
                key={tmpl.id}
                className="gallery-card"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="gallery-card__preview">
                  <div className="gallery-card__resume" style={{
                    '--tmpl-primary': tmpl.colors.primary,
                    '--tmpl-bg': tmpl.colors.bg
                  }}>
                    <div className="gallery-mini" style={{ background: tmpl.colors.bg }}>
                      <div className="gallery-mini__header" style={{ background: tmpl.colors.primary }}>
                        <div className="gm-circle" style={{ background: 'rgba(255,255,255,0.3)' }}></div>
                        <div className="gm-lines">
                          <div className="gm-line gm-line--w70" style={{ background: 'rgba(255,255,255,0.7)' }}></div>
                          <div className="gm-line gm-line--w50" style={{ background: 'rgba(255,255,255,0.5)' }}></div>
                        </div>
                      </div>
                      <div className="gallery-mini__body">
                        <div className="gm-section">
                          <div className="gm-line gm-line--w25" style={{ background: tmpl.colors.primary, opacity: 0.8 }}></div>
                          <div className="gm-line gm-line--w90" style={{ background: '#e2e8f0' }}></div>
                          <div className="gm-line gm-line--w80" style={{ background: '#e2e8f0' }}></div>
                          <div className="gm-line gm-line--w70" style={{ background: '#e2e8f0' }}></div>
                        </div>
                        <div className="gm-section">
                          <div className="gm-line gm-line--w25" style={{ background: tmpl.colors.primary, opacity: 0.8 }}></div>
                          <div className="gm-line gm-line--w90" style={{ background: '#e2e8f0' }}></div>
                          <div className="gm-line gm-line--w85" style={{ background: '#e2e8f0' }}></div>
                        </div>
                        <div className="gm-section">
                          <div className="gm-line gm-line--w25" style={{ background: tmpl.colors.primary, opacity: 0.8 }}></div>
                          <div className="gm-chips">
                            <div className="gm-chip" style={{ background: tmpl.colors.primary + '20' }}></div>
                            <div className="gm-chip" style={{ background: tmpl.colors.primary + '20' }}></div>
                            <div className="gm-chip" style={{ background: tmpl.colors.primary + '20' }}></div>
                            <div className="gm-chip" style={{ background: tmpl.colors.primary + '20' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="gallery-card__overlay">
                    <Link to={`/editor/${tmpl.id}`} className="btn btn-primary">
                      Use This Template
                    </Link>
                  </div>

                  {/* Badges */}
                  <div className="gallery-card__badges">
                    <span className={`badge ${tmpl.free ? 'badge-free' : 'badge-pro'}`}>
                      {tmpl.free ? 'Free' : 'Pro'}
                    </span>
                    {tmpl.popular && <span className="badge badge-popular">Popular</span>}
                  </div>
                </div>

                <div className="gallery-card__info">
                  <div>
                    <h3 className="gallery-card__name">{tmpl.name}</h3>
                    <p className="gallery-card__desc">{tmpl.description}</p>
                  </div>
                  <div className="gallery-card__colors">
                    <div className="color-dot" style={{ background: tmpl.colors.primary }}></div>
                    <div className="color-dot" style={{ background: tmpl.colors.accent }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gallery-cta section">
        <div className="container">
          <div className="cta__card">
            <div className="cta__glow"></div>
            <h2 className="cta__title">Can't decide?<br /><span className="gradient-text">Just start building</span></h2>
            <p className="cta__subtitle">You can always switch templates later. Your content is preserved.</p>
            <Link to="/editor" className="btn btn-primary btn-lg">
              Start with Blank Resume
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
