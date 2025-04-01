import React, { useState } from "react";
import CreateAchievementBtn from "./CreateAchievementBtn";
import CreateAchievementModal from "./CreateAchievementModal";

export default function AchievementsPage({ type }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <h1>{type} Achievements</h1>
            <CreateAchievementBtn onClick={() => setIsModalOpen(true)} />
            <CreateAchievementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={type.toLowerCase()} />
        </div>
    );
}
