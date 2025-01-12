"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation"; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/";
    }
  };

  const router = useRouter();

  const handleCreateAccount = () => {
    router.push("/signup"); 
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-teal-50 p-4">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-teal-800">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-teal-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-teal-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={handleCreateAccount}
              className="text-blue-500 font-medium underline hover:text-blue-600"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
