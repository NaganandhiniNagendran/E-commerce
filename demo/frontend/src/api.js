import axios from 'axios'

// Vite's /api proxy exists only during local development. Production must call
// the deployed Spring Boot API directly; this can be overridden in Vercel with
// VITE_API_BASE_URL when the backend URL changes.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-6-dj64.onrender.com/api'

const api = axios.create({ baseURL: API_BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers = config.headers || {}
  // Don't send token for auth endpoints (login/register)
  if (token && !config.url?.startsWith('/auth')) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    if (config.url?.startsWith('/user') || config.url?.startsWith('/admin')) {
      console.warn('No auth token available for API request:', config.url)
    }
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status
    const isUserRequest = error.config?.url?.startsWith('/user')

    if ((status === 401 || status === 403) && isUserRequest) {
      console.warn('Your sign-in session has expired. Please sign in again.')
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login')
      }
    }
    return Promise.reject(error)
  }
)

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password })
  return res.data
}

export async function register(name, email, password, phone) {
  const res = await api.post('/auth/register', { name, email, password, phone })
  return res.data
}

export async function getProtected() {
  const res = await api.get('/test/protected')
  return res.data
}

// Orders
export async function getOrders() {
  const res = await api.get('/user/orders')
  return res.data
}

export async function createOrder(order) {
  const res = await api.post('/user/orders', order)
  return res.data
}


// Addresses
export async function getAddresses() {
  const res = await api.get('/user/addresses')
  return res.data
}

export async function addAddress(addr) {
  const res = await api.post('/user/addresses', addr)
  return res.data
}

export async function deleteAddress(id) {
  const res = await api.delete(`/user/addresses/${id}`)
  return res.data
}

// Payments
export async function getPayments() {
  const res = await api.get('/user/payments')
  return res.data
}

export async function addPayment(card) {
  const res = await api.post('/user/payments', card)
  return res.data
}

export async function deletePayment(id) {
  const res = await api.delete(`/user/payments/${id}`)
  return res.data
}

// Razorpay Payment
export async function getRazorpayConfig() {
  const res = await api.get('/payment-config')
  return res.data
}

export async function createRazorpayOrder(amount, receipt) {
  const res = await api.post('/create-order', { amount, currency: 'INR', receipt })
  return res.data
}

export async function verifyPayment(razorpayPaymentId, razorpayOrderId, razorpaySignature) {
  const res = await api.post('/verify-payment', { 
    razorpayPaymentId, 
    razorpayOrderId, 
    razorpaySignature 
  })
  return res.data
}

// Admin Dashboard
export async function getDashboardStats() {
  const res = await api.get('/admin/dashboard/stats')
  return res.data
}

export async function getRecentOrders() {
  const res = await api.get('/admin/dashboard/recent-orders')
  return res.data
}

export async function getTopProducts() {
  const res = await api.get('/admin/dashboard/top-products')
  return res.data
}

export default api
