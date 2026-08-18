
import { useEffect, useRef, useState } from "react";
import { createLandmarker, startCamera, detectCurrentEmotion } from "../utils/mediapipeUtils";


export function useFaceExpression() {
  const videoRef = useRef(null);

  const [faceLandmarker, setFaceLandmarker] =
    useState(null);

  const [emotion, setEmotion] =
    useState("Click Start Detection");

  const [isDetecting, setIsDetecting] =
    useState(false);

  useEffect(() => {
    async function init() {
      const landmarker = await createLandmarker();
      setFaceLandmarker(landmarker);
    }

    init();
  }, []);

  useEffect(() => {
    async function initCamera() {
      if (videoRef.current) {
        await startCamera(videoRef);
      }
    }

    initCamera();
  }, []);

  useEffect(() => {
    if ( !faceLandmarker || !isDetecting)

      return;

    let animationFrameId;

    const detectedEmotions = [];

    const startTime = performance.now()

    const DETECTION_DURATION = 3000;

    const detect = () => {
      const currentEmotion =
        detectCurrentEmotion(
          faceLandmarker,
          videoRef
        );

      if (currentEmotion) {
        detectedEmotions.push(currentEmotion);
      }

      const elapsedTime = performance.now() - startTime;

      if (elapsedTime >= DETECTION_DURATION) {

        if (detectedEmotions.length > 0) {
          const emotionCount = {}

          detectedEmotions.forEach((emotion) => {
            emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
          })

          const finalEmotion = 
            Object.keys(emotionCount).reduce((a, b) => emotionCount[a] > emotionCount[b] ? a : b )

            setEmotion(finalEmotion)
        }else {
          setEmotion("No face detected")
        }

        setIsDetecting(false)
        return;
      }

      animationFrameId =
        requestAnimationFrame(detect);
    };

    detect();

    return () =>
      cancelAnimationFrame(animationFrameId);
  }, [
    faceLandmarker,
    isDetecting,
  ]);

  return {
    videoRef,
    emotion,
    isDetecting,
    setIsDetecting,
  };
}