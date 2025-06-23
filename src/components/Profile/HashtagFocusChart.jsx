import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#a855f7",
    "#ec4899",
    "#3b82f6",
    "#f87171",
];

export default function HashtagFocusChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/achievements", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const counts = {};
                res.data.forEach((achievement) => {
                    (achievement.hashtags || []).forEach((tag) => {
                        counts[tag] = (counts[tag] || 0) + 1;
                    });
                });

                const chartData = Object.entries(counts).map(([name, value]) => ({
                    name,
                    value,
                }));

                setData(chartData);
            } catch (error) {
                console.error("Failed to fetch achievements", error);
            }
        };

        fetchAchievements();
    }, []);

    return (
        <div className="w-full h-[300px] mt-5 bg-white rounded-xl shadow-md p-5">
            <h3 className="text-lg font-semibold mb-4 text-[#121212]">Focus by Life Areas</h3>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
