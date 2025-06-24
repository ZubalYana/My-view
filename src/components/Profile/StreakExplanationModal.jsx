import Modal from "react-modal";
Modal.setAppElement("#root");
export default function StreakExplanationModal({ isOpen, setIsOpen }) {
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
                    width: "45%",
                    minHeight: "30%",
                    maxHeight: "90%",
                    height: "fit-content",
                    overflow: "hidden",
                    overflowY: "auto",
                    borderRadius: "8px",
                    outline: "none",
                    padding: "35px",
                    paddingTop: "25px",
                    backgroundColor: "#fff",
                    color: "var(--custom-black)",
                },
            }}
        >
            <h2 className="text-2xl font-semibold">What is a Daily Streak?</h2>
            <p className="text-[14px] font-light mt-2">A daily streak tracks how consistently you complete at least one of your achievements each day.
                If you mark any achievement as completed today — your streak continues!
                But if you miss a day and don’t log any completed achievements, your streak resets back to zero.
            </p>
            <h4 className="mt-3 text-xl font-medium">Why it matters:</h4>
            <ul className="list-disc pl-5 mt-1">
                <li>It helps build daily habits.</li>
                <li>It keeps you motivated by showing your consistency.</li>
                <li>It’s rewarding to watch your streak grow!</li>
            </ul>
        </Modal>
    )
}
