'use client'
import React, { use } from "react";

export default function IdPage({params}: { params: Promise<{ id: string }> }) {
    const { id } = use(params); // 👈 unwrap Promise using React.use()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 p-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-4">User ID Page</h1>
    <hr className="w-full max-w-md border-emerald-200 mb-4" />
    <h2 className="text-lg text-gray-700 mb-4">{id}</h2>
        </div>
    )
}