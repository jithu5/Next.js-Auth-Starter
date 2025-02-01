"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


function page() {
    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post('/api/users/verifyemail', { token }, {
                withCredentials: true,
            })

            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken||"")
    }, [])



    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen w-full py-2">
                <h1 className="text-4xl font-semibold">Verify your Email</h1>
                <h2 className="p-2 bg-orange-500 text-black rounded-sm">{token ? `${token}` : "no token"}</h2>

                {
                    verified && (
                        <div>
                            <p className="text-green-500">Email verified successfully!</p>
                            <Link className="text-blue-500 hover:text-blue-800" href="/login">
                                Go to Login
                            </Link>
                        </div>
                    )
                }
                {
                    error && (
                        <div className="text-2xl text-red-500">
                            Error verifying email.
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default page
