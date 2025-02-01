"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IUser {
    email: string;
    username: string;
}

function ProfilePage() {
    const [user, setUser] = useState<IUser>({
        email: "",
        username: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true);
            try {
                const { data } = await axios.get(`/api/users/me`);
                if (data?.success) {
                    setUser(data.data);
                } else {
                    toast.error(data.message || "Failed to load user data");
                }
            } catch (error) {
                toast.error("Error fetching user data");
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, []);

    const router = useRouter();

    const handleLogout = async (): Promise<void> => {
        try {
            const { data } = await axios.get(`/api/users/logout`);
            if (data?.success) {
                toast.success(data.message);
                router.push('/login');  // Redirect to login page after successful logout
            }
        } catch (error: any) {
            toast.error(error.message || "Error logging out");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-blue-600 text-xl font-semibold text-center">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-stone-700 p-4 shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">Welcome</h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => router.push('/home')}
                            className="text-white hover:bg-stone-900 px-4 py-2 rounded-md"
                        >
                            Home
                        </button>
                    </div>
                </div>
            </nav>

            {/* Profile Content */}
            <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-50 p-8">
                <h2 className="text-4xl font-bold text-gray-800">Welcome, {user.username}!</h2>
                <p className="text-xl text-gray-600">{user.email}</p>
                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700">Glad to have you here!</h3>
                </div>
                <div className="mt-6">
                    <button
                        onClick={handleLogout}
                        className="bg-stone-700 text-white py-2 px-4 rounded-lg hover:bg-stone-900 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
