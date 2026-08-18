// src/features/Expression/components/FaceExpression.jsx

import { useEffect } from "react";
import { useFaceExpression } from "../hooks/useFaceExpression";

export default function FaceExpression({
    onEmotionDetected,
}) {

    const {
        videoRef,
        emotion,
        isDetecting,
        setIsDetecting,
    } = useFaceExpression();


    useEffect(() => {

        if (
            emotion &&
            emotion !== "Click Start Detection" &&
            emotion !== "No face detected"
        ) {

            onEmotionDetected(emotion);

        }

    }, [
        emotion,
        onEmotionDetected,
    ]);


    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 40,
            }}
        >

            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                width="700"
                style={{
                    borderRadius: 20,
                    border: "5px solid black",
                }}
            />

            <button
                onClick={() =>
                    setIsDetecting(true)
                }
                disabled={isDetecting}
                style={{
                    marginTop: 20,
                    padding: "12px 25px",
                    fontSize: "16px",
                    cursor: isDetecting
                        ? "not-allowed"
                        : "pointer",
                    borderRadius: "8px",
                    border: "none",
                }}
            >

                {isDetecting
                    ? "🔍 Analyzing your mood..."
                    : "Start Detection"}

            </button>

            <h1>
                {emotion}
            </h1>

        </div>
    );
}