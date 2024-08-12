import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal";
import styles from "./login.module.css";
import { useAuth } from "../../contexts/authContext";

interface LoginProps {
  showModal: boolean;
  toggleModal: () => void;
}

export default function Login({ showModal, toggleModal }: LoginProps) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    login(username, password);
    toggleModal();
  };

  return (
    <Modal isOpen={showModal} onClose={toggleModal} width={"400px"}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className={styles.inputField}
          aria-label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.inputField}
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
