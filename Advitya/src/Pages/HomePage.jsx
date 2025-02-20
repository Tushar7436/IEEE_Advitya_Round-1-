import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!teamName.trim()) {
      setError('Please enter your team name');
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        team_name: teamName.trim()
      });
      if (response.data.success) {
        localStorage.setItem('teamName', teamName);
        navigate('/riddles');
      } else {
        setError(response.data.message || 'Invalid team name');
      }
    } catch (err) {
      setError('Server error, please try again');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Riddle Treasure Hunt</h1>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter Team Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default HomePage;
