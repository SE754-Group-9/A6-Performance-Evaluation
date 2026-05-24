import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import QuizPage from './components/QuizPage'
import './index.css'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', background: '#f3f4f6' }}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <TopHeader />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <QuizPage darkMode={darkMode} />
        </main>
      </div>
    </div>
  )
}
