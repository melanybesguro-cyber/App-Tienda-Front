import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/client';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setError('');

    try {
      // Enviar lista de productos con id y cantidad segun especifica la API de Rails
      const payload = {
        products: cart.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        }))
      };

      await api.post('/orders', payload);
      clearCart();
      alert('¡Pedido realizado con éxito!');
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.errors?.join(', ') || 'Error al procesar el pedido. Revisa el stock.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--customer-bg)', minHeight: 'calc(100vh - 70px)', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ color: 'var(--customer-text)', marginBottom: '1.5rem' }}>Mi Carrito</h1>

        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div className="card" style={{ padding: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--customer-border)' }}>
                  <th style={{ padding: '0.8rem' }}>Producto</th>
                  <th style={{ padding: '0.8rem' }}>Cantidad</th>
                  <th style={{ padding: '0.8rem' }}>Precio</th>
                  <th style={{ padding: '0.8rem' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.product_id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.8rem' }}>{item.name}</td>
                    <td style={{ padding: '0.8rem' }}>{item.quantity}</td>
                    <td style={{ padding: '0.8rem' }}>${item.price * item.quantity}</td>
                    <td style={{ padding: '0.8rem' }}>
                      <button 
                        onClick={() => removeFromCart(item.product_id)} 
                        style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--customer-text)' }}>
                Total: ${getTotal()}
              </h3>
              <button 
                onClick={handleConfirmOrder} 
                disabled={loading}
                className="btn btn-primary-customer" 
                style={{ marginTop: '1rem', fontSize: '1.1rem' }}
              >
                {loading ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}