"use client";
import React, { use } from "react";
import { register } from "../../services/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(name, email, password);
      console.log(res.data);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("userName", res.data.user.username);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response.data.error);
    }
    setName("");
    setEmail("");
    setPassword("");
  };
  if(error) alert(error)
  console.log(error);

  return (
    <div className=" flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex-col flex gap-4 h-fit w-1/2 p-6 rounded-xl shadow bg-white"
      >
        
    
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User name"
            />
    
          
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          
    
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
    

        <input className="bg-green-500 cursor-pointer text-white" type="submit" />
      </form>
    </div>
  );
}

export default Register;
