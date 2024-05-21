import React, { useEffect, useState } from "react";
import withAuth from "@/components/withAuth/withAuth";
import Link from "next/link";

function MisTorneos() {
  const [tournaments, setTournaments] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 300); // Delay of 3 seconds

    return () => clearTimeout(timer); // Clean up on component unmount
  }, []);

  useEffect(() => {
    const fetchTournaments = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:8080/user_tournaments/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const text = await response.text();
        console.log(text);
        const data = JSON.parse(text);
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setTournaments(sortedData);
      } else {
        console.error("Failed to fetch tournaments");
      }
    };

    fetchTournaments();
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
      <Link
        href={"/Hub"}
        className="absolute top-4 right-4 font-bold py-3 px-3 rounded mt-4"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img src="/assets/hub.png" alt="Return to Hub" className="w-8 h-8" />
      </Link>

      <Link
        href={"/Hub/MisTorneos/MyInvitations"}
        className="absolute top-4 left-10 font-bold py-3 px-3 rounded mt-4"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        My Invitations
      </Link>

      <div className="max-h-[400px] w-[550px] overflow-y-scroll overflow-hidden bg-[#729560] rounded-lg mt-5">
        {tournaments.length === 0 && showMessage ? (
          <div className="p-10">
            <h2 className="text-3xl font-serif font-extrabold antialiased text-center animate-fadeIn">
              You are not participating in any tournaments, YET
            </h2>
          </div>
        ) : (
          tournaments
            .filter(
              (tournament) =>
                typeof tournament === "object" && tournament !== null
            )
            .map((tournament, index) => (
              <Link
                href={`/Hub/MisTorneos/${tournament.id}`}
                key={tournament.id || index}
                onClick = {() => localStorage.setItem("tournamentId", tournament.id)}
              >
                <div className="p-7 border-b border-gray-200 transform transition duration-500 hover:rounded-lg hover:scale-105 hover:bg-custom-green cursor-pointer animate-fadeIn">
                  <h2 className="text-xl font-bold">{tournament.name}</h2>
                  <p>{tournament.description}</p>
                  <div className="flex justify-end">
                    <p>{tournament.type}</p>
                  </div>
                </div>
              </Link>
            ))
        )}
      </div>
    </div>
  );
}

export default withAuth(MisTorneos);
