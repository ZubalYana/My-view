import React from 'react';
import { LinearProgress, Typography, Box, Card, CardContent } from '@mui/material';

const getXPForLevel = (level) => Math.floor(100 * level * 1.5);
const getXPForPreviousLevel = (level) => level === 1 ? 0 : getXPForLevel(level - 1);

const LevelProgress = ({ level, XP }) => {
    const prevLevelXP = getXPForPreviousLevel(level);
    const currentLevelXP = getXPForLevel(level);
    const progress = ((XP - prevLevelXP) / (currentLevelXP - prevLevelXP)) * 100;

    return (
        <div className='max-w-[400px]'>
            <Typography variant="h6" gutterBottom>
                Level <span className='font-medium'>{level}</span>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        value={Math.min(progress, 100)}
                        sx={{ height: 10, borderRadius: 5, backgroundColor: 'rgba(147, 31, 255, 0.3)', '& .MuiLinearProgress-bar': { backgroundColor: '#5A00DA' } }}
                    />
                </Box>
                <Typography variant="body2" sx={{ minWidth: 80 }}>
                    {XP} XP
                </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
                {Math.floor(XP - prevLevelXP)} / {currentLevelXP - prevLevelXP} XP to next level
            </Typography>
        </div>
    );
};

export default LevelProgress;
