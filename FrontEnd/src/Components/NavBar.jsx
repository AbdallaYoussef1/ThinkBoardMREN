import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
const NavBar = () => {
  return (
    <header className="bg-base-200 border-b border-base-content/10">
      <div className="mx-auto max-w-7xl p-4 ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">ThinkBoard</h1>
          <div className="flex items-center gap-2">
            <Link className="btn btn-primary" to="/add-note">
              <PlusIcon />
              <span>Add Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
