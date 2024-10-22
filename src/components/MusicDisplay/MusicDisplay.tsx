import { useEffect, useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

type MusicCardPropsTypes = {
  music: SongType,
  onRemoveFavorite: (trackId: number) => void,
};

function MusicDisplay({ music, onRemoveFavorite } : MusicCardPropsTypes) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const favoriteSongs = await getFavoriteSongs();
      const isFavorite = favoriteSongs.some((song) => song.trackId === music.trackId);
      setChecked(isFavorite);
    };

    fetchFavoriteSongs();
  }, [music.trackId]);

  const handleOnChange = async () => {
    if (!checked) {
      await addSong(music);
    } else {
      onRemoveFavorite(music.trackId);
      await removeSong(music);
    }

    setChecked(!checked);
    console.log(await getFavoriteSongs());
  };

  const { trackId, trackName, previewUrl } = music;
  const heartId = `heart-${trackId}`;

  return (
    <div className="music-display-container">
      <p>{trackName}</p>
      <div className="music-display-audio-input">
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ heartId }>
          {checked
            ? <MdFavorite className="music-display-svg-checked" />
            : <MdFavoriteBorder className="music-display-svg-unchecked" />}
        </label>
        <input
          type="checkbox"
          id={ heartId }
          style={ { display: 'none' } }
          checked={ checked }
          onChange={ handleOnChange }
        />
      </div>
    </div>
  );
}
export default MusicDisplay;
