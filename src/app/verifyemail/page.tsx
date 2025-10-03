'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data)
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  },[])

  // const router = useRouter()
  // const {query} = router
  // const urlTokenTwo = query.token

  useEffect(() => {
    setError(false);
    if(token.length>0){
        verifyUserEmail();
    } 
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 p-4">
  <h1 className="text-3xl font-bold text-emerald-800 mb-4">Verify Email</h1>
  <h2 className="mb-6 text-gray-700">{token ? token : "No Token"}</h2>

  {verified && (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-emerald-800 mb-4">Email Verified Successfully!</h2>
      <Link href="/login" className="text-emerald-600 hover:underline">
        Click here to login
      </Link>
    </div>
  )}

  {error && (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Verification Failed!</h2>
      <p className="text-gray-700">The verification link is invalid or has expired.</p>
    </div>
  )}
</div>

)
}
