import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function AchievementsContainer({ type }) {
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

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load achievements.</p>;

    const filteredAchievements = data.filter((achievement) => {
        if (type === "weekly") return achievement.weekly;
        if (type === "monthly") return achievement.monthly;
        if (type === "yearly") return achievement.yearly;
        return false;
    });

    return (
        <div className="w-full mt-4">
            {filteredAchievements.length === 0 ? (
                <p>No achievements found for this {type} period.</p>
            ) : (
                <ul>
                    {filteredAchievements.map((achievement) => (
                        <li key={achievement._id} className="mb-2 p-2 border rounded">
                            {achievement.repetitions} {achievement.actionName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
