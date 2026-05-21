import { Trophy, RefreshCw, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { questions } from '../data/questions'

function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function ResultsPage({ score, total, time, answers, onRestart }) {
  const pct = Math.round((score / total) * 100)

  let grade = 'Needs more work'
  let gradeColor = '#ef4444'
  if (pct >= 90) { grade = 'Excellent!'; gradeColor = '#22c55e' }
  else if (pct >= 70) { grade = 'Good job!'; gradeColor = '#4f46e5' }
  else if (pct >= 50) { grade = 'Keep practising!'; gradeColor = '#f59e0b' }

  const barColor = pct >= 70 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>

      {/* Score card */}
      <div style={{
        background: '#fff', borderRadius: 16,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)',
        padding: 32, textAlign: 'center', marginBottom: 16,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: '#eef2ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <Trophy size={36} color="#4f46e5" />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>Quiz Complete!</h1>
        <p style={{ fontSize: 16, fontWeight: 600, color: gradeColor, margin: '0 0 24px' }}>{grade}</p>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 36, fontWeight: 700, color: '#4f46e5', margin: 0 }}>{score}/{total}</p>
            <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Score</p>
          </div>
          <div style={{ width: 1, background: '#e5e7eb' }} />
          <div>
            <p style={{ fontSize: 36, fontWeight: 700, color: '#4f46e5', margin: 0 }}>{pct}%</p>
            <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Accuracy</p>
          </div>
          <div style={{ width: 1, background: '#e5e7eb' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={16} color="#4f46e5" />
              <p style={{ fontSize: 36, fontWeight: 700, color: '#4f46e5', margin: 0 }}>{formatTime(time)}</p>
            </div>
            <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Time taken</p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 10, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 999,
            background: barColor,
            width: `${pct}%`,
            transition: 'width 0.6s',
          }} />
        </div>
      </div>

      {/* Answer review */}
      <div style={{
        background: '#fff', borderRadius: 16,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)',
        padding: 24, marginBottom: 16,
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Answer Review</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {questions.map((q, idx) => {
            const userAnswer = answers[idx]
            const correct = userAnswer === q.correctIndex

            return (
              <div key={q.id} style={{
                padding: 16, borderRadius: 12,
                border: `1px solid ${correct ? '#bbf7d0' : '#fecaca'}`,
                background: correct ? '#f0fdf4' : '#fef2f2',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  {correct
                    ? <CheckCircle2 size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: 1 }} />
                    : <XCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                  }
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: 0 }}>
                    Q{idx + 1}. {q.question}
                  </p>
                </div>
                {!correct && userAnswer !== null && (
                  <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 4, marginLeft: 28 }}>
                    Your answer: {q.options[userAnswer]}
                  </p>
                )}
                <p style={{ fontSize: 12, color: '#16a34a', marginLeft: 28 }}>
                  Correct: {q.options[q.correctIndex]}
                </p>
                <p style={{ fontSize: 12, color: '#6b7280', marginTop: 6, marginLeft: 28, fontStyle: 'italic' }}>
                  {q.hint}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '14px', borderRadius: 12,
          background: '#4f46e5', color: '#fff',
          border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer',
        }}
      >
        <RefreshCw size={17} /> Restart Quiz
      </button>
    </div>
  )
}
