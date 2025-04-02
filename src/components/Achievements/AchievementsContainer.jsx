import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function AchievementsContainer() {
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

    return (
        <div className="w-full mt-4">
            {data.length === 0 ? (
                <p>No achievements found.</p>
            ) : (
                <ul>
                    {data.map((achievement) => (
                        <li key={achievement._id} className="mb-2 p-2 border rounded">
                            {achievement.repetitions} {achievement.actionName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
