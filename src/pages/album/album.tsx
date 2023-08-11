import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../../types';
import MusicDisplay from '../../components/musicDisplay/musicDisplay';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/loading/loading';

function Album() {
  const [loading, setLoading] = useState<boolean>(true);
  const [albumValue, setAlbumValue] = useState<AlbumType>();
  const [musicValue, setMusicValue] = useState<SongType[]>();

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (id) {
        const data = await getMusics(id);
        setAlbumValue(data[0]);
        const musics = data.filter((item, index) => index !== 0);
        setMusicValue(musics as SongType[]);
      }
      setLoading(false);
    };

    getData();
  }, [id]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <h1 data-testid="album-name">{albumValue?.collectionName}</h1>
      <h3 data-testid="artist-name">{albumValue?.artistName}</h3>
      {musicValue?.map((music) => (
        <MusicDisplay
          music={ music }
          key={ music.trackId }
        />
      ))}
    </div>
  );
}

export default Album;
