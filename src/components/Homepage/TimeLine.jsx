import React, { useState, useEffect } from "react";
import { CalendarHeart } from "lucide-react";

export default function TimeLine() {
    const [dateTime, setDateTime] = useState({
        dayOfWeek: "",
        currentTime: "",
        date: "",
    });

    const [progress, setProgress] = useState({
        day: 0,
        month: 0,
        year: 0
    });

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const amPm = hours < 12 ? "AM" : "PM";
            const formattedTime = `${(hours % 12) || 12}:${minutes}${amPm}`;

            const day = now.getDate();
            const month = now.toLocaleString("en-US", { month: "long" });
            const suffix = getOrdinalSuffix(day);
            const formattedDate = `The ${day}${suffix} of ${month}`;

            setDateTime({
                dayOfWeek: now.toLocaleDateString("en-US", { weekday: "long" }),
                currentTime: formattedTime,
                date: formattedDate
            });

            const dayProgress = ((hours * 60 + now.getMinutes()) / (24 * 60)) * 100;
            const monthProgress = (day / new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) * 100;
            const yearProgress = ((now - new Date(now.getFullYear(), 0, 1)) / (new Date(now.getFullYear() + 1, 0, 1) - new Date(now.getFullYear(), 0, 1))) * 100;

            setProgress({
                day: Math.round(dayProgress),
                month: Math.round(monthProgress),
                year: Math.round(yearProgress)
            });
        };

        const getOrdinalSuffix = (day) => {
            if (day >= 11 && day <= 13) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-[515px] h-[290px] bg-[#5A00DA] rounded-2xl p-6">
            <div className="w-full flex justify-between">
                <p className="text-2xl font-semibold text-[#F5F5F5]">{dateTime.dayOfWeek}</p>
                <p className="text-base font-normal text-[#F5F5F5]">{dateTime.currentTime}</p>
            </div>
            <p className="text-base text-[#F5F5F5] mt-2 flex items-center">
                <CalendarHeart className="inline-block mr-2" size={20} />
                {dateTime.date}
            </p>

            <div className="mt-4">
                <p className="text-sm text-[#F5F5F5]">Current day: <span className="font-semibold">{progress.day}%</span></p>
                <div className="w-full h-3 rounded-full overflow-hidden border-2 border-[#F5F5F5] mt-2">
                    <div className="h-full bg-[rgba(245,245,245,0.7)]" style={{ width: `${progress.day}%` }}></div>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-[#F5F5F5]">Current month: <span className="font-semibold">{progress.month}%</span></p>
                <div className="w-full h-3 rounded-full overflow-hidden border-2 border-[#F5F5F5] mt-2">
                    <div className="h-full bg-[rgba(245,245,245,0.7)]" style={{ width: `${progress.month}%` }}></div>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-[#F5F5F5]">Current year: <span className="font-semibold">{progress.year}%</span></p>
                <div className="w-full h-3 rounded-full overflow-hidden border-2 border-[#F5F5F5] mt-2">
                    <div className="h-full bg-[rgba(245,245,245,0.7)]" style={{ width: `${progress.year}%` }}></div>
                </div>
            </div>
        </div>
    );
}
