import React, { useEffect, useState } from 'react'
import { getOrders } from './api'

export default function UserOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getOrders().then(data => { if (mounted) setOrders(data) }).catch(() => {}).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <div className="panel table-panel" style={{ maxWidth: 980 }}>
        <div className="panel-header">
          <div>
            <p>Orders</p>
            <h3>My Orders</h3>
          </div>
        </div>

        <div style={{ padding: 10 }}>
          {loading ? <p>Loading…</p> : (
            orders.length === 0 ? <p>No orders yet.</p> : (
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.items?.length || 0}</td>
                      <td>{o.total}</td>
                      <td><span className={`status ${String(o.status || '').toLowerCase()}`}>{o.status || 'New'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </div>
  )
}
