import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/potential" className="nav-link">
          Potential Candidates
        </Link>
      </div>
    </nav>
  );
};

export default Nav;