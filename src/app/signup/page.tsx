"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";


interface User {
  email: string;
  password: string;
  username: string;
}

function SignupPage() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  })

  const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
    const { name,value} = e.target;
    setUser(prevState=>{
      return {...prevState, [name]: value}
    });
  }

  const onSignUp= async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(user)

  }


 
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={onSignUp}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
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
              Sign Up
            </button>
            <h1 className="text-center text-black">
              Already have an account?
              <Link href="/login" className="text-black hover:text-blue-500">
                Login
              </Link>
            </h1>
 
          </form>
        </div>
      </div>
    </>
  )
}

export default SignupPage
