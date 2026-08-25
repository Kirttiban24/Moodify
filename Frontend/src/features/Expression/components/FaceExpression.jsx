import { useEffect } from "react";
import { useFaceExpression } from "../hooks/useFaceExpression";


const FaceExpression = ({ onEmotionDetected }) => {

    const {
        videoRef,
        emotion,
        isDetecting,
        setIsDetecting
    } = useFaceExpression();


    useEffect(() => {

        if (
            emotion &&
            emotion !== "No face detected"
        ) {
            onEmotionDetected(emotion);
        }

    }, [emotion, onEmotionDetected]);


    return (
        <section className="face-expression">

            <div className="face-expression__video-wrap">

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                />

            </div>


            <p className="face-expression__status">

                {isDetecting
                    ? "Analyzing your mood..."
                    : emotion || "Start detection"}

            </p>


            <button
                type="button"
                onClick={() => setIsDetecting(true)}
                disabled={isDetecting}
            >

                {isDetecting
                    ? "Analyzing..."
                    : "Start Detection"}

            </button>

        </section>
    );
};

export default FaceExpression;