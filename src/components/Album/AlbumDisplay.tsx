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

  const explicitOrCensored = () => {
    switch (album.collectionExplicitness) {
      case "explicit":
        return "Explicit Version"
      case "cleaned": 
        return "Cleaned Version"
      default:
        return ""
    }
  } 

  return (
    <Link
      to={ `/album/${collectionId}` }
      className="album-display-div"
    >
      <div
        className="album-image"
        style={ { backgroundImage: `url(${artworkUrl100})` } }
      />
      <div className="album-info">
        <p className="album-title">{`${collectionName} - ${ explicitOrCensored() }`}</p>
        <p className="album-author">{artistName}</p>
      </div>
    </Link>
  );
}

export default AlbumDisplay;