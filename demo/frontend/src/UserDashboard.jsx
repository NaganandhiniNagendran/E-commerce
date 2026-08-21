import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserDashboard.css'

/* ─── static mock data ─── */
const stats = [
  {
    label: 'Total Orders',
    value: 12,
    sub: 'View all your orders',
    color: '#6c63ff',
    bg: '#ede9ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    )
  },
  {
    label: 'Pending Orders',
    value: 2,
    sub: 'Orders in progress',
    color: '#f97316',
    bg: '#fff0e6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    )
  },
  {
    label: 'Wishlist Items',
    value: 7,
    sub: 'Items in your wishlist',
    color: '#ef4444',
    bg: '#fff0f0',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  },
  {
    label: 'Cart Items',
    value: 3,
    sub: 'Items in your cart',
    color: '#16a34a',
    bg: '#e6f9ee',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
    )
  }
]

const recentOrders = [
  {
    id: '#ORD12345',
    items: 2,
    date: '12 May 2024',
    price: '\u20b92,499',
    status: 'Delivered',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '#ORD12344',
    items: 1,
    date: '10 May 2024',
    price: '\u20b91,299',
    status: 'Shipped',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '#ORD12343',
    items: 1,
    date: '08 May 2024',
    price: '\u20b91,999',
    status: 'Processing',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: '#ORD12342',
    items: 2,
    date: '05 May 2024',
    price: '\u20b92,199',
    status: 'Delivered',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop&auto=format'
  }
]

const wishlistItemsInit = [
  {
    id: 1,
    name: 'Boat Rockerz 450',
    price: '\u20b91,499',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: 2,
    name: 'Fastrack Analog Watch',
    price: '\u20b91,895',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&auto=format'
  },
  {
    id: 3,
    name: 'Puma Unisex Backpack',
    price: '\u20b91,299',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop&auto=format'
  }
]

const recommended = [
  { id: 1, price: '\u20b92,999', rating: 4.5, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=140&h=140&fit=crop&auto=format' },
  { id: 2, price: '\u20b92,499', rating: 4.3, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=140&h=140&fit=crop&auto=format' },
  { id: 3, price: '\u20b91,899', rating: 4.6, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=140&h=140&fit=crop&auto=format' },
  { id: 4, price: '\u20b91,299', rating: 4.2, img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=140&h=140&fit=crop&auto=format' }
]

function Stars({ rating }) {
  return (
    <span className="ud-stars">
      <svg viewBox="0 0 24 24" fill="#f59e0b" width="13" height="13">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {rating}
    </span>
  )
}

export default function UserDashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const displayName = user?.name || 'Nandhini'
  const [search, setSearch] = useState('')
  const [addedToCart, setAddedToCart] = useState({})
  const [wishlistItems, setWishlistItems] = useState(wishlistItemsInit)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(existingCart)
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    if (storedWishlist.length) {
      setWishlistItems(storedWishlist)
    }
  }, [])

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  function handleAddToCart(id) {
    const item = wishlistItems.find(i => i.id === id) || recommended.find(r => r.id === id)
    if (item) {
      const existing = cart.find(c => c.id === item.id)
      const nextCart = existing
        ? cart.map(c => c.id === item.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c)
        : [...cart, { id: item.id, name: item.name || 'Product', price: item.price || item.price, quantity: 1 }]
      setCart(nextCart)
      localStorage.setItem('cart', JSON.stringify(nextCart))
    }
    setAddedToCart(prev => ({ ...prev, [id]: true }))
    setTimeout(() => setAddedToCart(prev => ({ ...prev, [id]: false })), 1500)
  }

  function handleRemoveFromWishlist(id) {
    setWishlistItems(prev => prev.filter(i => i.id !== id))
  }

  const statsWithCounts = stats.map(item => {
    if (item.label === 'Cart Items') return { ...item, value: cartCount }
    if (item.label === 'Wishlist Items') return { ...item, value: wishlistItems.length }
    return item
  })

  return (
    <div className="ud-root">
      {/* ── TOP NAV ── */}
      <header className="ud-topnav">
        <div className="ud-brand">
          <span className="ud-brand-icon">&#128717;</span>
          <span className="ud-brand-name">ShopEase</span>
        </div>

        <div className="ud-search-wrap">
          <input
            className="ud-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="ud-search-btn" aria-label="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>

        <div className="ud-nav-right">
          <button className="ud-icon-btn" aria-label="notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span className="ud-bell-badge">9</span>
          </button>

          <div className="ud-user-chip">
            <div className="ud-avatar">{displayName.charAt(0).toUpperCase()}</div>
            <span className="ud-user-name">{displayName}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </header>

      <div className="ud-body">
        {/* ── MAIN CONTENT ── */}
        <main className="ud-main">
          {/* Welcome */}
          <div className="ud-welcome">
            <h1>Welcome back, {displayName}! &#128075;</h1>
            <p>Here&apos;s what&apos;s happening with your account today.</p>
          </div>

          {/* Stats */}
          <div className="ud-stats-grid">
            {statsWithCounts.map(s => (
              <div className="ud-stat-card" key={s.label}>
                <div className="ud-stat-body">
                  <p className="ud-stat-label">{s.label}</p>
                  <strong className="ud-stat-value">{s.value}</strong>
                  <span className="ud-stat-sub">{s.sub}</span>
                </div>
                <div className="ud-stat-icon-wrap" style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Middle grid */}
          <div className="ud-mid-grid">
            {/* Recent Orders */}
            <div className="ud-panel">
              <div className="ud-panel-header">
                <h2>Recent Orders</h2>
                <button className="ud-view-link" type="button" onClick={() => navigate('/user-orders')}>View All Orders &#8594;</button>
              </div>
              <div className="ud-orders-list">
                {recentOrders.map(order => (
                  <div className="ud-order-row" key={order.id}>
                    <img src={order.img} alt={order.id} className="ud-order-img"
                      onError={e => { e.target.style.background = '#f3f4f6'; e.target.src = ''; }} />
                    <div className="ud-order-info">
                      <strong>{order.id}</strong>
                      <span>{order.items} Item{order.items > 1 ? 's' : ''}</span>
                      <span className="ud-order-date">Placed on {order.date}</span>
                    </div>
                    <div className="ud-order-right">
                      <span className={`ud-status ud-status--${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                      <strong className="ud-order-price">{order.price}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist Preview */}
            <div className="ud-panel">
              <div className="ud-panel-header">
                <h2>Wishlist Preview</h2>
                <button className="ud-view-link" type="button" onClick={() => { localStorage.setItem('wishlist', JSON.stringify(wishlistItems)); navigate('/wishlist') }}>View Wishlist &#8594;</button>
              </div>
              <div className="ud-wishlist-list">
                {wishlistItems.map(item => (
                  <div className="ud-wishlist-row" key={item.id}>
                    <img src={item.img} alt={item.name} className="ud-wish-img"
                      onError={e => { e.target.style.background = '#f3f4f6'; }} />
                    <div className="ud-wish-info">
                      <strong>{item.name}</strong>
                      <span>{item.price}</span>
                    </div>
                    <div className="ud-wish-actions">
                      <button
                        className={`ud-add-cart-btn${addedToCart[item.id] ? ' ud-added' : ''}`}
                        type="button"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        {addedToCart[item.id] ? '&#10003; Added' : 'Add to Cart'}
                      </button>
                      <button className="ud-heart-btn" type="button" aria-label="remove from wishlist" onClick={() => { handleRemoveFromWishlist(item.id); localStorage.setItem('wishlist', JSON.stringify(wishlistItems.filter(i => i.id !== item.id))); }}>
                        <svg viewBox="0 0 24 24" fill="#ef4444" width="18" height="18">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                <button className="ud-view-link ud-view-all-wish" type="button">
                  View All Wishlist Items &#8594;
                </button>
              </div>
            </div>
          </div>

          {/* Bottom grid */}
          <div className="ud-bottom-grid">
            {/* Promo Banner */}
            <div className="ud-promo-banner">
                <div className="ud-promo-text">
                <p className="ud-promo-eyebrow">Exclusive For You &#127881;</p>
                <h3>Get 10% OFF on your next order!</h3>
                <div className="ud-promo-code-row">
                  <span>Use code:</span>
                  <span className="ud-promo-code">WELCOME10</span>
                </div>
                <button className="ud-shop-now-btn" type="button" onClick={() => navigate('/dashboard/products')}>Shop Now</button>
              </div>
              <div className="ud-promo-art" aria-hidden="true">
                <span className="ud-bag ud-bag-1">&#128717;</span>
                <span className="ud-bag ud-bag-2">&#128717;</span>
              </div>
            </div>

            {/* Recommended */}
            <div className="ud-panel ud-recommended-panel">
              <div className="ud-panel-header">
                <h2>Recommended For You</h2>
                <button className="ud-view-link" type="button" onClick={() => navigate('/dashboard/products')}>View All &#8594;</button>
              </div>
              <div className="ud-rec-grid">
                {recommended.map(item => (
                  <div className="ud-rec-card" key={item.id}>
                    <div className="ud-rec-img-wrap">
                      <img src={item.img} alt="product" className="ud-rec-img"
                        onError={e => { e.target.style.background = '#f3f4f6'; }} />
                    </div>
                    <strong className="ud-rec-price">{item.price}</strong>
                    <Stars rating={item.rating} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
