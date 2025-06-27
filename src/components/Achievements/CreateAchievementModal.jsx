import React, { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { TextField, Button, FormControlLabel, Autocomplete } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { MenuItem, Select, InputLabel } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function CreateAchievementModal({ isOpen, onClose, type, onFeedback }) {
    const queryClient = useQueryClient();
    const defaultTags = ['Fitness', 'Study', 'Health', 'Work', 'Hobby'];
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const [isTelegramConnected, setIsTelegramConnected] = useState(false);
    const [showConnectTelegram, setShowConnectTelegram] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 1020);

    const initialState = {
        actionName: "",
        repetitions: "",
        tags: [],
        weekly: false,
        monthly: false,
        yearly: false,
        isRegular: false,
        reminderDays: [],
        reminderTime: "",
    };
    const [formData, setFormData] = useState({
        actionName: "",
        repetitions: "",
        tags: [],
        weekly: false,
        monthly: false,
        yearly: false,
        isRegular: false,
        reminderDays: [],
        reminderTime: "",
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            weekly: type === "weekly",
            monthly: type === "monthly",
            yearly: type === "yearly",
        }));
    }, [type]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    useEffect(() => {
        async function checkTelegram() {
            const token = localStorage.getItem("token");
            if (!token) return;
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
            const res = await fetch("/auth/user", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) return;
            const userData = await res.json();
            setIsTelegramConnected(userData.telegram?.isConnected ?? false);
        }
        checkTelegram();
    }, []);

    const handleSubmit = async () => {
        try {
            if (formData.reminderDays.length && formData.reminderTime && !isTelegramConnected) {
                setShowConnectTelegram(true);
                onFeedback("Please connect our Telegram bot to enable reminders.", "warning");
                return;
            }
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const payload = JSON.parse(atob(token.split(".")[1]));

            if (formData.reminderDays.length && formData.reminderTime) {
                const tgCheck = await fetch("/auth/user", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const userData = await tgCheck.json();

                if (!userData?.telegram?.isConnected) {
                    onFeedback("Please connect our Telegram bot to enable reminders.", "warning");
                    return;
                }
            }

            const reminders = formData.reminderDays.map(day => ({
                day,
                time: formData.reminderTime,
            }));

            const response = await fetch("/achievements/create-achievement", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formData, reminders, userId }),
            });

            if (response.ok) {
                onFeedback("Achievement created successfully!", "success");
                queryClient.invalidateQueries(["achievements"]);
                setFormData({ ...initialState, ...{ weekly: type === "weekly", monthly: type === "monthly", yearly: type === "yearly" } });
                onClose();
            } else {
                onFeedback("Failed to create achievement. Try again.", "error");
            }
        } catch (error) {
            console.error(error);
            onFeedback("An error occurred. Please try again.", "error");
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsNarrowScreen(window.innerWidth < 1020);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Achievement Creation Modal"
            style={{
                overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                },
                content: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: isNarrowScreen ? "100%" : "38%",
                    minHeight: "50%",
                    maxHeight: "90%",
                    height: "fit-content",
                    overflow: "hidden",
                    overflowY: "auto",
                    borderRadius: "8px",
                    outline: "none",
                    padding: "35px",
                    paddingTop: "25px",
                    backgroundColor: "#fff",
                    color: "var(--custom-black)",
                },
            }}
        >
            <h2 className="text-2xl font-bold">Let's create a new achievement!</h2>
            <div className="flex flex-col gap-4 mt-4 mb-2">
                <TextField
                    label="How many times do you want to complete an action?"
                    variant="outlined"
                    fullWidth
                    type="number"
                    name="repetitions"
                    value={formData.repetitions}
                    onChange={handleChange}
                />
                <TextField
                    label="What's the action you want to track? ( e.g. exercise, read a book )"
                    variant="outlined"
                    fullWidth
                    name="actionName"
                    value={formData.actionName}
                    onChange={handleChange}
                />
                <Autocomplete
                    multiple
                    freeSolo
                    options={defaultTags}
                    value={formData.tags || []}
                    onChange={(event, newValue) => {
                        setFormData(prev => ({ ...prev, tags: newValue }));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Tags"
                            placeholder="Select or type tags"
                        />
                    )}
                />
                <InputLabel id="reminder-days-label">Remind me on</InputLabel>
                <Select
                    labelId="reminder-days-label"
                    multiple
                    fullWidth
                    value={formData.reminderDays}
                    onChange={(e) => setFormData(prev => ({ ...prev, reminderDays: e.target.value }))}
                    renderValue={(selected) => selected.join(", ")}
                >
                    {weekDays.map(day => (
                        <MenuItem key={day} value={day}>
                            <Checkbox checked={formData.reminderDays.includes(day)} />
                            {day}
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    label="Reminder time"
                    type="time"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                    value={formData.reminderTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
                    sx={{ marginTop: 1 }}
                    InputProps={{
                        startAdornment: <AccessTimeIcon sx={{ marginRight: 1 }} />
                    }}
                />

                {showConnectTelegram && (
                    <div style={{ marginTop: 20, padding: 15, border: "1px solid #ccc", borderRadius: 8 }}>
                        <h3>Connect Telegram Bot</h3>
                        <p>To receive reminders, connect with our Telegram bot:</p>
                        <a
                            href={`https://t.me/MyViewApplication_Bot?start=${userId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#0057ff", fontWeight: "bold" }}
                        >
                            👉 Click here to connect your Telegram
                        </a>
                        <p style={{ marginTop: 10 }}>After starting the bot, come back and press "Retry".</p>

                        <Button
                            variant="outlined"
                            sx={{ mt: 1 }}
                            onClick={async () => {
                                const token = localStorage.getItem("token");
                                const res = await fetch("/auth/user", {
                                    headers: { Authorization: `Bearer ${token}` },
                                });
                                const user = await res.json();
                                if (user.telegram?.isConnected) {
                                    setIsTelegramConnected(true);
                                    setShowConnectTelegram(false);
                                    onFeedback("Telegram connected successfully!", "success");
                                } else {
                                    onFeedback("Telegram not connected yet. Try again.", "error");
                                }
                            }}
                        >
                            Retry
                        </Button>
                    </div>
                )}



            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.isRegular}
                        name="isRegular"
                        onChange={handleChange}
                    />
                }
                label="Mark as a regular achievement"
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<Plus size={20} strokeWidth={3} />}
                sx={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    backgroundColor: "#5A00DA",
                    transition: "background-color 0.3s ease, transform 0.3s ease",
                    ":hover": { backgroundColor: "#4E00C8", transform: "scale(1.05)" },
                    marginTop: "20px",
                }}
                onClick={handleSubmit}
            >
                Create
            </Button>

        </Modal>
    );
}
