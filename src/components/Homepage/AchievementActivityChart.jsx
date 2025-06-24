import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function AchievementActivityChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/achievements/activity", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const grouped = res.data.reduce((acc, entry) => {
                    const date = new Date(entry.date).toISOString().split("T")[0];
                    acc[date] = (acc[date] || 0) + entry.count;
                    return acc;
                }, {});

                const today = new Date();
                const daysBack = 14;
                const fullDateList = [];
                for (let i = 0; i <= daysBack; i++) {
                    const d = new Date(today);
                    d.setDate(d.getDate() - i);
                    fullDateList.unshift(d.toISOString().split("T")[0]);
                }

                const chartData = fullDateList.map((date) => ({
                    date,
                    total: grouped[date] || 0,
                }));

                setData(chartData);
            } catch (error) {
                console.error("Failed to fetch activity data", error);
            }
        };

        fetchActivity();
    }, []);


    return (
        <div className="w-full h-[300px] mt-5 bg-white rounded-xl shadow-md p-3 lg:p-5">
            <h3 className="text-lg font-semibold mb-4 text-[#121212]">Daily Achievement Activity</h3>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#5A00DA" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
