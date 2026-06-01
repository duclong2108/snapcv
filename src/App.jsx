import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Gallery from './pages/Gallery.jsx'
import Editor from './pages/Editor.jsx'
import Header from './components/Header.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/templates" element={<Gallery />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:templateId" element={<Editor />} />
      </Routes>
    </div>
  )
}

export default App
