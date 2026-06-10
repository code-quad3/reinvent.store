import { useState } from 'react'
import './App.css'
import logo from "./assets/reinvent-logo.png";
import IMG_CHEST from "./assets/Screenshot_1.png"
import IMG_WAIST from "./assets/Screenshot_2.png"
import IMG_HEIGHT from "./assets/Screenshot_3.png"


// ─── Data ────────────────────────────────────────────────────────────────────

const BRANCHES = [
  'Sri Chaitanya Techno School, Hyd',
  '⁠Sri Chaitanya Techno School, Khammam',
]

const GENDERS = ['Boy', 'Girl']

const GRADES = ["Nur","Lkg","Ukg"]

const SIZE_DATA = [
  { size: 'XS',  label: 'Extra Small', heightMin: 100, heightMax: 114, chestMin: 54,  chestMax: 62,  shirt: '20"', trouser: '18"', waist: '22"' },
  { size: 'S',   label: 'Small',       heightMin: 115, heightMax: 124, chestMin: 63,  chestMax: 68,  shirt: '22"', trouser: '20"', waist: '24"' },
  { size: 'M',   label: 'Medium',      heightMin: 125, heightMax: 134, chestMin: 69,  chestMax: 74,  shirt: '24"', trouser: '22"', waist: '26"' },
  { size: 'L',   label: 'Large',       heightMin: 135, heightMax: 144, chestMin: 75,  chestMax: 80,  shirt: '26"', trouser: '24"', waist: '28"' },
  { size: 'XL',  label: 'Extra Large', heightMin: 145, heightMax: 154, chestMin: 81,  chestMax: 88,  shirt: '28"', trouser: '26"', waist: '30"' },
  { size: 'XXL', label: 'XX-Large',    heightMin: 155, heightMax: 170, chestMin: 89,  chestMax: 100, shirt: '30"', trouser: '28"', waist: '32"' },
]

function getSize(height, chest) {
  for (const row of SIZE_DATA) {
    if (height >= row.heightMin && height <= row.heightMax &&
        chest  >= row.chestMin  && chest  <= row.chestMax) return row.size
  }
  for (const row of SIZE_DATA) {
    if (height >= row.heightMin && height <= row.heightMax) return row.size
  }
  if (height < 100) return 'XS'
  return 'XXL'
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Header() {
  return (
    <div className="ru-header">
      <div className="ru-logo-row">
        <img
          src={logo}
          alt="Reinvent Uniforms"
          className="ru-logo-img"
        />
      </div>

      <h1 className="ru-title">
        Uniform Measurement
        <br />
        Calculator
      </h1>
    </div>
  )
}

function StepBar({ step }) {
  const labels = ['School', 'Measure', 'Your Size']
  return (
    <div className="ru-stepbar">
      {labels.map((label, i) => {
        const n = i + 1
        const done   = n < step
        const active = n === step
        return (
          <div key={n} className={`ru-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
            {i > 0 && <div className={`ru-step-line ${done ? 'done' : ''}`} />}
            <div className="ru-step-circle">{done ? '✓' : n}</div>
            <span className="ru-step-label">{label}</span>
          </div>
        )
      })}
    </div>
  )
}

// Screen 1
function Screen1({ onNext }) {
  const [branch, setBranch] = useState('')
  const [gender, setGender] = useState('')
  const [grade,  setGrade]  = useState('')
  const [error,  setError]  = useState(false)

  function handleNext() {
    if (!branch || !gender || !grade) { setError(true); return }
    setError(false)
    onNext({ branch, gender, grade })
  }

  return (
    <div className="ru-card">
      <h2 className="ru-card-heading">Select your details</h2>

      <div className="ru-field">
        <label htmlFor="branch">School  Name </label>
        <div className="ru-select-wrap">
          <select id="branch" value={branch} onChange={e => setBranch(e.target.value)}>
            <option value="">Select Name</option>
            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="ru-field">
        <label>Student Gender</label>
        <div className="ru-gender-row">
          {GENDERS.map(g => (
            <button
              key={g}
              type="button"
              className={`ru-gender-btn ${gender === g ? 'selected' : ''}`}
              onClick={() => setGender(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="ru-field">
        <label htmlFor="grade">Student Grade</label>
        <div className="ru-select-wrap">
          <select id="grade" value={grade} onChange={e => setGrade(e.target.value)}>
            <option value="">Select grade</option>
            {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {error && <p className="ru-error">Please fill in all fields to continue.</p>}

      <button className="ru-btn-primary" onClick={handleNext}>Continue →</button>
    </div>
  )
}

// Screen 2
function Screen2({ selection, onNext, onBack }) {
  const [height, setHeight] = useState('')
  const [chest,  setChest]  = useState('')
  const [error,  setError]  = useState(false)

  function handleNext() {
    if (!height || !chest) { setError(true); return }
    setError(false)
    onNext({ height: parseFloat(height), chest: parseFloat(chest) })
  }

  return (
    <div className="ru-card">
      <button className="ru-btn-back" onClick={onBack}>← Back</button>

      <h2 className="ru-card-heading">Take measurements</h2>
      <p className="ru-card-sub">
        {selection.gender} · {selection.grade} · {selection.branch.split('–')[1]?.trim() ?? selection.branch}
      </p>

      <div className="ru-guide-section">
        <p className="ru-guide-title">How to measure</p>
        <div className="ru-photo-row">
          <div className="ru-photo-box">
            <img src={IMG_CHEST} alt="Chest measurement — tape around fullest part of chest" className="ru-photo-img ru-photo-portrait" />
            <p className="ru-photo-label">Chest</p>
            <p className="ru-photo-hint">Tape around fullest part</p>
          </div>
          <div className="ru-photo-box">
            <img src={IMG_WAIST} alt="Waist measurement — tape around natural waist" className="ru-photo-img ru-photo-portrait" />
            <p className="ru-photo-label">Waist</p>
            <p className="ru-photo-hint">Natural waistline, side view</p>
          </div>
          <div className="ru-photo-box">
            <img src={IMG_HEIGHT} alt="Height measurement — standing straight against height chart" className="ru-photo-img ru-photo-tall" />
            <p className="ru-photo-label">Height</p>
            <p className="ru-photo-hint">Standing straight, full length</p>
          </div>
        </div>
      </div>

      <div className="ru-field">
        <label htmlFor="height">Height (cm)</label>
        <input
          id="height"
          type="number"
          placeholder="e.g. 142"
          min="50" max="220"
          value={height}
          onChange={e => setHeight(e.target.value)}
        />
      </div>

      <div className="ru-field">
        <label htmlFor="chest">Chest (cm)</label>
        <input
          id="chest"
          type="number"
          placeholder="e.g. 72"
          min="40" max="140"
          value={chest}
          onChange={e => setChest(e.target.value)}
        />
      </div>

      {error && <p className="ru-error">Please enter both height and chest measurements.</p>}

      <button className="ru-btn-primary" onClick={handleNext}>Find My Size →</button>
    </div>
  )
}

// Screen 3
function Screen3({ measurements, onBack, onRestart }) {
  const { height, chest } = measurements
  const size    = getSize(height, chest)
  const matched = SIZE_DATA.find(r => r.size === size)

  return (
    <div className="ru-card ru-card-result">
      <button className="ru-btn-back" onClick={onBack}>← Back</button>

      <div className="ru-result-banner">
        <p className="ru-result-tag">Your size</p>
        <div className="ru-result-size">{size}</div>
        <p className="ru-result-sublabel">{matched?.label}</p>
        <p className="ru-result-meas">Height {height} cm · Chest {chest} cm</p>
      </div>

      <div className="ru-specs-grid">
        <div className="ru-spec-box">
          <span className="ru-spec-label">Shirt</span>
          <span className="ru-spec-val">{matched?.shirt}</span>
        </div>
        <div className="ru-spec-box">
          <span className="ru-spec-label">Trouser</span>
          <span className="ru-spec-val">{matched?.trouser}</span>
        </div>
        <div className="ru-spec-box">
          <span className="ru-spec-label">Waist</span>
          <span className="ru-spec-val">{matched?.waist}</span>
        </div>
      </div>

      <h3 className="ru-table-heading">Full size chart</h3>
      <div className="ru-table-wrap">
        <table className="ru-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Height</th>
              <th>Chest</th>
              <th>Shirt</th>
              <th>Trouser</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_DATA.map(row => (
              <tr key={row.size} className={row.size === size ? 'ru-row-match' : ''}>
                <td><strong>{row.size}</strong></td>
                <td>{row.heightMin}–{row.heightMax}</td>
                <td>{row.chestMin}–{row.chestMax}</td>
                <td>{row.shirt}</td>
                <td>{row.trouser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="ru-btn-secondary" onClick={onRestart}>↺ Measure again</button>
    </div>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [step,         setStep]         = useState(1)
  const [selection,    setSelection]    = useState(null)
  const [measurements, setMeasurements] = useState(null)

  function handleScreen1(data) { setSelection(data);    setStep(2) }
  function handleScreen2(data) { setMeasurements(data); setStep(3) }
  function restart()           { setStep(1); setSelection(null); setMeasurements(null) }

  return (
    <div className="ru-app">
      <Header />
      <StepBar step={step} />

      {step === 1 && <Screen1 onNext={handleScreen1} />}
      {step === 2 && (
        <Screen2
          selection={selection}
          onNext={handleScreen2}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Screen3
          measurements={measurements}
          onBack={() => setStep(2)}
          onRestart={restart}
        />
      )}

      <p className="ru-footer">© Reinvent Uniforms · Sri Chaitanya</p>
    </div>
  )
}