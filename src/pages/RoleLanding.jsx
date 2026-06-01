import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getRoleById, seoRoles } from '../data/seoRoles.js'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import './RoleLanding.css'

export default function RoleLanding() {
  const { roleId } = useParams()
  const role = getRoleById(roleId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [roleId])

  if (!role) {
    return (
      <main className="role-landing">
        <div className="container">
          <h1>Role not found</h1>
          <p>Try one of our <Link to="/templates">templates</Link> instead.</p>
        </div>
      </main>
    )
  }

  // Dynamic SEO — update document title and meta
  useEffect(() => {
    document.title = `${role.title} Resume Builder — Free Templates | SnapCV`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', `Build a professional ${role.title} resume in minutes. Free ATS-friendly templates designed specifically for ${role.title} roles. No sign-up required.`)
    }
  }, [role])

  const relatedRoles = seoRoles.filter(r => r.id !== roleId).slice(0, 6)

  return (
    <main className="role-landing">
      {/* Hero */}
      <section className="role-hero">
        <div className="role-hero__bg">
          <div className="role-hero__orb role-hero__orb--1"></div>
          <div className="role-hero__orb role-hero__orb--2"></div>
        </div>
        <div className="container role-hero__content">
          <span className="role-hero__badge">✨ Resume Builder for {role.title}s</span>
          <h1 className="role-hero__title">
            Build a {role.title}<br />
            <span className="gradient-text">Resume That Gets Interviews</span>
          </h1>
          <p className="role-hero__subtitle">
            Create a stunning, ATS-optimized resume tailored for {role.title} roles.
            Our smart templates highlight the skills and experience recruiters are looking for.
            100% free. No sign-up required.
          </p>
          <div className="role-hero__actions">
            <Link to="/editor" className="btn btn-primary btn-lg">
              Build Your {role.title} Resume — Free
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="role-why section">
        <div className="container">
          <h2 className="section-title">Why SnapCV for {role.title} Resumes?</h2>
          <div className="role-why__grid">
            <div className="role-why__card glass-card">
              <span className="role-why__icon">🎯</span>
              <h3>ATS-Optimized</h3>
              <p>Our templates pass Applicant Tracking Systems used by 95% of Fortune 500 companies. Your resume will actually reach human eyes.</p>
            </div>
            <div className="role-why__card glass-card">
              <span className="role-why__icon">✨</span>
              <h3>Smart Suggestions</h3>
              <p>Get pre-written, professional bullet points tailored for {role.title} roles. Just click and add — no more staring at a blank page.</p>
            </div>
            <div className="role-why__card glass-card">
              <span className="role-why__icon">⚡</span>
              <h3>Ready in 5 Minutes</h3>
              <p>Choose a template, fill in your info, and download a pixel-perfect PDF. It really is that simple.</p>
            </div>
            <div className="role-why__card glass-card">
              <span className="role-why__icon">🔒</span>
              <h3>100% Private</h3>
              <p>Your data never leaves your browser. No accounts, no tracking. Your resume belongs to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="role-steps section">
        <div className="container">
          <h2 className="section-title">
            Create Your {role.title} Resume<br />
            <span className="gradient-text">in 3 Simple Steps</span>
          </h2>
          <div className="role-steps__grid">
            <div className="role-step glass-card">
              <span className="role-step__number">01</span>
              <h3>Choose a Template</h3>
              <p>Pick from 6 professionally designed templates — from clean and minimal to bold and creative.</p>
            </div>
            <div className="role-step glass-card">
              <span className="role-step__number">02</span>
              <h3>Add Your Content</h3>
              <p>Fill in your experience, education, and skills. Use our Smart Assistant to generate professional bullet points instantly.</p>
            </div>
            <div className="role-step glass-card">
              <span className="role-step__number">03</span>
              <h3>Download & Apply</h3>
              <p>Export a pixel-perfect PDF and start applying to {role.title} positions today.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="role-cta section">
        <div className="container">
          <div className="role-cta__card glass-card">
            <h2>Ready to Land Your Next {role.title} Role?</h2>
            <p>Join thousands of professionals who built their winning resume with SnapCV.</p>
            <Link to="/editor" className="btn btn-primary btn-lg">
              Start Building — It's Free
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Roles */}
      <section className="role-related section">
        <div className="container">
          <h2 className="section-title">Resume Builders for Other Roles</h2>
          <div className="role-related__grid">
            {relatedRoles.map(r => (
              <Link key={r.id} to={`/role/${r.id}`} className="role-related__link glass-card">
                {r.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
