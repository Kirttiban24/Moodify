import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import { useMoodSongs } from "../hooks/useMoodSongs";

const Home = () => {

    const {
        happySongs,
        sadSongs,
        surprisedSongs,
        neutralSongs
    } = useMoodSongs();

    console.log("Happy:", happySongs);
    console.log("Sad:", sadSongs);
    console.log("Surprised:", surprisedSongs);
    console.log("Neutral:", neutralSongs);

    return (
        <>
            <FaceExpression />
            <Player />
        </>
    );
};

export default Home;