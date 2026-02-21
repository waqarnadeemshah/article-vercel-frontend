import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SlideBar from "../components/Slidebar";
import { createArticle, updatearticle } from "../features/article";

function Add() {
  const dispatch = useDispatch();

  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef();
  const statusRef = useRef();
  const { id } = useParams();
  const { loading, error, articles } = useSelector((s) => s.article);
  const [editdata, seteditdata] = useState();
  const [editmode, seteditmode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = [...selectedImages, ...files].slice(0, 5);
    setSelectedImages(total);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };
  useEffect(() => {
    console.log(id);
    if (id) seteditmode(true);
    const articlefound = articles.find((v) => v._id == id);
    if (articlefound) seteditdata(articlefound);
  }, [id, articles]);
  useEffect(() => {
    if (editdata) {
      ((titleRef.current.value = editdata.title || ""),
        (categoryRef.current.value = editdata.category || ""),
        (contentRef.current.value = editdata.content || ""),
        (statusRef.current.value = editdata.status || ""));
      setSelectedImages(editdata.images || []);
    }
  }, [editdata]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.append("title", titleRef.current.value);
    Data.append("content", contentRef.current.value);
    Data.append("category", categoryRef.current.value);
    Data.append("status", statusRef.current.value);
    selectedImages.forEach((file) => {
      Data.append("images", file);
    });

    try {
      if (editmode) {
        await dispatch(updatearticle({ id, Data })).unwrap();
        toast.success("Article update  successfully!");
        titleRef.current.value = "";
        contentRef.current.value = "";
        categoryRef.current.value = "";
        statusRef.current.value = "";
        setSelectedImages([]);
      } else {
        await dispatch(createArticle(Data)).unwrap();

        toast.success("Article added successfully!");
        titleRef.current.value = "";
        contentRef.current.value = "";
        categoryRef.current.value = "";
        statusRef.current.value = "";
        setSelectedImages([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || " Failed to article");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      <div className="w-full md:w-64 bg-black border-r border-emerald-500/20">
        <SlideBar />
      </div>

      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl shadow-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="border-b border-white/10 px-6 py-6 bg-black/60 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-emerald-400">
                {editmode ? "update Article" : "➕ Add New Article "}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Enter details to publish a new article
              </p>
            </div>

            <form className="p-6 space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    ref={titleRef}
                    type="text"
                    placeholder="Enter article title"
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    ref={categoryRef}
                    type="text"
                    placeholder="Enter category"
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    ref={statusRef}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="draft" className="text-black">
                      Draft
                    </option>
                    <option value="published" className="text-black">
                      Published
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  ref={contentRef}
                  rows={5}
                  placeholder="Write article content..."
                  className="w-full p-4 rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-300 mb-2">
                  Upload Images (Max 5)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-white"
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                  {selectedImages.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/20"
                    >
                      <img
                        src={
                          file instanceof File
                            ? URL.createObjectURL(file)
                            : file.src || file.url
                        }
                        className="object-cover w-full h-full"
                      />

                      <button
                        onClick={() => handleRemoveImage(index)}
                        type="button"
                        className="absolute top-1 right-1 bg-red-600/80 text-white px-2 py-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 transition w-full sm:w-auto px-8 py-3 rounded-xl font-medium text-white"
                >
                  Submit Article
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Add;
