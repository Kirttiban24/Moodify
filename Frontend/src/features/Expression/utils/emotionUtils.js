// src/features/Expression/utils/emotionUtils.js

export function detectEmotion(categories) {
  const getScore = (name) =>
    categories.find(
      (item) => item.categoryName === name
    )?.score || 0;

  const smile =
    (getScore("mouthSmileLeft") +
      getScore("mouthSmileRight")) /
    2;

  const frown =
    (getScore("mouthFrownLeft") +
      getScore("mouthFrownRight")) /
    2;

  const jawOpen = getScore("jawOpen");
  const browUp = getScore("browInnerUp");

  if (jawOpen > 0.25 && browUp > 0.20) {
    return "😲 Surprise";
  }

  if (frown > 0.001) {
    return "☹️ Sad";
  }

  if (smile > 0.45) {
    return "😀 Happy";
  }

  return "😐 Neutral";
}