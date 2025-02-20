import axios from 'axios';

axios.defaults.baseURL = 'https://ieeeadvityaround-1-production.up.railway.app/';

export default function App() {
  return (
    <div className="text-center">
      <p>Backend Connected: {axios.defaults.baseURL}</p>
    </div>
  );
}
