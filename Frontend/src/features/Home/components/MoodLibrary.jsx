import { useSong } from "../hooks/useSong";
import "./MoodLibrary.scss";

const MoodLibrary = ({ songs, mood, loading }) => {

    const { song: currentSong, playSong } = useSong();

    function handleSongClick(nextSong) {
        playSong(nextSong, songs);
    }

    if (!mood) {
        return (
            <aside className="mood-library">
                <div className="mood-library__header">
                    <h2>Your Mood Library</h2>
                    <p>
                        Detect your mood to discover music
                    </p>
                </div>
            </aside>
        );
    }

    return (
        <aside className="mood-library">

            <div className="mood-library__header">

                <h2>Your Mood Library</h2>

                <p>
                    Music selected for your mood
                </p>

            </div>

            <div className="mood-library__mood">

                <span>
                    {mood === "happy" && "😀"}
                    {mood === "sad" && "😢"}
                    {mood === "surprised" && "😲"}
                    {mood === "neutral" && "😐"}
                </span>

                <h3>
                    {mood === "happy" && "Happy"}
                    {mood === "sad" && "Sad"}
                    {mood === "surprised" && "Surprise"}
                    {mood === "neutral" && "Neutral"}
                </h3>

            </div>

            {loading && (
                <p className="mood-library__status">
                    Finding songs for your mood...
                </p>
            )}

            {!loading && songs.length === 0 && (
                <p className="mood-library__status">
                    No songs available for this mood.
                </p>
            )}

            {!loading && songs.length > 0 && (

                <div className="mood-library__songs">

                    {songs.map((song) => (

                        <div
                            className="song-card"
                            key={song._id}
                            onClick={() => handleSongClick(song)}
                        >

                            <img
                                src={song.posterUrl}
                                alt={`${song.title} cover`}
                            />

                            <div className="song-card__info">

                                <h4>
                                    {song.title}
                                </h4>

                                <span>
                                    {mood}
                                </span>

                            </div>

                            <button
                                type="button"
                                className="song-card__play"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleSongClick(song);
                                }}
                            >
                                ▶
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </aside>
    );
};

export default MoodLibrary;