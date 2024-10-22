import { useEffect, useState } from 'react';
import MusicDisplay from '../../components/MusicDisplay/MusicDisplay';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';

function Favorites() {
  const [musicValue, setMusicValue] = useState<SongType[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavoriteMusics = async () => {
      const favoriteMusics = await getFavoriteSongs();
      setMusicValue(favoriteMusics);
    };

    fetchFavoriteMusics();
  }, [updateTrigger]);

  const handleRemoveFavorite = (trackId: number) => {
    setMusicValue(
      (prevMusicValue) => prevMusicValue.filter((music) => music.trackId !== trackId),
    );
    setUpdateTrigger(!updateTrigger);
  };

  if (musicValue.length === 0) {
    return (
      <h2>Você não possui músicas favoritadas</h2>
    );
  }

  return (
    <div>
      {musicValue?.map((music) => (
        <MusicDisplay
          music={ music }
          key={ music.trackId }
          onRemoveFavorite={ handleRemoveFavorite }
        />
      ))}
    </div>
  );
}

export default Favorites;
