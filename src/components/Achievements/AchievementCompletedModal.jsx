import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { format, parseISO, differenceInDays } from "date-fns";
import { PartyPopper } from "lucide-react";

export default function AchievementCompletedModal({ open, onClose, achievement }) {
    if (!achievement) return null;

    const { actionName, repetitions, createdAt } = achievement;

    const createdDate = parseISO(createdAt);
    const completedDate = new Date();
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
                <h2 className="text-[16px] text-center font-bold text-[#121212] mb-2 w-full flex justify-center lg:text-[24px]">
                    <PartyPopper className="mr-2 text-[#5A00DA]" />
                    ACHIEVEMENT COMPLETED!
                    <PartyPopper className="ml-2 text-[#5A00DA]" />
                </h2>
                <p className="text-base text-center mb-1 w-full px-2">
                    You successfully made it:
                    <span className="text-[#5A00DA] font-semibold ml-1">
                        {repetitions} {actionName}
                    </span>
                    !
                </p>

                <p className="text-base text-center w-full px-2">
                    You set the achievement on
                    <span className="text-[#5A00DA] font-semibold mx-1">{formattedCreatedDate}</span>
                    and completed it on
                    <span className="text-[#5A00DA] font-semibold mx-1">{formattedCompletedDate}</span>.
                    It took you in total
                    <span className="text-[#5A00DA] font-semibold mx-1">
                        {durationInDays === 0 ? "less than a day" : `${durationInDays} day${durationInDays > 1 ? "s" : ""}`}
                    </span>.
                    Be proud of yourself!
                </p>

            </DialogContent>
        </Dialog>
    );
}
