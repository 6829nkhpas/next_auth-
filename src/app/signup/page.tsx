"use client"
import {useRouter} from "next/navigation";
import React from "react";
import Link from "next/link";
import {Axios} from "axios";
import { userAgent } from "next/server";
export default function Signup() {
 const [user,setUser] = React.useState({
    email: "",
    password: "",
    username: "",
 });
 const onSignup = async () =>{

 };
 
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Signup</h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input
            className="p-2 m-2 rounded-md border-2 border-gray-300"
            id="username"
            type="text"
            placeholder="Enter username"
            value={user.username}
            onChange={(e) => setUser({...user,username: e.target.value})}
            />
            <label htmlFor="email">email</label>
            <input
            className="p-2 m-2 rounded-md border-2 border-gray-300"
            id="email"
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => setUser({...user,email: e.target.value})}
            />
            <label htmlFor="password">password</label>
            <input
            className="p-2 m-2 rounded-md border-2 border-gray-300"
            id="password"
            type="password"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => setUser({...user,password: e.target.value})}
            />
            <button className="p-2 bg-blue-500 text-white rounded-md" onClick={onSignup}>Signup</button>
            <hr/>
            <Link href="/login">visit Login Page</Link>
        </div>
    )
}