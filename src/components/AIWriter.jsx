import React, { useState } from 'react';
import { searchBulletPoints } from '../data/aiBulletPoints';
import './AIWriter.css';

export default function AIWriter({ onInsert, jobTitle = "" }) {
  const [query, setQuery] = useState(jobTitle);
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Pre-load suggestions if job title exists
  React.useEffect(() => {
     if (isOpen && query) {
         handleSearch(query);
     }
  }, [isOpen]);

  const handleSearch = (searchQuery) => {
    setIsSearching(true);
    // Simulate slight network delay for "AI" feel
    setTimeout(() => {
       const suggestions = searchBulletPoints(searchQuery || 'General');
       setResults(suggestions);
       setIsSearching(false);
    }, 400);
  };

  const onSearchSubmit = (e) => {
      e.preventDefault();
      handleSearch(query);
  }

  const handleInsert = (text) => {
      onInsert(text);
      setIsOpen(false);
  }

  if (!isOpen) {
      return (
          <button type="button" className="ai-trigger-btn" onClick={() => setIsOpen(true)}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
             </svg>
             AI Suggest
          </button>
      )
  }

  return (
    <div className="ai-writer-panel">
        <div className="ai-writer-header">
            <h4><span className="gradient-text">AI</span> Bullet Points</h4>
            <button type="button" className="close-btn" onClick={() => setIsOpen(false)}>×</button>
        </div>
        
        <form onSubmit={onSearchSubmit} className="ai-search-form">
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Job title (e.g., Software Engineer)"
                className="ai-search-input"
            />
            <button type="submit" className="ai-search-btn" disabled={isSearching}>
               {isSearching ? '...' : 'Search'}
            </button>
        </form>

        <div className="ai-results">
            {isSearching ? (
                <div className="ai-loading">Generating ATS-optimized suggestions...</div>
            ) : results.length > 0 ? (
                results.map((text, i) => (
                    <div key={i} className="ai-result-item" onClick={() => handleInsert(text)}>
                        <p>{text}</p>
                        <span className="add-icon">+</span>
                    </div>
                ))
            ) : (
                <div className="ai-empty">No specific suggestions found. Try a broader job title.</div>
            )}
        </div>
    </div>
  );
}
