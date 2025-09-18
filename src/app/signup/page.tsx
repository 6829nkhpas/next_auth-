"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 8 &&
      user.username.length > 0 &&
      user.email.includes("@")
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: unknown) {
      console.log("error in signup", error);
      
      let errorMessage = "An unexpected error occurred";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { data: { error: string } } };
        errorMessage = axiosError.response?.data?.error || "Signup failed";
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>{loading ? "creating profile" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 m-2 rounded-md border-2 border-gray-300"
        id="username"
        type="text"
        placeholder="Enter username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 m-2 rounded-md border-2 border-gray-300"
        id="email"
        type="email"
        placeholder="Enter email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <p className="text-red-500">
        {!user.email.includes("@") && user.email.length > 0
          ? "email must be a valid email"
          : ""}
      </p>
      <label htmlFor="password">password</label>
      <input
        className="p-2 m-2 rounded-md border-2 border-gray-300"
        id="password"
        type="password"
        placeholder="Enter password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-md"
        onClick={onSignup}
      >
        {buttonDisabled ? "fill the form" : "Signup"}
      </button>
      <p className="text-red-500">
        {" "}
        {user.password.length > 0 && user.password.length < 8
          ? "password must be at least 8 characters long"
          : ""}
      </p>
      <hr />
      <Link href="/login">visit Login Page</Link>
    </div>
  );
}
