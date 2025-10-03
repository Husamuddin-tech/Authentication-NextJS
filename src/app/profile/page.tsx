'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState(null)
    
    const getUserDetails = async () => {
        try {
            const res = await axios.post('/api/users/me')
        console.log(res.data.data._id)
        setData(res.data.data._id)

        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 p-6">
  <h1 className="text-3xl font-bold text-emerald-800 mb-4">Profile</h1>
  <hr className="w-full max-w-md border-emerald-200 mb-4" />

  <h2 className="text-lg text-gray-700 mb-4">
    {data === "Nothing" ? (
      "Nothing to See"
    ) : (
      <Link
        href={`/profile/${data}`}
        className="text-emerald-600 font-medium hover:underline"
      >
        ID: {data}
      </Link>
    )}
  </h2>

  <hr className="w-full max-w-md border-emerald-200 mb-6" />

  <div className="flex gap-4">
    <button
      onClick={getUserDetails}
      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
    >
      User Details
    </button>
    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
    >
      Logout
    </button>
  </div>
</div>


  )
}
