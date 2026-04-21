import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ordered, setOrdered] = useState(false);

  const fetchCart = () => {
    const userId = localStorage.getItem('userId') || 1;
    axios.get(`http://localhost:5000/api/cart/${userId}`)
      .then(res => {
        setCartItems(res.data);
        const sum = res.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(sum);
        setLoading(false);
      });
  };

  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    fetchCart();
  };

  if (ordered) return (
    <div style={{
      minHeight: '70vh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', color: 'var(--accent)', marginBottom: '12px' }}>
        Order Placed!
      </h2>
      <p style={{ color: 'var(--muted)' }}>Thank you for your purchase.</p>
    </div>
  );

  return (
    <div style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '36px' }}>
        <p style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
          Your Selection
        </p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', color: 'var(--text)' }}>
          Shopping Cart
        </h2>
      </div>

      {loading ? (
        <p style={{ color: 'var(--muted)' }}>Loading...</p>
      ) : cartItems.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px',
          background: 'var(--card)', borderRadius: '20px',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
          <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 24px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                transition: 'border-color 0.2s'
              }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{item.name}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Qty: {item.quantity}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '18px', fontWeight: 700, color: 'var(--accent)'
                  }}>₹{Number(item.price).toLocaleString()}</span>
                  <button onClick={() => removeItem(item.id)} style={{
                    background: 'rgba(224,85,85,0.1)',
                    border: '1px solid rgba(224,85,85,0.3)',
                    color: 'var(--red)', borderRadius: '8px',
                    padding: '6px 12px', cursor: 'pointer',
                    fontSize: '12px', fontFamily: 'DM Sans, sans-serif'
                  }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px', padding: '28px 32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>Total Amount</span>
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '28px', fontWeight: 700, color: 'var(--accent)'
              }}>₹{total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setOrdered(true)}
              style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                color: '#000', border: 'none', borderRadius: '12px',
                cursor: 'pointer', fontSize: '16px', fontWeight: 700,
                fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.5px'
              }}>
              Place Order →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;