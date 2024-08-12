import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal"; // Import the Modal component
import styles from "./login.module.css";

interface LoginProps {
  showModal: boolean;
  toggleModal: () => void;
}

export default function Login({ showModal, toggleModal }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Modal isOpen={showModal} onClose={toggleModal} width={"400px"}>
      <h1 className={styles.title}>Login</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          className={styles.inputField}
          aria-label="Username"
        />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.inputField}
            aria-label="Password"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            className={styles.eyeIcon}
            aria-label={showPassword ? "Hide password" : "Show password"}
            role="button"
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Log in
        </button>
      </form>
    </Modal>
  );
}
