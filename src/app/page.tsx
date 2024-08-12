"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./home.module.css";
import Login from "./components/modals/login";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={styles.splashContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.icon} aria-label="app-icon">
          <Image
            src="/next.svg"
            alt="App Icon"
            layout="fill"
            objectFit="cover"
            className={styles.iconImage}
          />
        </div>
        <h1 className={styles.title}>Code Breaker</h1>
        <div className={styles.buttonContainer}>
          <button onClick={toggleModal} className={styles.button}>
            Log in
          </button>
          <Link href="/play" className={`${styles.button} ${styles.play}`}>
            Play
          </Link>
        </div>
        <div className={styles.descContainer}>
          <p className={styles.meta}>Version 0.1.0</p>
        </div>
      </div>

      <Login showModal={showModal} toggleModal={toggleModal} />
    </div>
  );
}
