import React from "react";
import styles from "./round.module.css";

function Round({ numPegs = 4 }) {
  const colorPegs = Array(numPegs).fill(null);
  const feedbackPegs = Array(numPegs).fill(null);

  const columns = Math.ceil(numPegs / 2);

  return (
    <div className={styles.roundContainer}>
      <div className={styles.colorPegsContainer}>
        <div className={styles.colorPegs}>
          {colorPegs.map((_, index) => (
            <div key={index} className={styles.colorPeg}></div>
          ))}
        </div>
      </div>

      <div className={styles.feedbackPegsContainer}>
        <div
          className={styles.feedbackPegs}
          style={{ gridTemplateColumns: `repeat(${columns}, 20px)` }}
        >
          {feedbackPegs.map((_, index) => (
            <div key={index} className={styles.feedbackPeg}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Round;
