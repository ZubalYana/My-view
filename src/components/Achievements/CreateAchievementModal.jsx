import React, { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { TextField, Button, FormControlLabel } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { Plus } from "lucide-react";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CreateAchievementModal({ isOpen, onClose, type }) {
    const [formData, setFormData] = useState({
        actionName: "",
        repetitions: "",
        weekly: false,
        monthly: false,
        yearly: false,
        isRegular: false,
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            weekly: type === "weekly",
            monthly: type === "monthly",
            yearly: type === "yearly",
        }));
    }, [type]);




    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }

            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId = payload.id;

            const response = await fetch("http://localhost:5000/achievements/create-achievement", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formData, userId }),
            });

            if (response.ok) {
                setFormData({
                    actionName: "",
                    repetitions: "",
                    weekly: type === "weekly",
                    monthly: type === "monthly",
                    yearly: type === "yearly",
                    isRegular: false,
                });
                onClose();
            } else {
                console.error("Failed to create achievement");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


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
                name="repetitions"
                value={formData.repetitions}
                onChange={handleChange}
            />
            <TextField
                label="What's the action you want to track? ( e.g. Exercise, Read a book )"
                variant="outlined"
                fullWidth
                margin="normal"
                name="actionName"
                value={formData.actionName}
                onChange={handleChange}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.isRegular}
                        name="isRegular"
                        onChange={handleChange}
                    />
                }
                label="Mark as a regular achievement"
            />


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
                onClick={handleSubmit}
            >
                Create
            </Button>

        </Modal>
    );
}
