import { useState } from 'react'
import { getSmartPhrases } from '../data/smartPhrases.js'
import './SmartSuggestions.css'

export default function SmartSuggestions({ jobTitle, onSelect, userIsPro, onProClick }) {
  const [isOpen, setIsOpen] = useState(false)
  const phrases = getSmartPhrases(jobTitle)

  if (!isOpen) {
    return (
      <button 
        className="btn-smart-suggest" 
        onClick={(e) => { e.preventDefault(); setIsOpen(true) }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path><path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path></svg>
        Smart Assistant
      </button>
    )
  }

  return (
    <div className="smart-suggestions-panel">
      <div className="smart-suggestions-header">
        <h4>✨ Smart Suggestions for {jobTitle ? `"${jobTitle}"` : "General"}</h4>
        <button className="close-btn" onClick={(e) => { e.preventDefault(); setIsOpen(false) }}>×</button>
      </div>
      <div className="smart-suggestions-list">
        {phrases.map((phrase, idx) => {
          const isLocked = !phrase.free && !userIsPro;
          return (
            <div 
              key={idx} 
              className={`smart-phrase-card ${isLocked ? 'locked' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                if (isLocked) {
                  onProClick();
                } else {
                  onSelect(phrase.text);
                  setIsOpen(false);
                }
              }}
            >
              <p>{phrase.text}</p>
              {isLocked ? (
                <span className="smart-badge pro">PRO 🔒</span>
              ) : (
                <span className="smart-badge add">+ Add</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
