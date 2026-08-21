import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function OrdersPage() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const orderSummary = [
    { label: 'This week', value: '1,284', tone: 'green' },
    { label: 'Pending', value: '184', tone: 'blue' },
    { label: 'Refunds', value: '19', tone: 'orange' },
    { label: 'Avg. value', value: '$268', tone: 'purple' }
  ]

  const orders = [
    { id: '#1042', customer: 'Ava Thompson', item: 'Wireless Headset', date: '12 Aug', total: '$249.00', status: 'Paid' },
    { id: '#1043', customer: 'Noah Lee', item: 'Smart Watch', date: '11 Aug', total: '$499.00', status: 'Shipped' },
    { id: '#1044', customer: 'Emma Reed', item: 'Noise Cancelling Earbuds', date: '11 Aug', total: '$179.00', status: 'Processing' },
    { id: '#1045', customer: 'Lucas Brown', item: 'Gaming Chair', date: '10 Aug', total: '$320.00', status: 'Refund' },
    { id: '#1046', customer: 'Sofia Patel', item: 'Laptop Stand', date: '09 Aug', total: '$89.00', status: 'Paid' }
  ]

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">E</div>
          <div>
            <strong>EastCart</strong>
            <span>Commerce Hub</span>
          </div>
        </div>

        <nav className="nav-menu">
          <NavLink className="nav-item" to="/dashboard">Overview</NavLink>
          <NavLink className="nav-item" to="/dashboard/orders">Orders</NavLink>
          <NavLink className="nav-item" to="/dashboard/products">Products</NavLink>
          <a className="nav-item" href="#">Customers</a>
          <a className="nav-item" href="#">Analytics</a>
          <a className="nav-item" href="#">Settings</a>
        </nav>

        <div className="sidebar-card">
          <span className="mini-label">Order health</span>
          <strong>92% on time</strong>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Orders</p>
            <h2>Order management</h2>
          </div>

          <div className="user-box">
            <div className="avatar">{(user?.name || 'A').charAt(0).toUpperCase()}</div>
            <div className="user-meta">
              <strong>{user?.name || 'Admin User'}</strong>
              <span>{user?.role || 'Owner'}</span>
            </div>
            <button onClick={logout}>Logout</button>
          </div>
        </header>

        <section className="stats-grid">
          {orderSummary.map((item) => (
            <div key={item.label} className="stat-card">
              <div className="stat-header">
                <span>{item.label}</span>
                <span className={`delta ${item.tone}`}>+8.4%</span>
              </div>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="panel table-panel order-table-panel">
          <div className="panel-header">
            <div>
              <p>Operations</p>
              <h3>Recent orders</h3>
            </div>
            <Link to="/dashboard" className="secondary-btn link-btn">Back</Link>
          </div>

          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.item}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}
