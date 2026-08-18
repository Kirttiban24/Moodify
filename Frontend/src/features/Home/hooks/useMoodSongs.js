import { useEffect, useState } from "react";
import { getSongs } from "../service/song.api";

export const useMoodSongs = () => {

    const [happySongs, setHappySongs] = useState([]);
    const [sadSongs, setSadSongs] = useState([]);
    const [surprisedSongs, setSurprisedSongs] = useState([]);
    const [neutralSongs, setNeutralSongs] = useState([]);

    useEffect(() => {

        async function fetchSongs() {

            try {

                const [
                    happy,
                    sad,
                    surprised,
                    neutral
                ] = await Promise.all([

                    getSongs({ mood: "happy" }),

                    getSongs({ mood: "sad" }),

                    getSongs({ mood: "surprised" }),

                    getSongs({ mood: "neutral" })

                ]);

                setHappySongs(happy.songs || []);

                setSadSongs(sad.songs || []);

                setSurprisedSongs(
                    surprised.songs || []
                );

                setNeutralSongs(
                    neutral.songs || []
                );

            } catch (error) {

                console.error(
                    "Failed to fetch mood songs:",
                    error
                );

            }

        }

        fetchSongs();

    }, []);

    return {
        happySongs,
        sadSongs,
        surprisedSongs,
        neutralSongs
    };
};