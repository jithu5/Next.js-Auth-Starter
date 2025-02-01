"use client";

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ProfilePage() {
    const user = {
        username: "abijith",
        email: "jithuabijith8@gmail.com",
    };

    const router = useRouter();

    const handleLogout = async (): Promise<void> => {
        try {
            const { data } = await axios.get(`/api/users/logout`);
            console.log(data);
            if (data?.success) {
                console.log(data.message)
                toast.success(data.message);
                router.push('/login');
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile</h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Username</h3>
                        <p className="text-gray-600">{user.username}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Email</h3>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                    <div className="text-center mt-6">
                        <button 
                        onClick={handleLogout}
                        className="bg-stone-700 text-white py-2 px-4 rounded-lg hover:bg-stone-900 transition">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
