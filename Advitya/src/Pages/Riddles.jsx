import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const RiddlePage = () => {
  const { riddleId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");

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

  const submitAnswer = async () => {
    if (!answer) return alert("Enter an answer!");

    try {
      const response = await axios.post("https://ieeeadvityaround-1-production.up.railway.app/game/submit-answer", {
        team_name: state.teamName,
        riddle_id: riddleId,
        answer: answer,
      });

      if (response.data.redirect === "thank_you") {
        navigate("/thank-you");
      } else {
        navigate("/middle", { 
          state: { nextLocation: response.data.next_location, teamName: state.teamName } 
        });
      }
    } catch (error) {
      alert("Error submitting answer. Try again!");
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
