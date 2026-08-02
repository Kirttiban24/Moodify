// src/features/Expression/components/FaceExpression.jsx

import { useFaceExpression } from "../hooks/useFaceExpression";

export default function FaceExpression() {
  const {
    videoRef,
    emotion,
    isDetecting,
    setIsDetecting,
  } = useFaceExpression();

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
          ? "Detecting..."
          : "Start Detection"}
      </button>

      <h1>{emotion}</h1>
    </div>
  );
}