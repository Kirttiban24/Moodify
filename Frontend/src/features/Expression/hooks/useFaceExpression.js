// src/features/Expression/hooks/useFaceExpression.js

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  createLandmarker,
  startCamera,
  detectCurrentEmotion,
} from "../utils/mediapipeUtils";

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
      const landmarker =
        await createLandmarker();

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
    if (
      !faceLandmarker ||
      !isDetecting
    )
      return;

    let animationFrameId;

    const detect = () => {
      const currentEmotion =
        detectCurrentEmotion(
          faceLandmarker,
          videoRef
        );

      if (currentEmotion) {
        setEmotion(currentEmotion);
      }

      animationFrameId =
        requestAnimationFrame(detect);
    };

    detect();

    return () =>
      cancelAnimationFrame(
        animationFrameId
      );
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