import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'
import UserDashboard from './UserDashboard'
import OrdersPage from './OrdersPage'
import ProductsPage from './ProductsPage'
import Profile from './Profile'
import UserOrders from './UserOrders'
import Cart from './Cart'
import Wishlist from './Wishlist'
import Addresses from './Addresses'
import PaymentMethods from './PaymentMethods'
import Reviews from './Reviews'
import Notifications from './Notifications'
import Support from './Support'

function RequireAuth({ children }) {
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  return user && token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/dashboard/orders" element={<RequireAuth><OrdersPage /></RequireAuth>} />
        <Route path="/dashboard/products" element={<RequireAuth><ProductsPage /></RequireAuth>} />
        <Route path="/user-dashboard" element={<RequireAuth><UserDashboard /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/user-orders" element={<RequireAuth><UserOrders /></RequireAuth>} />
        <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
        <Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />
        <Route path="/addresses" element={<RequireAuth><Addresses /></RequireAuth>} />
        <Route path="/payment-methods" element={<RequireAuth><PaymentMethods /></RequireAuth>} />
        <Route path="/reviews" element={<RequireAuth><Reviews /></RequireAuth>} />
        <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
        <Route path="/support" element={<RequireAuth><Support /></RequireAuth>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
