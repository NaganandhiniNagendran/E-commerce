import React, { useState, useEffect } from 'react'

export default function Notifications() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const n = JSON.parse(localStorage.getItem('notifications') || '[]')
    setNotes(n.length ? n : [
      { id: 1, text: 'Your order #ORD12345 has been delivered.' },
      { id: 2, text: 'New offers available in your area.' }
    ])
  }, [])

  function clear() {
    setNotes([])
    localStorage.setItem('notifications', JSON.stringify([]))
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="panel" style={{ maxWidth: 980 }}>
        <div className="panel-header">
          <div>
            <p>Notifications</p>
            <h3>Activity</h3>
          </div>
          <button className="ud-view-link" onClick={clear}>Clear</button>
        </div>

        <div style={{ padding: 16 }}>
          {notes.length === 0 ? <p>No notifications.</p> : (
            <div style={{ display: 'grid', gap: 8 }}>
              {notes.map(n => (
                <div key={n.id} style={{ padding: 12, borderRadius: 10, border: '1px solid #eef2f7' }}>{n.text}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
