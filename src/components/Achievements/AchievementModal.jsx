import React from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { Edit2, Trash2 } from "lucide-react";
const label = { inputProps: { "aria-label": "Checkbox demo" } };


export default function AchievementModal({ open, onClose, achievement, handleCheckboxChange }) {
    if (!achievement) return null;

    const countProgressPercentage = (completedRepetitions, repetitions) => {
        return Math.round((completedRepetitions / repetitions) * 100);
    };

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
                },
            }}
        >
            <DialogContent>
                <div className="w-full flex justify-between">
                    <p className="text-lg font-semibold">
                        <span className="text-[#5A00DA] mr-2">{achievement.repetitions}</span>
                        <span className="">{achievement.actionName}</span>
                    </p>
                    <span className="text-[#5A00DA] text-base font-normal">
                        {achievement.completedRepetitions}/{achievement.repetitions}
                    </span>
                </div>
                <div className="w-full flex flex-wrap mt-3 gap-[7px] h-auto overflow-y-auto max-h-[133px]">
                    {[...Array(achievement.repetitions)].map((_, index) => (
                        <Checkbox
                            {...label}
                            icon={<CircleOutlinedIcon sx={{ fontSize: 28, color: "#5A00DA" }} />}
                            checkedIcon={<CircleIcon sx={{ fontSize: 28, color: "#5A00DA" }} />}
                            checked={index < achievement.completedRepetitions}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleCheckboxChange(achievement, index)}
                            sx={{ padding: 0 }}
                            key={index}
                        />
                    ))}
                </div>
                <div className="mt-4 w-full">
                    <div className="w-full h-3 rounded-[3px] overflow-hidden border-2 border-[#121212]">
                        <div className="h-full bg-[#121212]" style={{ width: `${countProgressPercentage(achievement.completedRepetitions, achievement.repetitions)}%` }}></div>
                    </div>
                    <p className="text-sm text-[#121212] mt-2">
                        Current progress: <span className="font-semibold text-[#5A00DA]">{countProgressPercentage(achievement.completedRepetitions, achievement.repetitions)}%</span>
                    </p>
                </div>
                <div className="w-[420px] flex justify-between mt-5">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#5A00DA",
                            color: "white",
                            textTransform: "none",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <Edit2 className="w-[20px] mr-2" />
                        Edit Achievement
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#DA0037",
                            color: "white",
                            textTransform: "none",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <Trash2 className="w-[20px] mr-2" />
                        Delete Achievement
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

