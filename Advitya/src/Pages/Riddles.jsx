import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const RiddlePage = () => {
  const { riddleId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, null, window.location.href);
    });
  }, []);

  const submitAnswer = async () => {
    if (!answer) return toast.error("Enter an answer!");

    try {
      const response = await axios.post("https://ieeeadvityaround-1-production.up.railway.app/game/submit-answer", {
        team_name: state.teamName,
        riddle_id: riddleId,
        answer: answer,
      });

      if (response.data.redirect === "thank_you") {
        toast.success("Game completed! Redirecting...");
        navigate("/thank-you");
      } else {
        toast.success("Correct! Next location is revealed.");
        navigate("/middle", { state: { nextLocation: response.data.next_location, teamName: state.teamName } });
      }
    } catch (error) {
      toast.error("Error submitting answer. Try again!");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">🧩 Solve This Riddle</h1>
      <p className="text-lg bg-gray-900 px-4 py-2 rounded-lg">{state.question}</p>
      <input
        type="text"
        placeholder="Enter Answer"
        className="border border-gray-400 bg-black text-white p-3 my-4 w-64 text-center rounded-lg"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold transition hover:bg-gray-300"
        onClick={submitAnswer}
      >
        Submit Answer ✅
      </button>
    </div>
  );
};

export default RiddlePage;
