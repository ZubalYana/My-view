import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import AchievementModal from "./AchievementModal";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function AchievementsContainer({ type }) {
    const queryClient = useQueryClient();
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["achievements"],
        queryFn: fetchAchievements,
    });

    async function fetchAchievements() {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:5000/achievements/get-achievements", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch achievements");
        }

        return response.json();
    }

    const updateAchievement = useMutation({
        mutationFn: async ({ id, completedRepetitions }) => {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/achievements/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ completedRepetitions }),
            });

            if (!response.ok) {
                throw new Error("Failed to update achievement");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["achievements"]);
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load achievements.</p>;

    const filteredAchievements = data.filter((achievement) => {
        if (type === "weekly") return achievement.weekly;
        if (type === "monthly") return achievement.monthly;
        if (type === "yearly") return achievement.yearly;
        return false;
    });

    const handleCheckboxChange = (achievement, index) => {
        const isCurrentlyChecked = index < achievement.completedRepetitions;
        const newCompletedRepetitions = isCurrentlyChecked
            ? achievement.completedRepetitions - 1
            : achievement.completedRepetitions + 1;

        updateAchievement.mutate({ id: achievement._id, completedRepetitions: newCompletedRepetitions });
    };

    const countProgressPercentage = (completedRepetitions, repetitions) => {
        return Math.round((completedRepetitions / repetitions) * 100);
    };

    const openModal = (achievement) => {
        setSelectedAchievement(achievement);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAchievement(null);
        setModalOpen(false);
    };

    return (
        <div className="w-full mt-5">
            {filteredAchievements.length === 0 ? (
                <p>No achievements found for this {type} period.</p>
            ) : (
                <div className="flex flex-wrap gap-y-10 gap-x-13">
                    {filteredAchievements.map((achievement) => (
                        <div
                            key={achievement._id}
                            className="w-[350px] h-[270px] bg-[#FFFFFF] rounded-xl shadow-xl flex flex-col p-5 relative"
                            onClick={() => openModal(achievement)}
                        >
                            <div className="w-full flex justify-between">
                                <p className="text-lg font-semibold">
                                    <span className="text-[#5A00DA] mr-2">{achievement.repetitions}</span>
                                    <span className="">{achievement.actionName}</span>
                                </p>
                                <span className="text-[#5A00DA] text-base font-normal">
                                    {achievement.completedRepetitions}/{achievement.repetitions}
                                </span>
                            </div>

                            <div className="flex flex-wrap mt-3 gap-[7px] overflow-y-auto max-h-[140px]">
                                {[...Array(achievement.repetitions)].map((_, index) => (
                                    <Checkbox
                                        {...label}
                                        icon={<CircleOutlinedIcon sx={{ fontSize: 28, color: "#5A00DA" }} />}
                                        checkedIcon={<CircleIcon sx={{ fontSize: 28, color: "#5A00DA" }} />}
                                        checked={index < achievement.completedRepetitions}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => {
                                            handleCheckboxChange(achievement, index);
                                        }}
                                        sx={{ padding: 0 }}
                                        key={index}
                                    />

                                ))}
                            </div>
                            <div className="mt-4 absolute bottom-5 w-[88%]">
                                <div className="w-full h-3 rounded-[3px] overflow-hidden border-2 border-[#121212]">
                                    <div className="h-full bg-[#121212]" style={{ width: `${countProgressPercentage(achievement.completedRepetitions, achievement.repetitions)}%` }}></div>
                                </div>
                                <p className="text-sm text-[#121212] mt-2">Current progress: <span className="font-semibold text-[#5A00DA]">{countProgressPercentage(achievement.completedRepetitions, achievement.repetitions)}%</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AchievementModal open={modalOpen} onClose={closeModal} achievement={selectedAchievement} />

        </div>
    );
}
