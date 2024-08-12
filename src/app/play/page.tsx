import React from "react";
import styles from "./play.module.css";
import Round from "../components/play/round";

export default function PlayPage() {
  return (
    <div className={styles.playContainer}>
      <div className={styles.boardContainer}>
        <Round />
      </div>
    </div>
  );
}
