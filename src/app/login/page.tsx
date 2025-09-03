"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Axios } from "axios";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/api/login",
        user
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 m-2 rounded-md border-2 border-gray-300"
        id="email"
        type="email"
        placeholder="Enter the email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 m-2 rounded-md border-2 border-gray-300"
        id="password"
        type="password"
        placeholder="Enter the password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-md"
        onClick={onLogin}
      >
        Login
      </button>
      <hr />
      <Link href="/signup">visit Signup Page</Link>
    </div>
  );
}
