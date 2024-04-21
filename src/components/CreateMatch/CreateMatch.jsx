import React, { useState } from "react";
import withAuth from "@/components/withAuth/withAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

async function createMatch(date, location, description, router) {
  try {
    const token = localStorage.getItem("token");
    const tournamentId = localStorage.getItem("tournamentId");
    const response = await fetch("http://localhost:8080/matches/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date, location, description, tournamentId }),
    });

    if (response.ok) {
      router.push(`/Hub/MisTorneos/${tournamentId}`);	
    }
  } catch (error) {
    console.error(error);
  }
}

function CreateMatch() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  const router = useRouter();

  const validateDate = (date) => {
    return date !== "";
  };

  const validateLocation = (location) => {
    return location !== "";
  };

  const validateDescription = (description) => {
    return description !== "";
  };

  const handleCreateMatch = () => {
    if (
      !validateDate(date) ||
      !validateLocation(location) ||
      !validateDescription(description)
    ) {
      alert("Please fill in all fields correctly");
      return;
    } else {
      createMatch(date, location, description, router);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("tournamentId");
    setTournamentId(id);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen space-y-4">
      <div
        className="absolute top-0 left-0 w-full h-[12.5%]"
        style={{ backgroundColor: "#729560" }}
      ></div>
      <img
        src="/assets/logo.png"
        alt="Logo"
        className="w-24 h-24 flex justify-center mt-12 mb-32 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
      />
     <Link
        href={`/Hub/MisTorneos/${tournamentId}`}
        className="absolute top-4 right-4 font-bold py-3 px-3 rounded"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img
          src="/assets/back-arrow.png"
          alt="Return to Hub"
          className="w-8 h-8"
        />
      </Link>
      <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="w-full h-full bg-transparent outline-none"
        />
      </div>
      <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          className="w-full h-full bg-transparent outline-none"
        />
      </div>
      <div className="w-80 h-18 flex items-center justify-center mx-auto mt-5 mb-5 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-full bg-transparent outline-none"
        />
      </div>

      <button
        className="text-white font-bold py-2 px-4 rounded mt-5 mb-5"
        onClick={() => {
          handleCreateMatch();
        }}
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        Create Match
      </button>
    </div>
  );
}

export default withAuth(CreateMatch);
