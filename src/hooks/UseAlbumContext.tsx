import { useContext } from "react"
import { AlbumContext } from "../context/AlbumContext"

export const useAlbumContext = () => {
    const context = useContext(AlbumContext)
    
    if (!context) {
        throw new Error('useAlbumContext must be used within an AlbumProvider');
    }

    return context
}