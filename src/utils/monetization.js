// Monetization configuration
// Replace these with your actual Lemon Squeezy checkout URLs after creating products

export const PAYMENT_CONFIG = {
  // Set to true once you have payment links set up
  paymentsEnabled: true,

  // Lemon Squeezy checkout URLs - replace with your actual links
  // To get these:
  // 1. Go to lemonsqueezy.com → Create account
  // 2. Create Store → Create Products:
  //    - "SnapCV Pro Monthly" - $7/month subscription
  //    - "SnapCV Lifetime" - $49 one-time
  // 3. For each product → Share → Copy checkout URL
  checkoutUrls: {
    proMonthly: 'https://snapcv.lemonsqueezy.com/buy/pro-monthly',
    lifetime: 'https://snapcv.lemonsqueezy.com/buy/lifetime',
  },

  // Buy Me a Coffee username (optional, for tips)
  buyMeACoffee: 'snapcv',

  // Feature flags
  watermarkOnFree: true,
  lockPremiumTemplates: true,
}

// Check if user has pro access (stored in localStorage)
export function isPro() {
  try {
    const data = localStorage.getItem('snapcv_pro')
    if (!data) return false
    const parsed = JSON.parse(data)
    // Check if license is valid
    if (parsed.type === 'lifetime') return true
    if (parsed.type === 'pro' && parsed.expiresAt) {
      return new Date(parsed.expiresAt) > new Date()
    }
    return false
  } catch {
    return false
  }
}

// Activate pro (called after successful payment verification)
export function activatePro(type = 'lifetime') {
  const data = {
    type,
    activatedAt: new Date().toISOString(),
    expiresAt: type === 'pro'
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      : null
  }
  localStorage.setItem('snapcv_pro', JSON.stringify(data))
}

// Deactivate pro
export function deactivatePro() {
  localStorage.removeItem('snapcv_pro')
}

// Get pro status details
export function getProStatus() {
  try {
    const data = localStorage.getItem('snapcv_pro')
    if (!data) return { isPro: false }
    const parsed = JSON.parse(data)
    return {
      isPro: isPro(),
      type: parsed.type,
      activatedAt: parsed.activatedAt,
      expiresAt: parsed.expiresAt
    }
  } catch {
    return { isPro: false }
  }
}
