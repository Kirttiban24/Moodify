import { getSong } from "../service/song.api"
import { useContext, useEffect } from "react"
import { songContext } from "../context/song.context"


export const useSong = () => {

    const context = useContext(songContext)

    const { song, setSong, loading, setLoading, audioRef } = context

    async function handleGetSong({ mood }) {
        setLoading(true)
        const data = await getSong({ mood })
        setSong(data.song)
        setLoading(false)
    }

    return { song, loading, handleGetSong, audioRef }
}
