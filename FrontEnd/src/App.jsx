import { Routes, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import AddNotePage from "./Pages/AddNotePage";
import NoteDetailPage from "./Pages/NoteDetailPage";

const ThinkBoard = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-note" element={<AddNotePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default ThinkBoard;
