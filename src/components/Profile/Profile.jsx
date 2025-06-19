import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { UserCircle2 } from 'lucide-react'

export default function Profile() {
    const [user, setUser] = useState(null)
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
            const token = localStorage.getItem('token')
            const res = await axios.post('http://localhost:5000/auth/upload-avatar', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            setUser((prev) => ({ ...prev, photo: res.data.url }))
        } catch (err) {
            console.error('Failed to upload avatar', err)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div>
            <div className="profileInfo flex text-[#121212] items-center">
                <div
                    className="avatarLayout w-[115px] h-[115px] rounded-full cursor-pointer overflow-hidden"
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
        </div>
    )
}
