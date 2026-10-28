import { useEffect, useState } from 'react'

const emptyForm = { sensorName: '', readingValue: '', unit: '', readingDate: '' }

export default function ReadingForm({ initialValue, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm(initialValue ? {
      sensorName: initialValue.sensorName,
      readingValue: String(initialValue.readingValue),
      unit: initialValue.unit,
      readingDate: initialValue.readingDate,
    } : emptyForm)
  }, [initialValue])

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function submit(event) {
    event.preventDefault()
    setSaving(true)
    try {
      await onSave({ ...form, readingValue: Number(form.readingValue) })
      if (!initialValue) setForm(emptyForm)
    } finally { setSaving(false) }
  }

  return <section className="panel">
    <div className="section-heading"><h2>{initialValue ? 'Edit reading' : 'Add a reading'}</h2>
      {initialValue && <button className="button secondary" type="button" onClick={onCancel}>Cancel</button>}
    </div>
    <form className="reading-form" onSubmit={submit}>
      <label>Sensor name<input name="sensorName" value={form.sensorName} onChange={change}
        placeholder="e.g. Temperature Sensor" required maxLength="100" /></label>
      <label>Reading value<input name="readingValue" type="number" step="any" value={form.readingValue}
        onChange={change} placeholder="e.g. 24.6" required /></label>
      <label>Unit<input name="unit" value={form.unit} onChange={change}
        placeholder="e.g. °C, V, bar" required maxLength="30" /></label>
      <label>Date<input name="readingDate" type="date" value={form.readingDate}
        onChange={change} required /></label>
      <button className="button" disabled={saving}>{saving ? 'Saving…' : initialValue ? 'Save changes' : 'Add reading'}</button>
    </form>
  </section>
}
