"use client";
import { cache, useState } from "react";
import { loginUser } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.data.user.accessToken);
      localStorage.setItem("userName", res.data.user.username);

      console.log(res.data);
      window.location.reload();

      router.push("/dashboard");
    } catch (err: any) {
      console.log(err.response.data);
      alert(err.response.data.error);
    }
  }
  return (
    <div className=" flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex-col flex gap-4 h-fit w-1/2 p-6 rounded-xl shadow bg-white"
      >
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

        <input
          className="bg-green-500 cursor-pointer text-white"
          type="submit"
        />
        <p className="flex  justify-center ">
          don't have an acount!{" "}
          <Link className="text-blue-500 " href="/register">
            {" "}
            Create
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default login;
