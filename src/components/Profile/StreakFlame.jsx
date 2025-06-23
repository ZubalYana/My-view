import React, { useEffect, useState } from "react";
import StreakCalendarModal from "./StreakCalendarModal";
import { Flame, FlameKindling } from "lucide-react";
import { Box } from "@mui/material";

export default function StreakFlame({ lastUpdated, current, longest, activeDates }) {
    const [status, setStatus] = useState("dead");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const last = new Date(lastUpdated);
        last.setHours(0, 0, 0, 0);

        const diffDays = (today - last) / (1000 * 60 * 60 * 24);

        if (diffDays === 0) {
            setStatus("active");
        } else if (diffDays === 1) {
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
            <div className="flex flex-col items-center text-center">
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
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 2,
                            bgcolor: "#7F3CE0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {status === "active" && <Flame color="#FF9100" size={48} />}
                        {status === "smoulder" && <Flame color="#FFCC80" size={48} style={{ opacity: 0.6 }} />}
                        {status === "dead" && <FlameKindling color="#B0BEC5" size={48} />}
                    </Box>

                </div>

                <span
                    className="font-medium text-[16px] text-[#F5F5F5] mt-2"
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
