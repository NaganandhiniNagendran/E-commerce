// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { createRazorpayOrder, verifyPayment } from './api'

// // SVG Icons
// const PackageIcon = () => (
//   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
//     <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
//     <line x1="12" y1="22.08" x2="12" y2="12"></line>
//   </svg>
// )

// const HeartIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//   </svg>
// )

// const TrashIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="3 6 5 6 21 6"></polyline>
//     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//   </svg>
// )

// const LocationIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//     <circle cx="12" cy="10" r="3"></circle>
//   </svg>
// )

// const CreditCardIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
//     <line x1="1" y1="10" x2="23" y2="10"></line>
//   </svg>
// )

// const LockIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//     <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//   </svg>
// )

// const StarIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
//   </svg>
// )

// export default function Cart() {
//   const [cart, setCart] = useState([])
//   const [checkoutError, setCheckoutError] = useState(null)
//   const [checkoutLoading, setCheckoutLoading] = useState(false)
//   const [address, setAddress] = useState('')
//   const [paymentMethod, setPaymentMethod] = useState('online')
//   const [couponCode, setCouponCode] = useState('')
//   const [couponApplied, setCouponApplied] = useState(null)
//   const [discount, setDiscount] = useState(0)

//   useEffect(() => {
//     const c = JSON.parse(localStorage.getItem('cart') || '[]')
//     setCart(c)
//   }, [])

//   function remove(id) {
//     const next = cart.filter(i => i.id !== id)
//     setCart(next)
//     localStorage.setItem('cart', JSON.stringify(next))
//   }

//   function updateQuantity(id, change) {
//     const next = cart.map(item => {
//       if (item.id === id) {
//         const newQty = Math.max(1, (item.quantity || 1) + change)
//         return { ...item, quantity: newQty }
//       }
//       return item
//     })
//     setCart(next)
//     localStorage.setItem('cart', JSON.stringify(next))
//   }

//   const subtotal = cart.reduce((s, it) => {
//     const price = Number(String(it.price).replace(/[^0-9.-]+/g, ''))
//     return s + (price * (it.quantity || 1))
//   }, 0)

//   const deliveryCharge = subtotal > 0 ? 50 : 0
//   const taxableAmount = subtotal - discount
//   const gst = taxableAmount * 0.18
//   const total = taxableAmount + gst + deliveryCharge

//   function applyCoupon() {
//     if (couponCode.toUpperCase() === 'SAVE100') {
//       setDiscount(100)
//       setCouponApplied('SAVE100')
//     } else if (couponCode.toUpperCase() === 'WELCOME10') {
//       setDiscount(subtotal * 0.1)
//       setCouponApplied('WELCOME10')
//     } else if (couponCode.toUpperCase() === 'SHOP20') {
//       setDiscount(subtotal * 0.2)
//       setCouponApplied('SHOP20')
//     } else {
//       setCheckoutError('Invalid coupon code')
//     }
//   }

//   async function checkout() {
//     if (cart.length === 0) return
//     if (!address.trim()) {
//       setCheckoutError('Please enter your delivery address')
//       return
//     }
//     setCheckoutError(null)
//     setCheckoutLoading(true)

//     try {
//       if (paymentMethod === 'cod') {
//         setCart([])
//         localStorage.setItem('cart', JSON.stringify([]))
//         alert('Order placed successfully! Cash on Delivery selected.')
//         setCheckoutLoading(false)
//       } else {
//         const amountInPaise = Math.round(total * 100)
//         const receipt = 'cart_order_' + Date.now()
//         const order = await createRazorpayOrder(amountInPaise, receipt)

//         const options = {
//           key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//           amount: order.amount,
//           currency: order.currency,
//           name: 'EastCart',
//           description: 'Cart Payment',
//           order_id: order.orderId,
//           handler: async function (response) {
//             try {
//               const verification = await verifyPayment(
//                 response.razorpay_payment_id,
//                 response.razorpay_order_id,
//                 response.razorpay_signature
//               )
              
//               if (verification.success) {
//                 setCart([])
//                 localStorage.setItem('cart', JSON.stringify([]))
//                 alert('Payment successful! Order placed.')
//               } else {
//                 setCheckoutError('Payment verification failed')
//               }
//             } catch (err) {
//               setCheckoutError('Payment verification error: ' + err.message)
//             }
//             setCheckoutLoading(false)
//           },
//           prefill: {
//             name: 'Customer',
//             email: 'customer@example.com',
//             contact: '9999999999'
//           },
//           theme: {
//             color: '#4f46e5'
//           },
//           modal: {
//             ondismiss: function() {
//               setCheckoutLoading(false)
//               setCheckoutError('Payment cancelled by user')
//             }
//           }
//         }

//         const rzp = new window.Razorpay(options)
//         rzp.on('payment.failed', function (response) {
//           setCheckoutLoading(false)
//           setCheckoutError('Payment failed: ' + response.error.description)
//         })
        
//         rzp.open()
//       }
//     } catch (e) {
//       const message = e.response?.data?.message || e.response?.statusText || e.message || 'Checkout failed'
//       console.error('Checkout error', e)
//       setCheckoutError(`Checkout failed: ${message}`)
//       setCheckoutLoading(false)
//     }
//   }

//   if (cart.length === 0) {
//     return (
//       <div style={{ padding: '40px 20px', textAlign: 'center' }}>
//         <div style={{ marginBottom: 20, color: '#6b7280' }}>
//           <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <circle cx="9" cy="21" r="1"></circle>
//             <circle cx="20" cy="21" r="1"></circle>
//             <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//           </svg>
//         </div>
//         <h2 style={{ marginBottom: 10 }}>Your Cart is Empty</h2>
//         <p style={{ color: '#6b7280', marginBottom: 20 }}>
//           Looks like you haven't added anything to your cart yet.
//         </p>
//         <Link to="/products">
//           <button className="secondary-btn">Continue Shopping</button>
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
//       {/* Breadcrumb */}
//       <div style={{ marginBottom: 20, color: '#6b7280', fontSize: 14 }}>
//         <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
//         <span style={{ margin: '0 8px' }}>/</span>
//         <span>Cart</span>
//       </div>

//       {/* Page Title */}
//       <div style={{ marginBottom: 30 }}>
//         <h1 style={{ fontSize: 32, marginBottom: 8 }}>Shopping Cart</h1>
//         <p style={{ color: '#6b7280' }}>{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
//       </div>

//       {/* Two Column Layout */}
//       <div style={{ display: 'grid', gridTemplateColumns: '65% 35%', gap: 30 }}>
//         {/* Left Column - Cart Items */}
//         <div>
//           {/* Cart Items */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             {cart.map(item => {
//               const price = Number(String(item.price).replace(/[^0-9.-]+/g, ''))
//               const itemTotal = price * (item.quantity || 1)
//               return (
//                 <div key={item.id} style={{ 
//                   display: 'flex', 
//                   gap: 16, 
//                   padding: 20, 
//                   borderRadius: 12, 
//                   border: '1px solid #e5e7eb',
//                   backgroundColor: '#fff'
//                 }}>
//                   {/* Product Image */}
//                   <div style={{ 
//                     width: 100, 
//                     height: 100, 
//                     background: '#f3f4f6', 
//                     borderRadius: 8,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: '#6b7280'
//                   }}>
//                     <PackageIcon />
//                   </div>

//                   {/* Product Details */}
//                   <div style={{ flex: 1 }}>
//                     <h3 style={{ fontSize: 16, marginBottom: 4 }}>{item.name}</h3>
//                     <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 8 }}>{item.category || 'Product'}</p>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
//                       <span style={{ fontSize: 18, fontWeight: 'bold' }}>₹{price.toFixed(2)}</span>
//                       <span style={{ color: '#f59e0b' }}><StarIcon /></span>
//                     </div>

//                     {/* Quantity Control */}
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                       <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 6 }}>
//                         <button 
//                           onClick={() => updateQuantity(item.id, -1)}
//                           disabled={(item.quantity || 1) <= 1}
//                           style={{ 
//                             padding: '8px 12px', 
//                             border: 'none', 
//                             background: '#f3f4f6',
//                             cursor: (item.quantity || 1) > 1 ? 'pointer' : 'not-allowed',
//                             fontSize: 16
//                           }}
//                         >
//                           −
//                         </button>
//                         <span style={{ padding: '0 12px', fontWeight: 'bold' }}>{item.quantity || 1}</span>
//                         <button 
//                           onClick={() => updateQuantity(item.id, 1)}
//                           style={{ 
//                             padding: '8px 12px', 
//                             border: 'none', 
//                             background: '#f3f4f6',
//                             cursor: 'pointer',
//                             fontSize: 16
//                           }}
//                         >
//                           +
//                         </button>
//                       </div>
//                       <span style={{ color: '#6b7280', fontSize: 14 }}>Size: Standard</span>
//                     </div>
//                   </div>

//                   {/* Price and Actions */}
//                   <div style={{ textAlign: 'right' }}>
//                     <p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>₹{itemTotal.toFixed(2)}</p>
//                     <div style={{ display: 'flex', gap: 8 }}>
//                       <button style={{ 
//                         padding: '8px 16px', 
//                         border: '1px solid #e5e7eb', 
//                         background: '#fff',
//                         borderRadius: 6,
//                         cursor: 'pointer',
//                         fontSize: 14,
//                         color: '#6b7280'
//                       }}>
//                         <HeartIcon />
//                       </button>
//                       <button 
//                         onClick={() => remove(item.id)}
//                         style={{ 
//                           padding: '8px 16px', 
//                           border: '1px solid #ef4444', 
//                           background: '#fff',
//                           color: '#ef4444',
//                           borderRadius: 6,
//                           cursor: 'pointer',
//                           fontSize: 14,
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: 6
//                         }}
//                       >
//                         <TrashIcon /> Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>

//           {/* Delivery Address */}
//           <div style={{ 
//             marginTop: 30, 
//             padding: 20, 
//             borderRadius: 12, 
//             border: '1px solid #e5e7eb',
//             backgroundColor: '#fff'
//           }}>
//             <h3 style={{ fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
//               <LocationIcon /> Delivery Address
//             </h3>
//             <textarea
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Enter your full delivery address"
//               style={{
//                 width: '100%',
//                 padding: 12,
//                 borderRadius: 8,
//                 border: '1px solid #e5e7eb',
//                 minHeight: 80,
//                 resize: 'vertical',
//                 fontSize: 14
//               }}
//               required
//             />
//           </div>

//           {/* Payment Method */}
//           <div style={{ 
//             marginTop: 20, 
//             padding: 20, 
//             borderRadius: 12, 
//             border: '1px solid #e5e7eb',
//             backgroundColor: '#fff'
//           }}>
//             <h3 style={{ fontSize: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
//               <CreditCardIcon /> Payment Method
//             </h3>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//               <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
//                 <input
//                   type="radio"
//                   value="online"
//                   checked={paymentMethod === 'online'}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 />
//                 <span>Online Payment (Razorpay)</span>
//               </label>
//               <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
//                 <input
//                   type="radio"
//                   value="cod"
//                   checked={paymentMethod === 'cod'}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 />
//                 <span>Cash on Delivery</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Price Summary */}
//         <div>
//           <div style={{ 
//             padding: 20, 
//             borderRadius: 12, 
//             border: '1px solid #e5e7eb',
//             backgroundColor: '#fff',
//             position: 'sticky',
//             top: 20
//           }}>
//             <h3 style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>PRICE DETAILS</h3>

//             {/* Price Breakdown */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <span style={{ color: '#6b7280' }}>Price ({cart.length} items)</span>
//                 <span>₹{subtotal.toFixed(2)}</span>
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <span style={{ color: '#6b7280' }}>Discount</span>
//                 <span style={{ color: '#10b981' }}>-₹{discount.toFixed(2)}</span>
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <span style={{ color: '#6b7280' }}>Delivery Charges</span>
//                 <span>₹{deliveryCharge.toFixed(2)}</span>
//               </div>
//               <div style={{ height: 1, backgroundColor: '#e5e7eb', margin: '8px 0' }} />
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <span style={{ color: '#6b7280' }}>Taxable Amount</span>
//                 <span>₹{taxableAmount.toFixed(2)}</span>
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <span style={{ color: '#6b7280' }}>GST (18%)</span>
//                 <span>₹{gst.toFixed(2)}</span>
//               </div>
//               <div style={{ height: 1, backgroundColor: '#e5e7eb', margin: '8px 0' }} />
//               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 'bold' }}>
//                 <span>TOTAL</span>
//                 <span>₹{total.toFixed(2)}</span>
//               </div>
//               {discount > 0 && (
//                 <div style={{ color: '#10b981', fontSize: 14 }}>
//                   You save ₹{discount.toFixed(2)}
//                 </div>
//               )}
//             </div>

//             {/* Coupon Section */}
//             <div style={{ marginBottom: 20 }}>
//               <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   placeholder="Enter coupon code"
//                   style={{
//                     flex: 1,
//                     padding: 10,
//                     borderRadius: 6,
//                     border: '1px solid #e5e7eb',
//                     fontSize: 14
//                   }}
//                 />
//                 <button 
//                   onClick={applyCoupon}
//                   style={{
//                     padding: '10px 20px',
//                     background: '#4f46e5',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: 6,
//                     cursor: 'pointer',
//                     fontSize: 14
//                   }}
//                 >
//                   Apply
//                 </button>
//               </div>
//               {couponApplied && (
//                 <div style={{ color: '#10b981', fontSize: 14 }}>
//                   ✓ Coupon applied: {couponApplied}
//                 </div>
//               )}
//             </div>

//             {/* Security Info */}
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: 8, 
//               marginBottom: 20,
//               fontSize: 12,
//               color: '#6b7280'
//             }}>
//               <LockIcon /> Secure Checkout - Your payment information is encrypted
//             </div>

//             {/* Checkout Button */}
//             <button 
//               onClick={checkout}
//               disabled={checkoutLoading}
//               style={{
//                 width: '100%',
//                 padding: 16,
//                 background: '#4f46e5',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 8,
//                 cursor: checkoutLoading ? 'not-allowed' : 'pointer',
//                 fontSize: 16,
//                 fontWeight: 'bold',
//                 transition: 'background 0.2s'
//               }}
//             >
//               {checkoutLoading ? 'Processing...' : 'PROCEED TO PAY'}
//             </button>

//             {checkoutError && (
//               <div style={{ marginTop: 12, color: '#ef4444', fontSize: 14 }}>
//                 {checkoutError}
//               </div>
//             )}

//             {/* Trust Badges */}
//             <div style={{ 
//               marginTop: 20, 
//               display: 'flex', 
//               justifyContent: 'space-around',
//               fontSize: 12,
//               color: '#6b7280'
//             }}>
//               <span><LockIcon /> Secure Payment</span>
//               <span>✓ Easy Returns</span>
//               <span>✓ Fast Delivery</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }













import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createOrder, createRazorpayOrder, getRazorpayConfig, verifyPayment } from './api'

// SVG Icons
const PackageIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
)

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
)

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const CreditCardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
)

const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
)

const ChevronIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
)

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

// Static "You may also like" strip (recommended items are static/decorative here —
// wire this up to your real recommendations data source if you have one)
const RECOMMENDED = [
  { id: 'r1', name: 'Fire-Boltt Ninja Call Pro', price: 1199, mrp: 2499, off: '52% OFF', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' },
  { id: 'r2', name: 'boAt Airdopes 141', price: 899, mrp: 1999, off: '55% OFF', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80' },
  { id: 'r3', name: 'Safari Pentagon Backpack', price: 1099, mrp: 2199, off: '50% OFF', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80' },
  { id: 'r4', name: 'Wild Stone Code', price: 299, mrp: 599, off: '50% OFF', image: 'https://images.unsplash.com/photo-1541643600914-78b0846838?auto=format&fit=crop&w=600&q=80' },
]

// Lets products already saved in localStorage (before image support was added)
// still display their matching catalogue image in the cart.
const PRODUCT_IMAGES = {
  p1: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  p2: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  p3: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  p4: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  p5: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80',
  p6: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
  p7: 'https://images.unsplash.com/photo-1541643600914-78b0846838?auto=format&fit=crop&w=600&q=80',
  p8: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
  p9: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
  p10: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80',
  p11: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80',
  p12: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80'
}

const PRODUCT_IMAGES_BY_NAME = {
  'boat rockerz 450': PRODUCT_IMAGES.p1,
  'realme narzo 70 pro 5g': PRODUCT_IMAGES.p2,
  'campus running shoes': PRODUCT_IMAGES.p3,
  'fire-boltt ninja call pro': PRODUCT_IMAGES.p4,
  'boat airdopes 141': PRODUCT_IMAGES.p5,
  'safari pentagon backpack': PRODUCT_IMAGES.p6,
  'wild stone code perfume': PRODUCT_IMAGES.p7,
  'wild stone code': PRODUCT_IMAGES.p7,
  'milton steel bottle': PRODUCT_IMAGES.p8,
  'wooden table lamp': PRODUCT_IMAGES.p9,
  'hp wireless mouse': PRODUCT_IMAGES.p10,
  'nivea men face wash': PRODUCT_IMAGES.p11,
  'prestige mixer grinder': PRODUCT_IMAGES.p12
}

function getProductImage(item) {
  const productName = String(item.name || '').trim().toLowerCase()
  return item.image || item.imageUrl || item.thumbnail || PRODUCT_IMAGES[item.id] || PRODUCT_IMAGES_BY_NAME[productName]
}

export default function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [selected, setSelected] = useState({})
  const [checkoutError, setCheckoutError] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [priceDetailsOpen, setPriceDetailsOpen] = useState(true)
  const [checkoutSuccess, setCheckoutSuccess] = useState(null)

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(c)
    const initialSelected = {}
    c.forEach(i => { initialSelected[i.id] = true })
    setSelected(initialSelected)
  }, [])

  function remove(id) {
    const next = cart.filter(i => i.id !== id)
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
    const nextSelected = { ...selected }
    delete nextSelected[id]
    setSelected(nextSelected)
  }

  function removeSelected() {
    const next = cart.filter(i => !selected[i.id])
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
    setSelected({})
  }

  function toggleSelect(id) {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function toggleSelectAll() {
    const allSelected = cart.every(i => selected[i.id])
    const next = {}
    cart.forEach(i => { next[i.id] = !allSelected })
    setSelected(next)
  }

  function updateQuantity(id, change) {
    const next = cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + change)
        return { ...item, quantity: newQty }
      }
      return item
    })
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const selectedItems = cart.filter(i => selected[i.id])
  const selectedCount = selectedItems.length

  const subtotal = selectedItems.reduce((s, it) => {
    const price = Number(String(it.price).replace(/[^0-9.-]+/g, ''))
    return s + (price * (it.quantity || 1))
  }, 0)

  const shippingCharges = 0 // FREE
  const packagingCharges = subtotal > 0 ? 49 : 0
  const taxableAmount = subtotal - discount
  const gst = taxableAmount * 0.18
  const total = taxableAmount + gst + shippingCharges + packagingCharges

  function applyCoupon() {
    if (couponCode.toUpperCase() === 'SAVE100') {
      setDiscount(100)
      setCouponApplied('SAVE100')
    } else if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscount(subtotal * 0.1)
      setCouponApplied('WELCOME10')
    } else if (couponCode.toUpperCase() === 'SHOP20') {
      setDiscount(subtotal * 0.2)
      setCouponApplied('SHOP20')
    } else {
      setCheckoutError('Invalid coupon code')
    }
  }

  async function saveOrder(status) {
    return createOrder({
      items: selectedItems.map(item => `${item.name} x${item.quantity || 1}`),
      total: `₹${total.toFixed(2)}`,
      status
    })
  }

  function completeCheckout(message) {
    const next = cart.filter(item => !selected[item.id])
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
    setSelected({})
    setCheckoutSuccess(message)
    window.setTimeout(() => navigate('/user-orders'), 2200)
  }

  async function checkout() {
    if (selectedItems.length === 0) return
    if (!address.trim()) {
      setCheckoutError('Please enter your delivery address')
      return
    }
    setCheckoutError(null)
    setCheckoutLoading(true)

    try {
      if (paymentMethod === 'cod') {
        await saveOrder('Placed (COD)')
        completeCheckout('Order placed successfully! Cash on Delivery selected.')
      } else {
        if (!window.Razorpay) {
          throw new Error('Razorpay checkout did not load. Check your internet connection and try again.')
        }

        const amountInPaise = Math.round(total * 100)
        const receipt = 'cart_order_' + Date.now()
        const [order, config] = await Promise.all([
          createRazorpayOrder(amountInPaise, receipt),
          getRazorpayConfig()
        ])
        if (!config.keyId) throw new Error('Razorpay key is not configured on the server.')

        const options = {
          key: config.keyId,
          amount: order.amount,
          currency: order.currency,
          name: 'ShopEase',
          description: 'Cart Payment',
          order_id: order.orderId,
          handler: async function (response) {
            try {
              const verification = await verifyPayment(
                response.razorpay_payment_id,
                response.razorpay_order_id,
                response.razorpay_signature
              )

              if (verification.success) {
                await saveOrder('Paid')
                completeCheckout('Payment successful! Order placed.')
              } else {
                setCheckoutError('Payment verification failed')
              }
            } catch (err) {
              setCheckoutError('Payment verification error: ' + err.message)
            }
            setCheckoutLoading(false)
          },
          prefill: {
            name: 'Customer',
            email: 'customer@example.com',
            contact: '9999999999'
          },
          // Take customers directly to Razorpay's UPI screen, where they can
          // scan the QR code with any supported UPI app.
          config: {
            display: {
              blocks: {
                upi: {
                  name: 'Scan QR code or pay with UPI',
                  instruments: [{ method: 'upi' }]
                }
              },
              sequence: ['block.upi'],
              preferences: { show_default_blocks: false }
            }
          },
          theme: { color: '#2563eb' },
          modal: {
            ondismiss: function () {
              setCheckoutLoading(false)
              setCheckoutError('Payment cancelled by user')
            }
          }
        }

        const rzp = new window.Razorpay(options)
        rzp.on('payment.failed', function (response) {
          setCheckoutLoading(false)
          setCheckoutError('Payment failed: ' + response.error.description)
        })

        rzp.open()
      }
    } catch (e) {
      const message = e.response?.data?.message || e.response?.statusText || e.message || 'Checkout failed'
      console.error('Checkout error', e)
      setCheckoutError(`Checkout failed: ${message}`)
      setCheckoutLoading(false)
    }
  }

  if (checkoutSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          background: 'rgba(15, 23, 42, 0.52)'
        }}
      >
        <div style={{ width: 'min(420px, 100%)', padding: '40px 32px', borderRadius: 20, background: '#fff', textAlign: 'center', boxShadow: '0 24px 60px rgba(15, 23, 42, 0.28)' }}>
          <div style={{ width: 76, height: 76, margin: '0 auto 20px', borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#dcfce7', color: '#16a34a' }}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12 4.2 4.2L19 6.8" />
            </svg>
          </div>
          <h2 style={{ margin: '0 0 10px', color: '#111827', fontSize: 24 }}>Order placed!</h2>
          <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>{checkoutSuccess}</p>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ marginBottom: 20, color: '#6b7280' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h2 style={{ marginBottom: 10 }}>Your Cart is Empty</h2>
        <p style={{ color: '#6b7280', marginBottom: 20 }}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/products">
          <button style={btnSecondary}>Continue Shopping</button>
        </Link>
      </div>
    )
  }

  const allSelected = cart.length > 0 && cart.every(i => selected[i.id])
  const savings = discount

  return (
    <div style={{ padding: '20px', maxWidth: 1400, margin: '0 auto', background: '#f5f6fa' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 12, color: '#6b7280', fontSize: 14 }}>
        <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>&gt;</span>
        <span>Cart</span>
      </div>

      {/* Page Title */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, display: 'inline' }}>My Cart </h1>
        <span style={{ fontSize: 18, color: '#2563eb', fontWeight: 600 }}>({cart.length} Items)</span>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        {/* Left Column - Cart Table */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 110px 130px 100px',
            padding: '16px 20px',
            fontSize: 13,
            fontWeight: 600,
            color: '#6b7280',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <span></span>
            <span>Product</span>
            <span style={{ textAlign: 'right' }}>Price</span>
            <span style={{ textAlign: 'center' }}>Quantity</span>
            <span style={{ textAlign: 'right' }}>Total</span>
          </div>

          {/* Rows */}
          {cart.map(item => {
            const price = Number(String(item.price).replace(/[^0-9.-]+/g, ''))
            const itemTotal = price * (item.quantity || 1)
            const imageUrl = getProductImage(item)
            return (
              <div key={item.id} style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 110px 130px 100px',
                alignItems: 'center',
                padding: '20px',
                borderBottom: '1px solid #f0f1f3'
              }}>
                {/* Checkbox */}
                <label style={checkboxWrap}>
                  <input
                    type="checkbox"
                    checked={!!selected[item.id]}
                    onChange={() => toggleSelect(item.id)}
                    style={{ display: 'none' }}
                  />
                  <span style={{ ...checkboxBox, ...(selected[item.id] ? checkboxBoxChecked : {}) }}>
                    {selected[item.id] && <CheckIcon />}
                  </span>
                </label>

                {/* Product Info */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{
                    width: 70, height: 70, flexShrink: 0, background: '#f3f4f6', borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af',
                    overflow: 'hidden', position: 'relative'
                  }}>
                    <div style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: '#64748b' }}>
                      <PackageIcon />
                      <div>Product</div>
                    </div>
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                        onError={(event) => { event.currentTarget.style.display = 'none' }}
                      />
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.name}</h3>
                    {item.category && <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 4 }}>{item.category}</p>}
                    <p style={{ color: '#16a34a', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>In Stock</p>
                    <div style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                      <button onClick={() => remove(item.id)} style={linkBtn}>Remove</button>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div style={{ textAlign: 'right', fontWeight: 600 }}>₹{price.toFixed(0)}</div>

                {/* Quantity */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 6 }}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={(item.quantity || 1) <= 1}
                      style={qtyBtn((item.quantity || 1) > 1)}
                    >−</button>
                    <span style={{ padding: '0 12px', fontWeight: 600, fontSize: 14 }}>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={qtyBtn(true)}>+</button>
                  </div>
                </div>

                {/* Total */}
                <div style={{ textAlign: 'right', fontWeight: 700 }}>₹{itemTotal.toFixed(0)}</div>
              </div>
            )
          })}

          {/* Select all / remove selected */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px'
          }}>
            <label style={checkboxWrap}>
              <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} style={{ display: 'none' }} />
              <span style={{ ...checkboxBox, ...(allSelected ? checkboxBoxChecked : {}) }}>
                {allSelected && <CheckIcon />}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Select All</span>
            </label>
            <button onClick={removeSelected} disabled={selectedCount === 0} style={removeSelectedBtn(selectedCount > 0)}>
              <TrashIcon /> Remove Selected
            </button>
          </div>

          {/* Delivery Address */}
          <div style={{ padding: 20, borderTop: '8px solid #f5f6fa' }}>
            <h3 style={{ fontSize: 15, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
              <LocationIcon /> Delivery Address
            </h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full delivery address"
              style={{
                width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e5e7eb',
                minHeight: 70, resize: 'vertical', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box'
              }}
              required
            />
          </div>

          {/* Payment Method */}
          <div style={{ padding: '0 20px 20px' }}>
            <h3 style={{ fontSize: 15, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
              <CreditCardIcon /> Payment Method
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { value: 'online', label: 'Online Payment (UPI QR)' },
                { value: 'cod', label: 'Cash on Delivery' }
              ].map(opt => (
                <label key={opt.value} style={{
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  padding: 12, border: `1px solid ${paymentMethod === opt.value ? '#2563eb' : '#e5e7eb'}`,
                  borderRadius: 8, background: paymentMethod === opt.value ? '#eff6ff' : '#fff'
                }}>
                  <input
                    type="radio"
                    value={opt.value}
                    checked={paymentMethod === opt.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span style={{ fontSize: 14 }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Coupon */}
          <div style={{ padding: '0 20px 20px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #e5e7eb', fontSize: 14, boxSizing: 'border-box' }}
              />
              <button onClick={applyCoupon} style={applyBtn}>Apply</button>
            </div>
            {couponApplied && (
              <div style={{ color: '#16a34a', fontSize: 13 }}>✓ Coupon applied: {couponApplied}</div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div style={{
          background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: 20,
          position: 'sticky', top: 20
        }}>
          <h3 style={{ fontSize: 16, marginBottom: 18, fontWeight: 700, letterSpacing: 0.3 }}>ORDER SUMMARY</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
            <div style={row}>
              <span style={rowLabel}>Price ({selectedCount} items)</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </div>
            {discount > 0 && (
              <div style={row}>
                <span style={{ color: '#16a34a' }}>Discount</span>
                <span style={{ color: '#16a34a' }}>−₹{discount.toFixed(0)}</span>
              </div>
            )}
            <div style={row}>
              <span style={rowLabel}>Subtotal</span>
              <span>₹{Math.max(subtotal - discount, 0).toFixed(0)}</span>
            </div>
          </div>

          {/* Collapsible price details */}
          <div style={{ borderTop: '1px solid #f0f1f3', borderBottom: '1px solid #f0f1f3', padding: '12px 0', marginBottom: 12 }}>
            <button
              onClick={() => setPriceDetailsOpen(o => !o)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 14 }}>Price Details</span>
              <ChevronIcon open={priceDetailsOpen} />
            </button>
            {priceDetailsOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                <div style={row}><span style={rowLabel}>Subtotal</span><span>₹{taxableAmount.toFixed(0)}</span></div>
                <div style={row}><span style={rowLabel}>Shipping Charges</span><span style={{ color: '#16a34a' }}>FREE</span></div>
                <div style={row}><span style={rowLabel}>Packaging Charges</span><span>₹{packagingCharges.toFixed(0)}</span></div>
                <div style={row}><span style={rowLabel}>GST (18%)</span><span>₹{gst.toFixed(0)}</span></div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Total Amount</span>
            <span style={{ fontSize: 20, fontWeight: 700 }}>₹{total.toFixed(0)}</span>
          </div>
          <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>(Inclusive of all taxes)</p>

          {savings > 0 && (
            <div style={{
              background: '#ecfdf5', color: '#16a34a', padding: '10px 14px', borderRadius: 8,
              fontSize: 13, fontWeight: 600, marginBottom: 16
            }}>
              ⊕ You will save ₹{savings.toFixed(0)} on this order
            </div>
          )}

          <button onClick={checkout} disabled={checkoutLoading} style={checkoutBtn(checkoutLoading)}>
            🔒 {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
          </button>

          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button style={continueBtn}>
              <BackIcon /> Continue Shopping
            </button>
          </Link>

          {checkoutError && (
            <div style={{ marginTop: 12, color: '#ef4444', fontSize: 13 }}>{checkoutError}</div>
          )}
        </div>
      </div>

      {/* Safe payments note under summary column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, marginTop: 12 }}>
        <div></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6b7280', fontSize: 13, padding: '0 4px' }}>
          <ShieldIcon />
          <div>
            <div style={{ fontWeight: 600, color: '#374151' }}>Safe and Secure Payments</div>
            <div>100% Authentic Products</div>
          </div>
        </div>
      </div>

      {/* You may also like */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>You may also like</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {RECOMMENDED.map(p => (
            <div key={p.id} style={{
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16
            }}>
              <div style={{
                width: '100%', height: 130, background: '#f3f4f6', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', marginBottom: 12
              }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                    event.currentTarget.nextElementSibling.style.display = 'block'
                  }}
                />
                <span style={{ display: 'none' }}><PackageIcon /></span>
              </div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{p.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <span style={{ fontWeight: 700 }}>₹{p.price}</span>
                <span style={{ color: '#9ca3af', textDecoration: 'line-through', fontSize: 13 }}>₹{p.mrp}</span>
                <span style={{ color: '#16a34a', fontSize: 12, fontWeight: 600 }}>{p.off}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature strip */}
      <div style={{
        marginTop: 40, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
        padding: '24px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16
      }}>
        {[
          { title: 'Free Delivery', desc: 'Free delivery on orders above ₹499' },
          { title: 'Easy Returns', desc: '30 days easy returns & refunds' },
          { title: 'Secure Payment', desc: '100% secure payments' },
          { title: 'Best Price', desc: 'Best price guaranteed' },
        ].map(f => (
          <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: '#eff6ff', color: '#2563eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <ShieldIcon />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---- shared style helpers ----
const row = { display: 'flex', justifyContent: 'space-between', fontSize: 14 }
const rowLabel = { color: '#6b7280' }

const checkboxWrap = { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }
const checkboxBox = {
  width: 18, height: 18, borderRadius: 4, border: '1.5px solid #d1d5db',
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
}
const checkboxBoxChecked = { background: '#2563eb', borderColor: '#2563eb' }

const linkBtn = { background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: 13, padding: 0 }

const qtyBtn = (enabled) => ({
  padding: '6px 12px', border: 'none', background: '#f3f4f6',
  cursor: enabled ? 'pointer' : 'not-allowed', fontSize: 15, opacity: enabled ? 1 : 0.5
})

const removeSelectedBtn = (enabled) => ({
  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
  border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6,
  fontSize: 13, color: enabled ? '#ef4444' : '#d1d5db', cursor: enabled ? 'pointer' : 'not-allowed'
})

const applyBtn = {
  padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none',
  borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 600
}

const checkoutBtn = (loading) => ({
  width: '100%', padding: 14, background: '#2563eb', color: '#fff', border: 'none',
  borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15,
  fontWeight: 700, marginBottom: 10, opacity: loading ? 0.7 : 1
})

const continueBtn = {
  width: '100%', padding: 12, background: '#fff', color: '#2563eb', border: '1px solid #2563eb',
  borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600,
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
}

const btnSecondary = {
  padding: '10px 20px', background: '#fff', border: '1px solid #2563eb',
  color: '#2563eb', borderRadius: 6, cursor: 'pointer', fontWeight: 600
}
