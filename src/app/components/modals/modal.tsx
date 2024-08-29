import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width,
  height,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShouldRender(true);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 500); // Wait for fade-out to complete before unmounting
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${!isVisible ? styles.fadeOut : ""}`}
      onMouseDown={onClose}
    >
      <div
        className={styles.modalContent}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: width || "auto",
          height: height || "auto",
        }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
