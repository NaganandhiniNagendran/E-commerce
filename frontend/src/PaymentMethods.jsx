import React, { useState, useEffect } from 'react'
import { getPayments, addPayment, deletePayment } from './api'

export default function PaymentMethods() {
  const [cards, setCards] = useState([])
  const [form, setForm] = useState({ name: '', number: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getPayments().then(data => { if (mounted) setCards(data) }).catch(() => {}).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  async function add() {
    const saved = await addPayment(form)
    setCards(prev => [...prev, saved])
    setForm({ name: '', number: '' })
  }

  async function remove(id) {
    await deletePayment(id)
    setCards(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="panel" style={{ maxWidth: 980 }}>
        <div className="panel-header">
          <div>
            <p>Payments</p>
            <h3>Payment Methods</h3>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {cards.length === 0 ? <p>No saved cards.</p> : (
            <div style={{ display: 'grid', gap: 10 }}>
              {cards.map(c => (
                <div key={c.id} style={{ padding: 12, border: '1px solid #eef2f7', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{c.name}</strong>
                    <div style={{ color: '#6b7280' }}>•••• •••• •••• {String(c.number).slice(-4)}</div>
                  </div>
                  <div>
                    <button onClick={() => remove(c.id)} className="ud-add-cart-btn ud-added">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <h4>Add card</h4>
            <div style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
              <input placeholder="Name on card" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input placeholder="Card number" value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} />
              <button onClick={add} className="secondary-btn">Save card</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
