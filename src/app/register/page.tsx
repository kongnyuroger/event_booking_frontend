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

  console.log(error);

  return (
    <div className=" flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex-col border-2 border-black p-10 bg-white h-fit  mt-5"
      >
        <div className="flex-col">
          <div className="mb-5 flex-col">
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User name"
            />
          </div>
          <div className="mb-5 flex-col">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="mb-5 flex-col">
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <button  type="submit">register</button>
      </form>
    </div>
  );
}

export default Register;
