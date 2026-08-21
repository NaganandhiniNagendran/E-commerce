import React, { useState, useEffect } from 'react'
import { createOrder } from './api'

export default function Cart() {
  const [cart, setCart] = useState([])
  const [checkoutError, setCheckoutError] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(c)
  }, [])

  function remove(id) {
    const next = cart.filter(i => i.id !== id)
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const subtotal = cart.reduce((s, it) => {
    const price = Number(String(it.price).replace(/[^0-9.-]+/g, ''))
    return s + (price * (it.quantity || 1))
  }, 0)

  async function checkout() {
    if (cart.length === 0) return
    setCheckoutError(null)
    setCheckoutLoading(true)
    const order = {
      items: cart.map(c => `${c.name} x${c.quantity || 1}`),
      total: `₹${subtotal.toFixed(2)}`,
      status: 'New'
    }
    try {
      const created = await createOrder(order)
      setCart([])
      localStorage.setItem('cart', JSON.stringify([]))
      alert(`Order placed: ${created.id}`)
    } catch (e) {
      const message = e.response?.data?.message || e.response?.statusText || e.message || 'Checkout failed'
      console.error('Checkout error', e)
      setCheckoutError(`Checkout failed: ${message}`)
    } finally {
      setCheckoutLoading(false)
    }
  }

  // legacy: no external payment provider configured

  return (
    <div style={{ padding: 20 }}>
      <div className="panel" style={{ maxWidth: 980 }}>
        <div className="panel-header">
          <div>
            <p>Cart</p>
            <h3>My Cart</h3>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <div style={{ display: 'grid', gap: 12 }}>
                {cart.map(it => (
                  <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, border: '1px solid #eef2f7' }}>
                    <div style={{ width: 70, height: 70, background: '#f3f4f6', borderRadius: 8 }} />
                    <div style={{ flex: 1 }}>
                      <strong>{it.name}</strong>
                      <div style={{ color: '#6b7280' }}>{it.price}</div>
                      <div style={{ color: '#6b7280', fontSize: 13 }}>Quantity: {it.quantity || 1}</div>
                    </div>
                    <div>
                      <button className="ud-add-cart-btn ud-added" onClick={() => remove(it.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ color: '#6b7280' }}>Subtotal</div>
                  <strong>{subtotal ? `₹${subtotal.toFixed(2)}` : '₹0.00'}</strong>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button className="secondary-btn" onClick={checkout} disabled={checkoutLoading}>
                    {checkoutLoading ? 'Processing...' : 'Checkout'}
                  </button>
                </div>
              </div>
              {checkoutError && <div style={{ marginTop: 14, color: '#b91c1c' }}>{checkoutError}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
