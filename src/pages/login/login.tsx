import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading/loading';

type FormType = {
  name: string
};

const userObject = {
  name: '',
};

function Login() {
  const [inputLogin, setInputLogin] = useState<FormType>(userObject);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, type } = event.target;
    const value = type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;
    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);
    const user = await createUser(inputLogin);
    if (user) navigate('/search');
  };

  function inputLoginValidation() {
    return inputLogin.name.length >= 3;
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <form>
        <label>
          Nome de Usuário
          <input
            type="text"
            data-testid="login-name-input"
            id="name"
            name="name"
            onChange={ handleInputChange }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ !inputLoginValidation() }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
