import React from 'react'

function Star({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill={filled ? '#f59e0b' : '#e6e6e6'}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function Reviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
  const sample = reviews.length === 0 ? [
    { id: 1, product: 'Boat Rockerz 450', rating: 4.5, text: 'Great sound and build quality.' },
    { id: 2, product: 'Fastrack Analog Watch', rating: 4.0, text: 'Stylish and comfortable.' }
  ] : reviews

  return (
    <div style={{ padding: 20 }}>
      <div className="panel" style={{ maxWidth: 980 }}>
        <div className="panel-header">
          <div>
            <p>Reviews</p>
            <h3>My Reviews</h3>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {sample.map(r => (
            <div key={r.id} style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{r.product}</strong>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <Star filled />
                  <span style={{ marginLeft: 6 }}>{r.rating}</span>
                </div>
              </div>
              <div style={{ marginTop: 8, color: '#6b7280' }}>{r.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
