import './TemplateThumbnail.css'

export default function TemplateThumbnail({ templateId, colors }) {
  const { primary, accent, bg } = colors

  const style = {
    '--tm-primary': primary,
    '--tm-accent': accent,
    '--tm-bg': bg
  }

  return (
    <div className={`template-thumb template-thumb--${templateId}`} style={style}>
      <div className="template-thumb__inner">
        {/* MINIMAL */}
        {templateId === 'minimal' && (
          <>
            <div className="tm-minimal-header">
              <div className="tm-line tm-name"></div>
              <div className="tm-line tm-title"></div>
              <div className="tm-line tm-contact"></div>
            </div>
            <div className="tm-minimal-body">
              <div className="tm-section">
                <div className="tm-section-title"></div>
                <div className="tm-line tm-w90"></div>
                <div className="tm-line tm-w80"></div>
              </div>
              <div className="tm-section">
                <div className="tm-section-title"></div>
                <div className="tm-entry">
                  <div className="tm-entry-top"><div className="tm-line tm-w40"></div><div className="tm-line tm-w20"></div></div>
                  <div className="tm-line tm-w70 tm-light"></div>
                </div>
                <div className="tm-entry">
                  <div className="tm-entry-top"><div className="tm-line tm-w50"></div><div className="tm-line tm-w20"></div></div>
                  <div className="tm-line tm-w60 tm-light"></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* MODERN */}
        {templateId === 'modern' && (
          <>
            <div className="tm-modern-header">
              <div className="tm-modern-avatar"></div>
              <div className="tm-modern-header-text">
                <div className="tm-line tm-name"></div>
                <div className="tm-line tm-title"></div>
              </div>
            </div>
            <div className="tm-modern-body">
              <div className="tm-section">
                <div className="tm-section-title"><div className="tm-icon"></div><div className="tm-line tm-w30"></div></div>
                <div className="tm-line tm-w90"></div>
              </div>
              <div className="tm-section">
                <div className="tm-section-title"><div className="tm-icon"></div><div className="tm-line tm-w40"></div></div>
                <div className="tm-entry">
                  <div className="tm-line tm-w50 tm-bold"></div>
                  <div className="tm-line tm-w80"></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* DEVELOPER */}
        {templateId === 'developer' && (
          <div className="tm-dev-wrapper">
            <div className="tm-dev-header">
              <div className="tm-line tm-prompt"></div>
              <div className="tm-line tm-name"></div>
              <div className="tm-line tm-contact"></div>
            </div>
            <div className="tm-dev-body">
              <div className="tm-section">
                <div className="tm-line tm-section-title"></div>
                <div className="tm-line tm-w90"></div>
                <div className="tm-line tm-w70"></div>
              </div>
              <div className="tm-section">
                <div className="tm-line tm-section-title"></div>
                <div className="tm-entry">
                  <div className="tm-line tm-w60 tm-bold"></div>
                  <div className="tm-line tm-w80"></div>
                  <div className="tm-line tm-w50"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EXECUTIVE */}
        {templateId === 'executive' && (
          <div className="tm-exec-wrapper">
            <div className="tm-exec-sidebar">
              <div className="tm-exec-avatar"></div>
              <div className="tm-line tm-name"></div>
              <div className="tm-line tm-w60 tm-light center"></div>
              <div className="tm-exec-spacer"></div>
              <div className="tm-line tm-w80 tm-light"></div>
              <div className="tm-line tm-w70 tm-light"></div>
              <div className="tm-line tm-w90 tm-light"></div>
            </div>
            <div className="tm-exec-main">
              <div className="tm-section">
                <div className="tm-section-title"></div>
                <div className="tm-line tm-w90"></div>
                <div className="tm-line tm-w80"></div>
              </div>
              <div className="tm-section">
                <div className="tm-section-title"></div>
                <div className="tm-entry">
                  <div className="tm-entry-top"><div className="tm-line tm-w50 tm-bold"></div><div className="tm-line tm-w20"></div></div>
                  <div className="tm-line tm-w70"></div>
                  <div className="tm-line tm-w60"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATIVE */}
        {templateId === 'creative' && (
          <div className="tm-crea-wrapper">
            <div className="tm-crea-accent"></div>
            <div className="tm-crea-header">
              <div className="tm-line tm-name"></div>
              <div className="tm-line tm-w40 tm-light"></div>
            </div>
            <div className="tm-crea-body">
              <div className="tm-section">
                <div className="tm-section-title"></div>
                <div className="tm-crea-timeline">
                  <div className="tm-crea-dot"></div>
                  <div className="tm-crea-content">
                    <div className="tm-line tm-w60 tm-bold"></div>
                    <div className="tm-line tm-w90"></div>
                  </div>
                </div>
                <div className="tm-crea-timeline">
                  <div className="tm-crea-dot"></div>
                  <div className="tm-crea-content">
                    <div className="tm-line tm-w50 tm-bold"></div>
                    <div className="tm-line tm-w80"></div>
                  </div>
                </div>
              </div>
              <div className="tm-crea-twocol">
                <div className="tm-crea-col">
                  <div className="tm-section-title"></div>
                  <div className="tm-crea-card"><div className="tm-line tm-w80"></div></div>
                  <div className="tm-crea-card"><div className="tm-line tm-w70"></div></div>
                </div>
                <div className="tm-crea-col">
                  <div className="tm-section-title"></div>
                  <div className="tm-crea-tags">
                    <div className="tm-crea-tag tm-w40"></div>
                    <div className="tm-crea-tag tm-w50"></div>
                    <div className="tm-crea-tag tm-w30"></div>
                    <div className="tm-crea-tag tm-w60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ELEGANT */}
        {templateId === 'elegant' && (
          <div className="tm-eleg-wrapper">
            <div className="tm-eleg-sidebar">
              <div className="tm-eleg-avatar"></div>
              <div className="tm-line tm-name center"></div>
              <div className="tm-line tm-w60 tm-light center"></div>
              <div className="tm-eleg-divider"></div>
              <div className="tm-line tm-w80 tm-light"></div>
              <div className="tm-line tm-w70 tm-light"></div>
              <div className="tm-eleg-divider"></div>
              <div className="tm-line tm-w40 tm-light"></div>
              <div className="tm-line tm-w50 tm-light"></div>
            </div>
            <div className="tm-eleg-main">
              <div className="tm-section">
                <div className="tm-section-title"></div>
                <div className="tm-line tm-w90"></div>
                <div className="tm-line tm-w80"></div>
              </div>
              <div className="tm-section">
                <div className="tm-section-title"></div>
                <div className="tm-entry">
                  <div className="tm-entry-top"><div className="tm-line tm-w50 tm-bold"></div><div className="tm-line tm-w20"></div></div>
                  <div className="tm-line tm-w70"></div>
                  <div className="tm-line tm-w60"></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
