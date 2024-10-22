import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../services/userAPI';

function ProfileEditForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    description: '',
    image: '',
  });

  const [buttonEnable, setButtonEnable] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const allFieldsFilled = Object
      .values(formValues).every((value) => value.trim() !== '');
    setButtonEnable(allFieldsFilled);
  }, [formValues]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));

    if (id === 'email') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailError(emailPattern
        .test(value) ? null : 'Por favor, insira um email válido.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateUser(formValues);
    navigate('/profile');
  };

  return (
    <div>
      <form
        action="submit"
        onSubmit={ handleSubmit }
      >
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          value={ formValues.name }
          onChange={ handleInputChange }
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={ formValues.email }
          onChange={ handleInputChange }
          required
        />
        { emailError && <span style={ { color: 'red' } }>{ emailError }</span> }

        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          value={ formValues.description }
          onChange={ handleInputChange }
          required
        />

        <label htmlFor="image">Foto</label>
        <input
          type="text"
          id="image"
          value={ formValues.image }
          onChange={ handleInputChange }
          required
        />

        <button
          type="submit"
          disabled={ !buttonEnable }
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default ProfileEditForm;
