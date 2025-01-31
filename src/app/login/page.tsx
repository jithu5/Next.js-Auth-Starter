"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

interface User {
  email: string;
  password: string;
}

function LoginPage() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(user)
    try {
      const { data } = await axios.post(`/api/users/login`, user, {
        withCredentials: true
      })

      console.log(data)
      if (data?.success) {
        toast.success(data.message)
        console.log(data.data)
        router.push('/profile')
        return
      }
    } catch (error: any) {
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={onLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            <p className="text-center my-3 text-black">Create new Account<Link href="/signup">Signup</Link></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
