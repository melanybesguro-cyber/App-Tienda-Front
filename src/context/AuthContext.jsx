import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/profile')
        .then((res) => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    const userToken = res.data.token || res.data.api_token;
    localStorage.setItem('token', userToken);
    setToken(userToken);
    
    // Obtener perfil o guardar datos devueltos
    if (res.data.user) {
      setUser(res.data.user);
    } else {
      const profileRes = await api.get('/profile');
      setUser(profileRes.data);
    }
    return res.data;
  };

  const register = async (userData) => {
    const res = await api.post('/register', { user: userData });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);