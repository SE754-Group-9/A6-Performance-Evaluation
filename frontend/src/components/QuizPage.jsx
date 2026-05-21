import { useState, useEffect } from 'react'
import { Clock, LogOut, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
import { questions } from '../data/questions'
import ResultsPage from './ResultsPage'

const LABELS = ['A', 'B', 'C', 'D']

const s = {
  // page
  page: { padding: 24, minHeight: '100%' },
  pageHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 },
  subtitle: { fontSize: 13, color: '#9ca3af', marginTop: 4 },
  exitBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', borderRadius: 8,
    border: '1px solid #fca5a5', background: '#fff',
    color: '#ef4444', fontSize: 13, fontWeight: 500,
    cursor: 'pointer',
  },

  // card
  card: {
    background: '#fff', borderRadius: 16,
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },

  // progress row
  progressRow: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '14px 24px',
    borderBottom: '1px solid #f3f4f6',
  },
  badge: {
    background: '#4f46e5', color: '#fff',
    fontSize: 12, fontWeight: 600,
    padding: '6px 14px', borderRadius: 999,
    whiteSpace: 'nowrap', flexShrink: 0,
  },
  barTrack: { flex: 1, height: 8, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' },
  barFill: { height: '100%', background: '#4f46e5', borderRadius: 999, transition: 'width 0.3s' },
  timer: { display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af', fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0 },

  // card body
  body: { display: 'flex' },

  // left column
  left: { flex: 1, padding: 24, minWidth: 0 },
  question: { fontSize: 16, fontWeight: 700, color: '#111827', lineHeight: 1.5, marginBottom: 20 },

  // option
  optionBase: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '13px 16px', borderRadius: 12,
    border: '2px solid #e5e7eb', background: '#fff',
    cursor: 'pointer', width: '100%', textAlign: 'left',
    marginBottom: 10, transition: 'all 0.15s',
  },
  optionSelected: { border: '2px solid #4f46e5', background: '#eef2ff' },
  radioBase: {
    width: 20, height: 20, borderRadius: '50%',
    border: '2px solid #d1d5db', background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'all 0.15s',
  },
  radioSelected: { border: '2px solid #4f46e5', background: '#4f46e5' },
  radioDot: { width: 8, height: 8, borderRadius: '50%', background: '#fff' },
  letterBase: { fontSize: 13, fontWeight: 700, color: '#9ca3af', width: 18, flexShrink: 0 },
  letterSelected: { color: '#4f46e5' },
  optionText: { fontSize: 14, color: '#374151', flex: 1 },
  optionTextSelected: { color: '#111827', fontWeight: 500 },

  // hint
  hint: {
    display: 'flex', alignItems: 'flex-start', gap: 12,
    padding: 16, borderRadius: 12, background: '#eef2ff',
    marginTop: 16,
  },
  hintIcon: {
    width: 36, height: 36, borderRadius: '50%', background: '#4f46e5',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  hintText: { fontSize: 13, color: '#4338ca', lineHeight: 1.6, paddingTop: 2 },

  // divider
  divider: { width: 1, background: '#f3f4f6', flexShrink: 0, alignSelf: 'stretch' },

  // right column (overview)
  right: { width: 200, flexShrink: 0, padding: '20px 16px' },
  overviewTitle: { fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 14 },
  circleRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
  circleBase: {
    width: 32, height: 32, borderRadius: '50%',
    fontSize: 12, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0, border: 'none',
    transition: 'transform 0.1s',
  },
  circleUnanswered: { background: '#f3f4f6', color: '#9ca3af' },
  circleCurrent: { background: '#4f46e5', color: '#fff' },
  circleAnswered: { background: '#22c55e', color: '#fff' },
  legend: { marginTop: 16, paddingTop: 12, borderTop: '1px solid #f3f4f6' },
  legendRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 },
  dot: { width: 10, height: 10, borderRadius: '50%', flexShrink: 0 },
  legendLabel: { fontSize: 12, color: '#6b7280' },

  // footer
  footer: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 24px', borderTop: '1px solid #f3f4f6',
  },
  prevBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '9px 18px', borderRadius: 8,
    border: '1px solid #d1d5db', background: '#fff',
    fontSize: 13, fontWeight: 500, color: '#6b7280', cursor: 'pointer',
  },
  prevBtnDisabled: { opacity: 0.4, cursor: 'not-allowed' },
  nextBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '9px 20px', borderRadius: 8,
    border: 'none', background: '#4f46e5',
    fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
  },
  nextBtnDisabled: { background: '#e5e7eb', color: '#9ca3af', cursor: 'not-allowed' },

  // quiz progress
  progressCard: {
    marginTop: 16, background: '#fff', borderRadius: 12,
    border: '1px solid #e5e7eb', padding: '16px 24px',
  },
  progressLabel: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progressText: { fontSize: 13, fontWeight: 600, color: '#374151' },
  progressCount: { fontSize: 13, color: '#9ca3af' },
}

function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function QuizPage({ darkMode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null))
  const [selected, setSelected] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = questions[currentIndex]

  useEffect(() => {
    if (finished) return
    const id = setInterval(() => setSeconds(sec => sec + 1), 1000)
    return () => clearInterval(id)
  }, [finished])

  useEffect(() => {
    setSelected(answers[currentIndex])
  }, [currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const saveAndGo = (nextFn) => {
    const updated = [...answers]
    updated[currentIndex] = selected
    setAnswers(updated)
    nextFn(updated)
  }

  const handleNext = () => saveAndGo(updated => {
    if (currentIndex < questions.length - 1) setCurrentIndex(i => i + 1)
    else setFinished(true)
  })

  const handlePrev = () => saveAndGo(() => setCurrentIndex(i => i - 1))

  const jumpTo = (idx) => saveAndGo(() => setCurrentIndex(idx))

  const answeredCount = answers.filter(a => a !== null).length
  const score = answers.filter((a, i) => a === questions[i].correctIndex).length
  const pct = Math.round(((currentIndex + 1) / questions.length) * 100)

  if (finished) {
    return (
      <ResultsPage
        score={score}
        total={questions.length}
        time={seconds}
        answers={answers}
        onRestart={() => {
          setCurrentIndex(0)
          setAnswers(new Array(questions.length).fill(null))
          setSelected(null)
          setSeconds(0)
          setFinished(false)
        }}
        darkMode={darkMode}
      />
    )
  }

  return (
    <div style={s.page}>
      {/* Page header */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.title}>Multiple Choice Quiz</h1>
          <p style={s.subtitle}>{current.topic}</p>
        </div>
        <button style={s.exitBtn} onClick={() => setFinished(true)}>
          <LogOut size={14} />
          Exit Quiz
        </button>
      </div>

      {/* Main card */}
      <div style={s.card}>

        {/* Progress row */}
        <div style={s.progressRow}>
          <span style={s.badge}>Question {currentIndex + 1} of {questions.length}</span>
          <div style={s.barTrack}>
            <div style={{ ...s.barFill, width: `${pct}%` }} />
          </div>
          <div style={s.timer}>
            <Clock size={14} />
            <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>{formatTime(seconds)}</span>
          </div>
        </div>

        {/* Body */}
        <div style={s.body}>

          {/* Left: question + options + hint */}
          <div style={s.left}>
            <p style={s.question}>{current.question}</p>

            {current.options.map((opt, idx) => {
              const isSel = selected === idx
              return (
                <button
                  key={LABELS[idx]}
                  style={{ ...s.optionBase, ...(isSel ? s.optionSelected : {}) }}
                  onClick={() => setSelected(idx)}
                  onMouseEnter={e => { if (!isSel) e.currentTarget.style.borderColor = '#c7d2fe' }}
                  onMouseLeave={e => { if (!isSel) e.currentTarget.style.borderColor = '#e5e7eb' }}
                >
                  <span style={{ ...s.radioBase, ...(isSel ? s.radioSelected : {}) }}>
                    {isSel && <span style={s.radioDot} />}
                  </span>
                  <span style={{ ...s.letterBase, ...(isSel ? s.letterSelected : {}) }}>
                    {LABELS[idx]}.
                  </span>
                  <span style={{ ...s.optionText, ...(isSel ? s.optionTextSelected : {}) }}>
                    {opt}
                  </span>
                </button>
              )
            })}

            {/* Hint */}
            <div style={s.hint}>
              <div style={s.hintIcon}>
                <Lightbulb size={15} color="#fff" />
              </div>
              <p style={s.hintText}>{current.hint}</p>
            </div>
          </div>

          {/* Divider */}
          <div style={s.divider} />

          {/* Right: overview */}
          <div style={s.right}>
            <p style={s.overviewTitle}>Question Overview</p>

            {questions.map((_, idx) => {
              const isAnswered = answers[idx] !== null
              const isCurrent = idx === currentIndex
              const circleStyle = isCurrent
                ? s.circleCurrent
                : isAnswered ? s.circleAnswered : s.circleUnanswered

              return (
                <div key={questions[idx].id} style={s.circleRow}>
                  <button
                    style={{ ...s.circleBase, ...circleStyle }}
                    onClick={() => jumpTo(idx)}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    {isAnswered && !isCurrent ? '✓' : idx + 1}
                  </button>
                  {isCurrent && <span style={{ fontSize: 11, color: '#4f46e5', fontWeight: 500 }}>Current</span>}
                </div>
              )
            })}

            {/* Legend */}
            <div style={s.legend}>
              <div style={s.legendRow}>
                <span style={{ ...s.dot, background: '#22c55e' }} />
                <span style={s.legendLabel}>Answered</span>
              </div>
              <div style={s.legendRow}>
                <span style={{ ...s.dot, background: '#4f46e5' }} />
                <span style={s.legendLabel}>Current</span>
              </div>
              <div style={s.legendRow}>
                <span style={{ ...s.dot, background: '#e5e7eb' }} />
                <span style={s.legendLabel}>Unanswered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div style={s.footer}>
          <button
            style={{ ...s.prevBtn, ...(currentIndex === 0 ? s.prevBtnDisabled : {}) }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={15} /> Previous
          </button>
          <button
            style={{ ...s.nextBtn, ...(selected === null ? s.nextBtnDisabled : {}) }}
            onClick={handleNext}
            disabled={selected === null}
          >
            {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Quiz Progress */}
      <div style={s.progressCard}>
        <div style={s.progressLabel}>
          <span style={s.progressText}>Quiz Progress</span>
          <span style={s.progressCount}>{answeredCount} / {questions.length} Questions</span>
        </div>
        <div style={s.barTrack}>
          <div style={{ ...s.barFill, width: `${(answeredCount / questions.length) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
