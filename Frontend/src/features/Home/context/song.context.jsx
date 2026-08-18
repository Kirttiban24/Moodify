import { createContext, useRef, useState } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState(null);

    const [loading, setLoading] = useState(false);

    const audioRef = useRef(null);

    return (
        <songContext.Provider
            value={{
                song,
                setSong,
                loading,
                setLoading,
                audioRef
            }}
        >
            {children}
        </songContext.Provider>
    );
};