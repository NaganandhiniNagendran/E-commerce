import React, { useState, useEffect } from 'react'

export default function Wishlist() {
  const [list, setList] = useState([])

  useEffect(() => {
    const w = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setList(w)
  }, [])

  function remove(id) {
    const next = list.filter(i => i.id !== id)
    setList(next)
    localStorage.setItem('wishlist', JSON.stringify(next))
  }

  function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(c => c.id === item.id)
    const next = existing
      ? cart.map(c => c.id === item.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c)
      : [...cart, { ...item, quantity: 1 }]
    localStorage.setItem('cart', JSON.stringify(next))
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="panel" style={{ maxWidth: 980 }}>
        <div className="panel-header">
          <div>
            <p>Wishlist</p>
            <h3>Wishlist Items</h3>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {list.length === 0 ? (
            <p>No wishlist items.</p>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {list.map(it => (
                <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10, border: '1px solid #eef2f7' }}>
                  <img src={it.img} alt={it.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <strong>{it.name}</strong>
                    <div style={{ color: '#6b7280' }}>{it.price}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className={`ud-add-cart-btn`} onClick={() => { addToCart({ id: it.id, name: it.name, price: it.price }); }}>Add to Cart</button>
                    <button className="ud-add-cart-btn ud-added" onClick={() => remove(it.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
