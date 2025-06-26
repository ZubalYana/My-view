import React from "react";
import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function CreateAchievementBtn({ onClick }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                bottom: "32px",
                right: "32px",
                zIndex: 100,
            }}
        >
            <Button
                variant="contained"
                sx={{
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    padding: "0",
                    minWidth: "0",
                    minHeight: "0",
                    backgroundColor: "#5A00DA",
                    transition: "background-color 0.3s ease, transform 0.3s ease",
                    ":hover": { backgroundColor: "#4E00C8", transform: "scale(1.05)" },
                }}
                onClick={onClick}
            >
                <AddIcon sx={{ fontSize: 40 }} />
            </Button>
        </Box>
    );
}
