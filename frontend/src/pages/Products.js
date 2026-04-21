import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products({ user }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = async (product_id) => {
    const userId = parseInt(localStorage.getItem('userId')) || 1;
    try {
      await axios.post('http://localhost:5000/api/cart', {
        user_id: userId,
        product_id: product_id,
        quantity: 1
      });
      setMessage('Added to cart successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch(err) {
      setMessage('Error adding to cart!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: '1px solid #ddd', borderRadius: '10px',
            padding: '20px', width: '200px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3>{product.name}</h3>
            <p style={{ color: 'gray' }}>{product.description}</p>
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              ₹{product.price}
            </p>
            <button onClick={() => addToCart(product.id)} style={{
              width: '100%', padding: '8px',
              backgroundColor: '#2196F3', color: 'white',
              border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;