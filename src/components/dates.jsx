import { useState } from "react";

export default function Dates() {
  const [entries, setEntries] = useState([
    {
      username: "PlayerOne",
      gamename: "GameX",
      date: "2024-04-27T14:30",
      contact: "playerone@example.com",
    },
    {
      username: "GamerGal",
      gamename: "AdventureQuest",
      date: "2024-04-26T10:00",
      contact: "gamergal@example.com",
    },
  ]);

  const [formData, setFormData] = useState({
    username: "",
    gamename: "",
    date: "",
    contact: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filterUsername, setFilterUsername] = useState("");
  const [filterGameName, setFilterGameName] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [filterLiveOnly, setFilterLiveOnly] = useState(false); // New state for "Live Now" filter

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "filterUsername") setFilterUsername(value);
    else if (name === "filterGameName") setFilterGameName(value);
    else if (name === "filterTime") setFilterTime(value);
    else if (name === "filterLiveOnly") setFilterLiveOnly(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.username &&
      formData.gamename &&
      formData.date &&
      formData.contact
    ) {
      setEntries([...entries, formData]);
      setFormData({ username: "", gamename: "", date: "", contact: "" });
      setShowForm(false);
    }
  };

  const now = new Date();
  const todayDatetimeLocal = now.toISOString().slice(0, 16);

  const isPastDateTime = (dateTimeStr) => {
    const entryDateTime = new Date(dateTimeStr);
    const nowDateTime = new Date();
    return entryDateTime < nowDateTime;
  };

  const isLive = (dateTimeStr) => {
    const entryDateTime = new Date(dateTimeStr);
    const nowDateTime = new Date();
    const diffMs = Math.abs(entryDateTime - nowDateTime);
    return diffMs <= 60 * 60 * 1000;
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesUsername = filterUsername
      ? entry.username.toLowerCase().includes(filterUsername.toLowerCase())
      : true;
    const matchesGameName = filterGameName
      ? entry.gamename.toLowerCase().includes(filterGameName.toLowerCase())
      : true;
    const matchesTime = filterTime
      ? (() => {
          const filterTimeMs = new Date(filterTime).getTime();
          const entryTimeMs = new Date(entry.date).getTime();
          return Math.abs(entryTimeMs - filterTimeMs) <= 60 * 60 * 1000;
        })()
      : true;

    // Apply "Live Now" filter if active
    const matchesLiveOnly = filterLiveOnly ? isLive(entry.date) : true;

    return matchesUsername && matchesGameName && matchesTime && matchesLiveOnly;
  });

  const sortedEntries = [...filteredEntries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 px-4 relative">
      {/* Plus icon button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="absolute top-4 right-15  z-50 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
        aria-label="Toggle Entry Form"
      >
        <span className="text-2xl align-middle font-bold">+</span>
      </button>

      {/* Filter icon button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-4 right-4 z-50 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition"
        aria-label="Toggle Filters"
      >
        {/* Magnifying glass icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z"
          />
        </svg>
      </button>

      {/* Conditionally render filter section */}
      {showFilters && (
        <div className="mt-5 mb-4 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg p-4 max-w-4xl mx-auto animate-fadeIn">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Filter Entries
          </h3>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            {/* Filter by Username */}
            <input
              type="text"
              name="filterUsername"
              placeholder="Filter by Username"
              value={filterUsername}
              onChange={handleFilterChange}
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Filter by Game Name */}
            <input
              type="text"
              name="filterGameName"
              placeholder="Filter by Game Name"
              value={filterGameName}
              onChange={handleFilterChange}
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Live Now Filter Button */}
            <button
              type="button"
              onClick={() => setFilterLiveOnly(!filterLiveOnly)}
              className={`mt-2 md:mt-0 bg-${
                filterLiveOnly ? "green" : "gray"
              }-500 hover:bg-${
                filterLiveOnly ? "green" : "gray"
              }-600 text-black font-semibold py-2 px-4 rounded-lg transition`}
            >
              {filterLiveOnly ? "All dates" : "Live Now"}
            </button>

            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setFilterUsername("");
                setFilterGameName("");
                setFilterTime("");
                setFilterLiveOnly(false);
              }}
              className="mt-2 md:mt-0 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Input form for new entries */}
      {showForm && (
        <div className="flex-shrink-0 h-[20vh] mt-4 w-full flex items-start justify-center pt-4 bg-white bg-opacity-80 backdrop-blur-1g">
          <div className="">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">
              Submit Your Entry
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"
            >
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="gamename"
                placeholder="Game Name"
                value={formData.gamename}
                onChange={handleChange}
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                min={todayDatetimeLocal}
              />
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                <input
                  type="text"
                  name="contact"
                  placeholder=" Discord , whatsapp (link)"
                  value={formData.contact}
                  onChange={handleChange}
                  className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 md:mt-0 md:self-end bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Entries Section */}
      <div className="flex-1 overflow-y-auto mt-4 px-4 pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Events
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {sortedEntries.map((entry, index) => {
            const isPast = isPastDateTime(entry.date);
            const live = isLive(entry.date);
            return (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-md hover:scale-105 transform transition duration-300 ${
                  isPast
                    ? "bg-gray-300 opacity-50 cursor-not-allowed"
                    : "bg-white bg-opacity-70 backdrop-blur-lg"
                }`}
              >
                <p className="text-gray-800 font-semibold mb-2">
                  <span className="capitalize">Username:</span> {entry.username}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="capitalize">Game:</span> {entry.gamename}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="capitalize">Date:</span> {entry.date}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="capitalize">Contact:</span> {entry.contact}
                </p>
                {live && (
                  <div className="mt-2 text-green-600 font-bold">LIVE NOW</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
