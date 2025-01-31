"use client";

import React from "react";

function ProfilePage() {
    const user = {
        username: "abijith",
        email: "jithuabijith8@gmail.com",
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
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
