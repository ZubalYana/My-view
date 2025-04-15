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
    return (
        <div>profile</div>
    )
}
