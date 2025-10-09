const keyStrokeSounds = [
    new Audio("/key1.mp3"),
    new Audio("/key2.mp3"),
    new Audio("/key3.mp3"),
];

function useKeyboardSound() {
    const playRandomKeyStrokeSound = () => {
        const randomSound = keyStrokeSounds[Math.floor(Math.random()*keyStrokeSounds.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch((error) => console.log("Audio play failed", error));
    }

    return {playRandomKeyStrokeSound}
}

export default useKeyboardSound;