import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";

Modal.setAppElement("#root");

export default function StreakExplanationModal({ isOpen, setIsOpen }) {
    const [modalWidth, setModalWidth] = useState(getWidth());

    function getWidth() {
        if (typeof window !== "undefined") {
            return window.innerWidth > 700 ? "45%" : "90%";
        }
        return "90%";
    }

    useEffect(() => {
        const handleResize = () => setModalWidth(getWidth());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Streak Explanation Modal"
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
                    width: modalWidth,
                    minHeight: "30%",
                    maxHeight: "90%",
                    height: "fit-content",
                    overflowY: "auto",
                    borderRadius: "8px",
                    outline: "none",
                    padding: 0,
                    backgroundColor: "#fff",
                    color: "var(--custom-black)",
                },
            }}
        >
            <div className="w-full p-[20px] lg:p-[35px] relative">
                <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsOpen(false)} />
                <h2 className="text-[18px] font-semibold lg:text-2xl">What is a Daily Streak?</h2>
                <p className="text-[14px] font-light mt-2">
                    A daily streak tracks how consistently you complete at least one of your achievements each day.
                    If you mark any achievement as completed today — your streak continues!
                    But if you miss a day and don’t log any completed achievements, your streak resets back to zero.
                </p>
                <h4 className="mt-3 text-[16px] font-medium lg:text-xl">Why it matters:</h4>
                <ul className="list-disc pl-5 mt-1 text-[14px] lg:text-base">
                    <li>It helps build daily habits.</li>
                    <li>It keeps you motivated by showing your consistency.</li>
                    <li>It’s rewarding to watch your streak grow!</li>
                </ul>
            </div>
        </Modal>
    );
}
