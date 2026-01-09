import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const login = localStorage.getItem("login-status");

  const Logout = () => {
    dispatch({
      type: "LoggedOut",
    });
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("login-status");
  };

  if (login) {
    return (
      <nav className="navbar navbar-light bg-dark pt-2">
        <div className="container">
          <Link to="/">
            <span className="navbar-brand mb-0 h1 text-white">Main Page</span>
          </Link>
          <div className="d-flex">
            <div className="mx-auto">
              <Link to="/">
                <button className="btn btn-primary" onClick={Logout}>
                  Logout
                </button>
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
  } else {
    return (
      <nav className="navbar navbar-primary bg-dark pt-2">
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
  }
};
