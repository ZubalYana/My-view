import React, { useState } from 'react'
import CreateAchievementBtn from "./CreateAchievementBtn";
import CreateAchievementModal from "./CreateAchievementModal";

export default function YearlyAchievements() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      YearlyAchievements
      <CreateAchievementBtn onClick={() => setIsModalOpen(true)} />
      <CreateAchievementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
