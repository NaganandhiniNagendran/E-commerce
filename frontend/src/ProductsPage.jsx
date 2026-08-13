import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function ProductsPage() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const productStats = [
    { label: 'Inventory', value: '12.4K', tone: 'blue' },
    { label: 'Active SKUs', value: '482', tone: 'green' },
    { label: 'Low stock', value: '27', tone: 'orange' },
    { label: 'Turnover', value: '68%', tone: 'purple' }
  ]

  const products = [
    { name: 'Aero Pro Headset', category: 'Audio', stock: 48, price: '$189', status: 'In stock' },
    { name: 'Nova Smartwatch', category: 'Wearables', stock: 22, price: '$299', status: 'Low stock' },
    { name: 'Echo Speaker', category: 'Home', stock: 63, price: '$129', status: 'In stock' },
    { name: 'Arc Gaming Chair', category: 'Furniture', stock: 17, price: '$349', status: 'Low stock' },
    { name: 'Pulse Keyboard', category: 'Accessories', stock: 75, price: '$89', status: 'In stock' },
    { name: 'Orbit Mouse', category: 'Accessories', stock: 94, price: '$59', status: 'In stock' }
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
          <span className="mini-label">Inventory</span>
          <strong>5,432 units</strong>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Products</p>
            <h2>Catalog</h2>
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
          {productStats.map((item) => (
            <div key={item.label} className="stat-card">
              <div className="stat-header">
                <span>{item.label}</span>
                <span className={`delta ${item.tone}`}>+4.8%</span>
              </div>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="panel product-page-panel">
          <div className="panel-header">
            <div>
              <p>Catalog</p>
              <h3>All products</h3>
            </div>
            <div className="page-header-actions">
              <button className="secondary-btn" type="button">Add product</button>
              <Link to="/dashboard" className="secondary-btn link-btn">Overview</Link>
            </div>
          </div>

          <div className="product-grid full-product-grid">
            {products.map((product) => (
              <div key={product.name} className="product-card product-list-card">
                <div className="product-top">
                  <div className="product-badge">{product.category}</div>
                  <span>{product.stock} in stock</span>
                </div>
                <h4>{product.name}</h4>
                <div className="product-meta">
                  <strong>{product.price}</strong>
                  <span className={`status ${product.status === 'Low stock' ? 'processing' : 'paid'}`}>
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
