import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, MessageCircle, Eye, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getcomment,
  userarticledetail,
  usercomment,
  userlike,
} from "../features/userarticle";
import { useParams } from "react-router-dom";
import { useRef } from "react";

function ArticleDetail() {
  const dispatch = useDispatch();
  const { articledetail, loading, error, articlescomment } = useSelector(
    (s) => s.articleuser,
  );
  const { id } = useParams();
  const { user, token } = useSelector((s) => s.auth);

  const commentref = useRef();

  // Fetch articles on mount
  useEffect(() => {
    dispatch(userarticledetail(id));
    dispatch(getcomment(id));
  }, [dispatch,id]);

  // Set the current article based on ID (replace with router param or props)
  const handlelike = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token || !user.id) {
      toast.error("Please log in before liking a article!");
      return;
    }
    try {
      await dispatch(userlike(id)).unwrap();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handlecomments = async (e, id) => {
    try {
      e.preventDefault();
      const text = commentref.current.value;
      if (!token || !user.id) {
        toast.error("Please log in before commenting a article!");
        return;
      }
      await dispatch(usercomment({ id, text })).unwrap;

      commentref.current.value = "";
         await dispatch(getcomment(id));
      
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (loading || !articledetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <p className="text-gray-400 text-lg">Loading article...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Article Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-24 sm:pt-32 pb-12">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          {/* Article Image */}
          <div className="relative h-64 sm:h-96">
            <img
              src={
                articledetail.images?.[0]?.url ||
                "https://via.placeholder.com/800x400"
              }
              alt={articledetail.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>

          {/* articledetail Content */}
          <div className="p-6 sm:p-10 space-y-4 bg-[#111111]">
            {/* Category & Date */}
            <div className="flex flex-wrap justify-between items-center">
              <span className="px-3 py-1 rounded-full text-xs bg-emerald-600/20 text-emerald-400 font-medium">
                {articledetail.category}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(articledetail.createdAt).toDateString()}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
              {articledetail.title}
            </h1>

            {/* Content */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-2">
              {articledetail.content}
            </p>

            {/* Stats */}
            <div className="flex gap-6 text-gray-400 mt-4">
              <button
                type="button"
                onClick={(e) => handlelike(e, articledetail._id)}
                className="flex items-center gap-2 cursor-pointer select-none bg-transparent border-none p-0"
              >
                <Heart
                  size={22}
                  className={`transition-all duration-300 ${
                    articledetail.isLiked
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                />
                <span
                  className={`transition-colors ${
                    articledetail.isLiked ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {articledetail.likesCount || 0} Likes
                </span>
              </button>

              <div className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition">
                <MessageCircle size={20} /> {articledetail.commentsCount || 0}{" "}
                Comments
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition">
                <Eye size={20} /> {articledetail.views || 0} View
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-6 sm:p-10 bg-[#0f0f0f] border-t border-gray-800 rounded-b-3xl">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">
              Comments
            </h2>

            {/* Existing Comments */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            
{articledetail.commentsCount>0 ? (
  articlescomment.map((comments)=>(
      <div
    key={comments._id}
    className="bg-[#111111] p-4 rounded-2xl border border-gray-800 flex gap-3"
  >
    {/* Avatar */}
    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-black font-bold">
      {comments.user?.name?.charAt(0).toUpperCase() || "A"}
    </div>

    {/* Comment Content */}
    <div className="flex-1">
      <div className="flex justify-between items-center">
        <span className="text-gray-200 font-semibold">
          {comments.user?.name || "Anonymous"}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(comments.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-400 text-sm mt-1 leading-relaxed">
        {comments.text}
      </p>
    </div>
  </div>
  ))

) : (
  <p className="text-gray-400 text-sm">No comments yet</p>
)}

   
            </div>

            {/* Add Comment */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                // value={commentText}
                // onChange={(e) => setCommentText(e.target.value)}
                ref={commentref}
                className="flex-1 px-4 py-2 rounded-xl bg-[#111111] border border-gray-800 text-gray-300 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={(e) => handlecomments(e, articledetail._id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition flex items-center gap-1"
              >
                <Send size={16} /> Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ArticleDetail;
