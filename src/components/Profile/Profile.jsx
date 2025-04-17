import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Profile() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get('http://localhost:5000/auth/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setUser(res.data)
                console.log('Fetched user:', res.data)
            } catch (error) {
                console.error('Error fetching user:', error)
            }
        }
        fetchUser()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div>
            <div className="profileInfo flex text-[#121212] items-center">
                <div className="avatarLayout w-[100px] h-[100px] rounded-full bg-[#5A00DA]"></div>
                <div className="generalInfo ml-[20px]">
                    <h2 className='text-2xl font-medium'>{user?.username}</h2>
                    <p className='text-sm font-light'>{user?.email}</p>
                    <p className='text-sm font-light mt-[5px]'>Joined: <span className='font-medium'>{formatDate(user?.createdAt)}</span></p>
                </div>
            </div>

        </div>
    )
}
