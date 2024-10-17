import React, { ReactNode, useState } from "react";
import { AlbumType } from "../types";
import { AlbumContext } from "./AlbumContext";

type AlbumProviderProps = {
    children: React.ReactNode;

}

export const AlbumProvider = ({ children }: AlbumProviderProps) => {
    const [albums, setAlbums] = useState<AlbumType[]>([])
    const [artist, setArtist] = useState<string>("");
    
    return (
        <AlbumContext.Provider value={{ albums, setAlbums, artist, setArtist }}>
          {children}
        </AlbumContext.Provider>
      );
}