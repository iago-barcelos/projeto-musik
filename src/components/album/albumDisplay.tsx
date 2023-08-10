import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';

type AlbumDisplayTypeProps = {
  album: AlbumType,
};

function AlbumDisplay({ album }: AlbumDisplayTypeProps) {
  const {
    artistName,
    artworkUrl100,
    collectionId,
    collectionName,
  } = album;

  return (
    <div>
      <img src={ artworkUrl100 } alt={ collectionName } />
      <p>{collectionName}</p>
      <p>{artistName}</p>
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        Ver Álbum

      </Link>
    </div>
  );
}

export default AlbumDisplay;
