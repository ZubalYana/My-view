import React, { useEffect, useState } from "react";

const CircularProgressbar = ({ percentage, description }) => {
    const [progress, setProgress] = useState(0);
    const [displayedPercentage, setDisplayedPercentage] = useState(0);

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

    const radius = 55;
    const stroke = 11;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

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
                    fontSize="24px"
                    fontWeight="bold"
                    fill="#121212"
                    fontFamily="MuseoModerno"
                >
                    {displayedPercentage}%
                </text>
            </svg>
            <p className="mt-2 text-[#121212] text-sm w-[165px] text-center">{description}</p>
        </div>
    );
};

export default CircularProgressbar;