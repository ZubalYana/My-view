import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function CreateAchievementModal({ isOpen, onClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Achievement Creation Modal"
            style={{
                overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                },
                content: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    minHeight: "62%",
                    maxHeight: "80%",
                    height: "fit-content",
                    overflow: "hidden",
                    borderRadius: "8px",
                    outline: "none",
                    padding: "35px",
                    paddingTop: "25px",
                    backgroundColor: "#fff",
                },
            }}
        >
            <h2>Create Achievement</h2>
        </Modal>
    );
}
