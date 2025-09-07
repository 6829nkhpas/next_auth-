"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      console.log("Logout error", error);
    }
  };
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Profile</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{`/profile/${data}`}</Link>
        )}
      </h2>
      <br />
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={onLogout}
      >
        Logout
      </button>
      <br />
      <button
        className="bg-green-500 text-white p-2 rounded-md"
        onClick={getUserDetails}
      >
        Getuser
      </button>
    </div>
  );
}
