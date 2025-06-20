import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { X } from 'lucide-react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

export default function StreakCalendarModal({ open, onClose, activeDates = [] }) {
    const isActive = (date) => {
        const day = dayjs(date);
        return activeDates.some((d) => day.isSame(dayjs(d), 'day'));
    };

    // This function will be passed to render each day
    const renderDay = (date, selectedDates, pickersDayProps) => {
        const selected = isActive(date);

        return (
            <PickersDay
                {...pickersDayProps}
                sx={{
                    ...(selected && {
                        bgcolor: '#5A00DA',
                        color: 'white',
                        '&:hover, &:focus': {
                            bgcolor: '#7a33e0',
                        },
                    }),
                }}
            />
        );
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    p: 3,
                    width: 320,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    outline: 'none',
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 8, right: 8, color: '#5A00DA' }}
                >
                    <X size={20} />
                </IconButton>
                <Typography variant="h6" align="center" mb={2}>
                    Active Days
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        readOnly
                        showDaysOutsideCurrentMonth
                        defaultValue={dayjs()}
                        renderDay={renderDay}
                    />
                </LocalizationProvider>
            </Box>
        </Modal>
    );
}
