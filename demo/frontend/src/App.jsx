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
import Reviews from './Reviews'
import Notifications from './Notifications'
import Support from './Support'
import Payment from './Payment'
import UserNavigationLayout from './UserNavigationLayout'

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
        <Route element={<RequireAuth><UserNavigationLayout /></RequireAuth>}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-orders" element={<UserOrders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/support" element={<Support />} />
        </Route>
        <Route path="/payment" element={<RequireAuth><Payment /></RequireAuth>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
