"use client";
import Image from "next/image";
import { useState } from "react";

import Homep from "@/components/homep";
import Account from "@/components/account";
import Dates from "@/components/dates";
import Games from "@/components/games";
// If using separate file:
// import Home from './components/Home';

export default function HomePage() {
  const [activeComponent, setActiveComponent] = useState("home");

  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        // Render the Home component here
        return <Homep />;
      case "games":
        return <Games />;
      case "dates":
        return <Dates />;
      case "account":
        return <Account />;
      default:
        return <Homep />;
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="flex h-screen">
        <div className="w-1/8 bg-gray-800 text-white p-4">
          <div className="mb-4 font-semibold text-lg">Crackhub</div>
          {/* Buttons to switch views */}
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => setActiveComponent("home")}
          >
            home page
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => setActiveComponent("games")}
          >
            games
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => setActiveComponent("dates")}
          >
            dates
          </button>
          <br className="bg-white" />
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => setActiveComponent("account")}
          >
            account
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-0">{renderComponent()}</div>
      </div>
    </div>
  );
}

// Define the Home component
function Home() {
  return <div>Home Page Content</div>;
}
