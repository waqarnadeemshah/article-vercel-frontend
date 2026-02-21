import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((s) => s.auth);
  const emailref = useRef();
  const passref = useRef();
  const handlelogin = async (e) => {
    e.preventDefault();
    const FormData = {
      email: emailref.current.value,
      password: passref.current.value,
    };

    const data = await dispatch(login(FormData)).unwrap();
    if (data.role == "admin") {
      navigate("/admin/Add-article");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 py-10">
        <div className="w-full max-w-sm bg-[#111111] border border-gray-800 rounded-2xl px-8 py-10 shadow-xl shadow-black/40 backdrop-blur-md">
          <h2 className="text-center text-3xl font-bold text-white tracking-wide">
            Welcome Back
          </h2>
          <p className="text-center text-gray-400 mt-2 text-sm">
            Login to continue to your dashboard
          </p>

            {error && error.msg && (
          <p className="mt-4 text-center text-sm text-red-500">{error.msg}</p>
        )}

          <form
            action="#"
            method="POST"
            className="space-y-6 mt-10"
            onSubmit={handlelogin}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                ref={emailref}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 block w-full rounded-lg bg-[#1a1a1a] border border-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  Forgot password?
                </a>
              </div>

              <input
                ref={passref}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-2 block w-full rounded-lg bg-[#1a1a1a] border border-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full flex justify-center rounded-lg bg-emerald-600 py-2.5 text-white font-semibold tracking-wide hover:bg-emerald-500 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to={"/signup"}
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
