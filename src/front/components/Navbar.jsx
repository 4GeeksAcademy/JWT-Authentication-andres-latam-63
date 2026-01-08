import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 text-white">Main Page</span>
        </Link>
        <div className="d-flex">
          <div className="mx-auto">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </div>
          <div className="mx-auto">
            <Link to="/signup">
              <button className="btn btn-primary">Register</button>
            </Link>
          </div>
          <div className="mx-auto col-1">
            <Link to="/private">
              <button className="btn btn-primary">Private</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
