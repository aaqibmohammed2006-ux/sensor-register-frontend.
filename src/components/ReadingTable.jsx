export default function ReadingTable({ readings, onEdit, onDelete }) {
  if (!readings.length) return <div className="empty-state">
    <p>No readings saved yet.</p><span>Add your first laboratory reading above.</span>
  </div>

  return <div className="table-wrap"><table>
    <thead><tr><th>Sensor name</th><th>Reading</th><th>Unit</th><th>Date</th><th>Actions</th></tr></thead>
    <tbody>{readings.map((reading) => <tr key={reading.id}>
      <td data-label="Sensor name">{reading.sensorName}</td>
      <td data-label="Reading">{reading.readingValue}</td>
      <td data-label="Unit">{reading.unit}</td>
      <td data-label="Date">{reading.readingDate}</td>
      <td data-label="Actions"><div className="actions">
        <button className="button small secondary" onClick={() => onEdit(reading)}>Edit</button>
        <button className="button small danger" onClick={() => onDelete(reading.id)}>Delete</button>
      </div></td>
    </tr>)}</tbody>
  </table></div>
}
