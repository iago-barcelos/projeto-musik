import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
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
          <FaSearch className="aside-nav-button-icon" />
          Pesquisar
        </NavLink>

        <NavLink
          to="/favorites"
          className="aside-nav-button"
        >
          <MdFavorite className="aside-nav-button-icon" />
          Favoritas
        </NavLink>

        <NavLink
          to="/profile"
          className="aside-nav-button"
        >
          <FaUser className="aside-nav-button-icon" />
          Perfil
        </NavLink>
      </nav>
    </header>
  );
}

export default Aside;
