// src/features/Expression/utils/mediapipeUtils.js

import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

import { detectEmotion } from "./emotionUtils";

export async function createLandmarker() {
  const vision =
    await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

  return await FaceLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      runningMode: "VIDEO",
      outputFaceBlendshapes: true,
      numFaces: 1,
    }
  );
}

export async function startCamera(videoRef) {
  const stream =
    await navigator.mediaDevices.getUserMedia({
      video: true,
    });

  videoRef.current.srcObject = stream;

  return stream;
}

export function detectCurrentEmotion(
  landmarker,
  videoRef
) {
  if (
    !landmarker ||
    !videoRef.current ||
    videoRef.current.readyState !== 4
  ) {
    return null;
  }

  const result = landmarker.detectForVideo(
    videoRef.current,
    performance.now()
  );

  if (
    result.faceBlendshapes.length === 0
  ) {
    return "No Face";
  }

  return detectEmotion(
    result.faceBlendshapes[0].categories
  );
}