import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { UserCircle2 } from 'lucide-react'
import { Alert, CircularProgress, Snackbar } from '@mui/material'
import StreakFlame from './StreakFlame'
import LevelProgress from './LevelProgress'
export default function Profile() {
    const [user, setUser] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' })

    const fileInputRef = useRef()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get('http://localhost:5000/auth/user', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUser(res.data)
            } catch (error) {
                console.error('Error fetching user:', error)
            }
        }
        fetchUser()
    }, [])

    const handleAvatarClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('image', file)

        try {
            setUploading(true)
            const token = localStorage.getItem('token')
            const res = await axios.post('http://localhost:5000/auth/upload-avatar', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })

            setUser((prev) => ({ ...prev, photo: res.data.url }))
            setAlert({ open: true, message: 'Avatar uploaded successfully!', severity: 'success' })
        } catch (err) {
            console.error('Failed to upload avatar', err)
            setAlert({ open: true, message: 'Failed to upload avatar', severity: 'error' })
        } finally {
            setUploading(false)
        }
    }


    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div className='relative'>
            <div className="profileInfo flex text-[#121212] items-center">
                <div
                    className="avatarLayout w-[105px] h-[105px] rounded-full cursor-pointer overflow-hidden"
                    onClick={handleAvatarClick}
                >
                    {user?.photo ? (
                        <img
                            src={user.photo}
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <UserCircle2 className='text-[#5A00DA] w-full h-full' />
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="generalInfo ml-[20px]">
                    <h2 className='text-2xl font-medium'>{user?.username}</h2>
                    <p className='text-sm font-light'>{user?.email}</p>
                    <p className='text-sm font-light mt-[5px]'>
                        Joined: <span className='font-medium'>{formatDate(user?.createdAt)}</span>
                    </p>
                </div>
            </div>
            <div className='mt-4'>
                {user && (
                    <LevelProgress level={user.level} XP={user.XP} />
                )}
            </div>
            {user?.streak && (
                <StreakFlame
                    lastUpdated={user.streak.lastUpdated}
                    current={user.streak.current}
                    longest={user.streak.longest}
                />

            )}
            {uploading && (
                <div className="absolute top-5 right-5">
                    <CircularProgress size={24} color="secondary" />
                </div>
            )}
            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={() => setAlert({ ...alert, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>

        </div>
    )
}
