import { forwardRef } from 'react'
import RichText from './RichText.jsx'
import './ResumePreview.css'

const ResumePreview = forwardRef(({ data, settings, theme, font }, ref) => {
  const { personal, experience, education, skills, projects, customSections = [] } = data
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
              <RichText text={personal.summary} className="rm-text" />
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
                      <li key={i}><RichText text={bullet} /></li>
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
                  <RichText text={proj.description} className="rm-text" />
                </div>
              ))}
            </section>
          )}

          {customSections.map(sec => (
            <section key={sec.id} className="rm-section">
              <h2 className="rm-section-title">{sec.name}</h2>
              {sec.items.map(item => (
                <div key={item.id} className="rm-entry">
                  <div className="rm-entry-header">
                    <div>
                      <h3 className="rm-entry-title">{item.title}</h3>
                      {item.subtitle && <p className="rm-entry-subtitle">{item.subtitle}</p>}
                    </div>
                    {item.date && <span className="rm-entry-date">{item.date}</span>}
                  </div>
                  {item.description && <RichText text={item.description} className="rm-text" />}
                </div>
              ))}
            </section>
          ))}
        </div>
      )}

      {/* MODERN TEMPLATE */}
      {templateId === 'modern' && (
        <div className="resume-modern">
          <header className="rmod-header">
            <div className="rmod-header-content">
              {personal.photo ? (
                <img src={personal.photo} alt="Profile" className="rmod-photo" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div className="rmod-initials">{(personal.firstName?.[0] || '')}{(personal.lastName?.[0] || '')}</div>
              )}
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
              <h2 className="rmod-section-title"><span className="rmod-icon">👤</span> Profile</h2>
              <RichText text={personal.summary} className="rmod-text" />
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
                      <li key={i}><RichText text={bullet} /></li>
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
                  <RichText text={proj.description} className="rmod-text" />
                  {proj.link && <p className="rmod-link">{proj.link}</p>}
                </div>
              ))}
            </section>
          )}

          {customSections.map(sec => (
            <section key={sec.id} className="rmod-section">
              <h2 className="rmod-section-title"><span className="rmod-icon">📌</span> {sec.name}</h2>
              {sec.items.map(item => (
                <div key={item.id} className="rmod-entry">
                  <div className="rmod-entry-header">
                    <div>
                      <h3 className="rmod-entry-title">{item.title}</h3>
                      {item.subtitle && <p className="rmod-entry-company">{item.subtitle}</p>}
                    </div>
                    {item.date && <span className="rmod-date">{item.date}</span>}
                  </div>
                  {item.description && <RichText text={item.description} className="rmod-text" style={{ marginTop: '4px' }} />}
                </div>
              ))}
            </section>
          ))}
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
              <RichText text={personal.summary} className="rdev-text" />
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
                      <li key={i}><span className="rdev-bullet-arrow">▸</span> <RichText text={bullet} /></li>
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
                  <RichText text={proj.description} className="rdev-text" />
                  {proj.link && <p className="rdev-link-text">🔗 {proj.link}</p>}
                </div>
              ))}
            </section>
          )}

          {customSections.map(sec => (
            <section key={sec.id} className="rdev-section">
              <h2 className="rdev-section-title">{'// '}{sec.name}</h2>
              {sec.items.map(item => (
                <div key={item.id} className="rdev-entry">
                  <h3 className="rdev-entry-title">🏷️ {item.title} {item.subtitle && <span className="rdev-at">@</span>} {item.subtitle}</h3>
                  <p className="rdev-text">{item.date}</p>
                  {item.description && <RichText text={item.description} className="rdev-text" style={{ marginTop: '4px' }} />}
                </div>
              ))}
            </section>
          ))}
        </div>
      )}

      {/* EXECUTIVE TEMPLATE — Two-column with sidebar */}
      {templateId === 'executive' && (
        <div className="resume-executive">
          <div className="rexec-sidebar">
            <div className="rexec-sidebar-top">
              <div className="rexec-avatar">{(personal.firstName?.[0] || 'A')}{(personal.lastName?.[0] || 'J')}</div>
              <h1 className="rexec-name">{personal.firstName}<br/>{personal.lastName}</h1>
              <p className="rexec-title">{personal.title}</p>
            </div>

            <div className="rexec-sidebar-section">
              <h3 className="rexec-sidebar-heading">Contact</h3>
              {personal.email && <p className="rexec-contact-item">✉ {personal.email}</p>}
              {personal.phone && <p className="rexec-contact-item">☎ {personal.phone}</p>}
              {personal.location && <p className="rexec-contact-item">◎ {personal.location}</p>}
              {personal.website && <p className="rexec-contact-item">◆ {personal.website}</p>}
              {personal.linkedin && <p className="rexec-contact-item">◈ {personal.linkedin}</p>}
            </div>

            {skills.length > 0 && (
              <div className="rexec-sidebar-section">
                <h3 className="rexec-sidebar-heading">Expertise</h3>
                {skills.map((skill, i) => (
                  <div key={i} className="rexec-skill-bar">
                    <span className="rexec-skill-name">{skill}</span>
                    <div className="rexec-skill-track"><div className="rexec-skill-fill" style={{width: `${75 + Math.random() * 25}%`}}></div></div>
                  </div>
                ))}
              </div>
            )}

            {education.length > 0 && (
              <div className="rexec-sidebar-section">
                <h3 className="rexec-sidebar-heading">Education</h3>
                {education.map(edu => (
                  <div key={edu.id} className="rexec-edu">
                    <p className="rexec-edu-school">{edu.school}</p>
                    <p className="rexec-edu-degree">{edu.degree}</p>
                    <p className="rexec-edu-date">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rexec-main">
            {personal.summary && (
              <section className="rexec-section">
                <h2 className="rexec-section-title">Professional Profile</h2>
                <RichText text={personal.summary} className="rexec-text" />
              </section>
            )}

            {experience.length > 0 && (
              <section className="rexec-section">
                <h2 className="rexec-section-title">Professional Experience</h2>
                {experience.map(exp => (
                  <div key={exp.id} className="rexec-entry">
                    <div className="rexec-entry-header">
                      <div>
                        <h3 className="rexec-entry-title">{exp.position}</h3>
                        <p className="rexec-entry-company">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                      </div>
                      <span className="rexec-entry-date">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <ul className="rexec-bullets">
                      {exp.bullets.filter(b => b).map((bullet, i) => (
                        <li key={i}><RichText text={bullet} /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

          {projects.length > 0 && (
              <section className="rexec-section">
                <h2 className="rexec-section-title">Key Projects</h2>
                {projects.map(proj => (
                  <div key={proj.id} className="rexec-entry">
                    <h3 className="rexec-entry-title">{proj.name} {proj.link && <span className="rexec-link">{proj.link}</span>}</h3>
                    <RichText text={proj.description} className="rexec-text" />
                  </div>
                ))}
              </section>
            )}

            {customSections.map(sec => (
              <section key={sec.id} className="rexec-section">
                <h2 className="rexec-section-title">{sec.name}</h2>
                {sec.items.map(item => (
                  <div key={item.id} className="rexec-entry">
                    <div className="rexec-entry-header">
                      <div>
                        <h3 className="rexec-entry-title">{item.title}</h3>
                        {item.subtitle && <p className="rexec-entry-company">{item.subtitle}</p>}
                      </div>
                      {item.date && <span className="rexec-entry-date">{item.date}</span>}
                    </div>
                    {item.description && <RichText text={item.description} className="rexec-text" style={{ marginTop: '4px' }} />}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      )}

      {/* CREATIVE TEMPLATE — Bold accent bar, modern asymmetric */}
      {templateId === 'creative' && (
        <div className="resume-creative">
          <div className="rcre-accent-bar"></div>
          <header className="rcre-header">
            <div className="rcre-name-block">
              <h1 className="rcre-name">{personal.firstName} <span>{personal.lastName}</span></h1>
              <div className="rcre-title-line">
                <span className="rcre-title">{personal.title}</span>
              </div>
            </div>
            <div className="rcre-contact-grid">
              {personal.email && <span className="rcre-contact-chip">✉ {personal.email}</span>}
              {personal.phone && <span className="rcre-contact-chip">☎ {personal.phone}</span>}
              {personal.location && <span className="rcre-contact-chip">◎ {personal.location}</span>}
              {personal.website && <span className="rcre-contact-chip">◆ {personal.website}</span>}
            </div>
          </header>

          {personal.summary && (
            <section className="rcre-section">
              <div className="rcre-section-header">
                <span className="rcre-section-icon">◈</span>
                <h2 className="rcre-section-title">About Me</h2>
              </div>
              <RichText text={personal.summary} className="rcre-text" />
            </section>
          )}

          {experience.length > 0 && (
            <section className="rcre-section">
              <div className="rcre-section-header">
                <span className="rcre-section-icon">◈</span>
                <h2 className="rcre-section-title">Experience</h2>
              </div>
              {experience.map(exp => (
                <div key={exp.id} className="rcre-entry">
                  <div className="rcre-timeline-dot"></div>
                  <div className="rcre-entry-content">
                    <div className="rcre-entry-header">
                      <div>
                        <h3 className="rcre-entry-title">{exp.position}</h3>
                        <p className="rcre-entry-company">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                      </div>
                      <span className="rcre-date-badge">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <ul className="rcre-bullets">
                      {exp.bullets.filter(b => b).map((bullet, i) => (
                        <li key={i}><RichText text={bullet} /></li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </section>
          )}

          <div className="rcre-two-col">
            {education.length > 0 && (
              <section className="rcre-section">
                <div className="rcre-section-header">
                  <span className="rcre-section-icon">◈</span>
                  <h2 className="rcre-section-title">Education</h2>
                </div>
                {education.map(edu => (
                  <div key={edu.id} className="rcre-edu-card">
                    <h3 className="rcre-entry-title">{edu.school}</h3>
                    <p className="rcre-text">{edu.degree}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                    <p className="rcre-small">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </section>
            )}

            {skills.length > 0 && (
              <section className="rcre-section">
                <div className="rcre-section-header">
                  <span className="rcre-section-icon">◈</span>
                  <h2 className="rcre-section-title">Skills</h2>
                </div>
                <div className="rcre-skills-wrap">
                  {skills.map((skill, i) => (
                    <span key={i} className="rcre-skill-tag">{skill}</span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {projects.length > 0 && (
            <section className="rcre-section">
              <div className="rcre-section-header">
                <span className="rcre-section-icon">◈</span>
                <h2 className="rcre-section-title">Projects</h2>
              </div>
              <div className="rcre-projects-grid">
                {projects.map(proj => (
                  <div key={proj.id} className="rcre-project-card">
                    <h3 className="rcre-entry-title">{proj.name}</h3>
                    <RichText text={proj.description} className="rcre-text" />
                    {proj.link && <p className="rcre-small">↗ {proj.link}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {customSections.map(sec => (
            <section key={sec.id} className="rcre-section">
              <div className="rcre-section-header">
                <span className="rcre-section-icon">◈</span>
                <h2 className="rcre-section-title">{sec.name}</h2>
              </div>
              <div className="rcre-projects-grid">
                {sec.items.map(item => (
                  <div key={item.id} className="rcre-project-card">
                    <h3 className="rcre-entry-title">{item.title} {item.subtitle && <span style={{fontWeight:'normal'}}>| {item.subtitle}</span>}</h3>
                    {item.date && <p className="rcre-small">{item.date}</p>}
                    {item.description && <RichText text={item.description} className="rcre-text" style={{marginTop:'4px'}} />}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ELEGANT TEMPLATE — Left colored sidebar with serif typography */}
      {templateId === 'elegant' && (
        <div className="resume-elegant">
          <aside className="rele-sidebar">
            <div className="rele-photo-placeholder">
              <span>{(personal.firstName?.[0] || '')}{(personal.lastName?.[0] || '')}</span>
            </div>
            <h1 className="rele-name">{personal.firstName} {personal.lastName}</h1>
            <p className="rele-title">{personal.title}</p>

            <div className="rele-divider"></div>

            <div className="rele-sidebar-section">
              <h3 className="rele-sidebar-label">Contact</h3>
              {personal.email && <p className="rele-info">✉ {personal.email}</p>}
              {personal.phone && <p className="rele-info">☎ {personal.phone}</p>}
              {personal.location && <p className="rele-info">◎ {personal.location}</p>}
              {personal.website && <p className="rele-info">◆ {personal.website}</p>}
            </div>

            <div className="rele-divider"></div>

            {skills.length > 0 && (
              <div className="rele-sidebar-section">
                <h3 className="rele-sidebar-label">Skills</h3>
                <div className="rele-skills">
                  {skills.map((skill, i) => (
                    <span key={i} className="rele-skill-dot">• {skill}</span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <>
                <div className="rele-divider"></div>
                <div className="rele-sidebar-section">
                  <h3 className="rele-sidebar-label">Education</h3>
                  {education.map(edu => (
                    <div key={edu.id} className="rele-edu-item">
                      <p className="rele-edu-degree">{edu.degree}</p>
                      <p className="rele-edu-school">{edu.school}</p>
                      <p className="rele-edu-date">{edu.startDate} — {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </aside>

          <main className="rele-main">
            {personal.summary && (
              <section className="rele-section">
                <h2 className="rele-section-title">Profile</h2>
                <RichText text={personal.summary} className="rele-text" />
              </section>
            )}

            {experience.length > 0 && (
              <section className="rele-section">
                <h2 className="rele-section-title">Experience</h2>
                {experience.map(exp => (
                  <div key={exp.id} className="rele-entry">
                    <div className="rele-entry-top">
                      <div>
                        <h3 className="rele-entry-role">{exp.position}</h3>
                        <p className="rele-entry-company">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</p>
                      </div>
                      <span className="rele-entry-date">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <ul className="rele-bullets">
                      {exp.bullets.filter(b => b).map((bullet, i) => (
                        <li key={i}><RichText text={bullet} /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {projects.length > 0 && (
              <section className="rele-section">
                <h2 className="rele-section-title">Projects</h2>
                {projects.map(proj => (
                  <div key={proj.id} className="rele-entry">
                    <h3 className="rele-entry-role">{proj.name}</h3>
                    <RichText text={proj.description} className="rele-text" />
                    {proj.link && <p className="rele-link">↗ {proj.link}</p>}
                  </div>
                ))}
              </section>
            )}

            {customSections.map(sec => (
              <section key={sec.id} className="rele-section">
                <h2 className="rele-section-title">{sec.name}</h2>
                {sec.items.map(item => (
                  <div key={item.id} className="rele-entry">
                    <div className="rele-entry-top">
                      <div>
                        <h3 className="rele-entry-role">{item.title}</h3>
                        {item.subtitle && <p className="rele-entry-company">{item.subtitle}</p>}
                      </div>
                      {item.date && <span className="rele-entry-date">{item.date}</span>}
                    </div>
                    {item.description && <RichText text={item.description} className="rele-text" style={{marginTop:'4px'}} />}
                  </div>
                ))}
              </section>
            ))}
          </main>
        </div>
      )}

      {/* STARTUP TEMPLATE */}
      {templateId === 'startup' && (
        <div className="resume-startup">
          <header className="rstart-header">
            <h1 className="rstart-name">{personal.firstName} <span className="text-accent">{personal.lastName}</span></h1>
            <p className="rstart-title">{personal.title}</p>
            <div className="rstart-contact">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.website && <span>{personal.website}</span>}
            </div>
          </header>

          <div className="rstart-grid">
            <div className="rstart-main">
              {personal.summary && (
                <section className="rstart-section">
                  <h2 className="rstart-section-title">Summary</h2>
                  <RichText text={personal.summary} className="rstart-text" />
                </section>
              )}

              {experience.length > 0 && (
                <section className="rstart-section">
                  <h2 className="rstart-section-title">Experience</h2>
                  {experience.map(exp => (
                    <div key={exp.id} className="rstart-entry">
                      <div className="rstart-entry-header">
                        <h3 className="rstart-entry-role">{exp.position}</h3>
                        <span className="rstart-date">{exp.startDate} — {exp.endDate}</span>
                      </div>
                      <p className="rstart-company">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                      <ul className="rstart-bullets">
                        {exp.bullets.filter(b => b).map((bullet, i) => (
                          <li key={i}><RichText text={bullet} /></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}
              
              {customSections.map(sec => (
                <section key={sec.id} className="rstart-section">
                  <h2 className="rstart-section-title">{sec.name}</h2>
                  {sec.items.map(item => (
                    <div key={item.id} className="rstart-entry">
                      <div className="rstart-entry-header">
                        <h3 className="rstart-entry-role">{item.title}</h3>
                        <span className="rstart-date">{item.date}</span>
                      </div>
                      {item.subtitle && <p className="rstart-company">{item.subtitle}</p>}
                      {item.description && <RichText text={item.description} className="rstart-text" />}
                    </div>
                  ))}
                </section>
              ))}
            </div>

            <div className="rstart-sidebar">
              {skills.length > 0 && (
                <section className="rstart-section">
                  <h2 className="rstart-section-title">Skills</h2>
                  <div className="rstart-skills">
                    {skills.map((skill, i) => (
                      <span key={i} className="rstart-skill">{skill}</span>
                    ))}
                  </div>
                </section>
              )}

              {projects.length > 0 && (
                <section className="rstart-section">
                  <h2 className="rstart-section-title">Projects</h2>
                  {projects.map(proj => (
                    <div key={proj.id} className="rstart-project">
                      <h3 className="rstart-project-name">{proj.name}</h3>
                      <RichText text={proj.description} className="rstart-text" />
                      {proj.link && <p className="rstart-link">{proj.link}</p>}
                    </div>
                  ))}
                </section>
              )}

              {education.length > 0 && (
                <section className="rstart-section">
                  <h2 className="rstart-section-title">Education</h2>
                  {education.map(edu => (
                    <div key={edu.id} className="rstart-edu">
                      <h3 className="rstart-edu-school">{edu.school}</h3>
                      <p className="rstart-edu-degree">{edu.degree}</p>
                      <p className="rstart-date">{edu.startDate} — {edu.endDate}</p>
                    </div>
                  ))}
                </section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CORPORATE TEMPLATE */}
      {templateId === 'corporate' && (
        <div className="resume-corporate">
          <header className="rcorp-header">
            <h1 className="rcorp-name">{personal.firstName} {personal.lastName}</h1>
            <div className="rcorp-divider"></div>
            <p className="rcorp-title">{personal.title}</p>
            <div className="rcorp-contact">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.website && <span>{personal.website}</span>}
            </div>
          </header>

          <div className="rcorp-content">
            {personal.summary && (
              <section className="rcorp-section">
                <h2 className="rcorp-section-title">PROFESSIONAL SUMMARY</h2>
                <RichText text={personal.summary} className="rcorp-text" />
              </section>
            )}

            {experience.length > 0 && (
              <section className="rcorp-section">
                <h2 className="rcorp-section-title">PROFESSIONAL EXPERIENCE</h2>
                {experience.map(exp => (
                  <div key={exp.id} className="rcorp-entry">
                    <div className="rcorp-entry-header">
                      <h3 className="rcorp-company">{exp.company}</h3>
                      <span className="rcorp-location">{exp.location}</span>
                    </div>
                    <div className="rcorp-entry-subheader">
                      <span className="rcorp-role">{exp.position}</span>
                      <span className="rcorp-date">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <ul className="rcorp-bullets">
                      {exp.bullets.filter(b => b).map((bullet, i) => (
                        <li key={i}><RichText text={bullet} /></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {education.length > 0 && (
              <section className="rcorp-section">
                <h2 className="rcorp-section-title">EDUCATION</h2>
                {education.map(edu => (
                  <div key={edu.id} className="rcorp-entry">
                    <div className="rcorp-entry-header">
                      <h3 className="rcorp-company">{edu.school}</h3>
                      <span className="rcorp-location">{edu.location}</span>
                    </div>
                    <div className="rcorp-entry-subheader">
                      <span className="rcorp-role">{edu.degree}{edu.gpa ? `, GPA: ${edu.gpa}` : ''}</span>
                      <span className="rcorp-date">{edu.startDate} — {edu.endDate}</span>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {skills.length > 0 && (
              <section className="rcorp-section">
                <h2 className="rcorp-section-title">SKILLS & EXPERTISE</h2>
                <div className="rcorp-skills">
                  {skills.join(' • ')}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section className="rcorp-section">
                <h2 className="rcorp-section-title">PROJECTS</h2>
                {projects.map(proj => (
                  <div key={proj.id} className="rcorp-entry">
                    <h3 className="rcorp-role">{proj.name} {proj.link && <span className="rcorp-link">({proj.link})</span>}</h3>
                    <RichText text={proj.description} className="rcorp-text" />
                  </div>
                ))}
              </section>
            )}

            {customSections.map(sec => (
              <section key={sec.id} className="rcorp-section">
                <h2 className="rcorp-section-title">{sec.name.toUpperCase()}</h2>
                {sec.items.map(item => (
                  <div key={item.id} className="rcorp-entry">
                    <div className="rcorp-entry-header">
                      <h3 className="rcorp-role">{item.title}</h3>
                      {item.date && <span className="rcorp-date">{item.date}</span>}
                    </div>
                    {item.subtitle && <div className="rcorp-company" style={{marginBottom:'4px'}}>{item.subtitle}</div>}
                    {item.description && <RichText text={item.description} className="rcorp-text" />}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'
export default ResumePreview

