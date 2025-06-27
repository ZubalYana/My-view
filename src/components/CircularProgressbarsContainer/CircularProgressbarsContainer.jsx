import React from "react";
import CircleProgressbar from '../CircleProgressbar/CircleProgressbar';
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchAchievements = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("/achievements/get-achievements", {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch achievements");
    }

    return response.json();
};
const CircularProgressbarsContainer = () => {
    const queryClient = useQueryClient();
    const {
        data: achievements = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["achievements"],
        queryFn: fetchAchievements,
    });

    const calculatePercentage = (filterKey) => {
        const filtered = achievements.filter(ach => ach[filterKey]);
        const totalCompleted = filtered.reduce((acc, ach) => acc + ach.completedRepetitions, 0);
        const totalRepetitions = filtered.reduce((acc, ach) => acc + ach.repetitions, 0);

        if (totalRepetitions === 0) return 0;
        return Math.round((totalCompleted / totalRepetitions) * 100);
    };

    const weeklyPercentage = calculatePercentage("weekly");
    const monthlyPercentage = calculatePercentage("monthly");
    const yearlyPercentage = calculatePercentage("yearly");

    return (
        <div className="w-full flex justify-between mt-6 md:w-[540px] lg:mt-10">
            <CircleProgressbar percentage={weeklyPercentage} description="Weekly achievements completed" />
            <CircleProgressbar percentage={monthlyPercentage} description="Monthly achievements completed" />
            <CircleProgressbar percentage={yearlyPercentage} description="Yearly achievements completed" />
        </div>
    );
};


export default CircularProgressbarsContainer;
