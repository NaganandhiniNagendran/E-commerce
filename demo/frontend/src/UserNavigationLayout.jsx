import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './UserDashboard.css'

const navItems = [
  { label: 'Dashboard', icon: '⊞', path: '/user-dashboard' },
  { label: 'My Profile', icon: '👤', path: '/profile' },
  { label: 'My Orders', icon: '📦', path: '/user-orders' },
  { label: 'My Cart', icon: '🛒', path: '/cart', count: 'cart' },
  { label: 'Wishlist', icon: '♥', path: '/wishlist', count: 'wishlist' },
  { label: 'Addresses', icon: '📍', path: '/addresses' },
  { label: 'My Reviews', icon: '★', path: '/reviews' },
  { label: 'Notifications', icon: '🔔', path: '/notifications' },
  { label: 'Support / Help', icon: '💬', path: '/support' }
]

function getItemCount(key) {
  try {
    const items = JSON.parse(localStorage.getItem(key) || '[]')
    return key === 'cart'
      ? items.reduce((total, item) => total + (item.quantity || 1), 0)
      : items.length
  } catch {
    return 0
  }
}

export default function UserNavigationLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cartCount, setCartCount] = useState(() => getItemCount('cart'))
  const [wishlistCount, setWishlistCount] = useState(() => getItemCount('wishlist'))

  useEffect(() => {
    const refreshCounts = () => {
      setCartCount(getItemCount('cart'))
      setWishlistCount(getItemCount('wishlist'))
    }
    refreshCounts()
    window.addEventListener('storage', refreshCounts)
    return () => window.removeEventListener('storage', refreshCounts)
  }, [location.pathname])

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="ud-root">
      <div className="ud-body ud-navigation-body">
        <aside className="ud-sidebar">
          <nav className="ud-nav">
            {navItems.map(item => {
              const badgeValue = item.count === 'cart'
                ? cartCount
                : item.count === 'wishlist'
                  ? wishlistCount
                  : null
              return (
                <button
                  key={item.path}
                  className={`ud-nav-item${location.pathname === item.path ? ' ud-nav-active' : ''}`}
                  type="button"
                  onClick={() => navigate(item.path)}
                >
                  <span className="ud-nav-icon">{item.icon}</span>
                  <span className="ud-nav-label">{item.label}</span>
                  {badgeValue != null && <span className="ud-nav-badge">{badgeValue}</span>}
                </button>
              )
            })}
          </nav>

          <button className="ud-logout-btn" type="button" onClick={logout}>
            <span>↪</span>
            <span>Logout</span>
          </button>
        </aside>

        <main className="ud-main ud-navigation-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
