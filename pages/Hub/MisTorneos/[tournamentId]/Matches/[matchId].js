import React, { useEffect, useState } from "react";
import Link from "next/link";
import withAuth from "@/components/withAuth/withAuth";
import { useRouter, router } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SonnerDemo } from "@/components/ui/SonnerDemo";
import { DialogDeleteMatch } from "@/components/ui/DialogDeleteMatch";

function MatchPage() {
  const [match, setmatch] = useState([]);
  const [result, setResult] = useState("");
  const [yellowCards, setYellowCards] = useState("");
  const [redCards, setRedCards] = useState("");
  const [goals, setGoals] = useState("");
  const [assists, setAssists] = useState("");
  const router = useRouter();
  const matchId = router.query.matchId;
  const tournamentId = router.query.tournamentId;

  useEffect(() => {
    const fetchMatch = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/matches/get_match/${matchId}`,
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
        console.log(data.id);
        console.log(data);
        localStorage.setItem("matchId", data.id);
        setmatch(data);
        setResult(data.result);
        setYellowCards(data.yellowCards);
        setRedCards(data.redCards);
        setGoals(data.goals);
        setAssists(data.assists);

      } else {
        console.error("Failed to fetch match");
      }
    };

    if (matchId) {
      fetchMatch();
    }
  }, [matchId]);

  const handleDeleteMatch = async () => {
    const token = localStorage.getItem("token");
    const matchId = localStorage.getItem("matchId");

    try {
      const response = await fetch(
        `http://localhost:8080/matches/delete/${matchId}`,
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
        localStorage.removeItem("matchId");
        router.push({
          pathname: "/Hub/MisTorneos/[tournamentId]/Matches",
          query: { tournamentId: tournamentId },
        });
        console.log("Tournament deleted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
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
        href={`/Hub/MisTorneos/${tournamentId}/Matches`}
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
      <div className="flex flex-col items-center justify-center w-96 h-[430px] bg-custom-green rounded-md shadow-md mt-40 gap-3">
        <div className="text-black font-bold text-2xl"> Match Result
          <Input
            className="w-80"
            type="text"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="Result"
          />
        </div>

        <div className="text-black font-bold text-lg"> Yellow Cards
          <Input
            className="w-80"
            type="number"
            value={yellowCards}
            onChange={(e) => setYellowCards(e.target.value)}
            placeholder="Yellow Cards"
          />
        </div>

        <div className="text-black font-bold text-lg"> Red Cards
          <Input
            className="w-80"
            type="number"
            value={redCards}
            onChange={(e) => setRedCards(e.target.value)}
            placeholder="Red Cards"
          />
        </div>

        <div className="text-black font-bold text-lg"> Goals
          <Input
            className="w-80"
            type="number"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Goals"
          />
        </div>

        <div className="text-black font-bold text-lg"> Assists
          <Input
            className="w-80"
            type="number"
            value={assists}
            onChange={(e) => setAssists(e.target.value)}
            placeholder="Assists"
          />
        </div>  
        
      </div>

      <SonnerDemo
        result={result}
        yellowCards={yellowCards}
        redCards={redCards}
        goals={goals}
        assists={assists}
      >
        <Button className="w-80"></Button>
      </SonnerDemo>

      <div>
        <div className="absolute top-40 right-10">
          <DialogDeleteMatch handleDeleteMatch={handleDeleteMatch} />
        </div>
      </div>
    </div>
  );
}

export default withAuth(MatchPage);
