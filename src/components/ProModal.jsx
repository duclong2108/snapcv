import { useState } from 'react'
import { PAYMENT_CONFIG, isPro, activatePro } from '../utils/monetization.js'
import './ProModal.css'

export default function ProModal({ isOpen, onClose, feature = 'this feature' }) {
  const [activating, setActivating] = useState(false)
  const [licenseKey, setLicenseKey] = useState('')
  const [showActivate, setShowActivate] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleBuyPro = () => {
    window.open(PAYMENT_CONFIG.checkoutUrls.proMonthly, '_blank')
  }

  const handleBuyLifetime = () => {
    window.open(PAYMENT_CONFIG.checkoutUrls.lifetime, '_blank')
  }

  const handleActivate = () => {
    if (!licenseKey.trim()) {
      setError('Please enter your license key')
      return
    }
    setActivating(true)
    setError('')

    // Simple license key activation
    // In production, you'd verify this against your backend
    setTimeout(() => {
      if (licenseKey.trim().length >= 8) {
        activatePro('lifetime')
        setActivating(false)
        onClose()
        window.location.reload()
      } else {
        setError('Invalid license key. Please check and try again.')
        setActivating(false)
      }
    }, 1000)
  }

  return (
    <div className="pro-modal-backdrop" onClick={onClose}>
      <div className="pro-modal" onClick={e => e.stopPropagation()}>
        <button className="pro-modal__close" onClick={onClose}>×</button>

        <div className="pro-modal__header">
          <div className="pro-modal__icon">👑</div>
          <h2 className="pro-modal__title">Upgrade to <span className="gradient-text">Pro</span></h2>
          <p className="pro-modal__subtitle">
            Unlock {feature} and all premium features
          </p>
        </div>

        <div className="pro-modal__plans">
          {/* Pro Monthly */}
          <div className="pro-plan">
            <div className="pro-plan__header">
              <h3>Pro Monthly</h3>
              <div className="pro-plan__price">
                <span className="pro-plan__amount">$7</span>
                <span className="pro-plan__period">/month</span>
              </div>
            </div>
            <ul className="pro-plan__features">
              <li>✓ All 12+ premium templates</li>
              <li>✓ No watermark on PDFs</li>
              <li>✓ Full customization</li>
              <li>✓ Priority support</li>
            </ul>
            <button className="btn btn-primary pro-plan__btn" onClick={handleBuyPro}>
              Subscribe Now
            </button>
          </div>

          {/* Lifetime */}
          <div className="pro-plan pro-plan--featured">
            <div className="pro-plan__badge">Best Value 💎</div>
            <div className="pro-plan__header">
              <h3>Lifetime</h3>
              <div className="pro-plan__price">
                <span className="pro-plan__amount">$49</span>
                <span className="pro-plan__period">one-time</span>
              </div>
            </div>
            <ul className="pro-plan__features">
              <li>✓ Everything in Pro</li>
              <li>✓ All future templates</li>
              <li>✓ Lifetime updates</li>
              <li>✓ Pay once, use forever</li>
            </ul>
            <button className="btn btn-primary pro-plan__btn" onClick={handleBuyLifetime}>
              Get Lifetime Access
            </button>
          </div>
        </div>

        {/* Activate License */}
        <div className="pro-modal__activate">
          {!showActivate ? (
            <button className="pro-modal__activate-toggle" onClick={() => setShowActivate(true)}>
              Already purchased? Activate your license key →
            </button>
          ) : (
            <div className="pro-modal__activate-form">
              <p className="pro-modal__activate-label">Enter your license key:</p>
              <div className="pro-modal__activate-row">
                <input
                  type="text"
                  value={licenseKey}
                  onChange={e => setLicenseKey(e.target.value)}
                  placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
                  className="pro-modal__activate-input"
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleActivate}
                  disabled={activating}
                >
                  {activating ? 'Activating...' : 'Activate'}
                </button>
              </div>
              {error && <p className="pro-modal__error">{error}</p>}
            </div>
          )}
        </div>

        <p className="pro-modal__guarantee">
          🔒 Secure payment via Lemon Squeezy · 30-day money-back guarantee
        </p>
      </div>
    </div>
  )
}
