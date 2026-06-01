const STORAGE_KEY = 'snapcv_resume_data'
const SETTINGS_KEY = 'snapcv_settings'

export function saveResume(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save resume data:', e)
  }
}

export function loadResume() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error('Failed to load resume data:', e)
    return null
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch (e) {
    console.error('Failed to save settings:', e)
  }
}

export function loadSettings() {
  try {
    const data = localStorage.getItem(SETTINGS_KEY)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error('Failed to load settings:', e)
    return null
  }
}

export function exportResumeJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  
  // Use the user's name if available, otherwise default
  const firstName = data.personal?.firstName?.trim() || 'My'
  const lastName = data.personal?.lastName?.trim() || 'Resume'
  a.download = `${firstName}-${lastName}-SnapCV-Backup.json`.replace(/\s+/g, '-')
  
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function importResumeJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        resolve(data)
      } catch (err) {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}
