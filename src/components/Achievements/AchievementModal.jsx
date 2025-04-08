import React, { useState } from "react";
import { Dialog, DialogContent, Button, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { Edit2, Trash2, X } from "lucide-react";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function AchievementModal({ open, onClose, achievement, handleCheckboxChange, onFeedback }) {
    if (!achievement) return null;

    const [editedActionName, setEditedActionName] = useState(achievement.actionName);
    const [editedRepetitions, setEditedRepetitions] = useState(achievement.repetitions);
    const [isEditing, setIsEditing] = useState(false);

    const countProgressPercentage = (completedRepetitions, repetitions) => {
        return Math.round((completedRepetitions / repetitions) * 100);
    };

    const handleEditAchievement = async () => {
        try {
            const response = await axios.patch(`http://localhost:5000/achievements/edit-achievement/${achievement._id}`, {
                actionName: editedActionName,
                repetitions: editedRepetitions
            });
            console.log(response.data);
            onFeedback?.("Achievement updated successfully!", "success");
            onClose();
        } catch (error) {
            console.error("Error editing achievement", error);
        }
    };

    const handleDeleteAchievement = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/achievements/delete-achievement/${achievement._id}`);
            console.log(response.data);
            onFeedback?.("Achievement deleted successfully!", "success");
            onClose();
        } catch (error) {
            console.error("Error deleting achievement", error);
        }
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
                    transition: "all 0.3s ease-in-out",
                },
            }}
        >
            <DialogContent
                sx={{ transition: "all 0.3s ease-in-out" }}>
                <div className="w-full flex justify-between transition-all">
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

                <div className="flex mt-5">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#5A00DA",
                            color: "white",
                            textTransform: "none",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            marginRight: "20px",
                        }}
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? (
                            <X className="w-[20px] mr-2" />
                        ) : (
                            <Edit2 className="w-[20px] mr-2" />
                        )}
                        {isEditing ? "Cancel Edit" : "Edit Achievement"}
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
                        onClick={handleDeleteAchievement}
                    >
                        <Trash2 className="w-[20px] mr-2" />
                        Delete Achievement
                    </Button>
                </div>

                {isEditing && (
                    <div className="mt-6">
                        <TextField
                            label="Achievement Name"
                            variant="outlined"
                            fullWidth
                            value={editedActionName}
                            onChange={(e) => setEditedActionName(e.target.value)}
                        />
                        <TextField
                            label="Repetitions"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={editedRepetitions}
                            onChange={(e) => setEditedRepetitions(Number(e.target.value))}
                            sx={{ marginTop: "10px" }}
                        />
                    </div>
                )}

                {isEditing && (
                    <div className="flex justify-between mt-5">
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
                            onClick={handleEditAchievement}
                        >
                            Confirm Edit
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                color: "#5A00DA",
                                borderColor: "#5A00DA",
                                textTransform: "none",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
