import React, { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import CreateAchievementBtn from "./CreateAchievementBtn";
import CreateAchievementModal from "./CreateAchievementModal";
import AchievementsContainer from "./AchievementsContainer";

export default function AchievementsPage({ type }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState({ message: "", severity: "" });
    const [dateRange, setDateRange] = useState("");

    useEffect(() => {
        setDateRange(getDateRange(type));
    }, [type]);

    const handleFeedback = (message, severity) => {
        setAlert({ message, severity });
    };

    return (
        <div>
            <h1 className="text-xl font-semibold w-full flex justify-center">{type} Achievements Board: <span className="text-[#5A00DA] ml-2">{dateRange}</span></h1>
            <CreateAchievementBtn onClick={() => setIsModalOpen(true)} />
            <CreateAchievementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type={type.toLowerCase()}
                onFeedback={handleFeedback}
            />

            <AchievementsContainer type={type.toLowerCase()} />

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


    function getDateRange(type) {
        const now = new Date();

        if (type.toLowerCase() === "weekly") {
            const dayOfWeek = now.getDay();
            const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() + diff);

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
        }

        if (type.toLowerCase() === "monthly") {
            return now.toLocaleString("en-US", { month: "long", year: "numeric" });
        }

        if (type.toLowerCase() === "yearly") {
            return now.getFullYear();
        }

        return "";
    }

    function formatDate(date) {
        return date.toLocaleDateString("en-GB").replace(/\//g, ".");
    }
}
