import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isRegister) {
        await axios.post('http://localhost:5000/api/register', { name, email, password });
        setMessage('Account created! Please login.');
        setIsRegister(false);
      } else {
        const res = await axios.post('http://localhost:5000/api/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('userId', res.data.userId);
        setUser(res.data.name);
      }
    } catch (err) {
      setMessage('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '48px',
        width: '420px',
        position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.4)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>◈</div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '28px', fontWeight: 700,
            color: 'var(--accent)', marginBottom: '6px'
          }}>ShopEasy</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            {isRegister ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        {isRegister && (
          <input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
          />
        )}
        <input
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', padding: '14px',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          color: '#000', border: 'none', borderRadius: '12px',
          cursor: 'pointer', fontSize: '15px', fontWeight: 600,
          fontFamily: 'DM Sans, sans-serif',
          marginTop: '8px',
          opacity: loading ? 0.7 : 1,
          transition: 'all 0.2s',
          letterSpacing: '0.3px'
        }}>
          {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
        </button>

        {message && (
          <p style={{
            marginTop: '16px', textAlign: 'center',
            color: message.includes('created') ? 'var(--green)' : 'var(--red)',
            fontSize: '13px'
          }}>{message}</p>
        )}

        <p
          onClick={() => { setIsRegister(!isRegister); setMessage(''); }}
          style={{
            marginTop: '20px', textAlign: 'center',
            cursor: 'pointer', color: 'var(--muted)',
            fontSize: '13px', transition: 'color 0.2s'
          }}
        >
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
            {isRegister ? 'Sign In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '13px 16px',
  marginBottom: '12px', borderRadius: '12px',
  border: '1px solid var(--border)',
  background: 'var(--card)',
  color: 'var(--text)', fontSize: '14px',
  fontFamily: 'DM Sans, sans-serif',
  outline: 'none', display: 'block',
  transition: 'border-color 0.2s'
};

export default Login;