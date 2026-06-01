import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer.jsx'
import { templates } from '../data/templates.js'
import { PAYMENT_CONFIG } from '../utils/monetization.js'
import TemplateThumbnail from '../components/TemplateThumbnail.jsx'
import './Landing.css'

const features = [
  {
    icon: '🧠',
    title: 'ATS Score Checker',
    desc: 'Get instant feedback on your resume format, keywords, and completeness to beat the bots.'
  },
  {
    icon: '🤖',
    title: 'AI Bullet Points',
    desc: 'Stuck writing? Instantly generate ATS-optimized, STAR-method bullet points for any job title.'
  },
  {
    icon: '📁',
    title: 'Multiple Resumes',
    desc: 'Tailor your application. Build and manage multiple distinct resumes from a single dashboard.'
  },
  {
    icon: '🎨',
    title: 'Stunning Templates',
    desc: 'Premium, modern designs that make recruiters stop scrolling.'
  },
  {
    icon: '☁️',
    title: 'Cloud Auto-Save',
    desc: 'Never lose your work. Your resumes sync to your Google account automatically.'
  },
  {
    icon: '📷',
    title: 'Photo Upload',
    desc: 'Applying internationally? Easily add a professional headshot to supported templates.'
  }
]

const stats = [
  { number: '50K+', label: 'Resumes Created' },
  { number: '12', label: 'Premium Templates' },
  { number: '95%', label: 'Satisfaction Rate' },
  { number: '0', label: 'Data Collected' }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    text: 'SnapCV helped me land my dream job. The Developer template made my resume stand out from hundreds of applicants.',
    avatar: 'SC'
  },
  {
    name: 'Marcus Johnson',
    role: 'Marketing Director',
    text: 'I have tried every resume builder out there. SnapCV is the only one that produces resumes I am actually proud of.',
    avatar: 'MJ'
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer at Figma',
    text: 'The design quality is incredible. It feels like having a professional designer create your resume for free.',
    avatar: 'ER'
  }
]

export default function Landing() {
  const observerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observerRef.current.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <main className="landing">
      <Helmet>
        <title>SnapCV — Free Resume Builder | Build a Resume That Gets You Hired</title>
        <meta name="description" content="Create stunning, professional resumes in minutes with beautiful, modern templates. Free resume builder with real-time preview, PDF export, and ATS-friendly designs." />
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1"></div>
          <div className="hero__orb hero__orb--2"></div>
          <div className="hero__orb hero__orb--3"></div>
          <div className="hero__grid-pattern"></div>
        </div>

        <div className="container hero__content">
          <div className="hero__badge animate-on-scroll">
            <span className="hero__badge-dot"></span>
            <span>Free & Open Source Resume Builder</span>
          </div>

          <h1 className="hero__title animate-on-scroll">
            Build a Resume That<br />
            <span className="gradient-text">Gets You Hired</span>
          </h1>

          <p className="hero__subtitle animate-on-scroll">
            Create stunning, professional resumes in minutes with our beautiful
            templates. No sign-up required. Your data stays private.
          </p>

          <div className="hero__actions animate-on-scroll">
            <Link to="/editor" className="btn btn-primary btn-lg">
              Create Your Resume — It's Free
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link to="/templates" className="btn btn-secondary btn-lg">
              View Templates
            </Link>
          </div>

          <div className="hero__proof animate-on-scroll">
            <div className="hero__avatars">
              {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                <div key={i} className="hero__avatar" style={{ '--i': i }}>{l}</div>
              ))}
            </div>
            <p><strong>2,400+</strong> resumes created this week</p>
          </div>

          {/* Floating Resume Mockup */}
          <div className="hero__mockup animate-on-scroll">
            <div className="hero__mockup-card">
              <div className="mockup-resume">
                <div className="mockup-resume__header">
                  <div className="mockup-resume__avatar-circle"></div>
                  <div className="mockup-resume__name">
                    <div className="mockup-line mockup-line--lg"></div>
                    <div className="mockup-line mockup-line--md mockup-line--muted"></div>
                  </div>
                </div>
                <div className="mockup-resume__body">
                  <div className="mockup-section">
                    <div className="mockup-line mockup-line--sm mockup-line--accent"></div>
                    <div className="mockup-line mockup-line--full"></div>
                    <div className="mockup-line mockup-line--full"></div>
                    <div className="mockup-line mockup-line--lg"></div>
                  </div>
                  <div className="mockup-section">
                    <div className="mockup-line mockup-line--sm mockup-line--accent"></div>
                    <div className="mockup-line mockup-line--full"></div>
                    <div className="mockup-line mockup-line--full"></div>
                    <div className="mockup-line mockup-line--md"></div>
                  </div>
                  <div className="mockup-section">
                    <div className="mockup-line mockup-line--sm mockup-line--accent"></div>
                    <div className="mockup-skills">
                      <div className="mockup-chip"></div>
                      <div className="mockup-chip"></div>
                      <div className="mockup-chip"></div>
                      <div className="mockup-chip"></div>
                      <div className="mockup-chip"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero__mockup-glow"></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card animate-on-scroll" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="stat-card__number gradient-text">{stat.number}</span>
                <span className="stat-card__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features section" id="features">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Features</span>
            <h2 className="section-title">Everything you need to build<br /><span className="gradient-text">the perfect resume</span></h2>
            <p className="section-subtitle">No bloat, no complexity. Just the tools you need to land your next role.</p>
          </div>

          <div className="features__grid">
            {features.map((feature, i) => (
              <div key={i} className="feature-card glass-card animate-on-scroll" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section className="template-preview section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Templates</span>
            <h2 className="section-title">Designs that make<br /><span className="gradient-text">recruiters stop scrolling</span></h2>
            <p className="section-subtitle">Professionally designed templates that balance creativity with ATS compatibility.</p>
          </div>

          <div className="template-preview__grid animate-on-scroll">
            {templates.slice(0, 6).map((tmpl) => (
              <Link to={`/editor/${tmpl.id}`} key={tmpl.id} className="template-preview-card">
                <div className="template-preview-card__mockup">
                  <div className="landing-tmpl-container">
                    <TemplateThumbnail templateId={tmpl.id} colors={tmpl.colors} />
                  </div>
                </div>
                <div className="template-preview-card__info">
                  <h4>{tmpl.name}</h4>
                  <span className={`badge ${tmpl.free ? 'badge-free' : 'badge-pro'}`}>
                    {tmpl.free ? 'Free' : 'Pro'}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="template-preview__cta animate-on-scroll">
            <Link to="/templates" className="btn btn-secondary btn-lg">
              View All Templates
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">Loved by job seekers<br /><span className="gradient-text">around the world</span></h2>
          </div>

          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card glass-card animate-on-scroll" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="testimonial-card__stars">★★★★★</div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.avatar}</div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison section bg-navy-900" id="compare">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Comparison</span>
            <h2 className="section-title">Why choose <span className="gradient-text">SnapCV?</span></h2>
            <p className="section-subtitle">See how we stack up against the competition. No hidden fees, no paywalls for basic downloads.</p>
          </div>

          <div className="comparison-table-wrapper animate-on-scroll">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Resume.io</th>
                  <th>Canva</th>
                  <th>Novoresume</th>
                  <th className="highlight-col">SnapCV</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Real Google Login</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td className="highlight-col">✅</td>
                </tr>
                <tr>
                  <td>Cloud Auto-save</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td className="highlight-col">✅</td>
                </tr>
                <tr>
                  <td>ATS Score Checker</td>
                  <td>✅</td>
                  <td>❌</td>
                  <td>✅</td>
                  <td className="highlight-col">✅ Free</td>
                </tr>
                <tr>
                  <td>AI Bullet Points</td>
                  <td>✅ Paid</td>
                  <td>❌</td>
                  <td>✅ Paid</td>
                  <td className="highlight-col">✅ Free</td>
                </tr>
                <tr>
                  <td>Multiple Resumes</td>
                  <td>✅ Paid</td>
                  <td>✅</td>
                  <td>✅ Paid</td>
                  <td className="highlight-col">✅ Free</td>
                </tr>
                <tr>
                  <td>Photo Upload</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td className="highlight-col">✅ Free</td>
                </tr>
                <tr>
                  <td>Free PDF Download</td>
                  <td>❌ (TXT only)</td>
                  <td>✅ (Not ATS friendly)</td>
                  <td>✅ (1 page max)</td>
                  <td className="highlight-col">✅ Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing section" id="pricing">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Pricing</span>
            <h2 className="section-title">Simple, transparent<br /><span className="gradient-text">pricing</span></h2>
            <p className="section-subtitle">Start for free. Upgrade when you're ready.</p>
          </div>

          <div className="pricing__grid">
            {/* Free */}
            <div className="pricing-card glass-card animate-on-scroll">
              <div className="pricing-card__header">
                <h3 className="pricing-card__name">Free</h3>
                <div className="pricing-card__price">
                  <span className="pricing-card__amount">$0</span>
                  <span className="pricing-card__period">forever</span>
                </div>
                <p className="pricing-card__desc">Everything you need to get started</p>
              </div>
              <ul className="pricing-card__features">
                <li>✓ 3 premium templates</li>
                <li>✓ Real-time editor</li>
                <li>✓ PDF export</li>
                <li>✓ Auto-save</li>
                <li>✓ Basic customization</li>
                <li className="pricing-card__feature--muted">✗ All templates</li>
                <li className="pricing-card__feature--muted">✗ No watermark</li>
                <li className="pricing-card__feature--muted">✗ Portfolio page</li>
              </ul>
              <Link to="/editor" className="btn btn-secondary btn-lg pricing-card__btn">Get Started Free</Link>
            </div>

            {/* Pro */}
            <div className="pricing-card pricing-card--featured glass-card animate-on-scroll" style={{ animationDelay: '100ms' }}>
              <div className="pricing-card__popular">Most Popular</div>
              <div className="pricing-card__header">
                <h3 className="pricing-card__name">Pro</h3>
                <div className="pricing-card__price">
                  <span className="pricing-card__amount">$7</span>
                  <span className="pricing-card__period">/month</span>
                </div>
                <p className="pricing-card__desc">For serious job seekers</p>
              </div>
              <ul className="pricing-card__features">
                <li>✓ All 12+ templates</li>
                <li>✓ Real-time editor</li>
                <li>✓ PDF & PNG export</li>
                <li>✓ Auto-save + cloud backup</li>
                <li>✓ Full customization</li>
                <li>✓ No watermark</li>
                <li>✓ Public portfolio page</li>
                <li>✓ Priority support</li>
              </ul>
              <a href={PAYMENT_CONFIG.checkoutUrls.proMonthly} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg pricing-card__btn">Start Pro Trial</a>
            </div>

            {/* Lifetime */}
            <div className="pricing-card glass-card animate-on-scroll" style={{ animationDelay: '200ms' }}>
              <div className="pricing-card__header">
                <h3 className="pricing-card__name">Lifetime</h3>
                <div className="pricing-card__price">
                  <span className="pricing-card__amount">$49</span>
                  <span className="pricing-card__period">one-time</span>
                </div>
                <p className="pricing-card__desc">Pay once, use forever</p>
              </div>
              <ul className="pricing-card__features">
                <li>✓ Everything in Pro</li>
                <li>✓ All future templates</li>
                <li>✓ Lifetime updates</li>
                <li>✓ Early access features</li>
                <li>✓ Multiple resumes</li>
                <li>✓ Custom domain for portfolio</li>
                <li>✓ Resume analytics</li>
                <li>✓ Premium support</li>
              </ul>
              <a href={PAYMENT_CONFIG.checkoutUrls.lifetime} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg pricing-card__btn">Get Lifetime Access</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta section">
        <div className="container">
          <div className="cta__card animate-on-scroll">
            <div className="cta__glow"></div>
            <h2 className="cta__title">Ready to build your<br /><span className="gradient-text">dream resume?</span></h2>
            <p className="cta__subtitle">Join thousands of job seekers who've landed interviews with SnapCV.</p>
            <Link to="/editor" className="btn btn-primary btn-lg">
              Start Building — It's Free
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
