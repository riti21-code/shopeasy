import React, { useState } from 'react';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './pages/Cart';
import './index.css';

function App() {
  const [user, setUser] = useState(localStorage.getItem('name') || '');
  const [page, setPage] = useState('products');
  const [cartCount, setCartCount] = useState(0);

  const logout = () => {
    localStorage.clear();
    setUser('');
  };

  if (!user) return <Login setUser={setUser} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* NAVBAR */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 48px',
        background: 'rgba(13,13,20,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>◈</span>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '22px', fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '1px'
          }}>ShopEasy</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setPage('products')} style={{
            background: page === 'products' ? 'var(--accent)' : 'transparent',
            color: page === 'products' ? '#000' : 'var(--muted)',
            border: '1px solid ' + (page === 'products' ? 'var(--accent)' : 'var(--border)'),
            padding: '8px 20px', borderRadius: '100px',
            cursor: 'pointer', fontSize: '14px', fontWeight: 500,
            transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif'
          }}>Products</button>

          <button onClick={() => setPage('cart')} style={{
            background: page === 'cart' ? 'var(--accent)' : 'transparent',
            color: page === 'cart' ? '#000' : 'var(--muted)',
            border: '1px solid ' + (page === 'cart' ? 'var(--accent)' : 'var(--border)'),
            padding: '8px 20px', borderRadius: '100px',
            cursor: 'pointer', fontSize: '14px', fontWeight: 500,
            transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif'
          }}>🛒 Cart</button>

          <div style={{
            width: '1px', height: '24px',
            background: 'var(--border)', margin: '0 8px'
          }} />

          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
            Hi, <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{user}</span>
          </span>

          <button onClick={logout} style={{
            background: 'transparent',
            color: 'var(--red)',
            border: '1px solid var(--red)',
            padding: '8px 16px', borderRadius: '100px',
            cursor: 'pointer', fontSize: '13px',
            fontFamily: 'DM Sans, sans-serif'
          }}>Logout</button>
        </div>
      </nav>

      {page === 'products' && <Products />}
      {page === 'cart' && <Cart />}
    </div>
  );
}

export default App;