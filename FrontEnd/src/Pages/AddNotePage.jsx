import { ArrowLeftIcon, SaveIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const AddNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-base-200 via-base-200 to-base-300"
      data-theme="forest"
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-all duration-300 mb-8 group font-medium hover:gap-3"
        >
          <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Notes
        </Link>

        <div className="card bg-base-100 shadow-2xl border border-base-content/10 overflow-hidden backdrop-blur-sm hover:shadow-primary/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          {/* Decorative top bar with gradient animation */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-secondary w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>

          <div className="card-body p-8 lg:p-12">
            {/* Header with icon */}
            <div className="text-center mb-10 space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 animate-in zoom-in duration-500">
                <SaveIcon className="size-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-in slide-in-from-top-2 duration-500">
                Create New Note
              </h1>
              <p className="text-base-content/60 text-lg animate-in slide-in-from-top-3 duration-500">
                Capture your thoughts, ideas, and reminders.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="form-control group animate-in slide-in-from-left duration-500">
                <label className="label pl-1">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary group-focus-within:scale-150 transition-transform"></span>
                    Note Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Project Ideas 2025"
                  className="input input-lg input-bordered focus:input-primary focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 font-medium placeholder:text-base-content/40 hover:border-primary/50 bg-base-100"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-control group animate-in slide-in-from-right duration-500">
                <label className="label pl-1">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent group-focus-within:scale-150 transition-transform"></span>
                    Content
                  </span>
                </label>
                <textarea
                  placeholder="Write something amazing..."
                  className="textarea textarea-lg textarea-bordered h-72 focus:textarea-primary focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none leading-relaxed placeholder:text-base-content/40 hover:border-primary/50 bg-base-100"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-4 pt-6 animate-in slide-in-from-bottom duration-500">
                <Link
                  to="/"
                  className="btn btn-ghost hover:bg-base-200 transition-all duration-300 min-w-[120px]"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary min-w-[160px] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 group"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2Icon className="size-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <SaveIcon className="size-5 group-hover:scale-110 transition-transform" />
                      Create Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Floating decoration elements */}
        <div className="fixed top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div
          className="fixed bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
};
export default AddNotePage;
