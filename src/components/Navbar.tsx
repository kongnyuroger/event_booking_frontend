'use client'
import React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"


function Navbar(){
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<string | null>('')
     useEffect(()=>{
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem("userName")
        setToken(storedToken)
        setUser(storedUser)
     },[])
    function logout(){
        localStorage.removeItem("token")
        setToken(null)
    }
    function login(){
        router.push("/login")
    }

    return(
        <div className="flex h-fit items-center justify-between p-4 bg-white rounded-xl z-40 shadow">
            <div className="flex items-center gap-3">
                <h1>EventBooking</h1>
                <p>Secure ticketing . bookings</p>
            </div>
            <div className="flex items-center gap-6">
                <nav>
                    <ul className="flex items-center gap-4">
                        <li><Link href='/'>Home</Link></li>
                        <li><Link href='/create-event'>Create event</Link></li>
                        <li><Link href='/dashboard'>Dashboard</Link></li>
                    </ul>
                </nav>
                <div className="flex items-center gap-1.5">
                    <p>{user}</p>
                    { token ? (<button className="logout-btn" onClick={logout}>Logout</button>) :
                    (<button onClick={login}>Login</button>)}
                </div>
            </div>
        </div>
    )
}

export default Navbar