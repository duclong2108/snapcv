import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Gallery from './pages/Gallery.jsx'
import Editor from './pages/Editor.jsx'
import RoleLanding from './pages/RoleLanding.jsx'
import MockAuth from './pages/MockAuth.jsx'
import Header from './components/Header.jsx'
import './App.css'

function App() {
  const location = useLocation()
  const isMockAuthPage = location.pathname === '/mock-auth'

  return (
    <div className="app">
      {!isMockAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/templates" element={<Gallery />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:templateId" element={<Editor />} />
        <Route path="/role/:roleId" element={<RoleLanding />} />
        <Route path="/mock-auth" element={<MockAuth />} />
      </Routes>
    </div>
  )
}

export default App
