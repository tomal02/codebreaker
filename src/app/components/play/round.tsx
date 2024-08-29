import React, { useState, useEffect } from "react";
import styles from "./round.module.css";

interface RoundProps {
  numPegs: number;
  roundData: {
    id: number;
    completed: boolean;
    guess: string[];
    feedback?: string[];
  };
  onEndTurn: (currentGuess: string[]) => void;
  gameOver: boolean;
  onGuessUpdate: (newGuess: string[]) => void;
}

const Round: React.FC<RoundProps> = ({
  numPegs = 4,
  roundData,
  gameOver,
  onGuessUpdate,
}) => {
  const [currentGuess, setCurrentGuess] = useState<string[]>(roundData.guess);

  useEffect(() => {
    setCurrentGuess(roundData.guess);
  }, [roundData.guess]);

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    pegIndex: number
  ) => {
    if (roundData.completed) return; // Prevent dropping if the round is completed
    event.preventDefault();
    const color = event.dataTransfer.getData("color");
    const newGuess = [...currentGuess];
    newGuess[pegIndex] = color;
    setCurrentGuess(newGuess);
    onGuessUpdate(newGuess);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (roundData.completed) return; // Prevent drag-over if the round is completed
    event.preventDefault();
  };

  const colorPegs = Array(numPegs).fill(null);

  const feedbackPegs = Array.isArray(roundData.feedback)
    ? roundData.feedback
    : Array(numPegs).fill(null);

  const columns = Math.ceil(numPegs / 2);

  return (
    <div className={styles.roundContainer}>
      <div className={styles.colorPegsContainer}>
        <div className={styles.colorPegs}>
          {colorPegs.map((_, index) => (
            <div
              key={index}
              className={styles.colorPeg}
              style={{
                backgroundColor: currentGuess[index] || "#222",
              }}
              onDrop={(event) => handleDrop(event, index)}
              onDragOver={handleDragOver}
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.feedbackPegsContainer}>
        <div
          className={styles.feedbackPegs}
          style={{ gridTemplateColumns: `repeat(${columns}, 20px)` }}
        >
          {feedbackPegs.map((color, index) => (
            <div
              key={index}
              className={styles.feedbackPeg}
              style={{
                backgroundColor: color || "#222",
                ...(numPegs % 2 !== 0 && index === Math.floor(numPegs / 2)
                  ? { transform: "translateY(15px)" }
                  : {}),
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Round;
