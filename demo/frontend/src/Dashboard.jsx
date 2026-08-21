import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { getProtected, getDashboardStats, getRecentOrders, getTopProducts } from './api'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [msg, setMsg] = useState('checking...')
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    let mounted = true
    getProtected()
      .then(r => { if (mounted) setMsg(r) })
      .catch(() => { if (mounted) setMsg('not authorized') })
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    let mounted = true
    Promise.all([
      getDashboardStats(),
      getRecentOrders(),
      getTopProducts()
    ]).then(([statsData, ordersData, productsData]) => {
      if (mounted) {
        setStats(statsData)
        setRecentOrders(ordersData)
        setTopProducts(productsData)
      }
    }).catch(err => {
      console.error('Failed to fetch dashboard data:', err)
    })
    return () => { mounted = false }
  }, [])

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  // Fallback data if backend data is not available
  const defaultStats = [
    { label: 'Total Revenue', value: '$84.2K', change: '+12.4%', tone: 'green' },
    { label: 'Active Orders', value: '1,248', change: '+8.1%', tone: 'blue' },
    { label: 'Customers', value: '6,930', change: '+3.2%', tone: 'purple' },
    { label: 'Conversion', value: '4.8%', change: '+1.7%', tone: 'orange' }
  ]

  const displayStats = stats ? [
    { label: 'Total Revenue', value: stats.totalRevenue, change: stats.revenueChange, tone: 'green' },
    { label: 'Active Orders', value: stats.activeOrders, change: stats.ordersChange, tone: 'blue' },
    { label: 'Customers', value: stats.customers, change: stats.customersChange, tone: 'purple' },
    { label: 'Conversion', value: stats.conversion, change: stats.conversionChange, tone: 'orange' }
  ] : defaultStats

  const displayOrders = recentOrders.length > 0 ? recentOrders : [
    { id: '#1042', customer: 'Ava Thompson', item: 'Wireless Headset', total: '$249.00', status: 'Paid' },
    { id: '#1043', customer: 'Noah Lee', item: 'Smart Watch', total: '$499.00', status: 'Shipped' },
    { id: '#1044', customer: 'Emma Reed', item: 'Noise Cancelling Earbuds', total: '$179.00', status: 'Processing' },
    { id: '#1045', customer: 'Lucas Brown', item: 'Gaming Chair', total: '$320.00', status: 'Refund' }
  ]

  const displayProducts = topProducts.length > 0 ? topProducts : [
    { name: 'Aero Pro Headset', sold: 326, stock: '48 left', price: '$189' },
    { name: 'Nova Smartwatch', sold: 284, stock: '22 left', price: '$299' },
    { name: 'Echo Speaker', sold: 241, stock: '63 left', price: '$129' },
    { name: 'Arc Gaming Chair', sold: 192, stock: '17 left', price: '$349' }
  ]

  const quickActions = ['Add product', 'Create promo', 'Sync inventory', 'Export report']
  const salesBars = [68, 82, 58, 96, 74, 88, 72]

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
          <span className="mini-label">API status</span>
          <strong>{msg}</strong>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h2>Overview</h2>
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
          {displayStats.map((item) => (
            <div key={item.label} className="stat-card">
              <div className="stat-header">
                <span>{item.label}</span>
                <span className={`delta ${item.tone}`}>{item.change}</span>
              </div>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel chart-panel">
            <div className="panel-header">
              <div>
                <p>Sales overview</p>
                <h3>$86,420</h3>
              </div>
              <span className="chip positive">+18.6%</span>
            </div>

            <div className="chart-bars" aria-label="sales chart">
              {salesBars.map((value, index) => (
                <div key={index} className="bar-wrap">
                  <span className="bar" style={{ height: `${value}%` }} />
                  <small>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="panel profile-panel">
            <div className="panel-header">
              <div>
                <p>Account profile</p>
                <h3>{user?.name || 'Admin User'}</h3>
              </div>
            </div>

            <div className="detail-list">
              <div>
                <span>Email</span>
                <strong>{user?.email || 'not provided'}</strong>
              </div>
              <div>
                <span>Role</span>
                <strong>{user?.role || 'admin'}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>New York, US</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel product-panel">
            <div className="panel-header">
              <div>
                <p>Inventory</p>
                <h3>Top products</h3>
              </div>
              <Link to="/dashboard/products" className="secondary-btn link-btn">Manage</Link>
            </div>

            <div className="product-grid">
              {displayProducts.map((product) => (
                <div key={product.name} className="product-card">
                  <div className="product-top">
                    <div className="product-badge">Best seller</div>
                    <span>{product.stock}</span>
                  </div>
                  <h4>{product.name}</h4>
                  <div className="product-meta">
                    <strong>{product.price}</strong>
                    <span>{product.sold} sold</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel actions-panel">
            <div className="panel-header">
              <div>
                <p>Quick actions</p>
                <h3>Tasks</h3>
              </div>
            </div>

            <div className="action-list">
              {quickActions.map((item) => (
                <button key={item} className="action-btn" type="button">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="panel table-panel">
          <div className="panel-header">
            <div>
              <p>Recent activity</p>
              <h3>Latest orders</h3>
            </div>
            <Link to="/dashboard/orders" className="secondary-btn link-btn">View all</Link>
          </div>

          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.item}</td>
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
