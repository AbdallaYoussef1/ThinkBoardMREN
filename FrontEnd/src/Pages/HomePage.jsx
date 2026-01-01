import NavBar from "../Components/NavBar";
import RateLimitedUI from "../Components/RateLimitedUI";
import NoteCard from "../Components/NoteCard";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../lib/axios";
import NotesNotFound from "../Components/NotesNotFound";
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/notes");
        const data = await response.data;
        console.log(data);
        setNotes(data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div data-theme="forest" className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
      {notes.length === 0 && !loading && <NotesNotFound />}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDeleteFn={() =>
                  setNotes(notes.filter((n) => n._id !== note._id))
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
