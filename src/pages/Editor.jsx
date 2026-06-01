import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { defaultResumeData } from '../data/defaultResume.js'
import { templates, colorThemes, fontPairings } from '../data/templates.js'
import { saveResume, loadResume, saveSettings, loadSettings, exportResumeJSON, importResumeJSON } from '../utils/storage.js'
import { isPro, PAYMENT_CONFIG } from '../utils/monetization.js'
import ResumePreview from '../components/ResumePreview.jsx'
import ProModal from '../components/ProModal.jsx'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import './Editor.css'

const sectionsList = [
  { key: 'personal', label: 'Personal Info', icon: '👤' },
  { key: 'summary', label: 'Summary', icon: '📝' },
  { key: 'experience', label: 'Experience', icon: '💼' },
  { key: 'education', label: 'Education', icon: '🎓' },
  { key: 'skills', label: 'Skills', icon: '🎯' },
  { key: 'projects', label: 'Projects', icon: '🚀' },
]

export default function Editor() {
  const { templateId } = useParams()
  const previewRef = useRef(null)
  const previewContainerRef = useRef(null)
  const fileInputRef = useRef(null)
  const [previewScale, setPreviewScale] = useState(1)

  const [resume, setResume] = useState(() => {
    const saved = loadResume()
    return saved || { ...defaultResumeData }
  })

  const [settings, setSettings] = useState(() => {
    const saved = loadSettings()
    return saved || {
      template: templateId || 'minimal',
      colorTheme: 'navy',
      fontPairing: 'inter',
      layout: 'single'
    }
  })

  const [activeSection, setActiveSection] = useState('personal')
  const [showCustomize, setShowCustomize] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [saved, setSaved] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showProModal, setShowProModal] = useState(false)
  const [proFeature, setProFeature] = useState('')
  const userIsPro = isPro()

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      saveResume(resume)
      saveSettings(settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1000)
    return () => clearTimeout(timer)
  }, [resume, settings])

  // Dynamic preview scaling
  useEffect(() => {
    const container = previewContainerRef.current
    if (!container) return

    const updateScale = () => {
      const containerWidth = container.clientWidth - 48 // padding
      const containerHeight = container.clientHeight - 48
      const scaleX = containerWidth / 794
      const scaleY = containerHeight / 1123
      const scale = Math.min(scaleX, scaleY, 1)
      setPreviewScale(Math.max(scale, 0.3))
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Set template from URL
  useEffect(() => {
    if (templateId && templates.find(t => t.id === templateId)) {
      const tmpl = templates.find(t => t.id === templateId)
      // If premium template and not pro, show modal
      if (!tmpl.free && !userIsPro && PAYMENT_CONFIG.lockPremiumTemplates) {
        setProFeature('premium templates')
        setShowProModal(true)
        return
      }
      setSettings(prev => ({ ...prev, template: templateId }))
    }
  }, [templateId, userIsPro])

  const updatePersonal = useCallback((field, value) => {
    setResume(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }))
  }, [])

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now().toString(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        bullets: ['']
      }]
    }))
  }

  const updateExperience = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const updateBullet = (expId, bulletIdx, value) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp
        const bullets = [...exp.bullets]
        bullets[bulletIdx] = value
        return { ...exp, bullets }
      })
    }))
  }

  const addBullet = (expId) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
      )
    }))
  }

  const removeBullet = (expId, bulletIdx) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp
        return { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIdx) }
      })
    }))
  }

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        school: '',
        degree: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]
    }))
  }

  const updateEducation = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = () => {
    const skill = prompt('Enter a skill:')
    if (skill && skill.trim()) {
      setResume(prev => ({ ...prev, skills: [...prev.skills, skill.trim()] }))
    }
  }

  const removeSkill = (idx) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx)
    }))
  }

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: Date.now().toString(),
        name: '',
        description: '',
        link: ''
      }]
    }))
  }

  const updateProject = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }))
  }

  const removeProject = (id) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }))
  }

  // Handle selecting a template (with pro check)
  const handleSelectTemplate = (tmplId) => {
    const tmpl = templates.find(t => t.id === tmplId)
    if (tmpl && !tmpl.free && !userIsPro && PAYMENT_CONFIG.lockPremiumTemplates) {
      setProFeature('premium templates')
      setShowProModal(true)
      return
    }
    setSettings(prev => ({ ...prev, template: tmplId }))
  }

  // PDF Export
  const handleExport = async () => {
    if (!previewRef.current) return
    setExporting(true)

    try {
      const el = previewRef.current
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 794
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight)

      // Add watermark for free users
      if (!userIsPro && PAYMENT_CONFIG.watermarkOnFree) {
        pdf.setFontSize(9)
        pdf.setTextColor(180, 180, 180)
        pdf.text('Made with SnapCV — snapcv-tawny.vercel.app', pageWidth / 2, pageHeight - 5, { align: 'center' })
      }

      pdf.save(`${resume.personal.firstName || 'resume'}_${resume.personal.lastName || 'snapcv'}.pdf`)

      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    } catch (err) {
      console.error('PDF export failed:', err)
      alert('Export failed. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const data = await importResumeJSON(file)
      setResume(data)
    } catch (err) {
      alert('Failed to import file: ' + err.message)
    }
  }

  const currentTheme = colorThemes.find(t => t.id === settings.colorTheme) || colorThemes[0]
  const currentFont = fontPairings.find(f => f.id === settings.fontPairing) || fontPairings[0]

  return (
    <div className="editor">
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                background: ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#F43F5E'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Save indicator */}
      <div className={`save-indicator ${saved ? 'save-indicator--visible' : ''}`}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Auto-saved
      </div>

      {/* Mobile sidebar toggle */}
      <button className="editor__mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Left Panel - Form */}
      <aside className={`editor__sidebar ${sidebarOpen ? 'editor__sidebar--open' : ''}`}>
        {/* Toolbar */}
        <div className="editor__toolbar">
          <div className="editor__toolbar-actions">
            <button className="toolbar-btn" onClick={() => setShowCustomize(!showCustomize)} title="Customize">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7.5 2.25a1.5 1.5 0 013 0v.379a1.5 1.5 0 001.025.894l.1.03a1.5 1.5 0 001.357-.283l.268-.228a1.5 1.5 0 012.12 2.12l-.228.269a1.5 1.5 0 00-.283 1.357l.03.1a1.5 1.5 0 00.894 1.024h.379a1.5 1.5 0 010 3h-.379a1.5 1.5 0 00-.894 1.025l-.03.1a1.5 1.5 0 00.283 1.357l.228.268a1.5 1.5 0 01-2.12 2.12l-.269-.228a1.5 1.5 0 00-1.357-.283l-.1.03a1.5 1.5 0 00-1.024.894v.379a1.5 1.5 0 01-3 0v-.379a1.5 1.5 0 00-1.025-.894l-.1-.03a1.5 1.5 0 00-1.357.283l-.268.228a1.5 1.5 0 01-2.12-2.12l.228-.269a1.5 1.5 0 00.283-1.357l-.03-.1a1.5 1.5 0 00-.894-1.024H2.25a1.5 1.5 0 010-3h.379a1.5 1.5 0 00.894-1.025l.03-.1a1.5 1.5 0 00-.283-1.357l-.228-.268a1.5 1.5 0 012.12-2.12l.269.228a1.5 1.5 0 001.357.283l.1-.03A1.5 1.5 0 007.5 2.63V2.25z" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Customize
            </button>
            <button className="toolbar-btn" onClick={handleExport} disabled={exporting} title="Download PDF">
              {exporting ? (
                <span className="toolbar-spinner"></span>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 12v2.25A1.5 1.5 0 004.5 15.75h9a1.5 1.5 0 001.5-1.5V12M5.25 7.5L9 11.25l3.75-3.75M9 2.25v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {exporting ? 'Exporting...' : 'PDF'}
            </button>
            <button className="toolbar-btn" onClick={() => exportResumeJSON(resume)} title="Export JSON">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6 12l-3-3 3-3M12 6l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              JSON
            </button>
            <button className="toolbar-btn" onClick={() => fileInputRef.current?.click()} title="Import JSON">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 6v-2.25A1.5 1.5 0 014.5 2.25h9A1.5 1.5 0 0115 3.75V6M5.25 10.5L9 6.75l3.75 3.75M9 15.75v-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImport}
            />
          </div>
        </div>

        {/* Customize Panel */}
        {showCustomize && (
          <div className="customize-panel">
            <h3 className="customize-panel__title">Customize</h3>

            <div className="customize-group">
              <label className="customize-label">Template</label>
              <div className="customize-templates">
                {templates.map(t => (
                  <button
                    key={t.id}
                    className={`customize-template-btn ${settings.template === t.id ? 'active' : ''} ${!t.free && !userIsPro ? 'locked' : ''}`}
                    onClick={() => handleSelectTemplate(t.id)}
                    title={t.name}
                  >
                    <div className="mini-tmpl" style={{ background: t.colors.bg }}>
                      <div style={{ background: t.colors.primary, height: '30%', borderRadius: '2px 2px 0 0' }}></div>
                    </div>
                    <span>{t.name}{!t.free && !userIsPro ? ' 🔒' : ''}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="customize-group">
              <label className="customize-label">Color Theme</label>
              <div className="customize-colors">
                {colorThemes.map(c => (
                  <button
                    key={c.id}
                    className={`color-theme-btn ${settings.colorTheme === c.id ? 'active' : ''}`}
                    onClick={() => setSettings(prev => ({ ...prev, colorTheme: c.id }))}
                    title={c.name}
                    style={{ background: c.primary }}
                  />
                ))}
              </div>
            </div>

            <div className="customize-group">
              <label className="customize-label">Font</label>
              <div className="customize-fonts">
                {fontPairings.map(f => (
                  <button
                    key={f.id}
                    className={`font-btn ${settings.fontPairing === f.id ? 'active' : ''}`}
                    onClick={() => setSettings(prev => ({ ...prev, fontPairing: f.id }))}
                    style={{ fontFamily: f.heading }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="customize-group">
              <label className="customize-label">Layout</label>
              <div className="customize-layout">
                <button
                  className={`layout-btn ${settings.layout === 'single' ? 'active' : ''}`}
                  onClick={() => setSettings(prev => ({ ...prev, layout: 'single' }))}
                >
                  <div className="layout-icon layout-icon--single"><div></div></div>
                  Single Column
                </button>
                <button
                  className={`layout-btn ${settings.layout === 'two' ? 'active' : ''}`}
                  onClick={() => setSettings(prev => ({ ...prev, layout: 'two' }))}
                >
                  <div className="layout-icon layout-icon--two"><div></div><div></div></div>
                  Two Column
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section Nav */}
        <div className="editor__sections-nav">
          {sectionsList.map(sec => (
            <button
              key={sec.key}
              className={`section-nav-btn ${activeSection === sec.key ? 'section-nav-btn--active' : ''}`}
              onClick={() => setActiveSection(sec.key)}
            >
              <span className="section-nav-btn__icon">{sec.icon}</span>
              <span>{sec.label}</span>
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="editor__form">
          {/* Personal Info */}
          {activeSection === 'personal' && (
            <div className="form-section">
              <h3 className="form-section__title">Personal Information</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label>First Name</label>
                  <input value={resume.personal.firstName} onChange={e => updatePersonal('firstName', e.target.value)} placeholder="Alex" />
                </div>
                <div className="form-field">
                  <label>Last Name</label>
                  <input value={resume.personal.lastName} onChange={e => updatePersonal('lastName', e.target.value)} placeholder="Johnson" />
                </div>
              </div>
              <div className="form-field">
                <label>Professional Title</label>
                <input value={resume.personal.title} onChange={e => updatePersonal('title', e.target.value)} placeholder="Senior Product Designer" />
              </div>
              <div className="form-grid">
                <div className="form-field">
                  <label>Email</label>
                  <input type="email" value={resume.personal.email} onChange={e => updatePersonal('email', e.target.value)} placeholder="alex@email.com" />
                </div>
                <div className="form-field">
                  <label>Phone</label>
                  <input value={resume.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="form-field">
                <label>Location</label>
                <input value={resume.personal.location} onChange={e => updatePersonal('location', e.target.value)} placeholder="San Francisco, CA" />
              </div>
              <div className="form-grid">
                <div className="form-field">
                  <label>Website</label>
                  <input value={resume.personal.website} onChange={e => updatePersonal('website', e.target.value)} placeholder="yoursite.com" />
                </div>
                <div className="form-field">
                  <label>LinkedIn</label>
                  <input value={resume.personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/you" />
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          {activeSection === 'summary' && (
            <div className="form-section">
              <h3 className="form-section__title">Professional Summary</h3>
              <div className="form-field">
                <label>Summary</label>
                <textarea
                  value={resume.personal.summary}
                  onChange={e => updatePersonal('summary', e.target.value)}
                  placeholder="Write a compelling 2-3 sentence summary of your professional background..."
                  rows={5}
                />
              </div>
            </div>
          )}

          {/* Experience */}
          {activeSection === 'experience' && (
            <div className="form-section">
              <div className="form-section__header">
                <h3 className="form-section__title">Work Experience</h3>
                <button className="btn btn-sm btn-primary" onClick={addExperience}>+ Add</button>
              </div>
              {resume.experience.map((exp, idx) => (
                <div key={exp.id} className="form-card">
                  <div className="form-card__header">
                    <span className="form-card__number">#{idx + 1}</span>
                    <button className="form-card__remove" onClick={() => removeExperience(exp.id)}>×</button>
                  </div>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Position</label>
                      <input value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} placeholder="Senior Designer" />
                    </div>
                    <div className="form-field">
                      <label>Company</label>
                      <input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} placeholder="Acme Inc." />
                    </div>
                  </div>
                  <div className="form-grid form-grid--3">
                    <div className="form-field">
                      <label>Start Date</label>
                      <input value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2022" />
                    </div>
                    <div className="form-field">
                      <label>End Date</label>
                      <input value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Present" />
                    </div>
                    <div className="form-field">
                      <label>Location</label>
                      <input value={exp.location} onChange={e => updateExperience(exp.id, 'location', e.target.value)} placeholder="NYC" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Bullet Points</label>
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="bullet-row">
                        <span className="bullet-dot">•</span>
                        <input
                          value={bullet}
                          onChange={e => updateBullet(exp.id, bIdx, e.target.value)}
                          placeholder="Describe your achievement..."
                        />
                        <button className="bullet-remove" onClick={() => removeBullet(exp.id, bIdx)}>×</button>
                      </div>
                    ))}
                    <button className="btn btn-sm btn-secondary" onClick={() => addBullet(exp.id)}>+ Add Bullet</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {activeSection === 'education' && (
            <div className="form-section">
              <div className="form-section__header">
                <h3 className="form-section__title">Education</h3>
                <button className="btn btn-sm btn-primary" onClick={addEducation}>+ Add</button>
              </div>
              {resume.education.map((edu, idx) => (
                <div key={edu.id} className="form-card">
                  <div className="form-card__header">
                    <span className="form-card__number">#{idx + 1}</span>
                    <button className="form-card__remove" onClick={() => removeEducation(edu.id)}>×</button>
                  </div>
                  <div className="form-field">
                    <label>School</label>
                    <input value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} placeholder="University of..." />
                  </div>
                  <div className="form-field">
                    <label>Degree</label>
                    <input value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science in..." />
                  </div>
                  <div className="form-grid form-grid--3">
                    <div className="form-field">
                      <label>Start</label>
                      <input value={edu.startDate} onChange={e => updateEducation(edu.id, 'startDate', e.target.value)} placeholder="2018" />
                    </div>
                    <div className="form-field">
                      <label>End</label>
                      <input value={edu.endDate} onChange={e => updateEducation(edu.id, 'endDate', e.target.value)} placeholder="2022" />
                    </div>
                    <div className="form-field">
                      <label>GPA</label>
                      <input value={edu.gpa} onChange={e => updateEducation(edu.id, 'gpa', e.target.value)} placeholder="3.8" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {activeSection === 'skills' && (
            <div className="form-section">
              <div className="form-section__header">
                <h3 className="form-section__title">Skills</h3>
                <button className="btn btn-sm btn-primary" onClick={addSkill}>+ Add</button>
              </div>
              <div className="skills-grid">
                {resume.skills.map((skill, idx) => (
                  <div key={idx} className="skill-tag">
                    <span>{skill}</span>
                    <button onClick={() => removeSkill(idx)}>×</button>
                  </div>
                ))}
              </div>
              {resume.skills.length === 0 && (
                <p className="form-empty">No skills added yet. Click "+ Add" to add your skills.</p>
              )}
            </div>
          )}

          {/* Projects */}
          {activeSection === 'projects' && (
            <div className="form-section">
              <div className="form-section__header">
                <h3 className="form-section__title">Projects</h3>
                <button className="btn btn-sm btn-primary" onClick={addProject}>+ Add</button>
              </div>
              {resume.projects.map((proj, idx) => (
                <div key={proj.id} className="form-card">
                  <div className="form-card__header">
                    <span className="form-card__number">#{idx + 1}</span>
                    <button className="form-card__remove" onClick={() => removeProject(proj.id)}>×</button>
                  </div>
                  <div className="form-field">
                    <label>Project Name</label>
                    <input value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} placeholder="My Awesome Project" />
                  </div>
                  <div className="form-field">
                    <label>Description</label>
                    <textarea value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} placeholder="Brief description of the project..." rows={3} />
                  </div>
                  <div className="form-field">
                    <label>Link</label>
                    <input value={proj.link} onChange={e => updateProject(proj.id, 'link', e.target.value)} placeholder="github.com/..." />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Right Panel - Preview */}
      <main className="editor__preview">
        <div className="editor__preview-scroll" ref={previewContainerRef}>
          <div className="editor__preview-page" style={{ transform: `scale(${previewScale})` }}>
            <ResumePreview
              ref={previewRef}
              data={resume}
              settings={settings}
              theme={currentTheme}
              font={currentFont}
            />
          </div>
        </div>
        <div className="preview-zoom-badge">{Math.round(previewScale * 100)}%</div>
      </main>

      {/* Pro Upgrade Modal */}
      <ProModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        feature={proFeature}
      />

      {/* Upgrade banner for free users */}
      {!userIsPro && (
        <div className="upgrade-banner" onClick={() => { setProFeature('all premium features'); setShowProModal(true) }}>
          <span>👑</span>
          <span><strong>Upgrade to Pro</strong> — Remove watermark & unlock all templates</span>
          <span className="upgrade-banner__arrow">→</span>
        </div>
      )}
    </div>
  )
}
