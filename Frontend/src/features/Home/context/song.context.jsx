import { createContext, useRef, useState, useCallback } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState(null);

    const [playlist, setPlaylist] = useState([])

    const [loading, setLoading] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false)

    const audioRef = useRef(null);

    const playSong = useCallback((selectedSong, songs = []) => {
        if(!selectedSong) {
            return;
        }

        setSong(selectedSong);

        if (songs.length > 0) {
            setPlaylist(songs)
        }
    }, [])

    const playNext = useCallback(() => {

        if (!song || playlist.length === 0) {
            return;
        }

        const currentIndex = playlist.findIndex(
            (item) => item._id === song._id
        );

        if (currentIndex === -1) {
            return;
        }

        const nextIndex =
            (currentIndex + 1) % playlist.length;

        setSong(playlist[nextIndex]);

    }, [song, playlist]);

     const playPrevious = useCallback(() => {

        if (!song || playlist.length === 0) {
            return;
        }

        const currentIndex = playlist.findIndex(
            (item) => item._id === song._id
        );

        if (currentIndex === -1) {
            return;
        }
        const previousIndex =
            (currentIndex - 1 + playlist.length) %
            playlist.length;

        setSong(playlist[previousIndex]);

    }, [song, playlist]);

    return (
        <songContext.Provider
            value={{
                song,
                setSong,

                playlist,
                setPlaylist,

                playSong,
                playNext,
                playPrevious,

                loading,
                setLoading,

                audioRef,

                isPlaying,
                setIsPlaying
            }}
        >
            {children}
        </songContext.Provider>
    );
};