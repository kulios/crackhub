import { useState } from 'react';

export default function Games() {
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState('0'); // default to show all ratings
  const [filterOpen, setFilterOpen] = useState(false); // State for filter expand/collapse

  const games = [
    {
      id: 1,
      title: 'Adventure Quest',
      description: 'An exciting adventure game with stunning visuals and engaging storyline.',
      rating: '1',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Puzzle Master',
      description: 'Challenge your mind with addictive puzzles and brain teasers.',
      rating: '2.4',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Racing Fever',
      description: 'Experience adrenaline-pumping racing action on stunning tracks.',
      rating: '4.7',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const minRatingNumber = parseFloat(minRating);

  const filteredGames = games.filter((game) => {
    const gameRating = parseFloat(game.rating);
    return (
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      gameRating >= minRatingNumber
    );
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-8 space-y-8 md:space-y-0 md:space-x-8 relative">

      {/* Filter Toggle Button - top right corner */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="bg-white bg-opacity-80 backdrop-blur-lg p-2 rounded-full shadow-lg focus:outline-none hover:bg-gray-200 transition"
        >
          {filterOpen ? '✖' : '⚙️'}
        </button>
      </div>

      {/* Filter Bar - conditionally expanded */}
      {filterOpen && (
        <div className="absolute top-16 right-4 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-4 flex items-center space-x-4 transition-all duration-300 max-w-xl w-full">
          <div className="flex items-center space-x-2 flex-1">
            <label
              htmlFor="rating"
              className="text-xs font-semibold text-gray-700"
            >
              Min Rating
            </label>
            <select
              id="rating"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="p-1 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs"
            >
              <option value="0">All</option>
              <option value="1">1★ & up</option>
              <option value="2">2★ & up</option>
              <option value="3">3★ & up</option>
              <option value="4">4★ & up</option>
            </select>
          </div>
          {/* Additional filters can be added here */}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 w-full max-w-4xl">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Header Section */}
        <div className="flex items-baseline justify-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Download Games</h1>
        </div>

        {/* Introduction Text */}
        <div className="max-w-2xl bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-lg text-center mb-8 mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Get Your Favorite Games</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Download you Favorite games here
          </p>
          
        </div>

        {/* Download Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transform transition duration-300"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-2 text-center">{game.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.19 3.688a1 1 0 00.95.69h3.844c.969 0 1.371 1.24.588 1.81l-3.106 2.255a1 1 0 00-.364 1.118l1.19 3.688c.3.921-.755 1.688-1.54 1.118l-3.106-2.255a1 1 0 00-1.175 0l-3.106 2.255c-.784.57-1.839-.197-1.54-1.118l1.19-3.688a1 1 0 00-.364-1.118L2.858 9.415c-.783-.57-.38-1.81.588-1.81h3.844a1 1 0 00.95-.69l1.19-3.688z" />
                </svg>
                <span className="text-gray-700 font-semibold">{game.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
