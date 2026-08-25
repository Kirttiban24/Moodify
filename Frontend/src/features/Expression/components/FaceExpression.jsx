import { useEffect } from "react";

import {
    FaSmile,
    FaSadTear,
    FaSurprise,
    FaMeh,
    FaCamera,
} from "react-icons/fa";

import { useFaceExpression } from "../hooks/useFaceExpression";

import "./FaceExpression.scss";


function getMoodVisual(emotion) {

    const visuals = {

        happy: {
            icon: FaSmile,
            label: "Happy",
            description: "You look happy today.",
        },

        sad: {
            icon: FaSadTear,
            label: "Sad",
            description: "Let's find something soothing.",
        },

        surprised: {
            icon: FaSurprise,
            label: "Surprised",
            description: "Something caught your attention!",
        },

        neutral: {
            icon: FaMeh,
            label: "Neutral",
            description: "Let's find something that fits your mood.",
        },

    };


    return visuals[emotion] || null;

}


export default function FaceExpression({

    onEmotionDetected = () => {},

}) {

    const {

        videoRef,

        emotion,

        isDetecting,

        startDetection,

        cameraReady,

        cameraError,

        hasCompletedScan,

        remainingSeconds,

        canDetect,

    } = useFaceExpression();


    useEffect(() => {

        if (
            emotion &&
            emotion !== "No face detected"
        ) {

            onEmotionDetected(
                emotion
            );

        }

    }, [
        emotion,
        onEmotionDetected,
    ]);


    const moodVisual =
        getMoodVisual(emotion);


    const MoodIcon =
        moodVisual?.icon;


    let statusText =
        "Ready to discover your mood";


    if (cameraError) {

        statusText =
            cameraError;

    } else if (isDetecting) {

        statusText =
            `Detecting your mood... ${remainingSeconds}s`;

    } else if (hasCompletedScan) {

        statusText =
            "Detection complete";

    }


    return (

        <section
            className="face-expression"
            aria-label="Mood detection"
        >


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="face-expression__header">

                <div>

                    <span className="face-expression__eyebrow">

                        <FaCamera />

                        AI MOOD DETECTION

                    </span>

                    <h2>
                        How are you feeling?
                    </h2>

                    <p>
                        Let Moodify read your expression
                        and find music for you.
                    </p>

                </div>

            </div>


            {/* ================================= */}
            {/* CAMERA */}
            {/* ================================= */}

            <div
                className={
                    isDetecting
                        ? "face-expression__camera face-expression__camera--scanning"
                        : "face-expression__camera"
                }
            >

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                />


                {/* Scanning overlay */}

                {isDetecting && (

                    <div className="face-expression__scan-overlay">

                        <div className="face-expression__scan-line" />

                        <span>
                            Detecting...
                        </span>

                    </div>

                )}


                {/* Result */}

                {hasCompletedScan &&
                    moodVisual &&
                    MoodIcon && (

                        <div className="face-expression__result">

                            <div className="face-expression__result-icon">

                                <MoodIcon />

                            </div>

                            <div>

                                <span>
                                    Mood detected
                                </span>

                                <strong>
                                    {moodVisual.label}
                                </strong>

                            </div>

                        </div>

                    )}


                {/* Empty camera state */}

                {!cameraReady &&
                    !hasCompletedScan &&
                    !isDetecting && (

                        <div className="face-expression__camera-placeholder">

                            <FaCamera />

                            <span>
                                Camera is ready
                            </span>

                        </div>

                    )}

            </div>


            {/* ================================= */}
            {/* STATUS */}
            {/* ================================= */}

            <div className="face-expression__status">

                <span>

                    {statusText}

                </span>

            </div>


            {/* ================================= */}
            {/* DETECTION BUTTON */}
            {/* ================================= */}

            <button
                type="button"
                className="face-expression__scan-button"
                onClick={startDetection}
                disabled={!canDetect}
            >

                <span className="face-expression__button-icon">

                    <FaCamera />

                </span>

                <span>

                    {isDetecting
                        ? `Detecting... ${remainingSeconds}s`
                        : hasCompletedScan
                            ? "Scan Again"
                            : "Start Detection"
                    }

                </span>

            </button>


            {/* ================================= */}
            {/* RESULT DESCRIPTION */}
            {/* ================================= */}

            {hasCompletedScan &&
                moodVisual && (

                    <div className="face-expression__result-text">

                        <strong>
                            {moodVisual.label} mood detected
                        </strong>

                        <span>
                            {moodVisual.description}
                        </span>

                    </div>

                )}

        </section>

    );

}