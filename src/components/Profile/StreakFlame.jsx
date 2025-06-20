import React, { useEffect, useState } from "react";
import StreakCalendarModal from "./StreakCalendarModal";

export default function StreakFlame({ lastUpdated, current, longest, activeDates }) {
    const [status, setStatus] = useState("dead");
    const [open, setOpen] = useState(false);

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

    const isCurrentLongest = current === longest && current > 0;

    return (
        <div className='w-[150px] min-h-[160px] h-fit-content bg-[#5A00DA] rounded-xl p-3 absolute top-4 right-4'
            onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="flex flex-col items-center gap-2 text-center">
                <div
                    style={{
                        width: "120px",
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

                <span
                    className="font-medium text-[14px] text-[#F5F5F5] "
                >
                    <span className="font-bold">{current}</span>-day streak <br />
                    {isCurrentLongest && " ( Longest! )"}
                </span>

                {!isCurrentLongest && longest > 0 && (
                    <span className="text-sm text-gray-400">
                        Longest streak: <span className="font-semibold">{longest}</span>
                    </span>
                )}
            </div>
            <StreakCalendarModal
                open={open}
                onClose={() => setOpen(false)}
                activeDates={activeDates}
            />
        </div>

    );
}
