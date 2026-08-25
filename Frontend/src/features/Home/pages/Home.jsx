import React, { useMemo, useState } from "react";

import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import MoodLibrary from "../components/MoodLibrary";

import { convertEmotionToMood } from "../utils/moodUtils";
import { useMoodSongs } from "../hooks/useMoodSongs";

import "./Home.scss";

const Home = () => {

    const [currentEmotion, setCurrentEmotion] =
        useState(null);

    const currentMood = useMemo(() => {

        return convertEmotionToMood(
            currentEmotion
        );

    }, [currentEmotion]);

    const {
        songs,
        loading,
    } = useMoodSongs(currentMood);

    return (
        <div className="home-shell">

            {/* Left: Mood Detection */}
            <FaceExpression
                onEmotionDetected={
                    setCurrentEmotion
                }
            />

            {/* Center: Music Player */}
            <Player />

            {/* Right: Mood Library */}
            <MoodLibrary
                songs={songs}
                mood={currentMood}
                loading={loading}
            />

        </div>
    );
};

export default Home;