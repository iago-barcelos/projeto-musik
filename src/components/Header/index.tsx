import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../Loading/loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

function Header() {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    };

    getUserData();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <header data-testid="header-component">
      <p data-testid="header-user-name">{user?.name}</p>
      <nav>
        <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favoritas</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </nav>
    </header>
  );
}

export default Header;
