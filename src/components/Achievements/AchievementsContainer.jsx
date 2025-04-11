import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import AchievementModal from "./AchievementModal";
import AchievementCompletedModal from "./AchievementCompletedModal";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const fetchAchievements = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://localhost:5000/achievements/get-achievements", {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch achievements");
    }

    return response.json();
};

export default function AchievementsContainer({ type, onFeedback }) {
    const queryClient = useQueryClient();
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [celebretionModalOpen, setCelebrationModalOpen] = useState(false);
    const [justCompletedAchievement, setJustCompletedAchievement] = useState(null);
    const isCompleted = (achievement) => achievement.completedRepetitions >= achievement.repetitions;

    const {
        data = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["achievements"],
        queryFn: fetchAchievements,
    });

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

    const filteredAchievements = data.filter((achievement) => {
        if (type === "weekly") return achievement.weekly;
        if (type === "monthly") return achievement.monthly;
        if (type === "yearly") return achievement.yearly;
        return false;
    });

    useEffect(() => {
        if (!selectedAchievement) return;

        const updated = data.find((a) => a._id === selectedAchievement._id);
        if (updated) {
            setSelectedAchievement(updated);
        }
    }, [data, selectedAchievement]);


    const handleCheckboxChange = (achievement, index) => {
        const isChecked = index < achievement.completedRepetitions;
        const newCompleted = isChecked
            ? achievement.completedRepetitions - 1
            : achievement.completedRepetitions + 1;

        const wasIncomplete = achievement.completedRepetitions < achievement.repetitions;
        const willBeComplete = newCompleted === achievement.repetitions;

        updateAchievement.mutate(
            { id: achievement._id, completedRepetitions: newCompleted },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(["achievements"]);

                    if (wasIncomplete && willBeComplete) {
                        setJustCompletedAchievement(achievement);
                        setCelebrationModalOpen(true);
                    }
                },
            }
        );
    };

    const countProgressPercentage = (completed, total) =>
        Math.round((completed / total) * 100);

    const openModal = (achievement) => {
        setSelectedAchievement(achievement);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAchievement(null);
        setModalOpen(false);
    };

    const openCelebrationModal = () => {
        setCelebrationModalOpen(true);
    };

    const closeCelebrationModal = () => {
        setCelebrationModalOpen(false);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load achievements.</p>;


    return (
        <div className="w-full mt-5">
            {filteredAchievements.length === 0 ? (
                <p>No achievements found for this {type} period.</p>
            ) : (
                <div className="flex flex-wrap gap-y-10 gap-x-13">
                    {[...filteredAchievements]
                        .sort((a, b) => {
                            const aCompleted = a.completedRepetitions >= a.repetitions;
                            const bCompleted = b.completedRepetitions >= b.repetitions;
                            return aCompleted - bCompleted;
                        })
                        .map((achievement) => (

                            <div
                                key={achievement._id}
                                className="w-[350px] h-[270px] bg-[#FFFFFF] rounded-xl shadow-xl flex flex-col p-5 relative"
                                onClick={() => openModal(achievement)}

                            >
                                <div className="w-full flex justify-between">
                                    <p className="text-lg font-semibold">
                                        <span className="text-[#5A00DA] mr-2">{achievement.repetitions}</span>
                                        <span>{achievement.actionName}</span>
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
                                            onChange={() => {
                                                handleCheckboxChange(achievement, index);
                                            }}
                                            sx={{ padding: 0 }}
                                            key={index}
                                        />
                                    ))}
                                </div>

                                <div className="mt-4 absolute bottom-5 w-[88%]">
                                    <div className="w-full h-3 rounded-[3px] overflow-hidden border-2 border-[#121212]">
                                        <div
                                            className="h-full bg-[#121212]"
                                            style={{
                                                width: `${countProgressPercentage(
                                                    achievement.completedRepetitions,
                                                    achievement.repetitions
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-[#121212] mt-2">
                                        Current progress:{" "}
                                        <span className="font-semibold text-[#5A00DA]">
                                            {countProgressPercentage(
                                                achievement.completedRepetitions,
                                                achievement.repetitions
                                            )}
                                            %
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            <AchievementModal
                open={modalOpen}
                onClose={closeModal}
                achievement={selectedAchievement}
                handleCheckboxChange={handleCheckboxChange}
                onFeedback={onFeedback}
            />
            <AchievementCompletedModal
                open={celebretionModalOpen}
                onClose={closeCelebrationModal}
                achievement={justCompletedAchievement}
            />
        </div>
    );
}
