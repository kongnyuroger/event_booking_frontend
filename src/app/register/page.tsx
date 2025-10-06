'use client'
import React from "react";
import {register} from "../../services/api"
import { useState, useEffect } from "react";
import { handleClientScriptLoad } from "next/script";
function Register(){
   
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const  handleSubmit = async (e: any) => {
        e.preventDefault()
        try{
            const res = await register(name,email,password)
            console.log(res)
        }
        catch(err: any){
            console.error(err.message)
        }

        setName('')
        setEmail('')
        setPassword('')
    }
    
    return(
        <div className=" flex justify-center ">
        
         <form onSubmit={handleSubmit} className="flex-col border-2 border-black p-10 bg-white h-fit  mt-5">
            <div className="mb-5 flex-col">
            <label htmlFor="name">Name</label>
            <input  type="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-5 flex-col">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-5 flex-col">
            <label htmlFor="password">password</label>
            <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button>register</button>
         </form>
        </div>
    )
}

export default Register