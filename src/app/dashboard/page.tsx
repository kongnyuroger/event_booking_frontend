'use client'
import { useAuth } from "@/hooks/useAuth"

function dashboard(){
    useAuth()
    return(
        <h1 className="text-primary">Welcome to your dash board</h1>
    )
}

export default dashboard