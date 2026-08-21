import React, { useState } from 'react'

export default function Support() {
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e) {
    e.preventDefault()
    // In this demo we just store the message locally
    const list = JSON.parse(localStorage.getItem('support') || '[]')
    localStorage.setItem('support', JSON.stringify([...list, { id: Date.now(), text: msg }]))
    setSent(true)
    setMsg('')
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="panel" style={{ maxWidth: 820 }}>
        <div className="panel-header">
          <div>
            <p>Support</p>
            <h3>Contact Support</h3>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {sent && <div className="error" style={{ background: 'rgba(34,197,94,0.08)', color: '#166534' }}>Message sent — we will contact you soon.</div>}

          <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
            <textarea placeholder="Describe your issue" required value={msg} onChange={e => setMsg(e.target.value)} rows={6} />
            <div>
              <button className="secondary-btn">Send message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
