import React, { useEffect, useState } from "react";
import { Flame, FlameKindling } from "lucide-react";
import { Box } from "@mui/material";
import StreakExplanationModal from "./StreakExplanationModal";

export default function StreakFlame({ lastUpdated, current, longest }) {
    const [status, setStatus] = useState("dead");
    const [isOpen, setIsOpen] = useState(false);

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


    const isCurrentLongest = current === longest && current > 0;

    return (
        <div className='w-[150px] min-h-[160px] h-fit-content bg-[#5A00DA] rounded-xl mt-4 lg:absolute lg:m-0 top-4 right-4'>
            <div className="w-[100%] h-[100%] relative p-3">
                <div className="w-[15px] h-[15px] rounded-full border-[2px] border-[#F5F5F5] absolute top-2 right-2 flex justify-center items-center cursor-pointer text-[10px] text-[#f5f5f5]" onClick={() => setIsOpen(true)}>?</div>
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
            </div>

            <StreakExplanationModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

    );
}
