import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';

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
    <div
      className="login-page"
    >
      <form className="login-form-container">
        <input
          placeholder="qual é o seu nome?"
          type="text"
          className="login-form-input"
          id="name"
          name="name"
          onChange={ handleInputChange }
        />
        <button
          type="submit"
          className="login-form-button"
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
