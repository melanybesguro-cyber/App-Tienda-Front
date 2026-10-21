import { useState } from 'react';
import api from '../api/client';

export default function CommissionsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // 1. Crear un pedido automático para satisfacer la validación de Rails
      const orderRes = await api.post('/orders', { products: [] });
      const newOrderId = orderRes.data.id || orderRes.data.order?.id;

      // 2. Enviar la comisión asociada a ese nuevo pedido
      await api.post('/commissions', {
        order_id: newOrderId,
        title,
        description,
        deadline
      });

      setMessage('¡Solicitud de comisión enviada con éxito al artista!');
      setTitle('');
      setDescription('');
      setDeadline('');
    } catch (err) {
      console.error('Error al enviar la comisión:', err);
      const apiErrors = err.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        setError(apiErrors.join(', '));
      } else if (err.response?.data?.error) {
        setError(err.response?.data?.error);
      } else {
        setError('Error al enviar la solicitud de comisión. Verifica que hayas iniciado sesión.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--customer-bg)', minHeight: 'calc(100vh - 70px)', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 style={{ color: 'var(--customer-text)', marginBottom: '0.5rem' }}>Solicitar Comisión</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Encargá un trabajo personalizado (retrato, ilustración o pintura a medida).
        </p>

        <div className="card" style={{ padding: '2rem' }}>
          {message && <p style={{ color: 'green', marginBottom: '1rem', fontWeight: 'bold' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>
                Tipo o título de la obra personalizada:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Retrato en acuarela de mi mascota"
                required
                style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>
                Descripción y especificaciones del encargo:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describí los detalles: colores, tamaño, personaje, estilo deseado..."
                required
                rows={5}
                style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>
                Fecha límite deseada de entrega:
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary-customer" style={{ marginTop: '0.5rem' }}>
              {loading ? 'Enviando encargo...' : 'Enviar solicitud'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}