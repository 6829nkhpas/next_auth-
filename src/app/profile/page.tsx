"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const onLogout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log(response.data);
            router.push("/login");
        } catch (error) {
            console.log("Logout error", error);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Profile</h1>
            <br/>
            <button className="bg-blue-500 text-white p-2 rounded-md" onClick={onLogout}>Logout</button>
        </div>
    )
}