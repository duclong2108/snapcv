import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { getUserResumes, deleteResume } from '../utils/cloudStorage';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchResumes = async () => {
      const userResumes = await getUserResumes(user.uid);
      setResumes(userResumes);
      setLoading(false);
    };

    fetchResumes();
  }, [user, navigate]);

  const handleDelete = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const success = await deleteResume(user.uid, resumeId);
      if (success) {
        setResumes(resumes.filter(r => r.id !== resumeId));
      }
    }
  };

  const handleDuplicate = (resume) => {
    // Generate new ID and navigate to editor with that ID
    // The editor will handle saving it as a new document
    const newId = Date.now().toString();
    localStorage.setItem('duplicate_source', JSON.stringify(resume));
    navigate(`/editor/${newId}`);
  };

  const createNew = () => {
    const newId = Date.now().toString();
    navigate(`/editor/${newId}`);
  };

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>My Resumes | SnapCV</title>
      </Helmet>
      
      <div className="dashboard-header">
        <div>
          <h1>My Resumes</h1>
          <p>Manage your tailored resumes for different job applications.</p>
        </div>
        <button className="btn btn-primary" onClick={createNew}>+ New Resume</button>
      </div>

      {loading ? (
        <div className="dashboard-loading">Loading your resumes...</div>
      ) : resumes.length === 0 ? (
        <div className="dashboard-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--navy-400)" strokeWidth="1">
             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
             <polyline points="14 2 14 8 20 8"></polyline>
             <line x1="16" y1="13" x2="8" y2="13"></line>
             <line x1="16" y1="17" x2="8" y2="17"></line>
             <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h2>No resumes yet</h2>
          <p>Create your first professional resume to get started.</p>
          <button className="btn btn-primary" onClick={createNew}>Create Resume</button>
        </div>
      ) : (
        <div className="resumes-grid">
          {resumes.map(resume => (
            <div key={resume.id} className="resume-card">
              <div className="resume-card-preview" onClick={() => navigate(`/editor/${resume.id}`)}>
                 {/* A simple placeholder preview */}
                 <div className="preview-skeleton">
                    <div className="sk-header"></div>
                    <div className="sk-body">
                       <div className="sk-line"></div>
                       <div className="sk-line"></div>
                       <div className="sk-line short"></div>
                    </div>
                 </div>
              </div>
              <div className="resume-card-info">
                <h3>{resume.title || 'Untitled Resume'}</h3>
                <span className="resume-card-date">
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </span>
                <div className="resume-card-actions">
                  <button className="action-btn edit-btn" onClick={() => navigate(`/editor/${resume.id}`)}>Edit</button>
                  <button className="action-btn dup-btn" onClick={() => handleDuplicate(resume)}>Duplicate</button>
                  <button className="action-btn del-btn" onClick={() => handleDelete(resume.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
