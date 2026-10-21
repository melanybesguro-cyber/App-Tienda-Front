import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{ 
      padding: '1rem', 
      backgroundColor: 'white', 
      borderBottom: '1px solid var(--customer-border)', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>
          <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.4rem', textDecoration: 'none', color: 'var(--customer-text)' }}>
            🎨 Artelier Store
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: 'var(--customer-text)' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
          <Link to="/store" style={{ textDecoration: 'none', color: 'inherit' }}>Tienda</Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            🛒 Mi carrito ({totalItems})
          </Link>
          {user ? (
            <>
              <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>Mis Pedidos</Link>
              <Link to="/commissions" style={{ textDecoration: 'none', color: 'inherit' }}>Comisiones</Link>
              <button onClick={handleLogout} className="btn btn-primary-customer" style={{ padding: '0.4rem 0.8rem' }}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Iniciar Sesión</Link>
              <Link to="/register" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '500' }}>Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}