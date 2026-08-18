export function convertEmotionToMood(emotion) {

    if (!emotion) {
        return null;
    }

    if (emotion.includes("Happy")) {
        return "happy";
    }

    if (emotion.includes("Sad")) {
        return "sad";
    }

    if (emotion.includes("Surprise")) {
        return "surprised";
    }

    if (emotion.includes("Neutral")) {
        return "neutral";
    }

    return null;
}