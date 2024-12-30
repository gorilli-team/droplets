import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  isOpen,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <div className="flex flex-row p-6 justify-between border-b border-gray-700">
          <h2 className="justify-start text-lg font-bold text-white">
            {title}
          </h2>
          <button onClick={onClose} style={modalStyles.closeButton}>
            X
          </button>
        </div>
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
    backgroundColor: "#1f2a37",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    position: "relative" as "relative",
    overflow: "hidden",
  },
  closeButton: {
    background: "transparent",
    color: "#9CA3AF",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};
