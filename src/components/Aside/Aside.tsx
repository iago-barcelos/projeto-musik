import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

function Aside() {
  const [user, setUser] = useState<UserType>();

  const location = useLocation();

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    getUserData();
  }, [user]);

  if (location.pathname === '/') {
    return null;
  }

  return (
    <header className="sidebar">
      <p className="aside-username-p">{user?.name}</p>
      <nav className="aside-nav-container">
        <NavLink
          to="/search"
          className="aside-nav-button"
        >
          Pesquisar
        </NavLink>

        <NavLink
          to="/favorites"
          className="aside-nav-button"
        >
          Favoritas
        </NavLink>

        <NavLink
          to="/profile"
          className="aside-nav-button"
        >
          Perfil
        </NavLink>
      </nav>
    </header>
  );
}

export default Aside;
