import { Link } from 'react-router-dom';
import { AlbumType } from '../../types';

type AlbumTypeProps = {
  album: AlbumType,
};

function Album({ album }: AlbumTypeProps) {
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

export default Album;
