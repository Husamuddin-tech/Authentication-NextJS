'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // ✅ prevent page reload
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log("Login success", response.data)
      toast.success("Login successful!")
      router.push('/profile') // ✅ navigate to login page
    } catch (error) {
      console.log("Login failed", error)
      toast.error("Login failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email && user.password) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-emerald-800 text-center mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="mb-6 border-emerald-200" />
        <form className="flex flex-col gap-4" onSubmit={onLogin}>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-emerald-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="border border-emerald-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-emerald-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="border border-emerald-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`mt-4 w-full ${
              buttonDisabled ? 'bg-emerald-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
            } text-white font-semibold py-3 rounded-lg transition-colors`}
            disabled={buttonDisabled || loading}
          >
            {loading ? "Logging Up..." : "Login"}
          </button>
        </form>

        {/* Link to login */}
        <p className="mt-4 text-center text-emerald-700">
          Don&apos;t have an Account?{" "}
          <Link href="/signup" className="text-emerald-800 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
