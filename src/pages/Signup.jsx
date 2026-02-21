import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((s) => s.auth);

  const nameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();

  const [handleerror, sethandleerror] = useState([]);

  const handlesignup = async (e) => {
    e.preventDefault();

    const FormData = {
      name: nameref.current.value,
      email: emailref.current.value,
      password: passwordref.current.value,
    };

    try {
      await dispatch(signup(FormData)).unwrap();
      navigate("/login", { replace: true });
    } catch (error) {
      sethandleerror(error.errors || []);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 py-10">
      <div className="w-full max-w-sm bg-[#111111] border border-gray-800 rounded-2xl px-8 py-10 shadow-xl shadow-black/40 backdrop-blur-md">
        <h2 className="text-center text-3xl font-bold text-white tracking-wide">
          Create Account
        </h2>
        <p className="text-center text-gray-400 mt-2 text-sm">
          Join us to get started
        </p>

        <form className="space-y-6 mt-10" onSubmit={handlesignup}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black-100"
            >
              Full Name
            </label>
            <input
              ref={nameref}
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your full name"
              className="mt-2 block w-full rounded-lg bg-[#1a1a1a] border border-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black-100"
            >
              Email Address
            </label>
            <input
              ref={emailref}
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 block w-full rounded-lg bg-[#1a1a1a] border border-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black-100"
            >
              Password
            </label>
            <input
              ref={passwordref}
              id="password"
              name="password"
              type="password"
              required
              placeholder="Create a password"
              className="mt-2 block w-full rounded-lg bg-[#1a1a1a] border border-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center rounded-lg bg-emerald-600 py-2.5 text-white font-semibold tracking-wide hover:bg-emerald-500 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {handleerror.length > 0 &&
          handleerror.map((errobj, i) => (
            <p key={i} className="mt-4 text-center text-sm text-red-500">
              {errobj.msg}
            </p>
          ))}

        {error && error.msg && (
          <p className="mt-4 text-center text-sm text-red-500">{error.msg}</p>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
