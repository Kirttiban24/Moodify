import React, { useMemo, useState } from "react";

import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import MoodLibrary from "../components/MoodLibrary";

import { convertEmotionToMood } from "../utils/moodUtils";
import { useMoodSongs } from "../hooks/useMoodSongs";

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
        <>

            <FaceExpression
                onEmotionDetected={
                    setCurrentEmotion
                }
            />

            <MoodLibrary
                songs={songs}
                mood={currentMood}
                loading={loading}
            />

            <Player />

        </>
    );
};

export default Home;