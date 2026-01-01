import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import {
  ArrowLeftIcon,
  LoaderIcon,
  Trash2Icon,
  SaveIcon,
  ClockIcon,
} from "lucide-react";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.note);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note) return;
    if (!note.title?.trim() || !note.content?.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-base-200 flex items-center justify-center"
        data-theme="forest"
      >
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="animate-spin size-12 text-primary" />
          <p className="text-base-content/60 font-medium">
            Loading your note...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-linear-to-br from-base-200 via-base-200 to-base-300"
      data-theme="forest"
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-all duration-300 group font-medium hover:gap-3"
          >
            <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            className="btn btn-ghost btn-sm text-error/70 hover:text-error hover:bg-error/10 transition-colors gap-2"
          >
            <Trash2Icon className="size-4" />
            <span className="hidden sm:inline">Delete Note</span>
          </button>
        </div>

        <div className="card bg-base-100 shadow-2xl border border-base-content/10 overflow-hidden backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="h-1.5 bg-linear-to-r from-primary via-accent to-secondary w-full"></div>

          <div className="card-body p-8 lg:p-12">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Edit Note
              </h1>
              {note.updatedAt && (
                <div className="flex items-center gap-2 text-xs text-base-content/50 font-medium bg-base-200/50 px-3 py-1.5 rounded-full">
                  <ClockIcon className="size-3.5" />
                  Last updated: {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="form-control group">
                <label className="label pl-1">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary group-focus-within:scale-150 transition-transform"></span>
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-lg input-bordered focus:input-primary focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 font-medium placeholder:text-base-content/40 hover:border-primary/50 bg-base-100/50"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control group">
                <label className="label pl-1">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent group-focus-within:scale-150 transition-transform"></span>
                    Content
                  </span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-lg textarea-bordered h-96 focus:textarea-primary focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none leading-relaxed placeholder:text-base-content/40 hover:border-primary/50 bg-base-100/50 text-base"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="card-actions justify-end mt-8 pt-6 border-t border-base-content/10">
              <Link
                to="/"
                className="btn btn-ghost hover:bg-base-200 transition-all duration-300"
              >
                Cancel
              </Link>
              <button
                className="btn btn-primary min-w-[160px] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 group"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? (
                  <>
                    <LoaderIcon className="size-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon className="size-5 group-hover:scale-110 transition-transform" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;
