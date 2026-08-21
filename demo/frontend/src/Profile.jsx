import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// SVG Icons
const UserIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const CameraIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
)

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
)

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const PackageIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
)

const HeartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
)

const LogOutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
)

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || '')
  const [editedEmail, setEditedEmail] = useState(user?.email || '')
  const [editedPhone, setEditedPhone] = useState(user?.phone || '')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  function handleSaveProfile() {
    const updatedUser = { ...user, name: editedName, email: editedEmail, phone: editedPhone }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setIsEditing(false)
    // In a real app, you would call an API to update the user profile
  }

  function handleCancelEdit() {
    setEditedName(user?.name || '')
    setEditedEmail(user?.email || '')
    setEditedPhone(user?.phone || '')
    setIsEditing(false)
  }

  return (
    <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 20, color: '#6b7280', fontSize: 14 }}>
        <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span>Profile</span>
      </div>

      {/* Page Title */}
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>My Profile</h1>
        <p style={{ color: '#6b7280' }}>Manage your personal information and account settings</p>
      </div>

      {/* Profile Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30, marginBottom: 30 }}>
        {/* Profile Photo */}
        <div style={{ 
          padding: 30, 
          borderRadius: 12, 
          border: '1px solid #e5e7eb',
          backgroundColor: '#fff',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: 120, 
            height: 120, 
            borderRadius: '50%',
            background: '#f3f4f6',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280'
          }}>
            <UserIcon />
          </div>
          <h3 style={{ fontSize: 18, marginBottom: 4 }}>{user?.name || 'User'}</h3>
          <p style={{ color: '#6b7280', marginBottom: 20 }}>{user?.role || 'CUSTOMER'}</p>
          <button style={{
            padding: '10px 20px',
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            margin: '0 auto'
          }}>
            <CameraIcon /> Change Photo
          </button>
        </div>

        {/* Personal Information */}
        <div style={{ 
          padding: 30, 
          borderRadius: 12, 
          border: '1px solid #e5e7eb',
          backgroundColor: '#fff'
        }}>
          <h3 style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>PERSONAL INFORMATION</h3>
          
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#6b7280', fontSize: 14 }}>Full Name</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 6,
                    border: '1px solid #e5e7eb',
                    fontSize: 14
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#6b7280', fontSize: 14 }}>Email</label>
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 6,
                    border: '1px solid #e5e7eb',
                    fontSize: 14
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, color: '#6b7280', fontSize: 14 }}>Phone</label>
                <input
                  type="tel"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 6,
                    border: '1px solid #e5e7eb',
                    fontSize: 14
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button 
                  onClick={handleCancelEdit}
                  style={{
                    flex: 1,
                    padding: 12,
                    background: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  style={{
                    flex: 1,
                    padding: 12,
                    background: '#4f46e5',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <span style={{ color: '#6b7280', fontSize: 14 }}>Full Name</span>
                <p style={{ fontSize: 16, marginTop: 4 }}>{user?.name || '—'}</p>
              </div>
              <div>
                <span style={{ color: '#6b7280', fontSize: 14 }}>Email</span>
                <p style={{ fontSize: 16, marginTop: 4 }}>{user?.email || '—'}</p>
              </div>
              <div>
                <span style={{ color: '#6b7280', fontSize: 14 }}>Phone</span>
                <p style={{ fontSize: 16, marginTop: 4 }}>{user?.phone || '—'}</p>
              </div>
              <div>
                <span style={{ color: '#6b7280', fontSize: 14 }}>Role</span>
                <p style={{ fontSize: 16, marginTop: 4 }}>{user?.role || 'CUSTOMER'}</p>
              </div>
              <div>
                <span style={{ color: '#6b7280', fontSize: 14 }}>Member Since</span>
                <p style={{ fontSize: 16, marginTop: 4 }}>August 2026</p>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                style={{
                  padding: 12,
                  background: '#4f46e5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14,
                  marginTop: 8
                }}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Settings */}
      <div style={{ 
        padding: 30, 
        borderRadius: 12, 
        border: '1px solid #e5e7eb',
        backgroundColor: '#fff',
        marginBottom: 30
      }}>
        <h3 style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>ACCOUNT SETTINGS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link to="/change-password" style={{ 
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            cursor: 'pointer'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><LockIcon /> Change Password</span>
            <span style={{ color: '#6b7280' }}>&gt;</span>
          </Link>
          <Link to="/addresses" style={{ 
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            cursor: 'pointer'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><LocationIcon /> Saved Addresses</span>
            <span style={{ color: '#6b7280' }}>&gt;</span>
          </Link>
          <Link to="/orders" style={{ 
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            cursor: 'pointer'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><PackageIcon /> My Orders</span>
            <span style={{ color: '#6b7280' }}>&gt;</span>
          </Link>
          <Link to="/wishlist" style={{ 
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            cursor: 'pointer'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><HeartIcon /> Wishlist</span>
            <span style={{ color: '#6b7280' }}>&gt;</span>
          </Link>
          <Link to="/notifications" style={{ 
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            cursor: 'pointer'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><BellIcon /> Notifications</span>
            <span style={{ color: '#6b7280' }}>&gt;</span>
          </Link>
        </div>
      </div>

      {/* Account Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 30 }}>
        <div style={{ 
          padding: 30, 
          borderRadius: 12, 
          border: '1px solid #e5e7eb',
          backgroundColor: '#fff',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: 8, color: '#6b7280' }}>
            <PackageIcon />
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 4 }}>12</div>
          <div style={{ color: '#6b7280' }}>Total Orders</div>
        </div>
        <div style={{ 
          padding: 30, 
          borderRadius: 12, 
          border: '1px solid #e5e7eb',
          backgroundColor: '#fff',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: 8, color: '#6b7280' }}>
            <HeartIcon />
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 4 }}>5</div>
          <div style={{ color: '#6b7280' }}>Wishlist</div>
        </div>
        <div style={{ 
          padding: 30, 
          borderRadius: 12, 
          border: '1px solid #e5e7eb',
          backgroundColor: '#fff',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: 8, color: '#6b7280' }}>
            <LocationIcon />
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 4 }}>2</div>
          <div style={{ color: '#6b7280' }}>Addresses</div>
        </div>
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        style={{
          width: '100%',
          padding: 16,
          background: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8
        }}
      >
        <LogOutIcon /> Logout
      </button>
    </div>
  )
}
