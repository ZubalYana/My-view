import React, { useState, useEffect } from "react";
import { CalendarHeart } from "lucide-react";
export default function TimeLine() {
    const [dateTime, setDateTime] = useState({
        dayOfWeek: "",
        currentTime: "",
        date: ""
    });

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const hours = now.getHours() % 12 || 12;
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const amPm = now.getHours() < 12 ? "AM" : "PM";
            const formattedTime = `${hours}:${minutes}${amPm}`;

            const day = now.getDate();
            const month = now.toLocaleString("en-US", { month: "long" });
            const suffix = getOrdinalSuffix(day);
            const formattedDate = `The ${day}${suffix} of ${month}`;

            setDateTime({
                dayOfWeek: now.toLocaleDateString("en-US", { weekday: "long" }),
                currentTime: formattedTime,
                date: formattedDate
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
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-[515px] h-[340px] bg-[#5A00DA] rounded-2xl p-6">
            <div className="w-full flex justify-between">
                <p className="text-2xl font-semibold text-[#F5F5F5]">{dateTime.dayOfWeek}</p>
                <p className="text-base font-normal text-[#F5F5F5]">{dateTime.currentTime}</p>
            </div>
            <p className="text-base text-[#F5F5F5] mt-2 flex items-center">
                <CalendarHeart className="inline-block mr-2" size={20} />
                {dateTime.date}
            </p>
        </div>
    );
}
