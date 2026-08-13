import React, { useState, useEffect } from 'react'
import { getAddresses, addAddress, deleteAddress } from './api'

export default function Addresses() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ label: '', line1: '', city: '', postal: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getAddresses().then(data => { if (mounted) setList(data) }).catch(() => {}).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  async function add() {
    const saved = await addAddress(form)
    setList(prev => [...prev, saved])
    setForm({ label: '', line1: '', city: '', postal: '' })
  }

  async function remove(id) {
    await deleteAddress(id)
    setList(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="panel" style={{ maxWidth: 980 }}>
        <div className="panel-header">
          <div>
            <p>Addresses</p>
            <h3>Shipping Addresses</h3>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {list.length === 0 ? <p>No saved addresses.</p> : (
            <div style={{ display: 'grid', gap: 10 }}>
              {list.map(a => (
                <div key={a.id} style={{ padding: 12, border: '1px solid #eef2f7', borderRadius: 10 }}>
                  <strong>{a.label}</strong>
                  <div>{a.line1}</div>
                  <div>{a.city} — {a.postal}</div>
                  <button style={{ marginTop: 8 }} onClick={() => remove(a.id)}>Remove</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <h4>Add address</h4>
            <div style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
              <input placeholder="Label (Home, Work)" value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
              <input placeholder="Address line 1" value={form.line1} onChange={e => setForm(f => ({ ...f, line1: e.target.value }))} />
              <input placeholder="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
              <input placeholder="Postal code" value={form.postal} onChange={e => setForm(f => ({ ...f, postal: e.target.value }))} />
              <button onClick={add} className="secondary-btn">Save address</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
