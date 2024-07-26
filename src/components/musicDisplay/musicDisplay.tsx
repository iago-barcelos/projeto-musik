import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import EmptyHeart from '../../images/empty_heart.png';
import CheckedHeart from '../../images/checked_heart.png';
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
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label htmlFor={ heartId }>
        <img
          src={ checked ? CheckedHeart : EmptyHeart }
          alt="favorite"
        />
      </label>
      <input
        type="checkbox"
        id={ heartId }
        data-testid={ `checkbox-music-${trackId}` }
        style={ { display: 'none' } }
        checked={ checked }
        onChange={ handleOnChange }
      />
    </div>
  );
}
export default MusicDisplay;
