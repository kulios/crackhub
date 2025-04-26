import { useState } from 'react';

export default function Dates() {
  // State to hold form inputs
  const [formData, setFormData] = useState({
    gameName: '',
    startTime: '',
    endTime: '',
    players: '',
  });

  // State to hold all submissions
  const [submissions, setSubmissions] = useState([]);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add current form data to submissions
    setSubmissions((prev) => [...prev, { ...formData }]);
    // Reset form after submission
    setFormData({
      gameName: '',
      startTime: '',
      endTime: '',
      players: '',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top section: small input form */}
      <div className="flex+2 p-4 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-2xl w-full bg-white bg-opacity-80 backdrop-blur-lg p-4 rounded-xl shadow-lg mx-auto">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
            Play with your friend
          </h1>
          {/* Instructions */}
          <p className="text-sm md:text-base text-gray-700 mb-4 text-center">
            Enter your game details below.
          </p>

          {/* Form */}
          <form className="space-y-2" onSubmit={handleSubmit}>
  {/* Game Name */}
  <div>
    <label htmlFor="gameName" className="block text-gray-700 mb-1 text-xs md:text-sm font-medium">
      Game Name
    </label>
    <input
      type="text"
      id="gameName"
      name="gameName"
      value={formData.gameName}
      onChange={handleChange}
      placeholder="Enter game name"
      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs md:text-sm"
      required
    />
  </div>

  {/* Start Time */}
  <div>
    <label htmlFor="startTime" className="block text-gray-700 mb-1 text-xs md:text-sm font-medium">
      Start Time
    </label>
    <input
      type="datetime-local"
      id="startTime"
      name="startTime"
      value={formData.startTime}
      onChange={handleChange}
      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs md:text-sm"
      required
    />
  </div>

  {/* Players */}
  <div>
    <label htmlFor="players" className="block text-gray-700 mb-1 text-xs md:text-sm font-medium">
      Players (comma separated)
    </label>
    <input
      type="text"
      id="players"
      name="players"
      value={formData.players}
      onChange={handleChange}
      placeholder="e.g., Alice, Bob, Charlie"
      className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs md:text-sm"
    />
  </div>

  {/* Submit Button */}
  <div className="mt-1 text-center">
    <button
      type="submit"
      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-xs md:text-sm"
    >
      Add Entry
    </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom section: submissions display */}
      <div className="flex-5 bg-gradient-to-b from-purple-600 to-indigo-600 p-4 overflow-y-auto">
        {submissions.length > 0 && (
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white text-center">
              Submitted Entries
            </h2>
            <div className="flex-1 overflow-y-auto space-y-4">
              {submissions.map((entry, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-400 pl-4 shadow-sm bg-white bg-opacity-80 rounded-lg p-3"
                >
                  <p className="mb-1"><strong>Game:</strong> {entry.gameName}</p>
                  <p className="mb-1"><strong>Start:</strong> {entry.startTime}</p>
                  <p className="mb-1"><strong>End:</strong> {entry.endTime}</p>
                  <p><strong>Players:</strong> {entry.players}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
