import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const HomePage = () => {
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, null, window.location.href);
    });
  }, []);

  const startGame = async () => {
    if (!teamName) return toast.error("Enter your team name!");

    try {
      const response = await axios.post("https://ieeeadvityaround-1-production.up.railway.app/game/start-game", {
        team_name: teamName,
      });

      toast.success("Game started! Redirecting...");
      navigate(`/riddle/${response.data.riddle_id}`, { state: { question: response.data.question, teamName } });
    } catch (error) {
      toast.error("Error starting the game. Try again!");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">🔍 Advitya Riddle Challenge</h1>
      <input
        type="text"
        placeholder="Enter Team Name"
        className="border border-gray-400 bg-black text-white p-3 mb-4 w-64 text-center rounded-lg"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <button
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold transition hover:bg-gray-300"
        onClick={startGame}
      >
        Start Game 🚀
      </button>
    </div>
  );
};

export default HomePage;
