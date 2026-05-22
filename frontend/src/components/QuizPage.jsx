import { useState, useEffect } from 'react'
import { Clock, LogOut, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
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
  optionCorrect:  { border: '2px solid #22c55e', background: '#f0fdf4', cursor: 'default' },
  optionWrong:    { border: '2px solid #ef4444', background: '#fef2f2', cursor: 'default' },
  optionMuted:    { border: '2px solid #f3f4f6', background: '#fafafa', opacity: 0.6, cursor: 'default' },
  radioCorrect:   { border: '2px solid #22c55e', background: '#22c55e' },
  radioWrong:     { border: '2px solid #ef4444', background: '#ef4444' },
  letterCorrect:  { color: '#16a34a' },
  letterWrong:    { color: '#ef4444' },
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
  submitBtn: {
    padding: '9px 20px', borderRadius: 8,
    border: 'none', background: '#4f46e5',
    fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
  },
  submitBtnDisabled: { background: '#e5e7eb', color: '#9ca3af', cursor: 'not-allowed' },

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
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [submitted, setSubmitted] = useState([])
  // results keyed by question id: { correct, correctIndex, hint }
  const [results, setResults] = useState({})
  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hints, setHints] = useState({})

  // Fetch questions from API on mount
  useEffect(() => {
    fetch('/api/questions')
      .then(r => r.json())
      .then(data => {
        setQuestions(data.questions)
        setAnswers(new Array(data.questions.length).fill(null))
        setSubmitted(new Array(data.questions.length).fill(false))
        setLoading(false)
      })
      .catch(() => setFetchError(true))
  }, [])

  const current = questions[currentIndex]
  const isSubmitted = submitted[currentIndex]
  const currentResult = current ? results[current.id] : null

  useEffect(() => {
    if (!finished) {
      const id = setInterval(() => setSeconds(sec => sec + 1), 1000)
      return () => clearInterval(id)
    }
  }, [finished])

  useEffect(() => {
    setSelected(answers[currentIndex] ?? null)
    setShowHint(false)
  }, [currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleShowHint = async () => {
    if (showHint) { setShowHint(false); return }
    if (hints[current.id]) { setShowHint(true); return }
    const hintText = currentResult?.hint
    if (hintText) { setHints(prev => ({ ...prev, [current.id]: hintText })); setShowHint(true); return }
    try {
      const res = await fetch(`/api/questions/${current.id}/hint`)
      const data = await res.json()
      setHints(prev => ({ ...prev, [current.id]: data.hint }))
      setShowHint(true)
    } catch { /* silently ignore */ }
  }

  const handleSubmit = async () => {
    if (selected === null || isSubmitted || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: current.id, selectedIndex: selected }),
      })
      const data = await res.json()
      const updatedAnswers = [...answers]
      updatedAnswers[currentIndex] = selected
      setAnswers(updatedAnswers)
      const updatedSubmitted = [...submitted]
      updatedSubmitted[currentIndex] = true
      setSubmitted(updatedSubmitted)
      setResults(prev => ({ ...prev, [current.id]: { ...data, selectedIndex: selected } }))
      setShowHint(true)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(i => i + 1)
    else setFinished(true)
  }

  const handlePrev = () => setCurrentIndex(i => i - 1)
  const jumpTo = (idx) => setCurrentIndex(idx)

  const answeredCount = submitted.filter(Boolean).length
  const score = Object.values(results).filter(r => r.correct).length
  const pct = questions.length ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#6b7280', fontSize: 15 }}>
        Loading questions...
      </div>
    )
  }

  if (fetchError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ef4444', fontSize: 15 }}>
        Failed to load questions. Is the backend running on port 3001?
      </div>
    )
  }

  if (finished) {
    return (
      <ResultsPage
        score={score}
        total={questions.length}
        time={seconds}
        questions={questions}
        results={results}
        onRestart={() => {
          setCurrentIndex(0)
          setAnswers(new Array(questions.length).fill(null))
          setSubmitted(new Array(questions.length).fill(false))
          setResults({})
          setHints({})
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
              const isCorrect = isSubmitted && idx === currentResult?.correctIndex
              const isWrong = isSubmitted && isSel && idx !== currentResult?.correctIndex

              let optStyle = s.optionBase
              let radioStyle = s.radioBase
              let letterStyle = s.letterBase

              if (isSubmitted) {
                if (isCorrect)     { optStyle = { ...s.optionBase, ...s.optionCorrect }; radioStyle = { ...s.radioBase, ...s.radioCorrect }; letterStyle = { ...s.letterBase, ...s.letterCorrect } }
                else if (isWrong)  { optStyle = { ...s.optionBase, ...s.optionWrong };   radioStyle = { ...s.radioBase, ...s.radioWrong };   letterStyle = { ...s.letterBase, ...s.letterWrong } }
                else               { optStyle = { ...s.optionBase, ...s.optionMuted } }
              } else if (isSel) {
                optStyle = { ...s.optionBase, ...s.optionSelected }
                radioStyle = { ...s.radioBase, ...s.radioSelected }
                letterStyle = { ...s.letterBase, ...s.letterSelected }
              }

              return (
                <button
                  key={LABELS[idx]}
                  style={optStyle}
                  onClick={() => { if (!isSubmitted) setSelected(idx) }}
                  onMouseEnter={e => { if (!isSubmitted && !isSel) e.currentTarget.style.borderColor = '#c7d2fe' }}
                  onMouseLeave={e => { if (!isSubmitted && !isSel) e.currentTarget.style.borderColor = '#e5e7eb' }}
                >
                  <span style={radioStyle}>
                    {(isSel && !isSubmitted) && <span style={s.radioDot} />}
                    {isSubmitted && isCorrect && <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>✓</span>}
                    {isSubmitted && isWrong   && <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>✗</span>}
                  </span>
                  <span style={letterStyle}>{LABELS[idx]}.</span>
                  <span style={{ ...s.optionText, ...(isSel && !isSubmitted ? s.optionTextSelected : {}) }}>{opt}</span>
                </button>
              )
            })}

            {/* Hint toggle */}
            <button
              onClick={handleShowHint}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                marginTop: 16, padding: '7px 14px', borderRadius: 8,
                border: '1px solid #c7d2fe', background: showHint ? '#eef2ff' : '#fff',
                color: '#4f46e5', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}
            >
              <Lightbulb size={14} />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>

            {showHint && (
              <div style={s.hint}>
                <div style={s.hintIcon}>
                  <Lightbulb size={15} color="#fff" />
                </div>
                <p style={s.hintText}>{hints[current.id] ?? currentResult?.hint}</p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={s.divider} />

          {/* Right: overview */}
          <div style={s.right}>
            <p style={s.overviewTitle}>Question Overview</p>

            {questions.map((q, idx) => {
              const qResult = results[q.id]
              const isCorrect = qResult?.correct === true
              const isWrong = qResult?.correct === false
              const isCurrent = idx === currentIndex

              let circleStyle = s.circleUnanswered
              if (isCurrent)      circleStyle = s.circleCurrent
              else if (isCorrect) circleStyle = s.circleAnswered
              else if (isWrong)   circleStyle = { background: '#ef4444', color: '#fff' }

              return (
                <div key={q.id} style={s.circleRow}>
                  <button
                    style={{ ...s.circleBase, ...circleStyle }}
                    onClick={() => jumpTo(idx)}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    {(() => {
                      if (isCorrect && !isCurrent) return '✓'
                      if (isWrong && !isCurrent) return '✗'
                      return String(idx + 1)
                    })()}
                  </button>
                  {isCurrent && <span style={{ fontSize: 11, color: '#4f46e5', fontWeight: 500 }}>Current</span>}
                </div>
              )
            })}

            {/* Legend */}
            <div style={s.legend}>
              <div style={s.legendRow}>
                <span style={{ ...s.dot, background: '#22c55e' }} />
                <span style={s.legendLabel}>Correct</span>
              </div>
              <div style={s.legendRow}>
                <span style={{ ...s.dot, background: '#ef4444' }} />
                <span style={s.legendLabel}>Incorrect</span>
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

          <div style={{ display: 'flex', gap: 10 }}>
            {!isSubmitted && (
              <button
                style={{ ...s.submitBtn, ...(selected === null ? s.submitBtnDisabled : {}) }}
                onClick={handleSubmit}
                disabled={selected === null}
              >
                {submitting ? 'Submitting...' : 'Submit Answer'}
              </button>
            )}
            <button
              style={{ ...s.nextBtn, ...(isSubmitted ? {} : s.nextBtnDisabled) }}
              onClick={handleNext}
              disabled={!isSubmitted}
            >
              {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
              <ChevronRight size={15} />
            </button>
          </div>
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
