import { useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import AlbumDisplay from '../../components/Album/AlbumDisplay';
import { useAlbumContext } from '../../hooks/UseAlbumContext';

type FormValuesTypes = {
  term: string,
};

const initialFormValues = {
  term: '',
};

function Search() {
  const [formValues, setFormValues] = useState<FormValuesTypes>(initialFormValues);

  const albumContext = useAlbumContext();

  const { albums, setAlbums, artist, setArtist } = albumContext;

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, type } = event.target;
    const value = type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const data: AlbumType[] = await searchAlbumsAPI(formValues.term);
    setAlbums(data);
    setArtist(formValues.term);
    setFormValues(initialFormValues);
    console.log(data);
  };

  const validateForm = () => formValues.term.length >= 2;

  return (
    <div className="search-main-div-container">
      <form className="search-form">
        <input
          id="term"
          name="term"
          onChange={ handleChange }
          placeholder="Pesquise por um artista"
          type="text"
          className="search-form-input"
        />
        <button
          disabled={ !validateForm() }
          onClick={ handleSubmit }
          type="submit"
          className="search-form-button"
        >
          Pesquisar
        </button>
      </form>
      {albums.length > 0 && (
        <div className="search-result-div-container">
          <p>
            Resultado de álbuns de:
            {' '}
            {artist}
          </p>
          <div className="search-albums-div">
            {albums.map((album) => (
              <AlbumDisplay album={ album } key={ album.collectionId } />
            ))}
          </div>
        </div>
      )}
      {albums.length === 0 && artist.length > 1 && (
        <div>
          <p>Nenhum álbum foi encontrado</p>
        </div>
      )}
    </div>
  );
}

export default Search;
