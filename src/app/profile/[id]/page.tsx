"use client";

import React from 'react'

interface PageProps {
    params: {
        id: string;
    };
}

function Page({ params }: PageProps) {
    return (
        <>
            <h1>Profile {params.id}</h1>
        </>
    )
}

export default Page;
