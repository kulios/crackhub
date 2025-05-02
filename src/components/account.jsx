import { useState } from "react";
import { signIn, register } from "@/lib/auth"; // Adjust the import path as necessary
import Homep from "./homep";

export default function Account() {
  const [mode, setMode] = useState("signIn"); // 'signIn' or 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signIn") {
        await signIn(email, password);
        // Handle post sign-in actions here
      } else {
        await register(email, password);
        // Handle post registration actions here
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="max-w-2xl w-full bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {mode === "signIn" ? "Sign In" : "Register"}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          {mode === "signIn"
            ? "Welcome back! Please sign in to continue."
            : "Create a new account to get started."}
        </p>
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your password"
            />
          </div>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 mb-4"
          >
            {mode === "signIn" ? "Sign In" : "Register"}
          </button>
        </form>
        <div className="flex justify-center space-x-4">
          {mode !== "signIn" && (
            <button
              onClick={() => setMode("signIn")}
              className="text-blue-600 hover:underline"
            >
              Already have an account? Sign In
            </button>
          )}
          {mode !== "register" && (
            <button
              onClick={() => setMode("register")}
              className="text-blue-600 hover:underline"
            >
              Create an account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
