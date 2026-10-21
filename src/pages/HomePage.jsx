import { Link } from 'react-router-dom';

export default function HomePage() {
  const categoriasDestacadas = ['Pinturas', 'Ilustraciones', 'Retratos'];

  return (
    <div style={{ backgroundColor: 'var(--customer-bg)', minHeight: 'calc(100vh - 70px)' }}>
      <header style={{ 
        padding: '4rem 0', 
        textAlign: 'center', 
        borderBottom: '1px solid var(--customer-border)',
        backgroundColor: 'white'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', color: 'var(--customer-text)', marginBottom: '1rem' }}>
            Arte hecho a mano
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
            Descubre piezas únicas creadas por artistas independientes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/store" className="btn btn-primary-customer">Ver productos</Link>
            <Link to="/commissions" className="btn" style={{ backgroundColor: '#e0e0e0', color: '#333' }}>Ver comisiones</Link>
          </div>
        </div>
      </header>

      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <h2 style={{ color: 'var(--customer-text)', marginBottom: '1.5rem' }}>Categorías</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {categoriasDestacadas.map(cat => (
              <div key={cat} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--customer-primary)' }}>{cat}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>Explora obras únicas en esta categoría.</p>
                <Link to={`/store?category=${cat.toLowerCase()}`} className="btn" style={{ backgroundColor: '#f0f0f0', color: 'var(--customer-text)', fontSize: '0.9rem' }}>
                  Ver más
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}