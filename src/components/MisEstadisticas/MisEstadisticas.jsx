import React from "react";
import withAuth from "@/components/withAuth/withAuth";
import Link from "next/link";
import { useEffect, useState } from "react";

function MisEstadisticas() {
  const [userName, setUserName] = useState("");
  const [goals, setGoals] = useState(0);
  const [assists, setAssists] = useState(0);
  const [yellowCards, setYellowCards] = useState(0);
  const [redCards, setRedCards] = useState(0);
  const [position, setPosition] = useState("");
  const [matches, setMatches] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(userId);
      const response = await fetch(
        `http://localhost:8080/profile/get/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const user = await response.json();
        setGoals(user.totalGoals);
        setAssists(user.totalAssists);
        setYellowCards(user.totalYellowCards);
        setRedCards(user.totalRedCards);
        setPosition(user.position);
        setUserName(user.username);
        setMatches(user.totalMatches);
        setPoints(user.totalPoints);
      } else {
        console.error("Failed to fetch user");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen space-y-4 z-20">
      <div
        className="absolute top-0 left-0 w-full h-[12.5%]"
        style={{ backgroundColor: "#729560" }}
      ></div>
      <Link href={"/Hub"}>
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-24 h-24 flex justify-center mt-4 mb-10 absolute top-[10.5%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-30"
        />
      </Link>
      <Link
        href={"/Hub"}
        className="absolute top-4 right-4 font-bold py-3 px-3 rounded"
        style={{ backgroundColor: "#729560" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#abcd99")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#729560")}
      >
        <img
          src="/assets/hub.png"
          alt="Return to Hub"
          className="w-8 h-8 z-30"
        />
      </Link>
      <div className="relative flex flex-row items-center justify-center h-screen space-x-20 space-y-4 z-20">
        <div className="relative">
          <div style={{ width: "300px", height: "450px", overflow: "hidden" }}>
            <img
              src="/assets/green_fifa_card.png"
              alt="Mis Estadisticas"
              className="z-0 relative w-full h-full"
            />
          </div>
          <div
            style={{ top: "55%" }}
            className="absolute left-0 w-full h-full flex items-start justify-center z-10"
          >
            <div className="text-white text-2xl font-bold">
              <p>{userName}</p>
            </div>
          </div>
          <div
            style={{ top: "32.5%" }}
            className="absolute left-[60px] w-full h-full items-start justify-center z-10"
          >
            <div className="text-white text-2xl font-bold">
              <p>{position}</p>
            </div>
          </div>
          <div
            style={{ top: "65.5%" }}
            className="absolute left-[100px] w-full h-full items-start justify-center z-10"
          >
            <div className="text-white text-2xl font-bold">
              <p>{goals}</p>
            </div>
          </div>
          <div
            style={{ top: "75.5%" }}
            className="absolute left-[100px] w-full h-full items-start justify-center z-10"
          >
            <div className="text-white text-2xl font-bold">
              <p>{assists}</p>
            </div>
          </div>
          <div
            style={{ top: "65.5%" }}
            className="absolute left-[230px] w-full h-full items-start justify-center z-10"
          >
            <div className="text-white text-2xl font-bold">
              <p>{yellowCards}</p>
            </div>
          </div>
          <div
            style={{ top: "75.5%" }}
            className="absolute left-[230px] w-full h-full items-start justify-center z-10"
          >
            <div className="text-white text-2xl font-bold">
              <p>{redCards}</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md p-4 bg-custom-green rounded mt-9 shadow-md animate-fadeIn font-bold">
          Total Matches:
          <h1 className="text-2xl font-bold border-b mt-4 mb-4">
            {matches}
          </h1>
          <p>
            Points Ratio:{" "}
            {matches !== 0 ? (points / matches).toFixed(2) : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default withAuth(MisEstadisticas);
