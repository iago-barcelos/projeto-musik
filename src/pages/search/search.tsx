import { useContext, useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import AlbumDisplay from '../../components/Album/AlbumDisplay';
import { AlbumContext } from '../../context/AlbumContext';

type FormValuesTypes = {
  term: string,
};

const initialFormValues = {
  term: '',
};

function Search() {
  const [formValues, setFormValues] = useState<FormValuesTypes>(initialFormValues);

  const albumContext = useContext(AlbumContext)

  if (!albumContext) {
    throw new Error("Contexto não encontrado");
  }

  const { albums, setAlbums, artist, setArtist } = albumContext

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
            {artist}
          </p>
          <div className="search-div-container">
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
    </>
  );
}

export default Search;
