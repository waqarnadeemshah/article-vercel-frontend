import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, MessageCircle, Eye } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { sorting, userarticlelist } from "../features/userarticle";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { userarticles, loading } = useSelector((s) => s.articleuser);
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("mostrecent"); // UI only
  const [search, setsearch] = useState("");

  useEffect(() => {
    dispatch(userarticlelist());
  }, [dispatch]);

  useEffect(() => {
    if (userarticles) setArticles(userarticles);
  }, [userarticles]);

  const handledetail = (id) => {
    navigate(`/${id}`);
  };
  useEffect(() => {
    if (sortBy) {
      dispatch(sorting({ sortby: sortBy, search }));
    }
  }, [dispatch, sortBy,search]);




  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar setsearch={setsearch} />

      {/* ===== Hero Section ===== */}
      <section className="px-4 pt-8 sm:pt-12 md:pt-16 max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-400 leading-snug">
          Discover Top Articles
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Explore trending stories, updates, and top content
        </p>
      </section>

      {/* ===== Sorting Dropdown (UI Only) ===== */}
      <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-end">
        <div className="relative w-full sm:w-56">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-[#111111] border border-gray-800 text-gray-300 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="mostliked">Most Liked</option>
            <option value="mostcomment">Most Commented</option>
            <option value="mostview">Most Viewed</option>
            <option value="mostrecent">Most Recent</option>
          </select>
        </div>
      </div>

      {/* ===== Articles Grid ===== */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-400 col-span-full">
            Loading articles...
          </p>
        ) : articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article._id}
              className="rounded-2xl bg-[#111111] border border-gray-800 shadow-xl hover:shadow-2xl overflow-hidden transition duration-300"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56">
                <img
                  src={article.images?.[0]?.url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs bg-emerald-600/20 text-emerald-400">
                  {article.category}
                </span>

                <h3 className="text-lg font-semibold line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-400 line-clamp-3">
                  {article.content}
                </p>

                {/* Stats */}
                <div className="flex gap-4 text-sm text-gray-400 mt-1">
                  <div className="flex items-center gap-1">
                    <Heart size={14} className="text-emerald-400" />
                    {article.likesCount || 0}
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} className="text-emerald-400" />
                    {article.commentsCount || 0}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-800 mt-2">
                  <span className="text-xs text-gray-500">
                    {new Date(article.createdAt).toDateString()}
                  </span>

                  <button
                    onClick={() => handledetail(article._id)}
                    className="px-3 py-1 text-xs rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 flex items-center gap-1 transition"
                  >
                    <Eye size={14} /> View
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No articles found
          </p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Home;
