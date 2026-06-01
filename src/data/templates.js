export const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Minimal',
    description: 'Clean, ATS-friendly design with elegant spacing and classic typography.',
    free: true,
    popular: true,
    colors: { primary: '#0F172A', accent: '#475569', bg: '#FFFFFF' }
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Creative',
    description: 'Bold header with accent colors and a contemporary two-column layout.',
    free: true,
    popular: false,
    colors: { primary: '#7C3AED', accent: '#3B82F6', bg: '#FFFFFF' }
  },
  {
    id: 'developer',
    name: 'Developer',
    category: 'Developer',
    description: 'Dark-mode inspired design with monospace accents, perfect for tech roles.',
    free: true,
    popular: true,
    colors: { primary: '#10B981', accent: '#06B6D4', bg: '#0F172A' }
  },
  {
    id: 'executive',
    name: 'Executive',
    category: 'Executive',
    description: 'Sophisticated serif typography with refined layout for senior positions.',
    free: false,
    popular: false,
    colors: { primary: '#1E293B', accent: '#92400E', bg: '#FFFBEB' }
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'Creative',
    description: 'Vibrant, eye-catching design with unique layout for creative professionals.',
    free: false,
    popular: true,
    colors: { primary: '#DB2777', accent: '#7C3AED', bg: '#FFFFFF' }
  },
  {
    id: 'elegant',
    name: 'Elegant',
    category: 'Minimal',
    description: 'Timeless design with subtle borders and refined proportions.',
    free: false,
    popular: false,
    colors: { primary: '#374151', accent: '#6366F1', bg: '#FFFFFF' }
  },
  {
    id: 'startup',
    name: 'Startup',
    category: 'Creative',
    description: 'High-contrast, punchy layout designed for modern tech companies and startups.',
    free: false,
    popular: true,
    colors: { primary: '#F97316', accent: '#1E293B', bg: '#FAFAFA' }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    category: 'Executive',
    description: 'Traditional, highly ATS-optimized layout with authoritative styling for corporate roles.',
    free: false,
    popular: false,
    colors: { primary: '#032145', accent: '#64748B', bg: '#FFFFFF' }
  }
]

export const categories = ['All', 'Minimal', 'Creative', 'Developer', 'Executive']

export const fontPairings = [
  { id: 'inter', name: 'Inter', heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
  { id: 'serif', name: 'Classic', heading: "'Source Serif 4', Georgia, serif", body: "'Inter', sans-serif" },
  { id: 'georgia', name: 'Traditional', heading: "Georgia, serif", body: "Georgia, serif" },
  { id: 'system', name: 'System', heading: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }
]

export const colorThemes = [
  { id: 'violet', name: 'Violet', primary: '#7C3AED', accent: '#6366F1' },
  { id: 'blue', name: 'Ocean', primary: '#2563EB', accent: '#3B82F6' },
  { id: 'emerald', name: 'Emerald', primary: '#059669', accent: '#10B981' },
  { id: 'rose', name: 'Rose', primary: '#E11D48', accent: '#F43F5E' },
  { id: 'amber', name: 'Amber', primary: '#D97706', accent: '#F59E0B' },
  { id: 'navy', name: 'Navy', primary: '#1E293B', accent: '#475569' },
  { id: 'slate', name: 'Slate', primary: '#374151', accent: '#6B7280' },
  { id: 'teal', name: 'Teal', primary: '#0D9488', accent: '#14B8A6' }
]
