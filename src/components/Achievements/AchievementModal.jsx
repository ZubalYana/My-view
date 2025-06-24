import React, { useState } from "react";
import { Dialog, DialogContent, Button, TextField, Autocomplete } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { Edit2, Trash2, X } from "lucide-react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function AchievementModal({ open, onClose, achievement, handleCheckboxChange, onFeedback }) {
    if (!achievement) return null;

    const [editedActionName, setEditedActionName] = useState(achievement.actionName);
    const [editedRepetitions, setEditedRepetitions] = useState(achievement.repetitions);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [editedTags, setEditedTags] = useState(achievement.tags || []);
    const defaultTags = ["Fitness", "Study", "Health", "Work", "Hobby"];
    const [editedReminders, setEditedReminders] = useState(achievement.reminders || []);

    const countProgressPercentage = (completedRepetitions, repetitions) => {
        return Math.round((completedRepetitions / repetitions) * 100);
    };

    const queryClient = useQueryClient();

    const editAchievement = useMutation({
        mutationFn: async () => {
            const response = await axios.patch(
                `http://localhost:5000/achievements/edit-achievement/${achievement._id}`,
                {
                    actionName: editedActionName,
                    repetitions: editedRepetitions,
                    tags: editedTags,
                    reminders: editedReminders,
                }
            );
            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["achievements"]);
            onFeedback?.("Achievement updated successfully!", "success");
            onClose();
        },
        onError: (error) => {
            console.error("Error editing achievement", error);
        },
    });

    const deleteAchievement = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(`http://localhost:5000/achievements/delete-achievement/${achievement._id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["achievements"]);
            onFeedback?.("Achievement deleted successfully!", "success");
            onClose();
        },
        onError: (error) => {
            console.error("Error deleting achievement", error);
        },
    });

    const handleEditAchievement = () => {
        editAchievement.mutate();
    };

    const handleDeleteAchievement = () => {
        deleteAchievement.mutate();
    };

    return (
        <div>
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
                    <div className="mt-3">
                        {achievement.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-[#5A00DA] text-[15px] font-semibold p-2 bg-[#e9e6ee] rounded-xl mr-2 hover:cursor-pointer hover:bg-[#d6d3db] transition-colors duration-300 ease-in-out"
                            >
                                #{tag}
                            </span>
                        ))}
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
                            onClick={() => setConfirmOpen(true)}
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
                            <Autocomplete
                                multiple
                                freeSolo
                                options={defaultTags}
                                value={editedTags}
                                onChange={(event, newValue) => setEditedTags(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Tags"
                                        placeholder="Select or type tags"
                                        sx={{ marginTop: "10px" }}
                                    />
                                )}
                            />
                            <div className="mt-4">
                                {editedReminders.map((reminder, index) => (
                                    <div key={index} className="flex gap-3 items-center mb-2">
                                        <TextField
                                            label="Day"
                                            select
                                            value={reminder.day}
                                            onChange={(e) => {
                                                const newReminders = [...editedReminders];
                                                newReminders[index].day = e.target.value;
                                                setEditedReminders(newReminders);
                                            }}
                                            SelectProps={{ native: true }}
                                            sx={{ width: "130px" }}
                                        >
                                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label="Time"
                                            type="time"
                                            value={reminder.time}
                                            onChange={(e) => {
                                                const newReminders = [...editedReminders];
                                                newReminders[index].time = e.target.value;
                                                setEditedReminders(newReminders);
                                            }}
                                            sx={{ width: "150px" }}
                                            InputLabelProps={{ shrink: true }}
                                            inputProps={{ step: 300 }}
                                        />
                                        <Button
                                            color="error"
                                            onClick={() => {
                                                const newReminders = editedReminders.filter((_, i) => i !== index);
                                                setEditedReminders(newReminders);
                                            }}
                                        >
                                            <Trash2 className="w-[18px]" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 1, borderColor: "#5A00DA", color: "#5A00DA", textTransform: "none" }}
                                    onClick={() => setEditedReminders([...editedReminders, { day: "Monday", time: "12:00" }])}
                                >
                                    + Add Reminder
                                </Button>
                            </div>


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
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogContent className="flex flex-col gap-4 items-center py-6 px-8">
                    <p className="text-lg text-center font-semibold">Are you sure you want to delete this achievement?</p>
                    <div className="flex justify-between gap-4 w-full mt-2">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#DA0037",
                                color: "white",
                                fontWeight: "bold",
                                textTransform: "none",
                                padding: "8px 20px",
                                flex: 1
                            }}
                            onClick={() => {
                                handleDeleteAchievement();
                                setConfirmOpen(false);
                            }}
                        >
                            Yes, Delete
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: "#5A00DA",
                                color: "#5A00DA",
                                fontWeight: "bold",
                                textTransform: "none",
                                padding: "8px 20px",
                                flex: 1
                            }}
                            onClick={() => setConfirmOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}
