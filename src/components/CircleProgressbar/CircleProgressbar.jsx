import React, { useEffect, useState } from "react";

const CircularProgressbar = ({ percentage, description }) => {
    const [progress, setProgress] = useState(0);
    const [displayedPercentage, setDisplayedPercentage] = useState(0);
    const [radius, setRadius] = useState(55);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) {
                setRadius(38); // Small screen radius
            } else {
                setRadius(55); // Default radius
            }
        };

        handleResize(); // Run once
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setProgress(percentage), 200);
        return () => clearTimeout(timeout);
    }, [percentage]);

    useEffect(() => {
        let interval;
        if (progress > 0) {
            let start = 0;
            interval = setInterval(() => {
                start += 1;
                setDisplayedPercentage(start);
                if (start >= percentage) clearInterval(interval);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [progress, percentage]);

    const stroke = 11;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    const isLargeScreen = window.innerWidth >= 700;
    const fontSize = isLargeScreen ? 24 : 18;

    return (
        <div className="flex flex-col items-center">
            <svg width={radius * 2} height={radius * 2}>
                <circle
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius}
                    stroke="rgba(90, 0, 218, 0.1)"
                    strokeWidth={stroke}
                    fill="transparent"
                />

                <circle
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius}
                    stroke="#5A00DA"
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${radius} ${radius})`}
                    style={{ transition: "stroke-dashoffset 1s ease-out" }}
                />
                <text
                    x={radius}
                    y={radius}
                    textAnchor="middle"
                    dy=".3em"
                    fontSize={fontSize}
                    fontWeight="bold"
                    fill="#121212"
                    fontFamily="MuseoModerno"
                >
                    {displayedPercentage}%
                </text>
            </svg>
            <p className="mt-2 text-[#121212] text-[12px] text-center w-[100px] lg:text-sm lg:w-[165px]">{description}</p>
        </div>
    );
};

export default CircularProgressbar;