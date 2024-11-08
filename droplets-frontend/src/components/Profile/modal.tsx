import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <button onClick={onClose} style={modalStyles.closeButton}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "5px",
    maxWidth: "500px",
    width: "100%",
    position: "relative" as "relative",
  },
  closeButton: {
    position: "absolute" as "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};
