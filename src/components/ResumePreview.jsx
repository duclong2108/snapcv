import { forwardRef } from 'react'
import './ResumePreview.css'

const ResumePreview = forwardRef(({ data, settings, theme, font }, ref) => {
  const { personal, experience, education, skills, projects } = data
  const templateId = settings.template
  const layout = settings.layout

  const style = {
    '--resume-primary': theme.primary,
    '--resume-accent': theme.accent,
    '--resume-font-heading': font.heading,
    '--resume-font-body': font.body,
  }

  return (
    <div
      ref={ref}
      className={`resume resume--${templateId} resume--${layout}`}
      style={style}
    >
      {/* MINIMAL TEMPLATE */}
      {templateId === 'minimal' && (
        <div className="resume-minimal">
          <header className="rm-header">
            <h1 className="rm-name">{personal.firstName} {personal.lastName}</h1>
            <p className="rm-title">{personal.title}</p>
            <div className="rm-contact">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.location && <span>• {personal.location}</span>}
              {personal.website && <span>• {personal.website}</span>}
            </div>
          </header>

          {personal.summary && (
            <section className="rm-section">
              <h2 className="rm-section-title">Summary</h2>
              <p className="rm-text">{personal.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="rm-section">
              <h2 className="rm-section-title">Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="rm-entry">
                  <div className="rm-entry-header">
                    <div>
                      <h3 className="rm-entry-title">{exp.position}</h3>
                      <p className="rm-entry-subtitle">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <span className="rm-entry-date">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <ul className="rm-bullets">
                    {exp.bullets.filter(b => b).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="rm-section">
              <h2 className="rm-section-title">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="rm-entry">
                  <div className="rm-entry-header">
                    <div>
                      <h3 className="rm-entry-title">{edu.school}</h3>
                      <p className="rm-entry-subtitle">{edu.degree}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                    </div>
                    <span className="rm-entry-date">{edu.startDate} — {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="rm-section">
              <h2 className="rm-section-title">Skills</h2>
              <div className="rm-skills">{skills.join(' · ')}</div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="rm-section">
              <h2 className="rm-section-title">Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} className="rm-entry">
                  <h3 className="rm-entry-title">{proj.name} {proj.link && <span className="rm-link">{proj.link}</span>}</h3>
                  <p className="rm-text">{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      )}

      {/* MODERN TEMPLATE */}
      {templateId === 'modern' && (
        <div className="resume-modern">
          <header className="rmod-header">
            <div className="rmod-header-content">
              <div className="rmod-initials">{(personal.firstName?.[0] || '')}{(personal.lastName?.[0] || '')}</div>
              <div>
                <h1 className="rmod-name">{personal.firstName} {personal.lastName}</h1>
                <p className="rmod-title">{personal.title}</p>
              </div>
            </div>
            <div className="rmod-contact">
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>📱 {personal.phone}</span>}
              {personal.location && <span>📍 {personal.location}</span>}
              {personal.website && <span>🌐 {personal.website}</span>}
            </div>
          </header>

          {personal.summary && (
            <section className="rmod-section">
              <h2 className="rmod-section-title"><span className="rmod-icon">📝</span> Summary</h2>
              <p className="rmod-text">{personal.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="rmod-section">
              <h2 className="rmod-section-title"><span className="rmod-icon">💼</span> Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="rmod-entry">
                  <div className="rmod-entry-header">
                    <div>
                      <h3 className="rmod-entry-title">{exp.position}</h3>
                      <p className="rmod-entry-company">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <span className="rmod-date">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <ul className="rmod-bullets">
                    {exp.bullets.filter(b => b).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="rmod-section">
              <h2 className="rmod-section-title"><span className="rmod-icon">🎓</span> Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="rmod-entry">
                  <div className="rmod-entry-header">
                    <div>
                      <h3 className="rmod-entry-title">{edu.school}</h3>
                      <p className="rmod-entry-company">{edu.degree}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                    </div>
                    <span className="rmod-date">{edu.startDate} — {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="rmod-section">
              <h2 className="rmod-section-title"><span className="rmod-icon">🎯</span> Skills</h2>
              <div className="rmod-skills">
                {skills.map((skill, i) => (
                  <span key={i} className="rmod-skill-chip">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="rmod-section">
              <h2 className="rmod-section-title"><span className="rmod-icon">🚀</span> Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} className="rmod-entry">
                  <h3 className="rmod-entry-title">{proj.name}</h3>
                  <p className="rmod-text">{proj.description}</p>
                  {proj.link && <p className="rmod-link">{proj.link}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      )}

      {/* DEVELOPER TEMPLATE */}
      {templateId === 'developer' && (
        <div className="resume-developer">
          <header className="rdev-header">
            <div className="rdev-prompt">
              <span className="rdev-prompt-user">user@snapcv</span>
              <span className="rdev-prompt-sep">:</span>
              <span className="rdev-prompt-path">~/resume</span>
              <span className="rdev-prompt-dollar">$</span>
              <span className="rdev-prompt-cmd"> cat info.json</span>
            </div>
            <h1 className="rdev-name">{personal.firstName} {personal.lastName}</h1>
            <p className="rdev-title">{personal.title}</p>
            <div className="rdev-contact">
              {personal.email && <span className="rdev-tag">📧 {personal.email}</span>}
              {personal.phone && <span className="rdev-tag">📱 {personal.phone}</span>}
              {personal.location && <span className="rdev-tag">📍 {personal.location}</span>}
              {personal.website && <span className="rdev-tag">🔗 {personal.website}</span>}
            </div>
          </header>

          {personal.summary && (
            <section className="rdev-section">
              <h2 className="rdev-section-title">{'// '}About</h2>
              <p className="rdev-text">{personal.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="rdev-section">
              <h2 className="rdev-section-title">{'// '}Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="rdev-entry">
                  <div className="rdev-entry-header">
                    <h3 className="rdev-entry-title">{exp.position} <span className="rdev-at">@</span> {exp.company}</h3>
                    <span className="rdev-date">{exp.startDate} → {exp.endDate}</span>
                  </div>
                  <ul className="rdev-bullets">
                    {exp.bullets.filter(b => b).map((bullet, i) => (
                      <li key={i}><span className="rdev-bullet-arrow">▸</span> {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="rdev-section">
              <h2 className="rdev-section-title">{'// '}Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="rdev-entry">
                  <h3 className="rdev-entry-title">{edu.school}</h3>
                  <p className="rdev-text">{edu.degree}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''} | {edu.startDate}–{edu.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="rdev-section">
              <h2 className="rdev-section-title">{'// '}Tech Stack</h2>
              <div className="rdev-skills">
                {skills.map((skill, i) => (
                  <span key={i} className="rdev-skill">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="rdev-section">
              <h2 className="rdev-section-title">{'// '}Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} className="rdev-entry">
                  <h3 className="rdev-entry-title">📁 {proj.name}</h3>
                  <p className="rdev-text">{proj.description}</p>
                  {proj.link && <p className="rdev-link-text">🔗 {proj.link}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      )}

      {/* EXECUTIVE / CREATIVE / ELEGANT — use minimal layout with color overrides */}
      {(templateId === 'executive' || templateId === 'creative' || templateId === 'elegant') && (
        <div className={`resume-minimal resume-variant--${templateId}`}>
          <header className="rm-header">
            <h1 className="rm-name">{personal.firstName} {personal.lastName}</h1>
            <p className="rm-title">{personal.title}</p>
            <div className="rm-contact">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.location && <span>• {personal.location}</span>}
              {personal.website && <span>• {personal.website}</span>}
            </div>
          </header>

          {personal.summary && (
            <section className="rm-section">
              <h2 className="rm-section-title">Summary</h2>
              <p className="rm-text">{personal.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="rm-section">
              <h2 className="rm-section-title">Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="rm-entry">
                  <div className="rm-entry-header">
                    <div>
                      <h3 className="rm-entry-title">{exp.position}</h3>
                      <p className="rm-entry-subtitle">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <span className="rm-entry-date">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <ul className="rm-bullets">
                    {exp.bullets.filter(b => b).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="rm-section">
              <h2 className="rm-section-title">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="rm-entry">
                  <div className="rm-entry-header">
                    <div>
                      <h3 className="rm-entry-title">{edu.school}</h3>
                      <p className="rm-entry-subtitle">{edu.degree}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                    </div>
                    <span className="rm-entry-date">{edu.startDate} — {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="rm-section">
              <h2 className="rm-section-title">Skills</h2>
              <div className="rm-skills">{skills.join(' · ')}</div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="rm-section">
              <h2 className="rm-section-title">Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} className="rm-entry">
                  <h3 className="rm-entry-title">{proj.name}</h3>
                  <p className="rm-text">{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'
export default ResumePreview
