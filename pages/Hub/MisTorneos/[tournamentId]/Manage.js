import React, { useEffect, useState } from "react";
import withAuth from "@/components/withAuth/withAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import { DialogDemo } from "@/components/ui/DialogDemo";
import { DialogDeleteTournament } from "@/components/ui/DialogDeleteTournament";
import { DialogChangeTournament } from "@/components/ui/DialogChangeTournament";

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

function manageTournament() {
  const [tournament, setTournament] = useState({
    name: "",
    description: "",
    maxParticipants: "",
    type: "",
    adminId: "",
    participants: "",
  });
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDescription, setTournamentDescription] = useState("");
  const [tournamentMaxParticipants, setTournamentMaxParticipants] =
    useState("");
  const [tournamentType, setTournamentType] = useState("");
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
        localStorage.setItem("tournamentName", data.name); // Store the tournamentName in local storage
        localStorage.setItem("tournamentId", data.id); // Store the tournamentId in local storage
        setTournament(data);
        setTournamentName(data.name);
        setTournamentDescription(data.description);
        setTournamentMaxParticipants(data.maxParticipants);
        setTournamentType(data.type);
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

  const handleDeleteTournament = async () => {
    const token = localStorage.getItem("token");
    const tournamentId = localStorage.getItem("tournamentId");

    try {
      const response = await fetch(
        `http://localhost:8080/tournaments/delete/${tournamentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      } else {
        router.push("/Hub/MisTorneos");
        console.log("Tournament deleted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTournament = async () => {
    const token = localStorage.getItem("token");
    const tournamentId = localStorage.getItem("tournamentId");

    try {
      const response = await fetch(
        `http://localhost:8080/tournaments/update/${tournamentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: tournamentName,
            description: tournamentDescription,
            type: tournamentType,
            maxParticipants: tournamentMaxParticipants,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update tournament");
      } else {
        router.reload();
        console.log("Tournament updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen ">
      <div
        className="absolute top-0 left-0 w-full h-[12.5%]"
        style={{ backgroundColor: "#729560" }}
      ></div>
      <img
        src="/assets/logo.png"
        alt="Logo"
        className="w-24 h-24 flex justify-center mt-4 mb-10 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
      />
      <Link
        href={`/Hub/MisTorneos/${tournamentId}`}
        className="absolute top-4 right-4 font-bold py-3 px-3 mt-4 rounded"
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

      <div
        className="w-full max-w-md px-4 py-4 relative bg-custom-green overflow-y-scroll overflow-hidden rounded shadow-md animate-fadeIn mb-5 font-bold"
        style={{ marginTop: "150px", maxHeight: "500px" }}
      >
        {tournament.adminId == userId && (
          <div className="absolute top-2 right-12">
            <DialogChangeTournament
              tournamentName={tournamentName}
              setTournamentName={setTournamentName}
              tournamentDescription={tournamentDescription}
              setTournamentDescription={setTournamentDescription}
              tournamentMaxParticipants={tournamentMaxParticipants}
              setTournamentMaxParticipants={setTournamentMaxParticipants}
              tournamentType={tournamentType}
              setTournamentType={setTournamentType}
              handleUpdateTournament={handleUpdateTournament}
            />
          </div>
        )}
        Tournament Name:
        <h1 className="text-xl font-bold mb-2 border-b pb-5">
          {tournament.name}
        </h1>
        Description:
        <p className="text-gray-700 mb-2 border-b pb-5">
          {tournament.description}
        </p>
        Tournament Admin:
        <p className="text-gray-700 mb-2 border-b pb-5">
          {tournament.adminUsername}
        </p>
        Max Participants:
        <p className="text-gray-700 mb-2 border-b pb-5">
          {tournament.maxParticipants}
        </p>
        Joined Participants:
        <p className="text-gray-700 mb-2 border-b pb-5">
          {tournament.participants.replace(/[\[\]']+/g, "")}
        </p>
        Type:
        <p className="text-gray-700 mb-2">{tournament.type}</p>
      </div>

      <Link
        href={`/Hub/MisTorneos/${tournamentId}/CreateMatch`}
        className=" font-bold py-3 px-3 rounded animate-fadeIn mt-2"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        Schedule a New Match
      </Link>

      <Link
        href={`/Hub/MisTorneos/${tournamentId}/Matches`}
        className="font-bold py-3 px-3 rounded mt-4 animate-fadeIn"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        Matches
      </Link>

      {tournament.adminId == userId && (
        <div>
          <div className="absolute top-40 left-10">
            <DialogDemo
              userName={userName}
              setUserName={setUserName}
              handleInviteUser={handleInviteUser}
            />
          </div>

          <div className="absolute top-40 right-10">
            <DialogDeleteTournament
              handleDeleteTournament={handleDeleteTournament}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(manageTournament);
