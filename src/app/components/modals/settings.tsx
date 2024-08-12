import React, { useState } from "react";
import Modal from "./modal";
import styles from "./settings.module.css";

interface SettingsProps {
  showModal: boolean;
  toggleModal: () => void;
}

export default function Settings({ showModal, toggleModal }: SettingsProps) {
  return (
    <Modal isOpen={showModal} onClose={toggleModal} width={"400px"}>
      <h1 className={styles.title}>Settings</h1>
    </Modal>
  );
}
