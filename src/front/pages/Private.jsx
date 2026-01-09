import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () => {
  const { store, dispatch } = useGlobalReducer();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const Verify = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const result = await fetch(backendUrl + "/api/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await result.json();
      if (!result.ok) {
        alert("You must be logged in to view this content");
        navigate("/");
      }
      setUser(data.username);
      return;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    Verify();
  }, []);

  return (
    <>
      <div className="flex-container bg-dark text-white text-center vh-100 pt-5 pb-5">
        <div className="row">
          <h1>This is a private page</h1>
          <h2>Welcome {user}</h2>
        </div>
      </div>
    </>
  );
};
