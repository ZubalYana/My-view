import React, { useState } from 'react'
import CreateAchievementBtn from "./CreateAchievementBtn";
import CreateAchievementModal from "./CreateAchievementModal";

export default function MonthlyAchievements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      MonthlyAchievements
      <CreateAchievementBtn onClick={() => setIsModalOpen(true)} />
      <CreateAchievementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
