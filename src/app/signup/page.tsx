'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SignupPage() {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // ✅ prevent page reload
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log("Signup success", response.data)
      toast.success("Signup successful!")
      router.push('/login') // ✅ navigate to login page
    } catch (error) {
      console.log("Signup failed", error)
      toast.error("Signup failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email && user.password && user.username) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-emerald-800 text-center mb-6">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        <hr className="mb-6 border-emerald-200" />
        <form className="flex flex-col gap-4" onSubmit={onSignup}>
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-emerald-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className="border border-emerald-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>

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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Link to login */}
        <p className="mt-4 text-center text-emerald-700">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-800 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}
