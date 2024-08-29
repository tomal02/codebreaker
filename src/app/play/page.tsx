"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./play.module.css";
import Win from "../components/win";
import Round from "../components/play/round";
import Modal from "../components/modals/modal";

export default function PlayPage() {
  const availableColors: string[] = [
    //Temp Colours
    "red",
    "green",
    "blue",
    "yellow",
    "white",
    "pink",
    "orange",
    "purple",
  ];

  const [numColors, setNumColors] = useState<number>(6);
  const [numRounds, setNumRounds] = useState<number>(12);
  const [numPegs, setNumPegs] = useState<number>(4);
  const [selectedColors, setSelectedColors] = useState<string[]>(
    availableColors.slice(0, numColors)
  );
  const [rounds, setRounds] = useState([
    { id: 1, completed: false, guess: Array(numPegs).fill("") },
  ]);
  const [secretCode, setSecretCode] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [revealSecretCode, setRevealSecretCode] = useState<boolean>(false);
  const [isCurrentGuessFilled, setIsCurrentGuessFilled] =
    useState<boolean>(false);

  useEffect(() => {
    setSelectedColors(availableColors.slice(0, numColors));
    setSecretCode(generateSecretCode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numColors, numPegs]);

  const generateSecretCode = (): string[] => {
    let code: string[] = [];
    for (let i = 0; i < numPegs; i++) {
      const randomColor = selectedColors[Math.floor(Math.random() * numColors)];
      code.push(randomColor);
    }
    return code;
  };

  const handleEndTurn = () => {
    const currentRound = rounds[rounds.length - 1];
    const currentGuess = currentRound.guess;

    const feedback = getFeedback(currentGuess, secretCode);

    const updatedRounds = rounds.map((round) =>
      round.id === currentRound.id
        ? {
            ...round,
            completed: true,
            guess: currentGuess,
            feedback: feedback.feedback,
          }
        : round
    );

    if (feedback.correctPosition === numPegs) {
      setRounds(updatedRounds);
      setGameOver(true);
      setRevealSecretCode(true);
      setGameResult("win");
    } else {
      if (rounds.length < numRounds) {
        setRounds([
          ...updatedRounds,
          {
            id: updatedRounds.length + 1,
            completed: false,
            guess: Array(numPegs).fill(""),
          },
        ]);
        setIsCurrentGuessFilled(false);
      } else {
        setGameOver(true);
        setRevealSecretCode(true);
        setGameResult("loss");
      }
    }
  };

  const getFeedback = (guess: string[], secret: string[]) => {
    let correctPosition = 0;
    let correctColor = 0;

    const guessCopy: (string | null)[] = [...guess];
    const secretCopy: (string | null)[] = [...secret];

    guessCopy.forEach((color, index) => {
      if (color === secretCopy[index]) {
        correctPosition++;
        guessCopy[index] = null;
        secretCopy[index] = null;
      }
    });

    guessCopy.forEach((color, index) => {
      if (color && secretCopy.includes(color)) {
        correctColor++;
        const foundIndex = secretCopy.indexOf(color);
        secretCopy[foundIndex] = null;
      }
    });

    const feedback = Array(correctPosition)
      .fill("red")
      .concat(Array(correctColor).fill("white"));

    while (feedback.length < guess.length) {
      feedback.push(null);
    }

    return { correctPosition, correctColor, feedback };
  };

  const handleRestart = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleStartGame = () => {
    setRounds([{ id: 1, completed: false, guess: Array(numPegs).fill("") }]);
    setSecretCode(generateSecretCode());
    setGameOver(false);
    setRevealSecretCode(false);
    setGameResult("");
    setIsModalOpen(false);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    color: string
  ) => {
    event.dataTransfer.setData("color", color);

    const dragIcon = document.createElement("div");
    dragIcon.style.width = "40px";
    dragIcon.style.height = "40px";
    dragIcon.style.borderRadius = "50%";
    dragIcon.style.backgroundColor = color;
    dragIcon.style.position = "absolute";
    dragIcon.style.top = "-9999px";

    document.body.appendChild(dragIcon);
    event.dataTransfer.setDragImage(dragIcon, 20, 20);

    setTimeout(() => document.body.removeChild(dragIcon), 0);
  };

  const handleGuessUpdate = (newGuess: string[]) => {
    setRounds((prevRounds) => {
      const updatedRounds = [...prevRounds];
      const currentRoundIndex = updatedRounds.length - 1;
      updatedRounds[currentRoundIndex].guess = newGuess;
      return updatedRounds;
    });
    setIsCurrentGuessFilled(!newGuess.includes(""));
  };

  return (
    <div className={styles.playContainer}>
      <div className={styles.boardContainer}>
        <div className={styles.roundsContainer}>
          {rounds.map((round) => (
            <Round
              key={round.id}
              numPegs={numPegs}
              roundData={round}
              onEndTurn={handleEndTurn}
              gameOver={gameOver}
              onGuessUpdate={handleGuessUpdate}
            />
          ))}
        </div>

        {/* winning area */}
        <div className={styles.winningAreaContainer}>
          <div className={styles.winningAreaPegs}>
            {secretCode.map((color, index) => (
              <div
                key={index}
                className={styles.colorPeg}
                style={{
                  backgroundColor: revealSecretCode ? color : "#222",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right hand controls */}
      <div className={styles.controllerContainer}>
        <div className={styles.restartContainer}>
          <button onClick={handleRestart}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
        </div>
        <div className={styles.inGameControls}>
          <div className={styles.buttonContainer}>
            <button
              onClick={handleEndTurn}
              disabled={gameOver || !isCurrentGuessFilled}
            >
              End Turn
            </button>
          </div>
          <div className={styles.colorSelectorContainer}>
            <div
              className={styles.selectedColors}
              style={{ gridTemplateColumns: `repeat(${numColors / 2}, 1fr)` }}
            >
              {selectedColors.map((color, index) => (
                <div
                  key={index}
                  className={styles.colorPeg}
                  style={{ backgroundColor: color }}
                  draggable
                  onDragStart={(event) => handleDragStart(event, color)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      {gameResult === "win" && <Win />}
      <Modal isOpen={gameResult === "win"} onClose={handleStartGame}>
        <div className={styles.winModal}>
          <h1>Congratulations! You Won!</h1>
          <button onClick={handleStartGame}>Play Again</button>
        </div>
      </Modal>

      {/* Loss Modal */}
      <Modal isOpen={gameResult === "loss"} onClose={handleStartGame}>
        <div className={styles.lossModal}>
          <h1>Game Over! You Lost!</h1>
          <button onClick={handleStartGame}>Try Again</button>
        </div>
      </Modal>

      {/* New game */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div>
          <h1>Game Settings</h1>
          <label>
            Number of Colors:
            <select
              value={numColors}
              onChange={(e) => setNumColors(parseInt(e.target.value))}
            >
              {[4, 6, 8].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Number of Rounds:
            <select
              value={numRounds}
              onChange={(e) => setNumRounds(parseInt(e.target.value))}
            >
              {[8, 10, 12].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Number of Pegs:
            <select
              value={numPegs}
              onChange={(e) => setNumPegs(parseInt(e.target.value))}
            >
              {[4, 5, 6, 7, 8].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      </Modal>
    </div>
  );
}
