import { Menu, Flame, ChevronDown } from 'lucide-react'

export default function TopHeader() {
  return (
    <header style={{
      height: 56, background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px', flexShrink: 0,
    }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }}>
        <Menu size={22} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Streak */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: '#fff7ed', border: '1px solid #fed7aa',
          borderRadius: 999, padding: '4px 12px',
        }}>
          <Flame size={15} color="#f97316" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#ea580c' }}>12</span>
        </div>

        {/* Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#4f46e5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>S</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Student</span>
          <ChevronDown size={14} color="#9ca3af" />
        </div>
      </div>
    </header>
  )
}
