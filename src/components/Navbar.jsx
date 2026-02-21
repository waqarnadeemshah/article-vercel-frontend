import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { logout } from "../features/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar({ setsearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setvalue] = useState("");
  const { user, token } = useSelector((s) => s.auth);

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      dispatch(logout()).unwrap();
      navigate("/login");
      toast.success("logout sucessfull");
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handlesearch = (e) => {
    e.preventDefault();
    setsearch(value);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center bg-white/0 backdrop-blur-md border-b border-white/10 px-4 md:px-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-400 hover:text-emerald-300"
          >
            MyApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <form onSubmit={handlesearch}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                  className="px-10 py-2 w-64 rounded-full bg-white/10 text-white border border-white/20"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-200" />
              </form>
            </div>

            {user && <span className="text-white">{user.name}</span>}

            {user && token ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-emerald-600/70 rounded-full text-white"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-white">
                  Sign in
                </Link>
                <Link to="/signup" className="text-white">
                  Create account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/0 backdrop-blur-md border-t border-white/20 px-4 py-4 space-y-4">
          <div className="relative">
            <form onSubmit={handlesearch}>
              <input
                type="text"
                placeholder="Search articles..."
                value={value}
                onChange={(e) => setvalue(e.target.value)}
                className="w-full px-10 py-2 rounded-full bg-white/10 text-white border border-white/20"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-200" />
            </form>{" "}
          </div>

          {user && <span className="text-white">{user.name}</span>}

          {user && token ? (
            <button
              onClick={handleLogout}
              className="w-full flex justify-center items-center px-4 py-2 bg-emerald-600/70 rounded-full text-white"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          ) : (
            <div className="flex justify-between">
              <Link to="/login" className="text-white">
                Sign in
              </Link>
              <Link to="/signup" className="text-white">
                Create account
              </Link>
            </div>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </nav>
  );
}

export default Navbar;
