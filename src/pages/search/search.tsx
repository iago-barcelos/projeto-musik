import { useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import Loading from '../../components/loading/loading';
import AlbumDisplay from '../../components/album/albumDisplay';

type FormValuesTypes = {
  term: string,
};

const initialFormValues = {
  term: '',
};

function Search() {
  const [formValues, setFormValues] = useState<FormValuesTypes>(initialFormValues);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchedArtist, setSearchedArtist] = useState<string>('');

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
    const data = await searchAlbumsAPI(formValues.term);
    console.log(data);
    setAlbums(data);
    setSearchedArtist(formValues.term);
    setFormValues(initialFormValues);
  };

  const validateForm = () => formValues.term.length >= 2;

  return (
    <>
      <form>
        <input
          data-testid="search-artist-input"
          id="term"
          name="term"
          onChange={ handleChange }
          type="text"
        />
        <button
          data-testid="search-artist-button"
          disabled={ !validateForm() }
          onClick={ handleSubmit }
          type="submit"
        >
          Pesquisar
        </button>
      </form>
      {albums.length > 0 && (
        <div>
          <p>
            Resultado de álbuns de:
            {' '}
            {searchedArtist}
          </p>
          <div>
            {albums.map((album) => (
              <AlbumDisplay album={ album } key={ album.collectionId } />
            ))}
          </div>
        </div>
      )}
      {albums.length === 0 && searchedArtist.length > 1 && (
        <div>
          <p>Nenhum álbum foi encontrado</p>
        </div>
      )}
    </>
  );
}

export default Search;
