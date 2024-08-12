import React, { useState } from "react";
import Modal from "./modal";
import styles from "./profile.module.css";

interface ProfileProps {
  showModal: boolean;
  toggleModal: () => void;
}

export default function Profile({ showModal, toggleModal }: ProfileProps) {
  return (
    <Modal isOpen={showModal} onClose={toggleModal} width={"400px"}>
      <h1 className={styles.title}>Profile</h1>
    </Modal>
  );
}
