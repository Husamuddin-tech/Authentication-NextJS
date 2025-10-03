
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-8 sm:p-20">
      <main className="flex flex-col gap-12 items-center sm:items-center w-full max-w-md">
        {/* Logo / Branding */}
        <div className="flex items-center gap-2 mb-6">
          {/* Optional: You can add your own logo here */}
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            EM
          </div>
          <h1 className="text-3xl font-bold text-emerald-900">Emerald App</h1>
        </div>

        {/* Welcome text */}
        <p className="text-center text-emerald-700 text-lg">
          Welcome! Get started by signing up to explore the app.
        </p>

        {/* Signup Button */}
        <Link
          href="/signup"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg py-3 rounded-lg transition-colors text-center"
        >
          Create Account
        </Link>

        {/* Optional: Login link */}
        <Link
          href="/login"
          className="w-full border-2 border-emerald-600 hover:bg-emerald-100 text-emerald-700 font-semibold text-lg py-3 rounded-lg text-center transition-colors"
        >
          Already have an account? Log In
        </Link>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-sm text-emerald-700">
        &copy; {new Date().getFullYear()} Emerald App. All rights reserved.
      </footer>
    </div>
  );
}
