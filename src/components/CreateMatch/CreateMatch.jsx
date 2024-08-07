import React, { useState } from "react";
import withAuth from "@/components/withAuth/withAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function createMatch(date, location, description, team1, team2, router) {
  try {
    const token = localStorage.getItem("token");
    const tournamentId = localStorage.getItem("tournamentId");
    const response = await fetch("http://localhost:8080/matches/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date,
        location,
        description,
        team1,
        team2,
        tournamentId,
      }),
    });

    if (response.ok) {
      router.push(`/Hub/MisTorneos/${tournamentId}/Manage/Matches`);
    }
  } catch (error) {
    console.error(error);
  }
}

function CreateMatch() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState("Select a player");
  const [selectedPlayer2, setSelectedPlayer2] = useState("Select a player");
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleAddPlayerToTeam1 = (player) => {
    if (player !== "Select a player") {
      setTeam1([...team1, player]);
      setSelectedPlayer1("Select a player");
    }
  };

  const handleAddPlayerToTeam2 = (player) => {
    if (player !== "Select a player") {
      setTeam2([...team2, player]);
      setSelectedPlayer2("Select a player");
    }
  };

  const validateDate = (date) => {
    return date !== "";
  };

  const validateTime = (time) => {
    return time !== "";
  };

  const validateLocation = (location) => {
    return location !== "";
  };

  const validateDescription = (description) => {
    return description !== "";
  };

  const handleCreateMatch = () => {
    let dateTimeString = `${date}T${time}:00.000Z`;
    let dateTime = new Date(dateTimeString);
    let utcDateTimeString = `${date}T${dateTime.getUTCHours()}:${String(dateTime.getUTCMinutes()).padStart(2, '0')}:00.000Z`;

    if (
      !validateDate(date) ||
      !validateTime(time) ||
      !validateLocation(location) ||
      !validateDescription(description) ||
      team1.length === 0 ||
      team2.length === 0
    ) {
      toast.error("Please fill all fields");
      return;
    } else {
      createMatch(
        utcDateTimeString,
        location,
        description,
        team1,
        team2,
        router
      );
    }
  };

  const handleRemovePlayerFromTeam1 = (player) => {
    setTeam1(team1.filter((p) => p !== player));
  };

  const handleRemovePlayerFromTeam2 = (player) => {
    setTeam2(team2.filter((p) => p !== player));
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      const token = localStorage.getItem("token");
      const tournamentId = localStorage.getItem("tournamentId");
      const response = await fetch(
        `http://localhost:8080/tournaments/get/${tournamentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPlayers(data.allParticipants);
      } else {
        console.error("Failed to fetch players");
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("tournamentId");
    setTournamentId(id);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div
        className="absolute top-0 left-0 w-full h-[12.5%]"
        style={{ backgroundColor: "#729560" }}
      ></div>
      <Link href={"/Hub"}>
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-24 h-24 flex justify-center mt-4 mb-10 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        />
      </Link>

      <span className="absolute top-4 right-96 p-2 underline text-black font-extrabold">
        Logged in as {username}
      </span>

      <Link
        href={`/Hub/MisTorneos/${tournamentId}/Manage`}
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

      <div className="flex justify-center mt-56 mb-5">
        <div className="w-80 h-18 flex flex-col items-center justify-center mx-2 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
          Team 1:
          <div className="ml-4">
            <select
              className="rounded"
              value={selectedPlayer1}
              onChange={(e) =>
                e.target.value && handleAddPlayerToTeam1(e.target.value)
              }
            >
              <option value="Select a player">Select a player</option>
              {players.map((player, index) => (
                <option
                  key={index}
                  value={player}
                  disabled={team1.includes(player) || team2.includes(player)}
                >
                  {player}
                </option>
              ))}
            </select>
          </div>
          <p>
            {team1.map((player, index) => (
              <span key={index}>
                {player}
                <button
                  onClick={() => handleRemovePlayerFromTeam1(player)}
                  className="bg-transparent text-red-500 hover:text-red-700 active:text-red-900 font-bold py-2 px-1 mr-2 rounded inline-flex items-center"
                >
                  <span>x</span>
                </button>
              </span>
            ))}
          </p>
        </div>
        <div className="w-80 h-18 flex flex-col items-center justify-center mx-2 p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
          Team 2:
          <div className="ml-4">
            <select
              className="rounded"
              value={selectedPlayer2}
              onChange={(e) =>
                e.target.value && handleAddPlayerToTeam2(e.target.value)
              }
            >
              <option value="Select a player">Select a player</option>
              {players.map((player, index) => (
                <option
                  key={index}
                  value={player}
                  disabled={team1.includes(player) || team2.includes(player)}
                >
                  {player}
                </option>
              ))}
            </select>
          </div>
          <p>
            {team2.map((player, index) => (
              <span key={index}>
                {player}
                <button
                  onClick={() => handleRemovePlayerFromTeam2(player)}
                  className="bg-transparent text-red-500 hover:text-red-700 active:text-red-900 font-bold py-2 px-1 mr-2 rounded inline-flex items-center"
                >
                  <span>x</span>
                </button>
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start mb-5">
        <h3 className="text-xl font-bold mb-2">Date</h3>
        <div className="w-160 h-18 flex items-center justify-center mx-auto p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col items-start mb-5">
        <h3 className="text-xl font-bold mb-2">Time</h3>
        <div className="w-160 h-18 flex items-center justify-center mx-auto p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
          <input
            type="time"
            onChange={(e) => setTime(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col items-start mb-5">
        <h3 className="text-xl font-bold mb-2">Location</h3>
        <div className="w-160 h-18 flex items-center justify-center mx-auto p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
          <input
            type="text"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col items-start mb-5">
        <h3 className="text-xl font-bold mb-2">Description</h3>
        <div className="w-160 h-18 flex items-center justify-center mx-auto p-6 relative rounded transition-colors duration-500 ease-in-out bg-input-gray hover:bg-custom-gray transform hover:scale-105">
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
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
