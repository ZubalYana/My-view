import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import CreateAchievementBtn from "./CreateAchievementBtn";
import CreateAchievementModal from "./CreateAchievementModal";

export default function AchievementsPage({ type }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState({ message: "", severity: "" });

    const handleFeedback = (message, severity) => {
        setAlert({ message, severity });
    };

    return (
        <div>
            <h1>{type} Achievements</h1>
            <CreateAchievementBtn onClick={() => setIsModalOpen(true)} />
            <CreateAchievementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={type.toLowerCase()}
                onFeedback={handleFeedback}
            />

            <Snackbar
                open={!!alert.message}
                autoHideDuration={3000}
                onClose={() => setAlert({ message: "", severity: "" })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setAlert({ message: "", severity: "" })} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
