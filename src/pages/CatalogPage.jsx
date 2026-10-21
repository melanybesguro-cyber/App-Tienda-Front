import { useEffect, useState } from 'react';
import api from '../api/client';
import { useCart } from '../context/CartContext';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setError('Error al cargar el catálogo de productos.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Cargando catálogo...</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>;

  return (
    <div style={{ backgroundColor: 'var(--customer-bg)', minHeight: 'calc(100vh - 70px)', padding: '2rem 0' }}>
      <div className="container">
        <h1 style={{ color: 'var(--customer-text)', marginBottom: '1.5rem' }}>Productos</h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {products.map((product) => (
            <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ 
                height: '180px', 
                backgroundColor: '#e0e0e0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#888'
              }}>
                IMAGEN
              </div>
              <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--customer-text)' }}>{product.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>{product.description}</p>
                </div>
                <div>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--customer-primary)', margin: '0 0 1rem 0' }}>
                    ${product.price}
                  </p>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      alert(`${product.name} añadido al carrito`);
                    }} 
                    className="btn btn-primary-customer" 
                    style={{ width: '100%', fontSize: '0.9rem' }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}