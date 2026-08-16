import { createContext, useRef, useState } from "react";


export const songContext = createContext()

export const SongContextProvider = ({ children }) => {
    const [ song, setSong ] = useState({

        "url": "https://ik.imagekit.io/i4pjkric2/moodify/songs/Boyfriend_zO8iBQNY-.mp3",
        "posterUrl": "https://ik.imagekit.io/i4pjkric2/moodify/posters/Boyfriend_wO0EB6BXt.jpeg",
        "title": "Boyfriend",
        "mood": "surprised",
    })
    const [loading, setLoading] = useState(false)
    const audioRef = useRef(null)

    return (
        <songContext.Provider
            value={{ song, setSong, loading, setLoading, audioRef }}
        >
            {children}
        </songContext.Provider>
    )
}
