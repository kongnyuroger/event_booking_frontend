'use client'
import { h1 } from "framer-motion/m"
import React from "react"
import { useAuth } from "@/hooks/useAuth"

function createEvent(){
     useAuth()
    return(
        <h1>ready to create an event?</h1>
    )
}

export default createEvent