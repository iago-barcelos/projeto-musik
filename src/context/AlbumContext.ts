import { createContext } from 'react';
import { AlbumType } from '../types';

export type AlbumContextType = {
    albums: AlbumType[];
    setAlbums: React.Dispatch<React.SetStateAction<AlbumType[]>>;
    artist: string;
    setArtist: React.Dispatch<React.SetStateAction<string>>;
  };

export const AlbumContext = createContext<AlbumContextType | undefined>(undefined);
