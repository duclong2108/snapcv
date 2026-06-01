import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Gallery from './pages/Gallery.jsx'
import Editor from './pages/Editor.jsx'
import Dashboard from './pages/Dashboard.jsx'
import RoleLanding from './pages/RoleLanding.jsx'
import Header from './components/Header.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/templates" element={<Gallery />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:resumeId" element={<Editor />} />
        <Route path="/role/:roleId" element={<RoleLanding />} />
      </Routes>
    </div>
  )
}

export default App
