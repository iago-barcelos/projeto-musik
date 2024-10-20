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
    <aside className="aside-container">
      <p className="aside-username-p">{user?.name}</p>
      <nav className="aside-nav-container">
        <NavLink
          to="/search"
          className="aside-nav-button"
        >
          <div className="aside-nav-button-content">
            <FaSearch className="aside-nav-button-icon" />
            Pesquisar
          </div>
        </NavLink>

        <NavLink
          to="/favorites"
          className="aside-nav-button"
        >
          <div>
            <MdFavorite className="aside-nav-button-icon" />
            Favoritas
          </div>
        </NavLink>

        <NavLink
          to="/profile"
          className="aside-nav-button"
        >
          <div>
            <FaUser className="aside-nav-button-icon" />
            Perfil
          </div>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Aside;
