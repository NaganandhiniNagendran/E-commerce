import React, { useState } from 'react'
import { createRazorpayOrder, getRazorpayConfig, verifyPayment } from './api'

export default function Payment() {
  const [amount, setAmount] = useState(100)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Step 1: Create order
      const receipt = 'order_' + Date.now()
      if (!window.Razorpay) {
        throw new Error('Razorpay checkout did not load. Check your internet connection and try again.')
      }

      const [order, config] = await Promise.all([
        createRazorpayOrder(amount, receipt),
        getRazorpayConfig()
      ])
      if (!config.keyId) throw new Error('Razorpay key is not configured on the server.')

      // Step 2: Open Razorpay checkout
      const options = {
        key: config.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'EastCart',
        description: 'Payment for order',
        order_id: order.orderId,
        handler: async function (response) {
          // Step 3: Verify payment on success
          try {
            const verification = await verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            )
            
            if (verification.success) {
              setSuccess(true)
            } else {
              setError('Payment verification failed')
            }
          } catch (err) {
            setError('Payment verification error: ' + err.message)
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
            setError('Payment cancelled by user')
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response) {
        setLoading(false)
        setError('Payment failed: ' + response.error.description)
      })
      
      rzp.open()
    } catch (err) {
      setError('Failed to create order: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="payment-container">
      <h2>Razorpay Payment</h2>
      
      <div className="payment-form">
        <label>
          <span>Amount (₹)</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            min="1"
            step="1"
          />
        </label>

        <button 
          onClick={handlePayment} 
          disabled={loading}
          className="pay-button"
        >
          {loading ? 'Processing...' : 'Pay ₹' + (amount / 100)}
        </button>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">Payment successful!</div>}
      </div>
    </div>
  )
}
