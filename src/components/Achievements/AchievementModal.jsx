import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function AchievementModal({ open, onClose, achievement }) {
    if (!achievement) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{achievement.actionName}</DialogTitle>
            <DialogContent>
                <p><strong>Repetitions:</strong> {achievement.repetitions}</p>
                <p><strong>Completed:</strong> {achievement.completedRepetitions}</p>
                <p><strong>Progress:</strong> {Math.round((achievement.completedRepetitions / achievement.repetitions) * 100)}%</p>
                {achievement.description && <p><strong>Description:</strong> {achievement.description}</p>}
            </DialogContent>
        </Dialog>
    );
}
