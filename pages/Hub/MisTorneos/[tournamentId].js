import React, { useEffect, useState } from "react";
import withAuth from "@/components/withAuth/withAuth";
import { useRouter } from "next/router";
import Link from "next/link";

async function inviteUserToTournament(userName, tournamentId) {
  try {
    const token = localStorage.getItem("token");
    const senderName = localStorage.getItem("username"); // Get the userId from local storage
    const response = await fetch(
      "http://localhost:8080/invitations/send-invitation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderName,
          userName,
          tournamentId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.id) {
      alert("User invited successfully!");
    } else {
      alert("Failed to invite user.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function Tournament() {
  const [tournament, setTournament] = useState({
    name: "",
    description: "",
    maxParticipants: "",
    type: "",
    adminId: "",
  });
  const [userId, setUserId] = useState(""); // Get the userId from local storage
  const [userName, setUserName] = useState("");
  const router = useRouter();
  console.log(router.query.tournamentId);
  const tournamentId = router.query.tournamentId;

  useEffect(() => {
    setUserId(localStorage.getItem("userId")); // Get the userId from local storage
    const fetchTournament = async () => {
      const token = localStorage.getItem("token");
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
        localStorage.setItem("tournamentName", data.name); // Store the tournamentId in local storage
        localStorage.setItem("tournamentId", data.id); // Store the tournamentId in local storage
        setTournament(data);
      } else {
        console.error("Failed to fetch tournament");
      }
    };

    fetchTournament(); // Call the fetchTournament function
  }, [tournamentId]);

  const handleInviteUser = () => {
    if (userName) {
      inviteUserToTournament(userName, tournament.id);
    }
  };

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
        href={"/Hub/MisTorneos"}
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
      <div className="w-full max-w-md p-4 bg-custom-green rounded shadow-md animate-fadeIn mt-20 mb-5">
        Tournament Name:
        <h1 className="text-xl font-bold mb-5 border-b pb-5">{tournament.name}</h1>
        Description:
        <p className="text-gray-700 mb-5 border-b pb-5">{tournament.description}</p>
        Tournament Admin:
        <p className="text-gray-700 mb-5 border-b pb-5">{tournament.adminUsername}</p>
        Max Participants:
        <p className="text-gray-700 mb-5 border-b pb-5">{tournament.maxParticipants}</p>
        Type:
        <p className="text-gray-700 mb-5">{tournament.type}</p>
      </div>

      <Link
        href={`/Hub/MisTorneos/Torneo/CreateMatch`}
        className="font-bold py-3 px-3 rounded mt-4 animate-fadeIn"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        Schedule a New Match
      </Link>

      <Link
        href={`/Hub/MisTorneos/Torneo/Matches`}
        className="font-bold py-3 px-3 rounded mt-4 animate-fadeIn"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        Matches
      </Link>
      {tournament.adminId == userId && (
        <>
          <label>
            Invite User:
            <input
              className="border-2 border-gray-300 p-2 w-full rounded"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder=" Enter user name"
            />
          </label>

          <button
            className="font-bold py-3 px-3 rounded mt-4"
            onClick={() => {
              handleInviteUser();
            }}
            style={{ backgroundColor: "#729560" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#abcd99")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#729560")
            }
          >
            Invite User
          </button>
        </>
      )}
    </div>
  );
}

export default withAuth(Tournament);
