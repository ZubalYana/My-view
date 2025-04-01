import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { TextField, Button } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { Plus } from "lucide-react";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
                    width: "38%",
                    minHeight: "50%",
                    maxHeight: "80%",
                    height: "fit-content",
                    overflow: "hidden",
                    borderRadius: "8px",
                    outline: "none",
                    padding: "35px",
                    paddingTop: "25px",
                    backgroundColor: "#fff",
                    color: "var(--custom-black)",
                },
            }}
        >
            <h2 className="text-2xl font-bold">Let's create a new achievement!</h2>
            <TextField
                label="How many times do you want to complete an action?"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
            />
            <TextField
                label="What's the action you want to track? ( e.g. Exercise, Read a book )"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <div className="flex items-center">
                <Checkbox {...label} />
                {/* make dynamic week/month/year here */}
                <p className="text-sm font-light">Set this as a regular achievement for every week</p>
            </div>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Plus size={20} strokeWidth={3} />}
                sx={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    backgroundColor: "#5A00DA",
                    transition: "background-color 0.3s ease, transform 0.3s ease",
                    ":hover": { backgroundColor: "#4E00C8", transform: "scale(1.05)" },
                    marginTop: "20px",
                }}
            >
                Create
            </Button>

        </Modal>
    );
}
