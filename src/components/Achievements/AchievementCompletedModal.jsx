import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { format, parseISO, differenceInDays } from "date-fns";
import { PartyPopper } from "lucide-react";

export default function AchievementCompletedModal({ open, onClose, achievement }) {
    if (!achievement) return null;

    const { actionName, repetitions, createdAt } = achievement;

    const createdDate = parseISO(createdAt);
    const completedDate = new Date(); // now
    const durationInDays = differenceInDays(completedDate, createdDate);

    const formattedCreatedDate = format(createdDate, "dd.MM");
    const formattedCompletedDate = format(completedDate, "dd.MM");

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            sx={{
                "& .MuiDialog-paper": {
                    maxWidth: "610px",
                    height: "fit-content",
                    overflow: "auto",
                    transition: "all 0.3s ease-in-out",
                },
            }}
        >
            <DialogContent>
                <h2 className="text-2xl font-bold text-[#121212] mb-2 w-full flex justify-center">
                    <PartyPopper className="mr-2 text-[#5A00DA]" />
                    ACHIEVEMENT COMPLETED!
                    <PartyPopper className="ml-2 text-[#5A00DA]" />
                </h2>

                <p className="text-base mb-1 w-full flex justify-center">
                    You successfully made it: {" "}
                    <span className="text-[#5A00DA] font-semibold ml-1">
                        {repetitions} {actionName}
                    </span>
                    !
                </p>

                <div className=" w-full flex justify-center text-center">
                    <p className="text-base">
                        You set the achievement on{" "}
                        <span className="text-[#5A00DA] font-semibold">{formattedCreatedDate}</span> and completed it on{" "}
                        <span className="text-[#5A00DA] font-semibold">{formattedCompletedDate}</span>. It took you in total{" "}
                        <span className="text-[#5A00DA] font-semibold">
                            {durationInDays === 0 ? "less than a day" : `${durationInDays} day${durationInDays > 1 ? "s" : ""}`}
                        </span>. Be proud of yourself!
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
