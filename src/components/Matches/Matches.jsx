import React, { useEffect, useState } from "react";
import Link from "next/link";
import withAuth from "../withAuth/withAuth";
import { DialogCalendar } from "../ui/DialogCalendar";
import { Button } from "../ui/button";
import MatchesPDF from "./MatchesPDF";
import ReactDOM from "react-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return aDate - bDate;
        });

        setMatches(data);
        console.log(matches);
      } else {
        console.error("Failed to fetch matches");
      }
    };

    fetchMatches();
  }, []);

  function downloadPDF() {
    // Render MatchesPDF off-screen
    const tournamentName = localStorage.getItem("tournamentName");
    const offScreen = document.createElement("div");
    offScreen.style.position = "absolute";
    offScreen.style.left = "-9999px";
    document.body.appendChild(offScreen);

    const root = ReactDOM.createRoot(offScreen);
    root.render(<MatchesPDF matches={matches} />);

    setTimeout(() => {
      html2canvas(offScreen)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");

          // Add title
          const title = tournamentName + "'s" + " " + "Matches";
          const titleX = pdf.internal.pageSize.getWidth() / 2;
          pdf.setFontSize(20);
          pdf.text(title, titleX, 20, { align: "center" });

          // Calculate scale factor
          const scaleFactor = 0.2; // Adjust this value to change the scale

          let imgWidth = canvas.width * scaleFactor;
          let imgHeight = canvas.height * scaleFactor;

          // Calculate x coordinate to center the image
          let x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;

          let heightLeft = imgHeight;
          let position = 30; // Start position below the title

          pdf.addImage(imgData, "PNG", x, position, imgWidth, imgHeight);
          heightLeft -= (pdf.internal.pageSize.getHeight() - 30); // Subtract title space from page height

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", x, position, imgWidth, imgHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
          }

          pdf.save(tournamentName + "_matches.pdf");

          // Unmount MatchesPDF and remove the off-screen div
          root.unmount();
          document.body.removeChild(offScreen);
        })
        .catch((err) => {
          console.error("Error creating PDF", err);
        });
    }, 0);
  }

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
        href={`/Hub/MisTorneos/${tournamentId}/Manage`}
        className="absolute top-4 right-4 font-bold py-3 px-3 rounded mt-4"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img
          src="/assets/back-arrow.png"
          alt="Return to Tournaments"
          className="w-8 h-8"
        />
      </Link>

      <div className="w-full max-w-[500px] p-4 bg-custom-green rounded shadow-md animate-fadeIn font-extrabold relative flex flex-col items-center justify-center mt-10 mb-10">
        <h3 style={{ fontSize: "2em" }}> {tournamentName}'s Matches </h3>
      </div>

      <div className="max-h-[400px] w-[550px] overflow-y-scroll overflow-hidden bg-[#729560] rounded-lg mt-5">
        <div className="absolute top-40 left-10">
          <DialogCalendar matches={matches} />
        </div>
        <div className="absolute top-40 right-10">
          <Button
            className="bg-dark-green hover:bg-custom-green"
            onClick={downloadPDF}
          >
            Download Fixture
          </Button>
        </div>
        {matches.length === 0 ? (
          <div className="p-10">
            <h2 className="text-3xl font-serif font-extrabold antialiased text-center animate-fadeIn">
              No matches found for this tournament
            </h2>
          </div>
        ) : (
          matches.map((match, index) => (
            <Link
              href={`/Hub/MisTorneos/${tournamentId}/Manage/Matches/${match.id}`}
            >
              <div
                key={match.id || index}
                className="p-7 border-b border-gray-200 transform transition duration-500 ease-in-out hover:scale-105 hover:bg-custom-green cursor-pointer animate-fadeIn flex justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold">{match.location}</h2>
                  <p>{formatDate(match.date)}</p>
                  <p>{match.description}</p>
                  <div className="flex justify-end">
                    <p>{match.type}</p>
                  </div>
                </div>
                {match.result1 !== null && match.result2 !== null && (
                  <div className="self-center">
                    <p>
                      Result: {match.result1} - {match.result2}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default withAuth(Matches);
