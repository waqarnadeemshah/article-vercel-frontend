import React, { useEffect } from "react";
import SlideBar from "../components/Slidebar";
import { Heart, MessageCircle, Eye, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deletearitcle, listarticle } from "../features/article";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ArticleList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articles, loading } = useSelector((s) => s.article);

  useEffect(() => {
    dispatch(listarticle());
  }, [dispatch]);
  const handledel = async (id) => {
    try {
      await dispatch(deletearitcle(id)).unwrap();
;
      toast.success("article deleted successfully", { autoClose: 1500 });

      await dispatch(listarticle());
    } catch (error) {
      toast.error(error?.msg || "Failed to delete product");
    }
  };
  const handleupdate = async (id) => {
    navigate(`/admin/Update/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* ===== SIDEBAR (SAME AS ADD) ===== */}
      <div className="w-full md:w-64 bg-black border-r border-emerald-500/20">
        <SlideBar />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-emerald-400">
              Admin • Articles
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage articles & engagement
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-400">Loading articles...</p>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {articles.map((v) => (
              <div
                key={v._id}
                className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-44">
                  <img
                    src={v.images?.[0]?.url}
                    alt={v.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs bg-green-600/20 text-green-400">
                    {v.status}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs bg-emerald-600/20 text-emerald-400">
                    {v.category}
                  </span>

                  <h3 className="text-lg font-semibold line-clamp-2">
                    {v.title}
                  </h3>

                  <p className="text-sm text-gray-400 line-clamp-3">
                    {v.content}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-emerald-400" />
                      {v.likesCount}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle size={16} className="text-emerald-400" />
                      {v.commentsCount}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs text-gray-500">
                      {new Date(v.createdAt).toDateString()}
                    </span>

                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-1">
                        <Eye size={14} /> View
                      </button>

                      <button
                        onClick={() => handleupdate(v._id)}
                        className="px-3 py-1 text-xs rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 flex items-center gap-1"
                      >
                        <Edit size={14} /> Edit
                      </button>

                      <button
                        onClick={() => handledel(v._id)}
                        className="px-3 py-1 text-xs rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ArticleList;
