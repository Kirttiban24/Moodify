import { useEffect, useState } from "react";
import { getSongs } from "../service/song.api";

export const useMoodSongs = (mood) => {

    const [songs, setSongs] = useState([]);

    const [loading, setLoading] =
        useState(false);


    useEffect(() => {

        if (!mood) {
            setSongs([]);
            return;
        }


        async function fetchMoodSongs() {

            try {

                setLoading(true);

                const data =
                    await getSongs({ mood });

                setSongs(
                    data.songs || []
                );

            } catch (error) {

                console.error(
                    "Failed to fetch mood songs:",
                    error
                );

                setSongs([]);

            } finally {

                setLoading(false);

            }

        }


        fetchMoodSongs();

    }, [mood]);


    return {
        songs,
        loading,
    };
};