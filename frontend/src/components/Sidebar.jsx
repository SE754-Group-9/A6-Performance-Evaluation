import { Home, BookOpen, HelpCircle, Layers, BarChart2, User, Settings, Moon } from 'lucide-react'

const NAV = [
  { icon: Home,      label: 'Home' },
  { icon: BookOpen,  label: 'Learn' },
  { icon: HelpCircle,label: 'Quizzes', active: true },
  { icon: Layers,    label: 'Flashcards' },
  { icon: BarChart2, label: 'Progress' },
  { icon: User,      label: 'Profile' },
  { icon: Settings,  label: 'Settings' },
]

export default function Sidebar({ darkMode, setDarkMode }) {
  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      borderRight: '1px solid #e5e7eb',
      height: '100vh',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 20px', height: 56,
        borderBottom: '1px solid #e5e7eb',
        flexShrink: 0,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: '#4f46e5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>CodeLearn</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(({ icon: Icon, label, active }) => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 8,
            fontSize: 14, fontWeight: 500,
            border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
            background: active ? '#4f46e5' : 'transparent',
            color: active ? '#fff' : '#6b7280',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#f3f4f6' }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      {/* Dark mode toggle */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px',
        borderTop: '1px solid #e5e7eb',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Moon size={15} color="#9ca3af" />
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Dark Mode</span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: 38, height: 22, borderRadius: 11,
            background: darkMode ? '#4f46e5' : '#d1d5db',
            border: 'none', cursor: 'pointer', position: 'relative',
            transition: 'background 0.2s', flexShrink: 0,
          }}
        >
          <span style={{
            position: 'absolute', top: 3,
            left: darkMode ? 19 : 3,
            width: 16, height: 16, borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            transition: 'left 0.2s',
            display: 'block',
          }} />
        </button>
      </div>
    </aside>
  )
}
