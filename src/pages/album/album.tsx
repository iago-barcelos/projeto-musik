import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../../types';
import MusicDisplay from '../../components/musicDisplay/musicDisplay';
import getMusics from '../../services/musicsAPI';

function Album() {
  const [albumValue, setAlbumValue] = useState<AlbumType>();
  const [musicValue, setMusicValue] = useState<SongType[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const data = await getMusics(id);
        setAlbumValue(data[0]);
        const musics = data.filter((item, index) => index !== 0);
        setMusicValue(musics as SongType[]);
      }
    };

    getData();
  }, [id]);

  const removeFavoriteMusic = (trackId: number) => {
    setMusicValue(
      (prevMusicValue) => prevMusicValue.filter((music) => music.trackId !== trackId),
    );
  };

  return (
    <div>
      <h1 data-testid="album-name">{albumValue?.collectionName}</h1>
      <h3 data-testid="artist-name">{albumValue?.artistName}</h3>
      {musicValue?.map((music) => (
        <MusicDisplay
          music={ music }
          key={ music.trackId }
          onRemoveFavorite={ removeFavoriteMusic }
        />
      ))}
    </div>
  );
}

export default Album;
