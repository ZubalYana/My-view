import React, { useEffect, useState } from "react";

export default function StreakFlame({ lastUpdated, current }) {
    const [status, setStatus] = useState("dead");

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const last = new Date(lastUpdated);
        last.setHours(0, 0, 0, 0);

        const diff = today.getTime() - last.getTime();

        if (diff === 0) {
            setStatus("active");
        } else if (diff === 86400000) {
            setStatus("smoulder");
        } else {
            setStatus("dead");
        }
    }, [lastUpdated]);

    const animation = {
        active: "/activeFlame.webm",
        smoulder: "/smoulderFlame.webm",
        dead: "/smoulderFlame.webm",
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                style={{
                    width: "100px",
                    height: "80px",
                    overflow: "hidden",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <video
                    key={animation[status]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        minWidth: "100%",
                        minHeight: "100%",
                        objectFit: "cover",
                    }}
                >
                    <source src={animation[status]} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <span className="text-[#F5F5F5] font-medium text-base">
                <span className="font-bold">{current}</span>-day streak
            </span>
        </div>

    );
}
