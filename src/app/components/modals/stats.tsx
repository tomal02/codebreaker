import React from "react";
import Modal from "./modal";
import styles from "./stats.module.css";

interface StatsProps {
  showModal: boolean;
  toggleModal: () => void;
}

export default function Stats({ showModal, toggleModal }: StatsProps) {
  return (
    <Modal isOpen={showModal} onClose={toggleModal} width={"400px"}>
      <h1 className={styles.title}>Stats</h1>
    </Modal>
  );
}
