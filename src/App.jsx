import { useEffect, useState } from 'react'
import { getReadings, createReading, updateReading, deleteReading } from './api.js'
import ReadingForm from './components/ReadingForm.jsx'
import ReadingTable from './components/ReadingTable.jsx'

export default function App() {
  const [readings, setReadings] = useState([])
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  async function refresh() {
    try { setReadings(await getReadings()); setError('') }
    catch { setError('Could not load readings. Check the backend connection.') }
    finally { setLoading(false) }
  }
  useEffect(() => { refresh() }, [])
  async function save(form) {
    try {
      if (editing) await updateReading(editing.id, form)
      else await createReading(form)
      setEditing(null); await refresh()
    } catch { setError('Could not save reading. Please try again.') }
  }
  async function remove(id) {
    if (!window.confirm('Delete this reading?')) return
    try { await deleteReading(id); await refresh() }
    catch { setError('Could not delete reading. Please try again.') }
  }
  return <main className="app-shell">
    <header><p className="eyebrow">LABORATORY LOGBOOK</p><h1>Sensor Register</h1>
      <p className="subtitle">Manually record and manage laboratory readings.</p></header>
    {error && <p className="notice" role="alert">{error}</p>}
    <ReadingForm initialValue={editing} onSave={save} onCancel={() => setEditing(null)} />
    <section className="panel"><div className="section-heading"><h2>Saved readings</h2>
      <span>{readings.length} records</span></div>
      {loading ? <p>Loading readings…</p> : <ReadingTable readings={readings} onEdit={setEditing} onDelete={remove} />}
    </section>
    <footer>Sensor Register · Manual data entry</footer>
  </main>
}
