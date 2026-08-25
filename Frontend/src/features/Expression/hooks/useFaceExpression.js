import { useEffect, useRef, useState } from "react";

import {
    createLandmarker,
    startCamera,
    detectCurrentEmotion,
} from "../utils/mediapipeUtils";


export function useFaceExpression() {

    const videoRef = useRef(null);

    const streamRef = useRef(null);

    const animationFrameRef = useRef(null);


    const [faceLandmarker, setFaceLandmarker] =
        useState(null);

    const [emotion, setEmotion] =
        useState(null);

    const [isDetecting, setIsDetecting] =
        useState(false);

    const [cameraReady, setCameraReady] =
        useState(false);

    const [cameraError, setCameraError] =
        useState(null);

    const [hasCompletedScan, setHasCompletedScan] =
        useState(false);

    const [remainingSeconds, setRemainingSeconds] =
        useState(3);


    /*
    =========================================
    Load MediaPipe
    =========================================
    */

    useEffect(() => {

        async function init() {

            try {

              const landmarker =
                await createLandmarker();

              setFaceLandmarker(landmarker);

            } catch (error) {

              console.error(
                "Unable to load face detection.",
                  error
                );

              setCameraError(
                "Mood detection could not start."
              );

            }

        }

        init();

    }, []);


    /*
    =========================================
    Stop Camera
    =========================================
    */

    function stopCamera() {

        if (streamRef.current) {

            streamRef.current
                .getTracks()
                .forEach((track) => track.stop());

            streamRef.current = null;

        }

        if (videoRef.current) {

            videoRef.current.srcObject = null;

        }

        setCameraReady(false);

    }


    /*
    =========================================
    Start Detection
    =========================================
    */

    async function startDetection() {

        if (
            !faceLandmarker ||
            isDetecting
        ) {
            return;
        }


        try {

            setCameraError(null);

            setEmotion(null);

            setHasCompletedScan(false);

            setRemainingSeconds(3);

            setIsDetecting(true);


            /*
            Start camera only when
            user clicks detection.
            */

            const stream = await startCamera(videoRef);

            streamRef.current = stream;

            setCameraReady(true);


        } catch (error) {

            console.error(
                "Unable to start camera.",
                error
            );

            setCameraReady(false);

            setIsDetecting(false);

            setCameraError(
                "Camera access is blocked. Allow permission and try again."
            );

        }

    }


    /*
    =========================================
    Detection Loop
    =========================================
    */

    useEffect(() => {

        if (
            !faceLandmarker ||
            !isDetecting ||
            !cameraReady
        ) {
            return;
        }


        const detectedEmotions = [];

        const startTime =
            performance.now();

        const DETECTION_DURATION =
            3000;


        function detect() {

            const currentEmotion =
                detectCurrentEmotion(
                    faceLandmarker,
                    videoRef
                );


            if (
                currentEmotion &&
                currentEmotion !== "No Face" &&
                currentEmotion !== "No face detected"
            ) {

                detectedEmotions.push(
                    currentEmotion
                );

            }


            /*
            =====================================
            Countdown
            =====================================
            */

            const elapsed =
                performance.now() -
                startTime;


            const remaining =
                Math.max(
                    0,
                    Math.ceil(
                        (DETECTION_DURATION - elapsed) /
                        1000
                    )
                );


            setRemainingSeconds(
                remaining
            );


            /*
            =====================================
            Detection Finished
            =====================================
            */

            if (
                elapsed >=
                DETECTION_DURATION
            ) {

                let finalEmotion =
                    "No face detected";


                if (
                    detectedEmotions.length > 0
                ) {

                    const emotionCount = {};


                    detectedEmotions.forEach(
                        (detected) => {

                            emotionCount[detected] =
                                (
                                    emotionCount[detected] ||
                                    0
                                ) + 1;

                        }
                    );


                    finalEmotion =
                        Object.keys(
                            emotionCount
                        ).reduce(
                            (a, b) =>
                                emotionCount[a] >
                                emotionCount[b]
                                    ? a
                                    : b
                        );

                }


                setEmotion(
                    finalEmotion
                );


                setHasCompletedScan(
                    true
                );

                setIsDetecting(
                    false
                );

                setRemainingSeconds(0);


                /*
                IMPORTANT:
                Turn camera OFF after scan.
                */

                stopCamera();

                return;

            }


            animationFrameRef.current =
                requestAnimationFrame(
                    detect
                );

        }


        detect();


        return () => {

            if (
                animationFrameRef.current
            ) {

                cancelAnimationFrame(
                    animationFrameRef.current
                );

            }

        };

    }, [
        faceLandmarker,
        isDetecting,
        cameraReady,
    ]);


    /*
    =========================================
    Cleanup
    =========================================
    */

    useEffect(() => {

        return () => {

            if (
                animationFrameRef.current
            ) {

                cancelAnimationFrame(
                    animationFrameRef.current
                );

            }

            stopCamera();

        };

    }, []);


    return {

        videoRef,

        emotion,

        isDetecting,

        startDetection,

        cameraReady,

        cameraError,

        hasCompletedScan,

        remainingSeconds,

        canDetect:
            Boolean(faceLandmarker) &&
            !isDetecting,

    };

}