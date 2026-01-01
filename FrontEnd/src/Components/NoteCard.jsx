import { CalendarIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const NoteCard = ({ note, onDeleteFn }) => {
  const handleDelete = async (e) => {
    e.preventDefault(); // Stop navigation to the detail page
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted successfully");
      onDeleteFn(); // Notify parent to remove from list
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block border border-base-content/5 overflow-hidden group h-full"
    >
      <div className="card-body p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="card-title text-xl font-bold text-primary group-hover:text-primary-focus transition-colors line-clamp-1 flex-1">
            {note.title}
          </h2>
          {/* Delete Button - z-10 and relative to ensure it's clickable above the link */}
          <button
            onClick={handleDelete}
            className="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/10 hover:text-error -mr-2 -mt-2"
            title="Delete Note"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>

        <p className="line-clamp-4 text-base-content/80 text-sm leading-relaxed min-h-20">
          {note.content}
        </p>

        <div className="card-actions justify-between items-center mt-6 pt-4 border-t border-base-content/10">
          <div className="flex items-center gap-2 text-xs text-base-content/60 font-medium">
            <CalendarIcon className="size-3.5" />
            <span>
              {note.createdAt
                ? new Date(note.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Just now"}
            </span>
          </div>
          <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
