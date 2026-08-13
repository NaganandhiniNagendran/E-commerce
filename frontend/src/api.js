import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers = config.headers || {}
  if (token) {
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
    if (error.response?.status === 403) {
      console.error('API forbidden:', error.config?.url, 'token present?', !!localStorage.getItem('token'))
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

export default api
