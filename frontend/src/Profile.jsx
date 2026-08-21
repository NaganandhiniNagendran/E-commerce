import React from 'react'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return (
    <div style={{ padding: 20 }}>
      <div className="panel" style={{ maxWidth: 920 }}>
        <div className="panel-header">
          <div>
            <p>Account</p>
            <h3>My Profile</h3>
          </div>
        </div>

        <div className="detail-list" style={{ padding: 18 }}>
          <div>
            <span>Name</span>
            <strong>{user?.name || '—'}</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{user?.email || '—'}</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>{user?.role || 'CUSTOMER'}</strong>
          </div>
          <div>
            <span>Phone</span>
            <strong>{user?.phone || '—'}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
