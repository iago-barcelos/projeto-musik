import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

function Profile() {
  const [userValue, setUserValue] = useState<UserType>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getUser();
      setUserValue(user);
      console.log(user);
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <div>
        <img src={ userValue?.image } alt="Profile" />
        <a href="/profile/edit">Editar Perfil</a>
      </div>
      <div>
        <h3>Nome</h3>
        <p>{ userValue?.name }</p>
        <h3>E-mail</h3>
        <p>{ userValue?.email }</p>
        <h3>Descrição</h3>
        <p>{ userValue?.description }</p>
      </div>
    </div>
  );
}

export default Profile;
