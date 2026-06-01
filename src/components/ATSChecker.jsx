import React, { useState, useEffect } from 'react';
import './ATSChecker.css';

export default function ATSChecker({ resume }) {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      analyzeResume();
    }
  }, [resume, isOpen]);

  const analyzeResume = () => {
    let currentScore = 100;
    const newFeedback = [];

    // 1. Check Contact Info (Max 15 points penalty)
    if (!resume.personal.email) {
      currentScore -= 5;
      newFeedback.push({ type: 'error', message: 'Missing email address.' });
    }
    if (!resume.personal.phone) {
      currentScore -= 5;
      newFeedback.push({ type: 'error', message: 'Missing phone number.' });
    }
    if (!resume.personal.linkedin && !resume.personal.github) {
      currentScore -= 5;
      newFeedback.push({ type: 'warning', message: 'Add LinkedIn or GitHub link to boost visibility.' });
    }

    // 2. Check Professional Summary (Max 15 points penalty)
    if (!resume.personal.summary || resume.personal.summary.length < 50) {
      currentScore -= 15;
      newFeedback.push({ type: 'error', message: 'Summary is too short or missing. Aim for 3-4 sentences.' });
    } else if (resume.personal.summary.length > 400) {
      currentScore -= 5;
      newFeedback.push({ type: 'warning', message: 'Summary is quite long. Keep it concise.' });
    } else {
      newFeedback.push({ type: 'success', message: 'Good professional summary length.' });
    }

    // 3. Check Experience (Max 40 points penalty)
    if (!resume.experience || resume.experience.length === 0) {
      currentScore -= 40;
      newFeedback.push({ type: 'error', message: 'No work experience found. Add at least one role.' });
    } else {
      let missingDates = false;
      let shortBullets = false;
      let missingActionVerbs = false;

      resume.experience.forEach(exp => {
        if (!exp.startDate || !exp.endDate) missingDates = true;
        if (exp.description) {
          const bullets = exp.description.split('\n').filter(b => b.trim().length > 0);
          if (bullets.length < 2) shortBullets = true;
          
          bullets.forEach(bullet => {
             const words = bullet.trim().split(' ');
             if (words.length > 0) {
                 const firstWord = words[0].toLowerCase();
                 // Simple action verb check (could be much more sophisticated)
                 const commonNonAction = ['responsible', 'worked', 'did', 'helped', 'was'];
                 if (commonNonAction.includes(firstWord)) {
                     missingActionVerbs = true;
                 }
             }
          });
        } else {
          shortBullets = true;
        }
      });

      if (missingDates) {
        currentScore -= 10;
        newFeedback.push({ type: 'error', message: 'Missing start/end dates in experience. ATS needs dates.' });
      }
      if (shortBullets) {
        currentScore -= 10;
        newFeedback.push({ type: 'warning', message: 'Add more bullet points (2-4 per role) detailing your achievements.' });
      }
      if (missingActionVerbs) {
         currentScore -= 5;
         newFeedback.push({ type: 'warning', message: 'Start bullet points with strong action verbs (e.g., "Led", "Developed") instead of "Responsible for".' });
      }
      if (!missingDates && !shortBullets && !missingActionVerbs) {
         newFeedback.push({ type: 'success', message: 'Experience section looks solid.' });
      }
    }

    // 4. Check Education (Max 15 points penalty)
    if (!resume.education || resume.education.length === 0) {
      currentScore -= 15;
      newFeedback.push({ type: 'error', message: 'Missing education section.' });
    } else {
       let missingEduDates = false;
       resume.education.forEach(edu => {
           if (!edu.startDate || !edu.endDate) missingEduDates = true;
       });
       if (missingEduDates) {
           currentScore -= 5;
           newFeedback.push({ type: 'warning', message: 'Add graduation dates to education.' });
       }
    }

    // 5. Check Skills (Max 15 points penalty)
    if (!resume.skills || resume.skills.length === 0) {
      currentScore -= 15;
      newFeedback.push({ type: 'error', message: 'No skills listed. ATS relies heavily on skill keywords.' });
    } else {
        // Count total skills
        const totalSkills = resume.skills.reduce((acc, cat) => {
            const skillsArr = cat.items ? cat.items.split(',').filter(s => s.trim()) : [];
            return acc + skillsArr.length;
        }, 0);

        if (totalSkills < 5) {
            currentScore -= 10;
            newFeedback.push({ type: 'warning', message: 'List more skills (aim for 8-15) to match job descriptions.' });
        } else {
            newFeedback.push({ type: 'success', message: 'Good number of skills listed.' });
        }
    }

    setScore(Math.max(0, currentScore));
    
    // Sort feedback: errors first, then warnings, then success
    newFeedback.sort((a, b) => {
        const order = { 'error': 0, 'warning': 1, 'success': 2 };
        return order[a.type] - order[b.type];
    });

    setFeedback(newFeedback);
  };

  const getScoreColor = () => {
    if (score >= 80) return '#10B981'; // Emerald 500
    if (score >= 60) return '#F59E0B'; // Amber 500
    return '#EF4444'; // Red 500
  };

  return (
    <div className="ats-checker-wrapper">
      <button 
        className={`ats-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        ATS Score
        {score > 0 && <span className="ats-badge" style={{ backgroundColor: getScoreColor() }}>{score}</span>}
      </button>

      {isOpen && (
        <div className="ats-panel">
          <div className="ats-panel-header">
            <h3>ATS Resume Score</h3>
            <button className="ats-close" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="ats-score-circle-container">
             <div className="ats-score-circle" style={{ '--score': score, '--color': getScoreColor() }}>
                <span className="ats-score-text">{score}</span>
             </div>
             <p className="ats-score-label">
                {score >= 80 ? 'Excellent! Highly ATS compatible.' : 
                 score >= 60 ? 'Needs Improvement.' : 
                 'Critical Issues Found.'}
             </p>
          </div>

          <div className="ats-feedback-list">
             {feedback.map((item, index) => (
                <div key={index} className={`ats-feedback-item ats-${item.type}`}>
                    <span className="ats-icon">
                        {item.type === 'error' && '❌'}
                        {item.type === 'warning' && '⚠️'}
                        {item.type === 'success' && '✅'}
                    </span>
                    <p>{item.message}</p>
                </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}
