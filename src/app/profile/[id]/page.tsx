"use client";

import React from "react";
import { useParams } from "next/navigation";

function ProfilePage() {
    const params = useParams(); // Unwrap the params

    return (
        <>
            <h1>Profile: {params.id}</h1>
        </>
    );
}

export default ProfilePage;
