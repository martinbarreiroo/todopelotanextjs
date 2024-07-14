import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import withAuth from "@/components/withAuth/withAuth";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Forum } from "@/components/ui/forum";

function formatDate(dateString) {
  let date = new Date(dateString);
  let hours = date.getUTCHours().toString().padStart(2, "0"); // get UTC hours and pad with 0 if necessary
  let minutes = date.getUTCMinutes().toString().padStart(2, "0"); // get UTC minutes and pad with 0 if necessary
  let time = `${hours}:${minutes}`;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  return `${day}/${month}/${year}  ${time}`;
}

function Tournament() {
  const [tournamentPositions, setTournamentPositions] = useState([]);
  const [tournamentMatches, setTournamentMatches] = useState([]);
  const sortedTournamentPositions = tournamentPositions.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points; // Sort by points in descending order
    } else if (a.goals !== b.goals) {
      return b.goals - a.goals; // If points are equal, sort by goals in descending order
    } else {
      return b.assists - a.assists; // If goals are also equal, sort by assists in descending order
    }
  });
  const router = useRouter();
  const tournamentId = router.query.tournamentId;
  const [tournamentName, setTournamentName] = useState("");

  useEffect(() => {
    const fetchTournamentPositions = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/tournaments/positions/${tournamentId}`,
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
        localStorage.setItem("tournamentName", data.tournamentName); // Store the tournamentName in local storage
        localStorage.setItem(
          "tournamentAdminId",
          data.positions[0].tournament.adminId
        ); // Store the adminId in local storage
        setTournamentPositions(data.positions);
        setTournamentName(data.tournamentName);
      } else {
        console.error("Failed to fetch tournament positions");
      }
    };

    fetchTournamentPositions(); // Call the fetchTournamentPositions function
  }, [tournamentId]);

  useEffect(() => {
    const fetchTournamentMatches = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/tournaments/getMatches/${tournamentId}`,
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
        setTournamentMatches(data);
      } else {
        console.error("Failed to fetch tournament matches");
      }
    };

    fetchTournamentMatches(); // Call the fetchTournamentPositions function
  }, [tournamentId]);

  function downloadPDF() {
    const doc = new jsPDF();
    const title = document.querySelector("h1").textContent;
    doc.text(title, 10, 10);

    // Positions table
    const positionsTable = document.getElementById("my-table");
    autoTable(doc, { html: positionsTable, startY: 20 });

    // Calculate start position for matches table
    doc.text("Played Matches", 15, doc.autoTable.previous.finalY + 15);
    let startY = doc.autoTable.previous.finalY + 20; // 10 is the margin

    // Create a table for the match
    const matchTable = document.createElement("table");

    // Create a header row and add cells with the titles
    const headerRow = matchTable.insertRow();
    headerRow.insertCell().textContent = "Match Number";
    headerRow.insertCell().textContent = "Date";
    headerRow.insertCell().textContent = "Location";
    headerRow.insertCell().textContent = "Result";
    headerRow.insertCell().textContent = "Scorers";

    tournamentMatches.forEach((match, index) => {
      // Add rows and cells to the table based on the match data
      const row = matchTable.insertRow();
      row.insertCell().textContent = index + 1; // Match number
      row.insertCell().textContent = formatDate(match.date);
      row.insertCell().textContent = match.location;
      row.insertCell().textContent = match.result1 + " - " + match.result2;

      // Create a string that contains all scorers and their goals
      let scorers = match.goals
        .map((goal) => `${goal.player} (${goal.stat})`)
        .join(", ");

      // Add a cell for the scorers
      const cell = row.insertCell();
      cell.textContent = scorers;
    });

    // Add the table to the PDF
    autoTable(doc, { html: matchTable, startY: startY });
    // Update start position for the next table
    startY = doc.autoTable.previous.finalY + 10; // 10 is the margin

    doc.save(title + " " + "table.pdf");
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen ">
      <div
        className="absolute top-0 left-0 w-full h-[12.5%]"
        style={{ backgroundColor: "#729560" }}
      ></div>
      <Link href={"/Hub"}>
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-24 h-24 flex justify-center mt-4 mb-10 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </Link>
      <Link
        href={"/Hub/MisTorneos"}
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

      <Link
        href={`/Hub/MisTorneos/${tournamentId}/Manage`}
        className="absolute top-4 left-4 font-bold py-3 px-3 mt-4 rounded bg-dark-green hover:bg-custom-green"
      >
        Manage Tournament
      </Link>

      <div className="absolute top-36 right-6">
        <Button
          className="bg-dark-green hover:bg-custom-green text-black"
          onClick={downloadPDF}
        >
          Download Table
        </Button>
      </div>

      <div className="absolute top-36 left-6">
        <Forum />
      </div>

      <div className="relative flex flex-col items-center justify-center h-screen ">
        <h1 className="text-4xl font-bold mb-16">{tournamentName} Positions</h1>
        <div className="max-h-[493px] overflow-auto">
          <table
            id="my-table"
            className="table-auto border-collapse border border-gray-800 max-h-500 overflow-auto"
          >
            <thead>
              <tr className="bg-dark-green text-white">
                <th className="px-4 py-2 border border-gray-800 justify-center items-center">
                  #
                </th>
                <th className="px-4 py-2 border border-gray-800">User</th>
                <th className="px-4 py-2 border border-gray-800">Points</th>
                <th className="px-4 py-2 border border-gray-800">Goals</th>
                <th className="px-4 py-2 border border-gray-800">Assists</th>
                <th className="px-4 py-2 border border-gray-800">
                  Yellow Cards
                </th>
                <th className="px-4 py-2 border border-gray-800">Red Cards</th>
              </tr>
            </thead>
            <tbody>
              {sortedTournamentPositions.map((position, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : ""}
                >
                  <td className="border px-4 py-2 border-gray-800">
                    {index + 1}
                  </td>
                  <td className="border px-4 py-2 border-gray-800">
                    <Link
                      href={`/Hub/MisTorneos/${tournamentId}/player-stats/${position.user.id}`}
                      className="font-bold text-custom-green3 hover:underline"
                    >
                      {position.user.username}
                    </Link>
                  </td>
                  <td className="border px-4 py-2 border-gray-800">
                    {position.points}
                  </td>
                  <td className="border px-4 py-2 border-gray-800">
                    {position.goals}
                  </td>
                  <td className="border px-4 py-2 border-gray-800">
                    {position.assists}
                  </td>
                  <td className="border px-4 py-2 border-gray-800">
                    {position.yellowCards}
                  </td>
                  <td className="border px-4 py-2 border-gray-800">
                    {position.redCards}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Tournament);
