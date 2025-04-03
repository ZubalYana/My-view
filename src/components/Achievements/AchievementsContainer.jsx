import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function AchievementsContainer({ type }) {
    const queryClient = useQueryClient();

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
        const newCompletedRepetitions = achievement.completedRepetitions + (achievement.completedRepetitions > index ? -1 : 1);
        updateAchievement.mutate({ id: achievement._id, completedRepetitions: newCompletedRepetitions });
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
                            className="w-[350px] h-[250px] bg-[#FFFFFF] rounded-xl shadow-xl flex flex-col p-5"
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

                            <div className="flex flex-wrap mt-3 gap-[7px] overflow-y-auto">
                                {[...Array(achievement.repetitions)].map((_, index) => (
                                    <Checkbox
                                        {...label}
                                        icon={<CircleOutlinedIcon sx={{ fontSize: 28 }} />}
                                        checkedIcon={<CircleIcon fontSize="small" />}
                                        checked={index < achievement.completedRepetitions}
                                        onChange={() => handleCheckboxChange(achievement, index)}
                                        sx={{ padding: 0 }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
