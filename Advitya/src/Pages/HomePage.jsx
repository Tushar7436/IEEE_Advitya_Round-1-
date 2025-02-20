import  { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const HomePage = ({ setTeamName, setIsLoggedIn }) => {
  const [teamInput, setTeamInput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTeamInput(e.target.value);
  };

  const handleLogin = async () => {
    if (!teamInput.trim()) {
      setError('Please enter your team name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login/', {
        team_name: teamInput.trim(),
      });

      if (response.data.message) {
        setTeamName(teamInput.trim());
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Riddle Treasure Hunt</h1>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <input
          type="text"
          value={teamInput}
          onChange={handleInputChange}
          placeholder="Enter Team Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Start
        </button>
      </div>
    </div>
  );
};
HomePage.propTypes = {
  setTeamName: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default HomePage;
