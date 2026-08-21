// import React from 'react'
// import { Link, NavLink } from 'react-router-dom'

// export default function ProductsPage() {
//   const user = JSON.parse(localStorage.getItem('user') || 'null')

//   function logout() {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     window.location.href = '/login'
//   }

//   const productStats = [
//     { label: 'Inventory', value: '12.4K', tone: 'blue' },
//     { label: 'Active SKUs', value: '482', tone: 'green' },
//     { label: 'Low stock', value: '27', tone: 'orange' },
//     { label: 'Turnover', value: '68%', tone: 'purple' }
//   ]

//   const products = [
//     { name: 'Aero Pro Headset', category: 'Audio', stock: 48, price: '$189', status: 'In stock' },
//     { name: 'Nova Smartwatch', category: 'Wearables', stock: 22, price: '$299', status: 'Low stock' },
//     { name: 'Echo Speaker', category: 'Home', stock: 63, price: '$129', status: 'In stock' },
//     { name: 'Arc Gaming Chair', category: 'Furniture', stock: 17, price: '$349', status: 'Low stock' },
//     { name: 'Pulse Keyboard', category: 'Accessories', stock: 75, price: '$89', status: 'In stock' },
//     { name: 'Orbit Mouse', category: 'Accessories', stock: 94, price: '$59', status: 'In stock' }
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
//           <span className="mini-label">Inventory</span>
//           <strong>5,432 units</strong>
//         </div>
//       </aside>

//       <main className="dashboard-main">
//         <header className="topbar">
//           <div>
//             <p className="eyebrow">Products</p>
//             <h2>Catalog</h2>
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
//           {productStats.map((item) => (
//             <div key={item.label} className="stat-card">
//               <div className="stat-header">
//                 <span>{item.label}</span>
//                 <span className={`delta ${item.tone}`}>+4.8%</span>
//               </div>
//               <strong>{item.value}</strong>
//             </div>
//           ))}
//         </section>

//         <section className="panel product-page-panel">
//           <div className="panel-header">
//             <div>
//               <p>Catalog</p>
//               <h3>All products</h3>
//             </div>
//             <div className="page-header-actions">
//               <button className="secondary-btn" type="button">Add product</button>
//               <Link to="/dashboard" className="secondary-btn link-btn">Overview</Link>
//             </div>
//           </div>

//           <div className="product-grid full-product-grid">
//             {products.map((product) => (
//               <div key={product.name} className="product-card product-list-card">
//                 <div className="product-top">
//                   <div className="product-badge">{product.category}</div>
//                   <span>{product.stock} in stock</span>
//                 </div>
//                 <h4>{product.name}</h4>
//                 <div className="product-meta">
//                   <strong>{product.price}</strong>
//                   <span className={`status ${product.status === 'Low stock' ? 'processing' : 'paid'}`}>
//                     {product.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }












import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

// ---- Icons ----
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
)

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

// Category-specific glyphs so every card shows something meaningful, never a blank box
const CATEGORY_ICONS = {
  headphones: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>
  ),
  mobile: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="20" rx="2"></rect>
      <line x1="11" y1="18" x2="13" y2="18"></line>
    </svg>
  ),
  shoe: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18h18v-2c-3 0-4-1-6-3l-3-3-2 2c-2 2-3 3-3 6z"></path>
      <path d="M3 18v2h18v-2"></path>
    </svg>
  ),
  watch: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7"></circle>
      <polyline points="12 9 12 12 14 14"></polyline>
      <path d="M9 3h6M9 21h6"></path>
    </svg>
  ),
  earbuds: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="10" r="3"></circle>
      <circle cx="17" cy="10" r="3"></circle>
      <path d="M7 13v3a2 2 0 0 0 2 2M17 13v3a2 2 0 0 0-2 2"></path>
    </svg>
  ),
  bag: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8h12l1 12H5L6 8z"></path>
      <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
    </svg>
  ),
  bottle: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2h6v3l2 3v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8l2-3V2z"></path>
      <line x1="7" y1="12" x2="17" y2="12"></line>
    </svg>
  ),
  home: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5"></path>
      <path d="M5 9v11h14V9"></path>
    </svg>
  ),
  beauty: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6M9 4h6"></path>
      <rect x="8" y="8" width="8" height="14" rx="2"></rect>
    </svg>
  ),
  mouse: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="6"></rect>
      <line x1="12" y1="3" x2="12" y2="9"></line>
    </svg>
  ),
}

// Demo catalog — replace with data from your products API
const PRODUCTS = [
  { id: 'p1', name: 'boAt Rockerz 450', category: 'Electronics', price: 1499, mrp: 2999, rating: 4.2, icon: 'headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
  { id: 'p2', name: 'Realme Narzo 70 Pro 5G', category: 'Electronics', price: 19999, mrp: 23999, rating: 4.4, icon: 'mobile', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80' },
  { id: 'p3', name: 'Campus Running Shoes', category: 'Fashion', price: 1299, mrp: 2199, rating: 4.1, icon: 'shoe', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
  { id: 'p4', name: 'Fire-Boltt Ninja Call Pro', category: 'Electronics', price: 1199, mrp: 2499, rating: 4.0, icon: 'watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' },
  { id: 'p5', name: 'boAt Airdopes 141', category: 'Electronics', price: 899, mrp: 1999, rating: 4.3, icon: 'earbuds', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80' },
  { id: 'p6', name: 'Safari Pentagon Backpack', category: 'Fashion', price: 1099, mrp: 2199, rating: 4.2, icon: 'bag', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80' },
  { id: 'p7', name: 'Wild Stone Code Perfume', category: 'Beauty', price: 299, mrp: 599, rating: 3.9, icon: 'beauty', image: 'https://images.unsplash.com/photo-1541643600914-78b0846838?auto=format&fit=crop&w=600&q=80' },
  { id: 'p8', name: 'Milton Steel Bottle', category: 'Home & Kitchen', price: 399, mrp: 699, rating: 4.0, icon: 'bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80' },
  { id: 'p9', name: 'Wooden Table Lamp', category: 'Home & Kitchen', price: 749, mrp: 1299, rating: 4.1, icon: 'home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
  { id: 'p10', name: 'HP Wireless Mouse', category: 'Electronics', price: 499, mrp: 899, rating: 4.3, icon: 'mouse', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80' },
  { id: 'p11', name: 'Nivea Men Face Wash', category: 'Beauty', price: 189, mrp: 299, rating: 4.0, icon: 'beauty', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80' },
  { id: 'p12', name: 'Prestige Mixer Grinder', category: 'Home & Kitchen', price: 2399, mrp: 3499, rating: 4.5, icon: 'home', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80' },
]

const CATEGORIES = ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports']

export default function Products() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [maxPrice, setMaxPrice] = useState(25000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popularity')
  const [addedIds, setAddedIds] = useState({})

  function toggleCategory(cat) {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i.id === product.id)
    const next = existing
      ? cart.map(i => i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)
      : [...cart, { ...product, quantity: 1 }]
    localStorage.setItem('cart', JSON.stringify(next))
    setAddedIds(prev => ({ ...prev, [product.id]: true }))
    setTimeout(() => setAddedIds(prev => ({ ...prev, [product.id]: false })), 1200)
  }

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p =>
      (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
      p.price <= maxPrice &&
      p.rating >= minRating
    )
    if (sortBy === 'price-low') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [selectedCategories, maxPrice, minRating, sortBy])

  return (
    <div style={{ background: '#f5f6fa', minHeight: '100vh', padding: '20px 0' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 20px' }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: 16, color: '#6b7280', fontSize: 14 }}>
          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span>Products</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>All Products</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }}>

          {/* Sidebar filters */}
          <aside style={{
            background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
            padding: 20, position: 'sticky', top: 20
          }}>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Category</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CATEGORIES.map(cat => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#4b5563', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Price range</h3>
              <input
                type="range"
                min="0"
                max="25000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                <span>₹0</span>
                <span>₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Rating</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[4, 3, 0].map(r => (
                  <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#4b5563', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r}
                      onChange={() => setMinRating(r)}
                    />
                    {r === 0 ? 'All ratings' : `${r} stars and up`}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 14, color: '#6b7280' }}>{filtered.length} products</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', fontSize: 13 }}
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div style={{
                background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
                padding: 60, textAlign: 'center', color: '#6b7280'
              }}>
                No products match your filters.
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 16
              }}>
                {filtered.map(product => {
                  const off = Math.round((1 - product.price / product.mrp) * 100)
                  const justAdded = addedIds[product.id]
                  return (
                    <div key={product.id} style={{
                      background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
                      padding: 14, display: 'flex', flexDirection: 'column', gap: 8,
                      position: 'relative'
                    }}>
                      <button style={{
                        position: 'absolute', top: 10, right: 10, background: '#fff',
                        border: '1px solid #e5e7eb', borderRadius: '50%', width: 28, height: 28,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#6b7280'
                      }}>
                        <HeartIcon />
                      </button>

                      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{
                          width: '100%', height: 130, background: '#f3f4f6', borderRadius: 8,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6
                        }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                            onError={(event) => {
                              event.currentTarget.style.display = 'none'
                              event.currentTarget.nextElementSibling.style.display = 'block'
                            }}
                          />
                          <span style={{ display: 'none' }}>{CATEGORY_ICONS[product.icon]}</span>
                        </div>
                        <h3 style={{ fontSize: 14, fontWeight: 600, minHeight: 36, lineHeight: 1.3, margin: 0 }}>
                          {product.name}
                        </h3>
                      </Link>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}>
                        <StarIcon /> {product.rating}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                        <span style={{ fontSize: 16, fontWeight: 700 }}>₹{product.price.toLocaleString('en-IN')}</span>
                        <span style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'line-through' }}>
                          ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>{off}% off</div>

                      <button
                        onClick={() => addToCart(product)}
                        style={{
                          marginTop: 6, padding: '9px 12px', background: justAdded ? '#16a34a' : '#2563eb',
                          color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer',
                          fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center',
                          justifyContent: 'center', gap: 6, transition: 'background 0.2s'
                        }}
                      >
                        <CartIcon /> {justAdded ? 'Added!' : 'Add to Cart'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
