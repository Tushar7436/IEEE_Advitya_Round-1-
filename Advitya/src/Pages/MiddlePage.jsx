import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const MiddlePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [key, setKey] = useState("");

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate(1); // Push the user forward if they try to go back
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  const validateKey = async () => {
    if (!key) return alert("Enter the key!");

    try {
      const response = await axios.post("https://ieeeadvityaround-1-production.up.railway.app/game/unlock-next-riddle", {
        team_name: state.teamName,
        riddle_id: key, // The key is the ObjectId of the next riddle
      });

      navigate(`/riddle/${response.data.riddle_id}`, { 
        state: { question: response.data.question, teamName: state.teamName } 
      });
    } catch (error) {
      alert("Invalid key. Try again!");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">📍 Go to This Location</h1>
      <p className="text-lg bg-gray-900 px-4 py-2 rounded-lg">{state.nextLocation}</p>
      <input
        type="text"
        placeholder="Enter Key"
        className="border border-gray-400 bg-black text-white p-3 my-4 w-64 text-center rounded-lg"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold transition hover:bg-gray-300"
        onClick={validateKey}
      >
        Submit Key 🔑
      </button>
    </div>
  );
};

export default MiddlePage;
