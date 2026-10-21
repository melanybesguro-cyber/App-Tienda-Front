import { useEffect, useState } from 'react';
import api from '../api/client';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/orders')
      .then((res) => setOrders(res.data))
      .catch(() => setError('Error al cargar el historial de pedidos.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Cargando tus pedidos...</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>;

  return (
    <div style={{ backgroundColor: 'var(--customer-bg)', minHeight: 'calc(100vh - 70px)', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ color: 'var(--customer-text)', marginBottom: '1.5rem' }}>Mis Pedidos</h1>

        {orders.length === 0 ? (
          <p>Aún no realizaste ningún pedido.</p>
        ) : (
          <div className="card" style={{ padding: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--customer-border)' }}>
                  <th style={{ padding: '0.8rem' }}># ID</th>
                  <th style={{ padding: '0.8rem' }}>Fecha</th>
                  <th style={{ padding: '0.8rem' }}>Total</th>
                  <th style={{ padding: '0.8rem' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>#{String(order.id).padStart(3, '0')}</td>
                    <td style={{ padding: '0.8rem' }}>
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : '---'}
                    </td>
                    <td style={{ padding: '0.8rem' }}>${order.total || '0.00'}</td>
                    <td style={{ padding: '0.8rem' }}>
                      <span style={{ 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '4px', 
                        fontSize: '0.85rem',
                        backgroundColor: order.status === 'completed' ? '#d4edda' : '#fff3cd',
                        color: order.status === 'completed' ? '#155724' : '#856404'
                      }}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}