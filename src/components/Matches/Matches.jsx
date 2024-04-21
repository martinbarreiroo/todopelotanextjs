import React, { useEffect, useState } from "react";
import Link from "next/link";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate() + 1).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function Matches() {
  const [matches, setMatches] = useState([]);
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentId, setTournamentId] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("token");
      const tournamentId = localStorage.getItem("tournamentId");
      setTournamentName(localStorage.getItem("tournamentName"));
      const response = await fetch(
        `http://localhost:8080/matches/get/${tournamentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        let data = await response.json();

        // Sort matches by date
        data.sort((a, b) => {
          const [aYear, aMonth, aDay] = a.date.split('-').map(Number);
          const [bYear, bMonth, bDay] = b.date.split('-').map(Number);
        
          return new Date(aYear, aMonth - 1, aDay) - new Date(bYear, bMonth - 1, bDay);
        });

        setMatches(data);
      } else {
        console.error("Failed to fetch matches");
      }
    };

    fetchMatches();
  }, []);

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
        className="absolute top-4 right-4 font-bold py-3 px-4 rounded"
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
      <div className="w-full max-w-md p-4 bg-custom-green rounded shadow-md animate-fadeIn font-extrabold relative flex flex-col items-center justify-center mt-10 mb-10">
        <h3 style={{ fontSize: "2em" }}> {tournamentName}'s Matches </h3>
      </div>
      <div
        style={{
          maxHeight: "400px",
          width: "550px",
          overflowY: "auto",
          backgroundColor: "#729560",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        {matches.length === 0 ? (
          <div className="p-10">
            <h2 className="text-3xl font-serif font-extrabold antialiased text-center animate-fadeIn">
              No matches found for this tournament
            </h2>
          </div>
        ) : (
          matches.map((match, index) => (
            <div
              key={match.id || index}
              className="p-7 border-b border-gray-200 transform transition duration-500 ease-in-out hover:scale-105 hover:bg-custom-green cursor-pointer animate-fadeIn"
            >
              <h2 className="text-xl font-bold">{match.location}</h2>
              <p>{formatDate(match.date)}</p>
              <p>{match.description}</p>
              <div className="flex justify-end">
                <p>{match.type}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Matches;
