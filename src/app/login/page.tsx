'use client'
import { cache, useState } from "react"
import { loginUser } from "@/services/api"
import { useRouter } from "next/navigation"


function login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const router = useRouter()
    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        try{ 
            const res = await loginUser(email, password)
            localStorage.setItem('token', res.data.user.accessToken)
            localStorage.setItem('userName', res.data.user.username)
            console.log(res.data)
            router.push("/dashboard")
        }catch(err: any){
            console.log(err.response.data)
        }
        
    }
    return (
    <div className=" flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex-col border-2 border-black p-10 bg-white h-fit  mt-5"
      >
        <div className="mb-5 flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5 flex-col">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  );
}

export default login