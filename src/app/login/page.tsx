"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error) {
      console.log("Login error", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 8) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>{loading ? "Logging in..." : "Login"}</h1>
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
      <p className="text-red-500">
        {user.password.length > 0 && user.password.length < 8
          ? "password must be at least 8 characters long"
          : ""}
      </p>
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
        disabled={buttonDisabled || loading}
        onClick={onLogin}
      >
        Login
      </button>
      <hr />
      <Link href="/signup">visit Signup Page</Link>
    </div>
  );
}
