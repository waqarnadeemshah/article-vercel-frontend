import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PlusIcon,
  ListBulletIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SlideBar() {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { error, loading } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try{
    e.preventDefault()
    dispatch(logout()).unwrap();
    navigate("/login")
   toast.success("logout sucessfull")}
    catch(error){
           toast.error(error?.message );
    }
  };


  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md bg-[#111111] border border-gray-800 shadow hover:bg-[#1a1a1a]"
        >
          <Bars3Icon className="h-6 w-6 text-gray-300" />
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#111111] border-r border-gray-800 shadow-xl h-screen">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <span className="text-xl font-bold text-emerald-500 tracking-wide">ADMIN</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to={"/admin/add-article"}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-emerald-600/20 hover:text-white transition"
          >
            <PlusIcon className="h-5 w-5 mr-3 text-gray-400" />
            Add List
          </Link>

          <Link
            to={"/admin/list-article"}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-emerald-600/20 hover:text-white transition"
          >
            <ListBulletIcon className="h-5 w-5 mr-3 text-gray-400" />
            List Item
          </Link>

     
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-500 rounded-lg hover:bg-red-600/20 transition"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar (Mobile Drawer) */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 left-0 w-64 h-full bg-[#111111] border-r border-gray-800 shadow-xl z-50 flex flex-col">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 border-b border-gray-800 px-4">
              <span className="text-lg font-bold text-emerald-500 tracking-wide">ADMIN</span>
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-300" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link
                to={"/admin/add-product"}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-emerald-600/20 hover:text-white transition"
              >
                <PlusIcon className="h-5 w-5 mr-3 text-gray-400" />
                Add List
              </Link>

              <Link
                to={"/admin/list-article"}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-emerald-600/20 hover:text-white transition"
              >
                <ListBulletIcon className="h-5 w-5 mr-3 text-gray-400" />
                List Item
              </Link>

            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-500 rounded-lg hover:bg-red-600/20 transition"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-400" />
                Logout
              </button>
            </div>
                  <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </>
      )}
    </>
  );
}

export default SlideBar;
