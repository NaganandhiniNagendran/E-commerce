// import React from 'react'
// import { Link, NavLink } from 'react-router-dom'

// export default function OrdersPage() {
//   const user = JSON.parse(localStorage.getItem('user') || 'null')

//   function logout() {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     window.location.href = '/login'
//   }

//   const orderSummary = [
//     { label: 'This week', value: '1,284', tone: 'green' },
//     { label: 'Pending', value: '184', tone: 'blue' },
//     { label: 'Refunds', value: '19', tone: 'orange' },
//     { label: 'Avg. value', value: '$268', tone: 'purple' }
//   ]

//   const orders = [
//     { id: '#1042', customer: 'Ava Thompson', item: 'Wireless Headset', date: '12 Aug', total: '$249.00', status: 'Paid' },
//     { id: '#1043', customer: 'Noah Lee', item: 'Smart Watch', date: '11 Aug', total: '$499.00', status: 'Shipped' },
//     { id: '#1044', customer: 'Emma Reed', item: 'Noise Cancelling Earbuds', date: '11 Aug', total: '$179.00', status: 'Processing' },
//     { id: '#1045', customer: 'Lucas Brown', item: 'Gaming Chair', date: '10 Aug', total: '$320.00', status: 'Refund' },
//     { id: '#1046', customer: 'Sofia Patel', item: 'Laptop Stand', date: '09 Aug', total: '$89.00', status: 'Paid' }
//   ]

//   return (
//     <div className="dashboard-page">
//       <aside className="sidebar">
//         <div className="sidebar-brand">
//           <div className="brand-mark">E</div>
//           <div>
//             <strong>EastCart</strong>
//             <span>Commerce Hub</span>
//           </div>
//         </div>

//         <nav className="nav-menu">
//           <NavLink className="nav-item" to="/dashboard">Overview</NavLink>
//           <NavLink className="nav-item" to="/dashboard/orders">Orders</NavLink>
//           <NavLink className="nav-item" to="/dashboard/products">Products</NavLink>
//           <a className="nav-item" href="#">Customers</a>
//           <a className="nav-item" href="#">Analytics</a>
//           <a className="nav-item" href="#">Settings</a>
//         </nav>

//         <div className="sidebar-card">
//           <span className="mini-label">Order health</span>
//           <strong>92% on time</strong>
//         </div>
//       </aside>

//       <main className="dashboard-main">
//         <header className="topbar">
//           <div>
//             <p className="eyebrow">Orders</p>
//             <h2>Order management</h2>
//           </div>

//           <div className="user-box">
//             <div className="avatar">{(user?.name || 'A').charAt(0).toUpperCase()}</div>
//             <div className="user-meta">
//               <strong>{user?.name || 'Admin User'}</strong>
//               <span>{user?.role || 'Owner'}</span>
//             </div>
//             <button onClick={logout}>Logout</button>
//           </div>
//         </header>

//         <section className="stats-grid">
//           {orderSummary.map((item) => (
//             <div key={item.label} className="stat-card">
//               <div className="stat-header">
//                 <span>{item.label}</span>
//                 <span className={`delta ${item.tone}`}>+8.4%</span>
//               </div>
//               <strong>{item.value}</strong>
//             </div>
//           ))}
//         </section>

//         <section className="panel table-panel order-table-panel">
//           <div className="panel-header">
//             <div>
//               <p>Operations</p>
//               <h3>Recent orders</h3>
//             </div>
//             <Link to="/dashboard" className="secondary-btn link-btn">Back</Link>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Order</th>
//                 <th>Customer</th>
//                 <th>Item</th>
//                 <th>Date</th>
//                 <th>Total</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id}>
//                   <td>{order.id}</td>
//                   <td>{order.customer}</td>
//                   <td>{order.item}</td>
//                   <td>{order.date}</td>
//                   <td>{order.total}</td>
//                   <td>
//                     <span className={`status ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       </main>
//     </div>
//   )
// }

















import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// Product icon used as a placeholder thumbnail (swap for item.image when you have real product photos)
const PackageIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
)

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
)

const STATUS_STYLES = {
  paid:       { bg: '#eff6ff', color: '#2563eb', icon: CheckCircleIcon, label: 'Paid' },
  shipped:    { bg: '#eef2ff', color: '#4f46e5', icon: TruckIcon,       label: 'Shipped' },
  processing: { bg: '#fffbeb', color: '#d97706', icon: ClockIcon,       label: 'Processing' },
  refund:     { bg: '#fef2f2', color: '#dc2626', icon: RefreshIcon,     label: 'Refund' },
}

function StatusBadge({ status }) {
  const key = status.toLowerCase().replace(/\s+/g, '-')
  const cfg = STATUS_STYLES[key] || STATUS_STYLES.paid
  const Icon = cfg.icon
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: cfg.bg, color: cfg.color, padding: '5px 12px',
      borderRadius: 20, fontSize: 12, fontWeight: 600
    }}>
      <Icon /> {cfg.label}
    </span>
  )
}

export default function OrdersPage() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const orderSummary = [
    { label: 'This week', value: '1,284', tone: '#16a34a' },
    { label: 'Pending', value: '184', tone: '#2563eb' },
    { label: 'Refunds', value: '19', tone: '#d97706' },
    { label: 'Avg. value', value: '$268', tone: '#7c3aed' }
  ]

  const orders = [
    { id: '#1042', customer: 'Ava Thompson', item: 'Wireless Headset', date: '12 Aug', total: '$249.00', status: 'Paid' },
    { id: '#1043', customer: 'Noah Lee', item: 'Smart Watch', date: '11 Aug', total: '$499.00', status: 'Shipped' },
    { id: '#1044', customer: 'Emma Reed', item: 'Noise Cancelling Earbuds', date: '11 Aug', total: '$179.00', status: 'Processing' },
    { id: '#1045', customer: 'Lucas Brown', item: 'Gaming Chair', date: '10 Aug', total: '$320.00', status: 'Refund' },
    { id: '#1046', customer: 'Sofia Patel', item: 'Laptop Stand', date: '09 Aug', total: '$89.00', status: 'Paid' }
  ]

  return (
    <div style={{ background: '#f5f6fa', minHeight: '100vh', padding: '20px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 24, flexWrap: 'wrap', gap: 16
        }}>
          <div>
            <p style={{ color: '#2563eb', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Orders</p>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Order management</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: '#2563eb', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15
            }}>
              {(user?.name || 'A').charAt(0).toUpperCase()}
            </div>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{user?.name || 'Admin User'}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{user?.role || 'Owner'}</div>
            </div>
            <button onClick={logout} style={logoutBtn}>Logout</button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24
        }}>
          {orderSummary.map(item => (
            <div key={item.label} style={{
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 18
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{item.label}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: item.tone, background: `${item.tone}1a`,
                  padding: '2px 8px', borderRadius: 12
                }}>+8.4%</span>
              </div>
              <strong style={{ fontSize: 24 }}>{item.value}</strong>
            </div>
          ))}
        </div>

        {/* Orders panel */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '18px 20px', borderBottom: '1px solid #f0f1f3'
          }}>
            <div>
              <p style={{ fontSize: 12, color: '#6b7280', margin: 0, marginBottom: 2 }}>Operations</p>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Recent orders</h3>
            </div>
            <Link to="/dashboard" style={backBtn}>← Back</Link>
          </div>

          {/* List header (desktop) */}
          <div style={{
            display: 'grid', gridTemplateColumns: '48px 1.4fr 1.2fr 100px 100px 120px 130px',
            padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#9ca3af',
            borderBottom: '1px solid #f0f1f3'
          }}>
            <span></span>
            <span>Item</span>
            <span>Customer</span>
            <span>Order</span>
            <span>Date</span>
            <span>Total</span>
            <span>Status</span>
          </div>

          {/* Rows */}
          {orders.map(order => (
            <div key={order.id} style={{
              display: 'grid', gridTemplateColumns: '48px 1.4fr 1.2fr 100px 100px 120px 130px',
              alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f6f7f9'
            }}>
              <div style={{
                width: 40, height: 40, background: '#f3f4f6', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'
              }}>
                <PackageIcon />
              </div>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{order.item}</span>
              <span style={{ fontSize: 14, color: '#4b5563' }}>{order.customer}</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>{order.id}</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>{order.date}</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{order.total}</span>
              <StatusBadge status={order.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const logoutBtn = {
  padding: '9px 18px', background: '#fff', border: '1px solid #e5e7eb',
  borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151'
}

const backBtn = {
  padding: '8px 16px', background: '#fff', border: '1px solid #2563eb',
  color: '#2563eb', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none'
}