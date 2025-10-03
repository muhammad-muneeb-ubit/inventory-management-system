import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const  submitHandler = (e) => {
    e.preventDefault();
    navigate("/dashboard")
  } 
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center px-4 py-8">
    <div className="form bg-white w-full max-w-md rounded-xl h-fit border border-slate-200">
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-semibold text-slate-900 text-center">
          Already have an account
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1">
          Start managing your inventory today
        </p>
      </div>
      <form className="px-6 pb-6 pt-2 space-y-4 w-full">
        
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Email address
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="password"
            name="password"
            id="password"
            placeholder="•••••••"
            autoComplete="new-password"
          />
          <p className="mt-1 text-xs text-slate-500">
            Use at least 8 characters.
          </p>
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white font-medium py-2.5 px-4 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={submitHandler}
        >
          Login here!
        </button>
        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  </div>
  )
}

export default Login
