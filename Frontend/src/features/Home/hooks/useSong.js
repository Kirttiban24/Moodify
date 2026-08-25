import { useContext } from "react";
import { songContext } from "../context/song.context";

export const useSong = () => {

    const context = useContext(songContext);

    const {
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
        setIsPlaying,

    } = context;

    return {
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
        setIsPlaying,
    };
};