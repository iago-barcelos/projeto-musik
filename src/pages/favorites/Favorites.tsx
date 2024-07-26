import { useEffect, useState } from 'react';
import MusicDisplay from '../../components/musicDisplay/musicDisplay';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import Loading from '../../components/loading/loading';

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
    setUpdateTrigger(!updateTrigger); // Atualiza o estado para disparar o useEffect
  };

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
