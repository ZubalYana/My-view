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
    "#5A00DA",
    "#9333EA",
    "#C084FC",
    "#a68bcc",
    "#492e70",
    "#3a1c9c",
    "#9c40ff",
    "#A3A3A3",
];


export default function HashtagFocusChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/achievements/get-achievements", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const counts = {};
                res.data.forEach((achievement) => {
                    (achievement.tags || []).forEach((tag) => {
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
        <div className="w-full h-[400px] mt-5 bg-white rounded-xl shadow-md p-5 lg:w-[40%] lg:h-[400px]">
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
